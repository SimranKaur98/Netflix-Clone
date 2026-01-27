import React, {useRef, useEffect, useState} from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data.js'
import { Link } from 'react-router-dom';


const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2Y4Zjk4YWNiNzUzZTg2YWE0YTg2NDViYTg3MDRmNSIsIm5iZiI6MTc2NTUyNDQwMC4yMTIsInN1YiI6IjY5M2JjM2IwZDY3MWZjMWMyM2FjOWNlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.85V1w9lS4L3JYX9S0uRUbEEqtBlH1n7Kl4J3D8O8U4w'
    }
  };
  

  const handleWheel = (e)=>{
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY;
  }
  
  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel',handleWheel);
  },[category]);

  return (
    <div className='title_cards'>

      <h2>{title?title:"Popular on Netflix"}</h2>

      <div className="card_list" ref={cardsRef}>
        {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt={card.original_title} />
            <p>{card.original_title}</p>
          </Link>
    })}
      </div>
    </div>
  )
}

export default TitleCards
