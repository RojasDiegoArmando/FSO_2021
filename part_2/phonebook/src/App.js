import React, { useState, useEffect } from 'react'
import Title from './components/Title'
import DisplayPersons from './components/DisplayPersons'
import FilterPerson from './components/FilterPerson'
import NewPerson from './components/NewPerson'
import numberService from './services/numbers'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [status, setStatus] = useState(null)

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const handleDelete = (id) => {
    if (window.confirm('are u sure m8?')) {
      numberService
        .deletePerson(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch((error) => {
          const personError = persons.find(person => person.id === id)
          setMessage(
            `information of ${personError.name} has already been removed from server`
          )
          setStatus('error')

          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  useEffect(() => {
    numberService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const objPerson = (name, number) => {
      const newPerson = {
        name: name,
        number: number
      }

      numberService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(
            `Added ${returnedPerson.name}`
          )
          setStatus('add')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }

    const handleUpdate = (name, number) => {
      const { id } = persons.find(person => person.name === newName)

      const newObject = { name, number }

      if (window.confirm(`${newName} is already added to phonebook, would u like to overwrite it?`)) {
        numberService
          .update(id, newObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          })
          .catch((error) => {
            setPersons(persons.filter(person => person.id !== id))
            setMessage(
              `information of ${newObject.name} has already been removed from server`
            )
            setStatus('error')
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    }

    persons.find(person => person.name === newName)
      ? handleUpdate(newName, newNumber)
      : objPerson(newName, newNumber)

    setNewName('')
    setNewNumber('')
  }

  const personsToShow = newSearch.length === 0
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(newSearch.toUpperCase()) > 0)

  return (
    <div>
      <Title text='Phonebook' />
      <Notification message={message} status={status} />
      <FilterPerson newSearch={newSearch} handleNewSearch={handleNewSearch} />
      <Title text='Add a new' />
      <NewPerson addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />
      <Title text='Numbers' />
      <DisplayPersons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )

}


export default App;
