import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import './style.css';

export const Signup = () => {
    const [name, setName] =useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password!== cpassword){
            alert('Passwords do not match');
            return;
        }
        try{
            axios.post('http://localhost:3333/signup', {
            name,
            email,
            password,
        })
        }catch(e){
            console.log(e);
        };
    }

    return (
        <div className='signup'>
            <h1>Sign Up</h1>
            <form className="form" method="post">
                <label>Username</label>
                <input type="text" onChange={(e)=>{setName(e.target.value)}} required/>
                <label>Email Id</label>
                <input type="text" onChange={(e)=>{setEmail(e.target.value)}} required/>
                <label>Enter Password</label>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} required/>
                <label>Confirm Password</label>
                <input type="password" onChange={(e)=>{setCPassword(e.target.value)}} required/>
                <button type="submit" onClick={handleSubmit}>Sign Up</button>
            </form>
            <label>Already have a account?</label>
            <Link to='/'>Login</Link>
        </div>
    );
};
