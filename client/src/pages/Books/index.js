import React from 'react'
import './styles.css'
import logoImage from '../../assets/logo.svg'
import { Link } from 'react-router-dom';
import { FiPower, FiEdit, FiTrash2 } from 'react-icons/fi'

export default function Books(){
    return (
        <div className="book-container">
            <header>
                <img src={logoImage} alt="Erudio"/>
                <span>Welcome, <strong>Angélica</strong>!</span>
                <Link className="button" to="book/new">Add new Book</Link>
                <button type="button">
                    <FiPower size={18} color="#251FC5" />
                </button>
            </header>
            <h1>Registered Books</h1>
            <ul>
                <li>
                    <strong>Title:</strong>
                    <p>Docker</p>
                    <strong>Author:</strong>
                    <p>Angélica</p>
                    <strong>Price:</strong>
                    <p>R$ 0</p>
                    <strong>Release:</strong>
                    <p>29/03/2021</p>

                    <button type="button">
                        <FiEdit size={20} color="#251FC5" />
                    </button>
                    <button type="button">
                        <FiTrash2 size={20} color="#251FC5" />
                    </button>
                </li>
                <li>
                    <strong>Title:</strong>
                    <p>Docker</p>
                    <strong>Author:</strong>
                    <p>Angélica</p>
                    <strong>Price:</strong>
                    <p>R$ 0</p>
                    <strong>Release:</strong>
                    <p>29/03/2021</p>

                    <button type="button">
                        <FiEdit size={20} color="#251FC5" />
                    </button>
                    <button type="button">
                        <FiTrash2 size={20} color="#251FC5" />
                    </button>
                </li>
            </ul>
        </div>
    );
}