import { useState } from "react"
import { EDIT_BORN } from '../queries'
import { useMutation } from '@apollo/client'

const SetBirthYear = () => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [editBorn] = useMutation(EDIT_BORN)

    const submit = (event) => {
        event.preventDefault()

        editBorn({ variables: { name, setBornTo: parseInt(born) } })
        setName('')
        setBorn('')
    }

    return (
        <div>
            <h2>Set Birthyear</h2>
            <form onSubmit={submit}>
                name <input value={name}
                    onChange={({ target }) => setName(target.value)}
                />
                <br />
                born <input value={born}
                    onChange={({ target }) => setBorn(target.value)}
                />
                <button type='submit'>update author</button>
            </form>
        </div>
    )
}

export default SetBirthYear