import React from 'react';
import './style.css';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

export const Login = () => {
    const [name, setName] =useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/login', {
            name: name,
            password: password
        })
    }
    return (
        <div className='login'>
            <h1>Login</h1>
            <form className="form" method="post">
                <label>Username or Email Id</label>
                <input type="text" onChange={(e)=>{setName(e.target.value)}} required/>
                <label>Enter Password</label>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} required/>
                <button type="submit" onClick={handleSubmit}>Login</button>
            </form>
            <label>Create new account?</label>
            <Link to='/signup'>Sign Up</Link>
        </div>
    );
};

