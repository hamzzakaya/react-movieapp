import React, { useState , useEffect } from 'react';
import './box.css';
import axios from "axios";

function Box({
  movieID,
}) {
  // Kartın açık veya kapalı olduğunu takip eden bir state tanımlanır.
  const [isCardOpen, setCardOpen] = useState(false);
  const [movieInfo, setMovieInfo] = useState([]);

  // Film bilgilerini API'den çekmek için useEffect kullanılır.
  useEffect(() => {
    fetchMovieByID();
  }, [movieID]);

  // Belirli bir movieID'ye sahip filmi çeken fonksiyon
  const fetchMovieByID = async () => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?i=${movieID}&apikey=5cb9f839`);
      // API'den gelen film bilgileri setMovieInfo ile state'e atanır.
      setMovieInfo(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // Kart açıldığında çalışan fonksiyon
  const openCard = () => {
    // Axios aracılığı ile film bilgilerini getirir ve movieInfo değişkenine atar.
    fetchMovieByID();
    // Kartı açık konumuna getir
    setCardOpen(true);
  };

  // Kartı kapatan fonksiyon
  const closeCard = () => {
    // Kartı kapalı konumuna getir
    setCardOpen(false);
  };

  return (
    <div className="box">
      {/* Kutucuğun resmi ve başlığı */}
      <img src={movieInfo.Poster} alt={movieInfo.Title} onClick={openCard} />
      {/* Film başlığını 25 karaktere kadar kırpılmış şekilde gösterir */}
      <span className="span1">{movieInfo && movieInfo.Title && movieInfo.Title.toString().substring(0, 25)}...</span>
      <span className="span2">{movieInfo.Year}</span>

      {/* Açılan kartın görünmesi durumunda içeriği */}
      {isCardOpen && (
        <div className="modal-overlay" onClick={closeCard}>
          {/* Modal içeriği */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Modal başlığı ve içeriği */}
            <h2>{movieInfo.Title}</h2>
            <img src={movieInfo.Poster} alt={movieInfo.Title} />
            <p>Year: {movieInfo.Year}</p>
            <p>IMDB Puan: {movieInfo.imdbRating}</p>
            <p>Type: {movieInfo.Type}</p>
            <p>Plot: {movieInfo.Plot}</p>
            <p>Genre: {movieInfo.Genre}</p>
            {/* Diğer değişken değerlerini burada ekleyebilirsiniz */}
            {/* Kapatma butonu */}
            <button onClick={closeCard}>Kapat</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Box;
