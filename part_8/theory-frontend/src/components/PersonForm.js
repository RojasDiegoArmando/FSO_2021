import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { CREATE_PERSON, ALL_PERSONS } from '../queries.js'


const PersonForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('')

  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const submit = (event) => {
    event.preventDefault()

    createPerson({ variables: { name, street, city, phone } })

    setName('')
    setCity('')
    setStreet('')
    setPhone('')
  }

  return (
    <div>
      <h2>create new entry</h2>
      <form onSubmit={submit}>
        <div>
          name <input value={name}
            onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          phone <input value={phone}
            onChange={({ target }) => setPhone(target.value)} />
        </div>
        <div>
          street <input value={street}
            onChange={({ target }) => setStreet(target.value)} />
        </div>
        <div>
          city <input value={city}
            onChange={({ target }) => setCity(target.value)} />
        </div>
        <button type='submit'>
          add!
        </button>
      </form>
    </div>
  )
}

export default PersonForm
