import React, { useState, useEffect } from 'react'
import './styles.css'
import logoImage from '../../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { FiPower, FiEdit, FiTrash2 } from 'react-icons/fi'
import api from '../../services/api'

export default function Books(){


    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(0);


    const userName = localStorage.getItem('userName');

    const accessToken = localStorage.getItem('accessToken');

    const authorization = {
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    }

    const navigate = useNavigate();


    useEffect(() => {
        fetchMoreBooks();
    }, [accessToken]);

    async function fetchMoreBooks(){
        const response = await api.get(`api/Book/v1/asc/4/${page}`, authorization);
            setBooks([...books, ...response.data.list])
            setPage(page + 1);
        
    }

    async function logout(){
        try {
            await api.get("api/auth/v1/revoke", {
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            });
           
            localStorage.clear();
            navigate('/');
        } catch (error) {
            alert("Logout Falhou");
        }
    }

    
    async function editBook(id){
        try {
           navigate(`/book/new/${id}`)
        } catch (error) {
            alert("Houve um erro ao editar o livro, tente novamente mais tarde!");
        }
    }

    async function deleteBook(id){
        try {
            await api.delete(`api/Book/v1/${id}`, authorization);
            setBooks(books.filter(book => book.id !== id))
        } catch (error) {
            alert("Houve um erro ao deletar o livro, tente novamente mais tarde!");
        }
    }

    return (
        <div className="book-container">
            <header>
                <img src={logoImage} alt="Erudio"/>
                <span>Welcome, <strong>{userName.toUpperCase()}</strong>!</span>
                <Link className="button" to="/book/new/0">Add new Book</Link>
                <button onClick={logout} type="button">
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
                        <FiEdit onClick={() => editBook(book.id)} size={20} color="#251FC5" />
                    </button>
                    <button onClick={() => deleteBook(book.id)} type="button">
                        <FiTrash2 size={20} color="#251FC5" />
                    </button>
                </li>
               ))}
            </ul>
            <button className="button" onClick={fetchMoreBooks} type="button">Loading More</button>
        </div>
    );
}