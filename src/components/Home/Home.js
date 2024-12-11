import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Know Your API</h1>
            <div className="button-row">
                <Link to="/search/page1">
                    <button className="btn-navigate">Search Through Link</button>
                </Link>
                <Link to="/search/page2">
                    <button className="btn-navigate">Search Through text</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
