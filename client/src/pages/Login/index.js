import React, { useState } from 'react';
import './styles.css';
import logoImage from '../../assets/logo.svg'
import padlock from '../../assets/padlock.png'
import api from '../../services/api'
import { useHistory } from 'react-router-dom';


export default function Login(){

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function login(e){
        e.preventDefault();

        const data = {
            userName,
            password
        };

        try {

            const response = await api.post('api/auth/v1/signin', data);

            localStorage.setItem('userName', userName);
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);

            history.push('/books');
        } catch (error) {
            alert('Erro ao logar, tente novamente!');
        }
    }


    return (
      
        <div className="login-container">
            <section className="form">
                <img src={logoImage} alt="Erudio Logo"/>
                <form onSubmit={login}>
                    <h1>Access your Account</h1>

                    <input 
                        placeholder="UserName"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                    />

                    <input 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button className="button" type="submit">Login</button>
                </form>
            </section>
            <img src={padlock} alt="Login"/>
        </div>
       
    )
}