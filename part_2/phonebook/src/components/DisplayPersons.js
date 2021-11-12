import React from 'react'
import Person from './Person'

const DisplayPersons = ({ persons }) => {
    return (
        <div>
            <ul>
                {
                    persons.map(person => {
                        return (
                            <Person key={person.id} person={person} />
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default DisplayPersons