import React, { useState, useEffect } from 'react';
import styles from "./styles.module.css";

const Main = () => {
    const [user, setUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchMovies();
    };

    const fetchMovies = async () => {
        const URL = `https://www.omdbapi.com?s=${searchTerm}&apikey=80eb5c7d`;
        const response = await fetch(URL);
        const responsejson = await response.json();
        setData(responsejson.Search || []);
    };

    return (
        <div>
            <nav className={styles.navbar}>
                <h1>Movie and TV Series Tracker</h1>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Logout
                </button>
            </nav>
        
            <div className={styles.main_container}>
                <div className={styles.sectionTitle}>Movies</div>
                <div className={styles.horizontalScroll}>
                    {user && user.watchlist
                        .filter(item => item.type === 'movie')
                        .map((item, index) => (
                            <div key={index} className={styles.watchlistItem}>
                                <p>{item.name}</p>
                                <img src={`https://img.omdbapi.com/?i=${item.imdbID}`} alt={item.name} className={styles.poster} />
                            </div>
                        ))}
                </div>

                <div className={styles.sectionTitle}>Shows</div>
                <div className={styles.horizontalScroll}>
                    {user && user.watchlist
                        .filter(item => item.type === 'show')
                        .map((item, index) => (
                            <div key={index} className={styles.watchlistItem}>
                                <p>{item.name}</p>
                                <img src={`https://img.omdbapi.com/?i=${item.imdbID}`} alt={item.name} className={styles.poster} />
                            </div>
                        ))}
                </div>

                <div className={styles.sectionTitle}>Browse</div>
                <form onSubmit={handleSearchSubmit}>
                    <input 
                        type="text" 
                        placeholder="Search here!" 
                        value={searchTerm} 
                        onChange={handleSearchChange} 
                        className={styles.searchInput} 
                    />
                    <button type="submit" className={styles.searchButton}>Search</button>
                </form>
                
                <div className={styles.searchResults}>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <div key={index} className={styles.resultItem}>
                                <p>{item.Title}</p>
                                <button 
                                    className={styles.addButton}>
                                    +
                                </button>
                                <img 
                                    src={item.Poster} 
                                    alt={item.Title} 
                                    className={styles.poster} 
                                />
                            </div>
                        ))
                    ) : (
                        <p></p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Main;
