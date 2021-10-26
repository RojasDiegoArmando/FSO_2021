import React from 'react'

const Total = (props) => {
    let total = props.parts
        .map(part => part.exercises)
        .reduce((pre, acc) => pre + acc)
    return (
        <div>
            <p>Number of exercises {total} </p>
        </div>
    )
}

export default Total