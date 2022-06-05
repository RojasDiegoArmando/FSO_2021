import { configureStore } from '@reduxjs/toolkit'

import blogListReducer from './reducers/blogListReducer'
import notificationReducer from './reducers/notificationReducer'
import timerReducer from './reducers/timerReducer'

const store = configureStore({
    reducer: {
        timer: timerReducer,
        notification: notificationReducer,
        blogList: blogListReducer,
    },
})

export default store
