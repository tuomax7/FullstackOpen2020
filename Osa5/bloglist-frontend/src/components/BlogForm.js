import { useRef, useState } from 'react'
import blogService from '../services/blogs.js'
import Togglable from '../components/Togglable.js'

const AddBlog = ({ user, blogs, setBlogs, setMessage }) => {

    const blogFormRef = useRef()

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async(event) => {
        event.preventDefault()

        blogFormRef.current.toggleVisibility()
        try {
            const blogObject = {
                title, author, url, user, likes: 0
            }

            const createdBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat(createdBlog))
            setTitle('')
            setAuthor('')
            setUrl('')
            setMessage(['blog added succesfully', true])
            setTimeout(() => {
                setMessage(null)
            }, 5000)

        } catch(exception) {
            setMessage(['blog was failed to add', false])
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    return(
        <Togglable buttonLabel='Add blog' ref={blogFormRef}>
            <h3>Create new</h3>
            <form onSubmit={addBlog}>
                <div>
                    Title
                    <input
                        type="text"
                        value={title}
                        name="title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                  Author
                    <input
                        type="text"
                        value={author}
                        name="author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                  Url
                    <input
                        type="text"
                        value={url}
                        name="url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">Save blog</button>
            </form>
        </Togglable>
    )
}

export default AddBlog