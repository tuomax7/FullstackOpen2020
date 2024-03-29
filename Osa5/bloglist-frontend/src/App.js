import { useState, useEffect, createRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [message, setMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const blogFormRef = createRef()


    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const likeBlog = async(id) => {
        const blog = blogs.find(b => b.id === id)
        const changedBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 }

        try {
            const updatedBlog = await blogService.update(id, changedBlog)
            setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))

        } catch(exception){
            setMessage(
                [`Blog '${blog.title}' was already removed from server`, false]
            )
            setTimeout(() => {
                setMessage(null)
            }, 5000)
            setBlogs(blogs.filter(b => b.id !== id))

        }

    }

    const createBlog = async (BlogToAdd) => {
        try {
            blogFormRef.current.toggleVisibility()
            const createdBlog = await blogService.create(BlogToAdd)
            setMessage(
                [`Blog ${BlogToAdd.title} was successfully added`, true]
            )
            setBlogs(blogs.concat(createdBlog))
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        } catch(exception) {
            setMessage(
                [`Cannot add blog ${BlogToAdd.title}`, false]
            )

            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }


    const removeBlog = async(id) => {
        const blog = blogs.find(b => b.id === id)

        try {
            await blogService.deleteBlog(id)
            setBlogs(blogs.filter(blog => blog.id !== id))

        } catch(exception){
            setMessage(
                [`Blog '${blog.title}' was already removed from server`, false]
            )
            setTimeout(() => {
                setMessage(null)
            }, 5000)
            setBlogs(blogs.filter(b => b.id !== id))

        }

    }



    const handleLogout = async() => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }


    if (user === null) {
        return (
            <div>
                <h2>Blogs</h2>
                <Notification message={message} />
                <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} setMessage={setMessage} setUser={setUser}/>
            </div>
        )
    }

    return (
        <div>
            {user.username} logged in <button type="submit" onClick={handleLogout}>Log out</button>
            <h2>Blogs</h2>

            <Notification message={message} />
            {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} user={user}/>
            )}
            <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
                <BlogForm createBlog={createBlog} />
            </Togglable>
        </div>
    )
}

export default App
