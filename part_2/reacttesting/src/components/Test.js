import React, { useState, useEffect, useMemo } from 'react'

const Test = ({ age }) => {
    const [name, setName] = useState('')
    const [dark, setDark] = useState(false)

    const user = useMemo(() => {
        return { age, name }
    }, [age, name])

    const buttonSyle = {
        backgroundColor: dark ? '#000' : 'initial',
        color: dark ? '#fff' : 'initial'
    }

    useEffect(() => {
        console.log(user)
    }, [name, age])

    return (
        <div>
            <input value={name} onChange={e => setName(e.target.value)} />
            <button style={buttonSyle}
                onClick={() => setDark(asd => !asd)}
            >
                change theme
            </button>
        </div>
    )
}

export default Test