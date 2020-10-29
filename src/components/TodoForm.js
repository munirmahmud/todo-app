import React, { useState } from 'react';

const TodoForm = (props) => {
    const [input, setInput] = useState('');

    const handleChange = e => {
        setInput(e.target.value);
    };

    const handleFormSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            id: Date.now(),
            text: input
        });

        setInput('');
    };

    return (
        <form className="todo-form" onSubmit={handleFormSubmit}>
            <input 
                type="text" 
                placeholder="Add a todo" 
                className="todo-input"
                name="text"
                value={input}
                onChange={handleChange}
            />
            <button type="submit" className="todo-button">Add todo</button>
        </form>
    )
}

export default TodoForm;
