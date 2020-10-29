import React, { useEffect, useRef, useState } from 'react';

const TodoForm = (props) => {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, [input]);

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
            {props.edit ? (
                <>
                    <input 
                        type="text" 
                        placeholder="Update todo" 
                        className="todo-input edit"
                        name="text"
                        value={input}
                        onChange={handleChange}
                        ref={inputRef}
                    />
                    <button type="submit" className="todo-button edit">Update</button>
                </>
            ) : (
                <>
                    <input 
                        type="text" 
                        placeholder="Add a todo" 
                        className="todo-input"
                        name="text"
                        value={input}
                        onChange={handleChange}
                        ref={inputRef}
                    />
                    <button type="submit" className="todo-button">Add todo</button>
                </>
            )}
            
        </form>
    )
}

export default TodoForm;
