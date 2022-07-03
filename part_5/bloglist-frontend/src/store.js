import { configureStore } from '@reduxjs/toolkit'
import blogListReducer from './reducers/blogListReducer'
import notificationReducer from './reducers/notificationReducer'
import timerReducer from './reducers/timerReducer'
import loginReducer from './reducers/loginReducer'

const store = configureStore({
    reducer: {
        timer: timerReducer,
        notification: notificationReducer,
        blogList: blogListReducer,
        login: loginReducer,
    },
})

export default store
