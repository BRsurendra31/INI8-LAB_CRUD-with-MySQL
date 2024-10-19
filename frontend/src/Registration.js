import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const Registration = () => {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', dateOfBirth: '', phoneNumber: '' });
    const [updateId, setUpdateId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:3000/register');
        setUsers(response.data);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (updateId) {
                await axios.put(`http://localhost:3000/register/${updateId}`, form);
            } else {
                await axios.post('http://localhost:3000/register', form);
            }
            setForm({ name: '', email: '', dateOfBirth: '', phoneNumber: '' });
            setUpdateId(null);
            fetchUsers();
        } catch (error) {
            if (error.response) {
                // Display error message from the backend
                alert(error.response.data.error);
            } else {
                // Handle any other errors
                alert('An error occurred. Please try again.');
            }
        }
    };
    

    const handleEdit = (user) => {
        setForm(user);
        setUpdateId(user.ID);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3000/register/${id}`);
        fetchUsers();
    };

    return (
        <div className="container">
            <h1>Registration</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="date"
                    name="dateOfBirth"
                    value={form.dateOfBirth}
                    onChange={handleChange}
                    placeholder="Date of Birth"
                    required
                />
                <input
                    type="tel"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                />
                <button type="submit">{updateId ? 'Update User' : 'Register'}</button>
            </form>

            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.ID}>
                        {user.Name} - {user.Email} 
                        <button onClick={() => handleEdit(user)}>Edit</button>
                        <button onClick={() => handleDelete(user.ID)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Registration;
