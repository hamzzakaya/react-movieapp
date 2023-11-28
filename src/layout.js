import "./layout.css";
import Box from "./box";
import { useEffect, useState } from "react";
import axios from "axios";

function Layout() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get("https://www.omdbapi.com/?s=rings&apikey=5cb9f839")
      .then((res) => {
        setMovies(res.data.Search);
      });
  }, []);

 

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${search}&apikey=5cb9f839`);
      console.log(response);
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="layout">
      <div className="container-header">
        <header>Trending Movies</header>
        <div className="search-bar">
          <input style={{ padding: '8px', borderRadius:'10px'}} type="text" value={search} onChange={handleSearchChange} placeholder="Search movies..." />
          <button style={{ padding: '8px', borderRadius:'10px'}} onClick={fetchMovies}>Search</button>
        </div>
      </div>

      <div className="movie-container">
        {movies.map((movie) => (
          <Box title={movie.Title} year={movie.Year} poster={movie.Poster} />
        ))}
      </div>
    </div>
  );
}

export default Layout;



