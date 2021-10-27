import React from 'react'
import Person from './Person'

const Persons = ({ persons }) => {
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

export default Persons