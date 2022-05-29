const Anecdote = ({ anecdote }) => {
    const style = {
        marginTop: 10,
        marginBottom: 10
    }
    return (
        <div style={style}>
            <h2>{anecdote.content}</h2>
            has {anecdote.votes} votes
            <br />
            <br />
            for more info see <a href={anecdote.info}>{anecdote.info}</a>
        </div>
    )
}

export default Anecdote