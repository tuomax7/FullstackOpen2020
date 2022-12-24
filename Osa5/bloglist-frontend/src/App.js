import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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



  const handleLogout = async(event) => {
    window.localStorage.removeItem("loggedBlogappUser")
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

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <BlogForm title={title} author={author} url={url} user={user} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} setMessage={setMessage} blogs={blogs} setBlogs={setBlogs}/>
      
    </div>
  )
}

export default App
