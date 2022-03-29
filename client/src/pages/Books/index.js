import React, { useState, useEffect } from 'react'
import './styles.css'
import logoImage from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiEdit, FiTrash2 } from 'react-icons/fi'
import api from '../../services/api'

export default function Books(){


    const [books, setBooks] = useState([]);

    const userName = localStorage.getItem('userName');

    const accessToken = localStorage.getItem('accessToken');
    const history = useHistory();


    useEffect(() => {
        api.get('api/Book/v1/asc/5/1', {
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            setBooks(response.data.list)
        })
    }, [accessToken]);



    return (
        <div className="book-container">
            <header>
                <img src={logoImage} alt="Erudio"/>
                <span>Welcome, <strong>{userName.toUpperCase()}</strong>!</span>
                <Link className="button" to="book/new">Add new Book</Link>
                <button type="button">
                    <FiPower size={18} color="#251FC5" />
                </button>
            </header>
            <h1>Registered Books</h1>
            <ul>
                {books.map(book => (
                <li key={book.id}>
                    <strong>Title:</strong>
                    <p>{book.title}</p>
                    <strong>Author:</strong>
                    <p>{book.author}</p>
                    <strong>Price:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(book.price)}</p>
                    <strong>Release:</strong>
                    <p>{Intl.DateTimeFormat('pt-BR').format(new Date(book.launchDate))}</p>

                    <button type="button">
                        <FiEdit size={20} color="#251FC5" />
                    </button>
                    <button type="button">
                        <FiTrash2 size={20} color="#251FC5" />
                    </button>
                </li>
               ))}
            </ul>
        </div>
    );
}