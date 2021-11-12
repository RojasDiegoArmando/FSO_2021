import React, { useState } from 'react'
import Todo from './Todo'

const Todos = ({ initialTodos }) => {
    const [todos, setTodos] = useState(initialTodos)
    const [selectedTodoId, setSelectedTodoId] = useState()
    const selectedTodo = todos.find(todo => todo.id === selectedTodoId)

    console.log(todos);

    const handleToggleComplete = (todoId) => {
        setTodos(currTodos => {
            return currTodos.map(todo => {
                if (todo.id === todoId) {
                    return { ...todo, complete: !todo.complete }
                }
                return todo
            })
        })
    }

    return (
        <div>
            {todos.map(todo => (
                <Todo
                    key={todo.id}
                    todo={todo}
                    handleToggleComplete={handleToggleComplete}
                    handleSelect={setSelectedTodoId}
                />
            ))}
            <h3>Selected Todo</h3>
            {selectedTodo && (
                <Todo
                    todo={selectedTodo}
                    handleSelect={setSelectedTodoId}
                    handleToggleComplete={handleToggleComplete}
                />
            )}
        </div>
    )
}

export default Todos