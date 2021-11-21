import React from 'react'
import Person from './Person'

const DisplayPersons = ({ persons, handleDelete }) => {
    return (
        <div>
            <ul>
                {
                    persons.map(person => {
                        return (
                            <Person key={person.id} person={person} handleDelete={handleDelete} />
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default DisplayPersons