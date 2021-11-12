import React from 'react'
import axios from 'axios'

const Weather = ({ capital, temp, wind }) => {

    return (
        <div>
            <h1>Wheater in {capital}</h1>
            <h4>temperature: </h4> {temp}
            <h4>wind: </h4> {wind}
        </div>
    )
}

export default Weather