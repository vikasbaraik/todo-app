import React, {useState, useEffect, useCallback} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TodoPage() {
    const [todos, setTodos] = useState([]);
    const [form, setForm] = useState({ title: '', dueDate: '', priority: 'medium' });
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [editForm, setEditForm] = useState({ title: '', dueDate: '', priority: 'medium' });
    
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
    const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });

    const fetchTodos = useCallback(async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/todos`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setTodos(res.data);
        } catch (err) {
            console.error("Failed to fetch todos:", err);
            if (err.response && err.response.status === 401) {
                navigate("/login");
            }
        }
    }, [navigate]);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (!form.title.trim()) return;

        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/todos`, form ,{
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setForm({ title: '', dueDate: '', priority: 'medium' });
            fetchTodos();
        } catch (err) {
            console.error("Failed to add todo:", err);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/todos/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            fetchTodos();
        } catch (err) {
            console.error("Failed to delete todo:", err);
        }
    };

    const handleToggleComplete = async (todo) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_BASE_URL}/todos/${todo._id}`, {
                ...todo,
                completed: !todo.completed
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            fetchTodos();
        } catch (err) {
            console.error("Failed to toggle completion:", err);
        }
    };

    const handleEditClick = (todo) => {
        setEditingTodoId(todo._id);
        setEditForm({
            title: todo.title,
            dueDate: todo.dueDate ? todo.dueDate.substring(0, 10) : '',
            priority: todo.priority
        });
    };

    const handleUpdateTodo = async (e, id) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.REACT_APP_API_BASE_URL}/todos/${id}`, {
                ...editForm
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setEditingTodoId(null);
            fetchTodos();
        } catch (err) {
            console.error("Failed to update todo:", err);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    };

    return (
        <div className="container mt-5">
            <h2>Todo List</h2>
            <button onClick={logout} className="btn btn-danger mb-3">Logout</button>
            <div className="alert alert-info">
                <strong>Note:</strong> This is a simple Todo app. You can add and delete todos.
            </div>
            <h3>Add Todo</h3>
            <form onSubmit={handleAddTodo} className="mb-3">
                <div className="input-group">
                    <input type="text" name="title" placeholder="Title" className="form-control" value={form.title} onChange={handleChange} required />
                    <input type="date" name="dueDate" className="form-control" value={form.dueDate} onChange={handleChange} />
                    <select name="priority" className="form-select" value={form.priority} onChange={handleChange} >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <button className="btn btn-primary" type="submit">Add</button>
                </div>
            </form>
            <ul className="list-group">
                {todos.map(todo => (
                    <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-start flex-column flex-md-row">
                        {editingTodoId === todo._id ? (
                            <form onSubmit={(e) => handleUpdateTodo(e, todo._id)} className="w-100">
                                <div className="d-flex flex-column flex-md-row align-items-start gap-2">
                                    <input type="text" name="title" className="form-control" value={editForm.title} onChange={handleEditChange} required />
                                    <input type="date" name="dueDate" className="form-control" value={editForm.dueDate} onChange={handleEditChange} />
                                    <select name="priority" className="form-select" value={editForm.priority} onChange={handleEditChange} >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                    <button className="btn btn-success" type="submit">Save</button>
                                    <button className="btn btn-secondary" type="button" onClick={() => setEditingTodoId(null)}>Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <div className="d-flex flex-column flex-md-row align-items-start justify-content-between w-100">
                                <div>
                                    <input type="checkbox" checked={todo.completed} onChange={() => handleToggleComplete(todo)} className="form-check-input me-2" />
                                    <strong>{todo.title}</strong> <br />
                                    Priority: {todo.priority} | Due: {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : 'No Due Date'} | {todo.completed ? '✅ Completed' : '❌ Incomplete'}
                                </div>
                                <div className="mt-2 mt-md-0">
                                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditClick(todo)}>Edit</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoPage;