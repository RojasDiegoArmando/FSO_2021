import React from 'react'

const Notification = ({ message, status }) => {
    if (message === null) {
        return null
    }
    console.log(status);
    return (
        <div className={status}>
            <p>{message}</p>
        </div>
    )
}

export default Notification