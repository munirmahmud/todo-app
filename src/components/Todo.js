import React, { useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import TodoForm from './TodoForm';

const Todo = ({todos, completeTodo, updateTodo, removeTodo}) => {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    });
    
    const submitUpdate = value => {
        updateTodo(edit.id, value);

        setEdit({
            id: null,
            value: ''
        });
    };

    if(edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />
    }

    return todos.map((todo, index) => (
        <div className={todo.isComplete ? 'todo-item complete' : 'todo-item'} key={index}>
            <div key={todo.id} onClick={() => completeTodo(todo.id)}>
                {todo.text}
            </div>
            
            <div className="icons">
                <RiCloseCircleLine 
                    className="delete-icon"
                    onClick={() => removeTodo(todo.id)}
                />
                <TiEdit 
                    className="edit-icon"
                    onClick={() => setEdit({id: todo.id, value: todo.text})}
                />
            </div>
        </div>
    ));
}

export default Todo;
