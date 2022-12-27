import { useState } from 'react'

const AddBlog = ({ createBlog }) => {


    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({ title, author, url, likes: 0 })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return(
        <div>
            <h3>Create new</h3>
            <form onSubmit={addBlog}>
                <div>
                    Title
                    <input
                        id='title'
                        type="text"
                        value={title}
                        name="title"
                        onChange={({ target }) => setTitle(target.value)}
                        placeholder='write title here...'
                    />
                </div>
                <div>
                  Author
                    <input
                        id='author'
                        type="text"
                        value={author}
                        name="author"
                        onChange={({ target }) => setAuthor(target.value)}
                        placeholder='write author here...'
                    />
                </div>
                <div>
                  Url
                    <input
                        id='url'
                        type="text"
                        value={url}
                        name="url"
                        onChange={({ target }) => setUrl(target.value)}
                        placeholder='write url here...'
                    />
                </div>
                <button id='blog-button' type="submit">Save blog</button>
            </form>
        </div>
    )
}

export default AddBlog