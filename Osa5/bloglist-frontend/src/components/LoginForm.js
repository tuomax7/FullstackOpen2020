import loginService from '../services/login.js'
import blogService from '../services/blogs.js'
const login = ({username, password, setUsername, setPassword, setMessage, setUser}) => {
    const handleLogin = async (event) => {
        event.preventDefault()
        
        try {
          const user = await loginService.login({
            username, password,
          })
    
          window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
          )
          blogService.setToken(user.token)
          setUser(user)
          setUsername('')
          setPassword('')
          setMessage(['logged in successfully', true])
            setTimeout(() => {
            setMessage(null)
          }, 5000)
    
        } catch (exception) {
          setMessage(['incorrect username or password', false])
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }
      }

    return(
    <form onSubmit={handleLogin}>
      <div>
        Username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>

      <div>
        Password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
    )
}

export default login