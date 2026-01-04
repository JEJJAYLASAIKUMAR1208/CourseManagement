import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const submit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/api/auth/register", form);
            alert("Registered successfully");
            setForm({
                name: "",
                email: "", password: ""
            });
            navigate("/login");
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    return (
        <form className="card" onSubmit={submit}>
            <h3>Register</h3>

            <input
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
            />

            <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
            />

            <button type="submit">Register</button>
        </form>
    );
}
