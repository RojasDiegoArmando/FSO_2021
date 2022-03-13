

const FeedbackForm = ({ store }) => {
    const handleActions = {
        good: () => store.dispatch({ type: 'GOOD' }),
        ok: () => store.dispatch({ type: 'OK' }),
        bad: () => store.dispatch({ type: 'BAD' }),
        zero: () => store.dispatch({ type: 'ZERO' })
    }
    return (
        <div className="feedbackForm">
            <button onClick={handleActions.good}>Good</button>
            <button onClick={handleActions.ok}>Ok</button>
            <button onClick={handleActions.bad}>Bad</button>
            <button onClick={handleActions.zero}>Reset stats</button>
        </div>
    )
}

export default FeedbackForm