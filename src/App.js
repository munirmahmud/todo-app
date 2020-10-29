import React from 'react';
import './App.css';
import TodoForm from './components/TodoForm';

const App = () => {
    return (
        <div className="todo-app">
            <h1>What's the plan for today?</h1>
            <TodoForm />
        </div>
    )
}

export default App;
