import React from 'react'

const NewPerson = ({ addPerson, newName, handleNewName, newNumber, handleNewNumber }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleNewName} />
                <br />
                number: <input value={newNumber} onChange={handleNewNumber} />
            </div>
            <div>
                <button type='submit'>add</button>
            </div>
        </form>
    )
}

export default NewPerson