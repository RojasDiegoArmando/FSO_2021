import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './Notification.css'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import timerReducer from './reducers/timerReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        timer: timerReducer,
    },
})

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
