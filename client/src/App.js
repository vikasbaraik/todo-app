import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoForm from './components/TodoForm';

function App() {
  const handleAdd = (newTodo) => {
    console.log('Added:', newTodo);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">MERN ToDo App</h1>
      <TodoForm onAdd={handleAdd} />
    </div>
  );
}

export default App;
