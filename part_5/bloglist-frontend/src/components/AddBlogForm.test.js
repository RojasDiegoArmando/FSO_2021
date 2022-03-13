import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import AddBlogForm from './AddBlogForm'

describe('<AddBlogForm/>', () => {
    test('new blog', () => {
        const createNewBlogMock = jest.fn()

        render(<AddBlogForm createNewBlog={createNewBlogMock} />)

        const titleInput = screen.getByPlaceholderText('write title here')
        const authorInput = screen.getByPlaceholderText('write author here')
        const urlInput = screen.getByPlaceholderText('write url here')

        userEvent.type(titleInput, 'how to test a submit form')
        userEvent.type(authorInput, 'Rojas Diego')
        userEvent.type(urlInput, 'www.tofi.com.ar')

        const button = screen.getByText('Add')
        userEvent.click(button)

        expect(createNewBlogMock.mock.calls).toHaveLength(1)
        expect(createNewBlogMock.mock.calls[0][0].title).toBe('how to test a submit form')
        expect(createNewBlogMock.mock.calls[0][0].author).toBe('Rojas Diego')
        expect(createNewBlogMock.mock.calls[0][0].url).toBe('www.tofi.com.ar')
    })
})