import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_BASE_URL;
// console.log('API_URL:', API_URL); // Debugging line to check API_URL

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  // Fetch todos on load
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API_URL}/todos`);
      setTodos(res.data);
    } catch (err) {
      console.error('Error fetching todos:', err.message);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await axios.put(`${API_URL}/todos/${id}`, { completed: !completed });
      fetchTodos(); // Refresh list
    } catch (err) {
      console.error('Error updating todo:', err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      fetchTodos();
    } catch (err) {
      console.error('Error deleting todo:', err.message);
    }
  };

  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo._id, todo.completed)}
              className="form-check-input me-2"
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.title}
            </span>
          </div>
          <button onClick={() => deleteTodo(todo._id)} className="btn btn-danger btn-sm">Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
