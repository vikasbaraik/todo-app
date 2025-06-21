import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">MERN ToDo App</h1>
      <TodoForm onAdd={() => window.location.reload()} />
      <TodoList />
    </div>
  );
}

export default App;
