import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import SuccessNotification from './components/SuccessNotification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login' 
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [newBlog, setNewBlog] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  //const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)

      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const logout = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>      
  )

  const blogList = () => (
    blogs.map(blog =>
      <Blog key={blog.id} blog={blog} /> 
    )
  )

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
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    try {
      window.localStorage.clear()
    } catch (exception) {
      setErrorMessage('logout not successful')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    blogService
      .create(blogObject)
      .then(data => {
        setBlogs(blogs.concat(data))
        setNewBlog('')
        setTitle('')
        setAuthor('')
        setUrl('')
      })
    
    setSuccessMessage(`a new blog ${title} by ${author} added`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }


  return (
    <div>

      <Notification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      
      {user === null ? 
        loginForm() :
        <div>
          <h2>blogs</h2>
            <div>{user.name} logged in {logout()}</div>
              <Togglable buttonLabel="new note">
                <BlogForm
                  handleSubmit={addBlog}
                  title={title}
                  author={author}
                  url={url}
                  handleTitleChange={({ target }) => setTitle(target.value)}
                  handleAuthorChange={({ target }) => setAuthor(target.value)}
                  handleUrlChange={({ target }) => setUrl(target.value)}
                />
              </Togglable>
              {/* {blogForm()} */}
              {blogList()}
        </div> 
      }

    </div>  
  )

}

export default App;
