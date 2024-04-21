import React, { useState } from 'react';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [inputText, setInputText] = useState('');
    const [inputQuantity, setInputQuantity] = useState('');


    const handleChangeText = (event) => {
        setInputText(event.target.value);
    };

    const handleChangeQuantity = (event) => {
        setInputQuantity(event.target.value);
    };

    const handleAddTodo = () => {
        if (inputText.trim() !== '') {
            setTodos([...todos, { text: inputText, completed: false, quantity: inputQuantity }]);
            setInputText('');
            setInputQuantity('');
        }
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <input type="text" value={inputText} onChange={handleChangeText} placeholder="Agregar tarea" />
            <input type="number" value={inputQuantity} onChange={handleChangeQuantity} placeholder="Cantidad" />
            <button onClick={handleAddTodo}>Agregar</button>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <input type="checkbox" checked={todo.completed} />
                        <span>{todo.text}</span>
                        <span>{todo.quantity}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
