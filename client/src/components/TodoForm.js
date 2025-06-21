import React, { useState } from 'react';
import axios from 'axios';

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await axios.post('http://localhost:5000/api/todos', { title });
      onAdd(res.data); // Send the new todo to parent
      setTitle('');
    } catch (err) {
      console.error('Error adding todo:', err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex mb-3">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Enter a todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
