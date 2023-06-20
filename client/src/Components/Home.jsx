import React from 'react';
import axios from 'axios';

export const Home = () => {

    const create=(e)=>{
        console.log('create');
        e.preventDefault();
        try {
            axios.post('http://localhost:3333/login')
            .then()
            .catch();
        } catch (error) {
            
        }
    }

    return (
        <div className='home'>
            <h1>Home</h1>
            <button type="button" onClick={create}>create</button>
        </div>
    );
};
