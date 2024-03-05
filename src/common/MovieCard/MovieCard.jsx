import React from 'react'
import {Badge} from 'react-bootstrap';
import "./MovieCard.style.css";
const MovieCard = ({movie}) => {

    const posterPath = movie?.poster_path;
    const imageUrl = `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${posterPath}`;
  
  
    return (
    <div style={{background:`url(${imageUrl})`}} className='movie-card'>
      <div className='overlay'>
        <h3>{movie.title}</h3>
        {movie.genre_ids.map((id)=>(
          <Badge className="badge" bg="danger">{id}</Badge>
        ))}
        <div className='movie-detail-Info'>
          <div>영화 평점 : {movie?.vote_average}</div>
          <div>누적관객 수 : {movie?.popularity}</div>
          <div>연령제한 : {movie?.adult?'over 18':'under 18'}</div>
        </div>
      </div>
    </div>
    
  )
}

export default MovieCard
