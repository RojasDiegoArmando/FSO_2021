import React, { useState } from 'react'

const Display = ({ text }) => <div>{text}</div>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const [value, setValue] = useState(0)

  const setToValue = (newValue) => {
    setValue(newValue)
  }
  return (
    <div>
      <Display text={value} />
      <Button handleClick={() => setToValue(value + 1000)} text='thousand' />
      <Button handleClick={() => setToValue(0)} text='reset' />
      <Button handleClick={() => setToValue(value + 1)} text='increment' />
    </div>
  )
}

export default App