import { useState } from "react"
import { EDIT_BORN, ALL_AUTHORS } from '../queries'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'

const SetBirthYear = () => {
    const [born, setBorn] = useState('')
    const [selectedName, setSelectedName] = useState('')
    const allAuthors = useQuery(ALL_AUTHORS)
    let allAuthorsOptions

    allAuthorsOptions = allAuthors.data.allAuthors.map(author => {
        let newOption = {
            value: author.name,
            label: author.name
        }

        return newOption
    })
    const [editBorn] = useMutation(EDIT_BORN)

    console.log(allAuthorsOptions)

    const submit = (event) => {
        event.preventDefault()

        editBorn({ variables: { name: selectedName.value, setBornTo: parseInt(born) } })
        setSelectedName()
        setBorn('')
    }

    return (
        <div>
            <h2>Set Birthyear</h2>
            <form onSubmit={submit}>
                <Select
                    defaultValue={selectedName}
                    onChange={setSelectedName}
                    options={allAuthorsOptions}
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