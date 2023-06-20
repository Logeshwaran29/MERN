import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export const Home = () => {
    const location =  useLocation();
    const [data, setData] = useState([]);
    const [set,setSet]=useState(false);

    const create=(e)=>{
        e.preventDefault();
        const email= location.state.id;
        try {
            axios.post('http://localhost:3333/data',{email: email})
            .then(res=>{
                console.log(res.data);
                setData(res.data);
                setSet(true);
            })
            .catch(e=>{
                console.log(e);
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='home'>
            <h1>Welcome</h1>
            <button type="button" onClick={create}>Show</button>
            <div className={set?'show':'stop'}>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.email}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={e=>{setSet(false)}}>close</button>
            </div>
        </div>
    );
};
