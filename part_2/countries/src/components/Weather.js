import React from 'react'

const Weather = ({ capital, temp, wind }) => {

    return (
        <div>
            <h1>Wheater in {capital}</h1>
            <h4>temperature: {temp} °c </h4>
            <h4>wind: {wind} km/h</h4>
        </div>
    )
}

export default Weather