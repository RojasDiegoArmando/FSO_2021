

const StatisticsForm = ({ store }) => {
    return (
        <div className="statisticsForm">
            <div>Good: {store.getState().good}</div>
            <div>Ok: {store.getState().ok}</div>
            <div>Bad: {store.getState().bad}</div>
        </div>
    )
}

export default StatisticsForm