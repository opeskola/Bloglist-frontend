import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

test('at the beginning only title and author are visible', () => {
  const blog = {
    title: 'Java is fun',
    author: 'Jens Java',
    likes: 4,
    url: 'http://www.eerererererererererer.com'
  }

  const component = render(
    <Blog blog={blog} />
  )

  //component.debug()

  expect(component.container).toHaveTextContent(
    'Java is fun'
  )

  expect(component.container).toHaveTextContent(
    'Jens Java'
  )

  expect(component.container).not.toHaveTextContent(
    '4'
  )

  expect(component.container).not.toHaveTextContent(
    'http://www.eerererererererererer.com'
  )
})

