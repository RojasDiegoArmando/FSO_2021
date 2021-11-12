import React from 'react'
import Country from './Country'

const DisplayCountries = ({ countries }) => {
    console.log(countries.length);
    if (countries.length === 1) console.log(countries[0])
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

            {countries.length === 0 &&
                <p>Please type some!</p>
            }
        </div>
    )
}

export default DisplayCountries