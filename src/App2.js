import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

export default function App() {
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [gid, setGid] = useState([]);

    // function onSubmit(e) {
    //   e.preventDefault();
    //   setQuery(search)
    // }
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=G6fs86E4KKJiHOYdpufqJsJPljuYIbvO&q=${query}&limit=10&offset=0&rating=G&lang=en`);
                const json = await res.json();
                setResults(
                    json.data.map(el => {
                        return el.images.preview.mp4
                    })
                );
                setGid(
                    json.data.map(el => {
                        return el.id
                    })
                );
                console.log(json);
            } catch (error) {
                console.log(error)
            }
        }
        if (query !== '') {
            fetchData();
        }
    }, [query]);



    return (
        <div className="App">
            <form onSubmit={e => {
                //debugger;
                e.preventDefault();
                setQuery(search);
            }}>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for Gifs"
                />
                <button type="submit">GO</button>
            </form>

            <div>
                {results.map(item => (
                    <video src={item} key={item} autoPlay loop />
                )
                )}
            </div>
        </div>
    );

}

