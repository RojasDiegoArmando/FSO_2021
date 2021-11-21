import React, { useState, useEffect } from 'react'
import Country from './Country'
import fetchWeather from '../services/fetchWeather'
import Weather from './Weather'
const DisplayCountries = ({ countries }) => {
    const [weatherData, setWeatherData] = useState('')

    useEffect(() => {
        if (countries.length === 1) {
            fetchWeather(countries[0].name.common)
                .then((res) => setWeatherData(res))
        }
    }, [countries])

    return (
        <div>
            {countries.length >= 10 &&
                <p>Too many results!! Please be more specific!</p>
            }
            {countries.length === 1 && (
                <div>
                    <Country
                        name={countries[0].name.common}
                        capital={countries[0].capital}
                        population={countries[0].population}
                        languages={countries[0].languages}
                        flagUrl={countries[0].flags.png}
                    />
                </div>
            )}
            {weatherData && (
                <div>
                    <Weather
                        capital={weatherData.location.name}
                        temp={weatherData.current.temperature}
                        wind={weatherData.current.wind_speed}
                    />
                </div>
            )}
            {countries.length === 0 &&
                <p>Please type some!</p>
            }
        </div>
    )
}

export default DisplayCountries