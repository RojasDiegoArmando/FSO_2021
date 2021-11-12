import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import DisplayCountries from './components/DisplayCountries'
import fetchCountries from './services/fetchCountries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
  }

  useEffect(() => {
    fetchCountries().then(response => setCountries(response))
  }, [])
  console.log('fetched', countries.length, 'countries');

  const countriesToShow = countries.length === 0 || newSearch.length === 0
    ? []
    : countries.filter(country => country.name.common.toUpperCase().includes(newSearch.toUpperCase()) > 0)

  return (
    <div>
      <h1>Data for Countries</h1>
      <Search newSearch={newSearch} handleNewSearch={handleNewSearch} />
      <DisplayCountries
        countries={countriesToShow}
      />
    </div>
  )
}
export default App;
