import React, { useState , useEffect } from 'react';
import './box.css';
import axios from "axios";


function Box({
  title,
  year,
  poster,
  movieID,
}) {

  // Kartın açık veya kapalı olduğunu takip eden bir state tanımlanır.
  const [isCardOpen, setCardOpen] = useState(false);
  const [movieInfo, setMovieInfo] = useState([]);

  /*useEffect(() => {
    fetchMovieByID();
  }, []);*/

  const fetchMovieByID = async () => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?i=${movieID}&apikey=5cb9f839`);
      console.log(response);
      setMovieInfo(response.data);
      //console.log(movieInfo.Plot);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };


  // Kart açıldığında çalışan fonksiyon
  const openCard = () => {
    // Kartı açma işlemlerini buraya ekleyebilirsiniz
        
    //Axios aracılığı ile film bilgilerini getir.
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
    <div className="box" onClick={openCard}>
      {/* Kutucuğun resmi ve başlığı */}
      <img src={poster} alt={title} />
      <span className="span1">{title.substring(0, 25)}...</span>
      <span className="span2">{year}</span>

      {/* Açılan kartın görünmesi durumunda içeriği */}
      {isCardOpen && (
        <div className="modal-overlay" onClick={closeCard}>
          {/* Modal içeriği */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Modal başlığı ve içeriği */}
            <h2>{title}</h2>
            <img src={poster} alt={title} />
            <p>Year: {movieInfo.Year}</p>
            <p>IMDB Puanı: {movieInfo.imdbRating}</p>
            <p>Type: {movieInfo.Type}</p>
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
