import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

const userObj = {
    username: 'Tomppa',
    name: 'Tuomas Nummela',
}


describe('<BlogForm /> ', () => {

    test('calls callback with data on submit', async() => {
        const user = userEvent.setup()
        const setBlogs = jest.fn()
        const setMessage = jest.fn()
        const blogs = []
        const createBlog = jest.fn()

        render(<BlogForm setBlogs={setBlogs} createBlog={createBlog} user={userObj} setMessage={setMessage} blogs={blogs} />)


        const titleInput = screen.getByPlaceholderText('write title here...')
        const authorInput = screen.getByPlaceholderText('write author here...')
        const urlInput = screen.getByPlaceholderText('write url here...')
        const sendButton = screen.getByText('Save blog')

        await userEvent.type(titleInput, 'Testiblogi')
        await userEvent.type(authorInput, 'Testikirjoittaja')
        await userEvent.type(urlInput, '/testiurl')
        await userEvent.click(sendButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('Testiblogi' )
        expect(createBlog.mock.calls[0][0].author).toBe('Testikirjoittaja' )
        expect(createBlog.mock.calls[0][0].url).toBe('/testiurl' )
    })
})