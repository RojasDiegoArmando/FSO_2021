import { useEffect, useState } from 'react'
import { EDIT_NUMBER } from '../queries'
import { useMutation } from '@apollo/client'

const PhoneForm = ({ setError }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const [editNumber, result] = useMutation(EDIT_NUMBER)

    const submit = (event) => {
        event.preventDefault()

        editNumber({ variables: { name, phone } })
        setName('')
        setPhone('')
    }

    useEffect(() => {
        if (result.data && result.data.editNumber === null) {
            setError('person not found')
        }
    }, [result.data]) // eslint-disable-line

    return (
        <div>
            <form onSubmit={submit}>
                <h2>Change phone number</h2>
                Name: <input value={name}
                    onChange={({ target }) => setName(target.value)} />
                <br />
                New phone number: <input value={phone}
                    onChange={({ target }) => setPhone(target.value)} />
                <br />
                <button type='submit'>
                    change!
                </button>
            </form>
        </div>
    )
}

export default PhoneForm