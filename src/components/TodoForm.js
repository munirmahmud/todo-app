import React, { useState } from 'react';

const TodoForm = (props) => {
    const [input, setInput] = useState('');

    const handleFormSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            id: Date.now(),
            text: e.target.value
        });

        setInput('');
    };

    const handleChange = e => {
        setInput(e.target.value);
    };

    return (
        <form className="todo-form" onSubmit={handleFormSubmit}>
            <input 
                type="text" 
                placeholder="Add a todo" 
                value={input}
                className="todo-input"
                onChange={handleChange}
            />
            <button type="submit" className="todo-button">Add todo</button>
        </form>
    )
}

export default TodoForm;
