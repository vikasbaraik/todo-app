import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, form);
            localStorage.setItem('token', res.data.token);
            navigate("/todos");
        } catch (err) {
            alert('Login failed: ' + err.response.data.msg);
            setError("Login failed. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="text" name="email" placeholder="Email" className="form-control" value={form.email} onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" placeholder="Password" className="form-control" value={form.password} onChange={handleChange} required/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/signup")}>Signup</button>
            </form>
        </div>
    );
}

export default Login;