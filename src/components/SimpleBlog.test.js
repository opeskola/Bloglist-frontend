import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Java is fun',
    author: 'Jens Java',
    likes: 4
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  //component.debug()

  expect(component.container).toHaveTextContent(
    'Java is fun'
  )

  expect(component.container).toHaveTextContent(
    'Jens Java'
  )

  expect(component.container).toHaveTextContent(
    'blog has 4 likes'
  )
})

test('clicking the like button twice calls event handler twice', async () => {
  const blog = {
    title: 'Java is fun',
    author: 'Jens Java',
    likes: 4
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})