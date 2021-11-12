import React from 'react'

const Todo = ({ todo, handleToggleComplete, handleSelect }) => {

    const toggleComplete = () => {
        handleToggleComplete(todo.id)
    }

    const onSelect = () => {
        handleSelect(todo.id)
    }
    console.log(todo);

    return (
        <div>
            <input
                type='checkbox'
                checked={todo.complete}
                onChange={toggleComplete}
            />
            {todo.name}
            <button onClick={onSelect}>Select</button>
        </div>
    )
}

export default Todo