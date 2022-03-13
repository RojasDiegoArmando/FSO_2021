import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

describe('<NoteForm/>', () => {
    test('updates parent state and calls onSubmit', () => {
        const createNote = jest.fn()

        render(<NoteForm createNote={createNote} />)

        render(
            <div>
                <input />
            </div>
        )
        const showButton = screen.getByText('New note')
        userEvent.click(showButton)

        const input = screen.getByPlaceholderText('write here note content')
        const sendButton = screen.getByText('save')

        userEvent.type(input, 'testing a form...')
        userEvent.click(sendButton)

        expect(createNote.mock.calls).toHaveLength(1)
        expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
    })
})