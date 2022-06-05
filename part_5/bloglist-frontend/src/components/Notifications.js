import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const state = useSelector((state) => state)
    return (
        <div className={state.notification.type}>
            {state.notification.message}
            <br />
        </div>
    )
}

export default Notification
