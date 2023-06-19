import React from 'react';
import './style.css';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

export const Login = () => {
    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios.post('http://localhost:3333/login', {
                email: email,
                password: password
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='login'>
            <h1>Login</h1>
            <form className="form" method="post">
                <label>Email Id</label>
                <input type="text" onChange={(e)=>{setEmail(e.target.value)}} required/>
                <label>Enter Password</label>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} required/>
                <button type="submit" onClick={handleSubmit}>Login</button>
            </form>
            <label>Create new account?</label>
            <Link to='/signup'>Sign Up</Link>
        </div>
    );
};

