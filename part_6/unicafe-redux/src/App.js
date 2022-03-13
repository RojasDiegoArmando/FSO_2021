import ReactDOM from 'react-dom'
import './app.css'
import { createStore } from 'redux'
import reducer from './reducer'
import FeedbackForm from './components/FeedbackForm'
import StatisticsForm from './components/StatisticsForm'

const store = createStore(reducer)

const App = () => {
    return (
        <div>
            <h1> Give feedback!</h1>
            <FeedbackForm store={store} />
            <h2> Statistics: </h2>
            <StatisticsForm store={store} />
        </div>
    )
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()

store.subscribe(renderApp)

export default App