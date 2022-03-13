import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog/>', () => {
    test('render blogs author and title', () => {
        const newBlog = {
            title: 'how to code in js',
            author: 'Rojillas',
            likes: 10,
            url: 'www.cuphead.com',
            user: [
                { username: 'superuser' }
            ]
        }

        const mockModifyBlog = jest.fn()

        const mockDeleteBlog = jest.fn()

        const { container } = render(<Blog blog={newBlog} deleteBlog={mockDeleteBlog} modifyBlog={mockModifyBlog} />)

        const element = container.querySelector('#blog-hide')
        const element2 = container.querySelector('#blog-show')
        expect(element).toBeInTheDocument()
        expect(element2).toHaveStyle('display: none')
        expect(element).not.toHaveStyle('display: none')
    })

    test('render likes and url when the button is clicked', () => {

        const newBlog = {
            title: 'how to code in js',
            author: 'Rojillas',
            likes: 10,
            url: 'www.cuphead.com',
            user: [
                { username: 'superuser' }
            ]
        }

        const mockModifyBlog = jest.fn()

        const mockDeleteBlog = jest.fn()

        const { container } = render(<Blog blog={newBlog} deleteBlog={mockDeleteBlog} modifyBlog={mockModifyBlog} />)

        const button = screen.getByText('view')
        userEvent.click(button)

        const div = container.querySelector('#blog-show')
        expect(div).not.toHaveStyle('display: none')
    })

    test('two likes event handles called twice', () => {
        const newBlog = {
            title: 'how to code in js',
            author: 'Rojillas',
            likes: 10,
            url: 'www.cuphead.com',
            user: [
                { username: 'superuser' }
            ]
        }
        const mockModifyBlog = jest.fn()

        const mockDeleteBlog = jest.fn()

        render(<Blog blog={newBlog} deleteBlog={mockDeleteBlog} modifyBlog={mockModifyBlog} />)

        const button = screen.getByText('view')
        userEvent.click(button)

        const likeButton = screen.getByText('like')
        userEvent.click(likeButton)
        userEvent.click(likeButton)
        expect(mockModifyBlog.mock.calls).toHaveLength(2)
    })

})