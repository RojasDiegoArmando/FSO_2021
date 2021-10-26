import { React, useState } from 'react'
import Titulo from './components/Titulo'
import Button from './components/Button'
import Statistics from './components/Statistics'


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAverage(average + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage(average - 1)
  }



  return (
    <div>
      <Titulo text='Give feedback' />
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <Titulo text='Statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} />
    </div>
  )
}



export default App;
