import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  //const API_KEY = `G6fs86E4KKJiHOYdpufqJsJPljuYIbvO&q`;
  const API_KEY = process.env.REACT_APP_GIPHY_KEY;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}=${query}&limit=10&offset=0&rating=G&lang=en`);
        let json = await res.json();
        setResults(
          json.data.map(el => {
            return el.images.preview.mp4
          })
        );
      }
      catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false);
        setSearch("");
      }
    }
    if (query !== '') {
      fetchData();
    }
  }, [query]);

  function clearAll() {
    setResults([]);
  }

  return (
    <div className="App">
      <h5>Giphy</h5>
      <form onSubmit={e => {
        e.preventDefault();
        setQuery(search);
      }
      }>
        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="enter keyword" />
        <button type="submit">Search</button>
      </form>
      <button onClick={() => clearAll()}>Clear</button>

      {loading ?
        <div>Giphs loading</div> :
        <div>
          {results.map(el => (
            <video key={el} src={el} loop autoPlay />
          )
          )}
        </div>
      }

    </div >
  )

}

