import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('render a note', () => {
    const note = {
        content: 'contenido para la nota a testear',
        important: true
    }

    render(<Note note={note} />)
    const element = screen.getByText('contenido para la nota a testear')
    expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    const mockHandler = jest.fn()

    render(
        <Note note={note} toggleImportance={mockHandler} />
    )

    const button = screen.getByText('make not important')
    userEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(1)
})