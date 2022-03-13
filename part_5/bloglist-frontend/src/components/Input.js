import React from 'react'

const Input = ({ text, value, handleValue }) => (
    <div>
        {text}
        <input
            id={text}
            value={value}
            type='text'
            placeholder={`write ${text} here`}
            onChange={({ target }) => handleValue(target.value)}
        />
    </div>
)

export default Input