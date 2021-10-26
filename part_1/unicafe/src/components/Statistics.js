import React from 'react'
import StatisticLine from '../components/StatisticLine'
const valAverage = (average, all) => {
    if (average || 0) {
        return average / all
    }
    return 0
}

const Statistics = ({ good, neutral, bad, all, average }) => {
    if (all > 0) {
        return (
            <div>
                <li>
                    <ul><StatisticLine text='good' value={good} /></ul>
                    <ul><StatisticLine text='neutral' value={neutral} /></ul>
                    <ul><StatisticLine text='bad' value={bad} /></ul>
                    <ul><StatisticLine text='all' value={all} /></ul>
                    <ul><StatisticLine text='average' value={valAverage(average, all)} /></ul>
                </li>
            </div>
        )
    }
    return <div>No feedback given</div>
}

export default Statistics