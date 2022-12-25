import { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        display: 'block'
    }

    const [dataVisible, setDataVisible] = useState(false)

    const showWhenVisible = { display: dataVisible ? '' : 'none' }

    const tryRemoveBlog = (id, title) => {
        if(window.confirm(`Remove ${title}?`)) {
            removeBlog(id)
        }
    }


    return (
        <div style={blogStyle}>
            <div>
                {blog.title} by {blog.author}
                {dataVisible ? <button onClick={() => setDataVisible(!dataVisible)}>Hide</button> :
                    <button onClick={() => setDataVisible(!dataVisible)}>Show</button>}
            </div>
            <div style={showWhenVisible}>
                <p>{blog.url}</p>
                <p>likes: {blog.likes} <button onClick={() => likeBlog(blog.id)}>Like</button></p>
                <p>{blog.user.username}</p>
                {blog.user.username === user.username ? <button onClick={() => tryRemoveBlog(blog.id, blog.title)}>Remove</button> : null}
            </div>
        </div>
    )}

export default Blog