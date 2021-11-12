import React from 'react'

const Country = ({ name, capital, population, languages, flagUrl }) => {
    console.log(languages)
    return (
        <div>
            <h1>{name}</h1>
            <p>Capital: {capital}</p>
            <p>Population: {population}</p>
            <br />
            <h3>languages</h3>
            <ul>
                {Object.keys(languages).map((key, i) => (
                    <li key={i}>{languages[key]}</li>
                ))}
            </ul>
            <br />
            <img src={flagUrl} alt="No img found" width='350' height='250' />
        </div>
    )
}

export default Country