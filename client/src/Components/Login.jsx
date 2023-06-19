import React from 'react';
import './style.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export const Login = () => {
    const link = useNavigate();
    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios.post('http://localhost:3333/login', {
                email: email,
                password: password
            })
            .then(res=>{
                if(res.data==="ok"){
                    link("/home");
                }else if(res.data==='fail'){
                    toast("Enter correct details",{style:{background:"red",color:"white"}});
                }
            })
            .catch((e)=>{
                console.log(e);
            });

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
            <ToastContainer/>
            <Link to='/signup'>Sign Up</Link>
        </div>
    );
};

