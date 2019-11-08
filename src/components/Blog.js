import React, { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog }) => {

  const [blogInfo, setBlogInfo] = useState(false)
  const blogInfoVisibility = () => {setBlogInfo(!blogInfo)}

  return (
    <div style={blogStyle}>
      <div onClick={(blogInfoVisibility)}>
        {blogInfo === false ?
          <div>{blog.title} {blog.author}</div> :
          <div>
            <div>{blog.title} {blog.author}</div>
            <div>{blog.url}</div>
            <div>{blog.likes} likes
              <button>like</button>
            </div>
            <div>added by {blog.user.name}</div>
          </div>
        }
      </div>
    </div>
  )
}

export default Blog