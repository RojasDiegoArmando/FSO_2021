import React, { useState, useEffect } from 'react'
import Title from './components/Title'
import DisplayPersons from './components/DisplayPersons'
import FilterPerson from './components/FilterPerson'
import NewPerson from './components/NewPerson'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const fetchPersons = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        console.log('promise fulfilled')
        setPersons(res.data)
      })
  }

  useEffect(fetchPersons, [])

  console.log('fetch', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const objPerson = (name, number) => {
      const newPerson = {
        id: persons.length + 1,
        name: name,
        number: number
      }
      setPersons(persons.concat(newPerson))
    }

    persons.find(person => person.name === newName)
      ? alert(`${newName} is already added to phonebook`)
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
      <FilterPerson newSearch={newSearch} handleNewSearch={handleNewSearch} />
      <Title text='Add a new' />
      <NewPerson addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />
      <Title text='Numbers' />
      <DisplayPersons persons={personsToShow} />
    </div>
  )

}


export default App;
