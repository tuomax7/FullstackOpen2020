describe('Blog app', function() {
    const user = {
        name: 'Testi Käyttäjä',
        username: 'Testaaja',
        password: 'salainen'
    }
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('Login')
        cy.contains('Username')
        cy.contains('Password')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('Login').click()
            cy.get('#username').type(user.username)
            cy.get('#password').type(user.password)
            cy.get('#login-button').click()

            cy.contains('Testaaja logged in')
        })

        it('fails with wrong credentials', function() {
            cy.contains('Login').click()
            cy.get('#username').type('Käyttäjä')
            cy.get('#password').type('Salasana')
            cy.get('#login-button').click()
            cy.get('.error').contains('incorrect username or password')
        })
    })


    describe('When logged in', function() {

        beforeEach(function () {
            cy.login({ username: user.username, password: user.password })
        })

        it('A blog can be created', function() {
            Cypress.config('defaultCommandTimeout', 10000);

            cy.contains('Add new blog').click()

            cy.get('#title').type('TestTitle')
            cy.get('#author').type('TestAuthor')
            cy.get('#url').type('TestUrl')
            cy.get('#blog-button').click()


            cy.contains('TestTitle')
            cy.contains('Show').click()
            cy.contains('Like').click()
            cy.contains('likes: ').contains('1')

        })

        describe('and a blog exists', function () {
            beforeEach(function () {

                const leastBlog = {
                    title: 'Least',
                    author: 'least',
                    url: '/least',
                    likes: 0
                }
                const mostBlog = {
                    title: 'Most',
                    author: 'most',
                    url: '/most',
                    likes: 0
                }

                cy.createBlog({ ...leastBlog })
                cy.createBlog({ ...mostBlog })

            })

            it('A blog can be liked', function() {


                cy.contains('Most').parent().contains('Show').click()
                cy.contains('Most').parent().contains('Like').click()
                cy.contains('Most').parent().contains('likes: ').contains('1')

            })

            it('the blogs are sorted by their likes', function() {

                cy.contains('Most').parent().contains('Show').click()
                cy.contains('Most').parent().contains('Like').click()
                cy.contains('Least').parent().contains('Show').click()

                cy.get('.blog').eq(0).should('contain', 'Most')
                cy.get('.blog').eq(1).should('contain', 'Least')

            })

            it('and a blog can be removed', function () {

                cy.contains('Least').parent().contains('Show').click()
                cy.contains('Least').parent().contains('Remove').click()


                cy.should('not.contain', 'LeastLikes')
            })
        })
    })

})