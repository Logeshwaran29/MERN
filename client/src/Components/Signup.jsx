import React from 'react';
import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom'
import axios from 'axios';
import './style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Signup = () => {
    const [name, setName] =useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const link=useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password!== cpassword){
            toast('Passwords do not match',{style:{background:"red",color:"white"}});
            return;
        }
        try{
            axios.post('http://localhost:3333/signup', {
            name,
            email,
            password,
        })
        .then(res=>{
            if(res.data==='ok'){
                link('/home');
            }else if(res.data==='fail'){
                toast('Already existed',{style:{background:"red",color:"white"}});
            }
        }

        ).catch(e=>{
            console.log(e);
        });

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
            <ToastContainer/>
            <Link to='/'>Login</Link>
        </div>
    );
};
