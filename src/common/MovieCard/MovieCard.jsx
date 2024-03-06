import React from 'react'
import {Badge} from 'react-bootstrap';
import "./MovieCard.style.css";
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
const MovieCard = ({movie}) => {

    const posterPath = movie?.poster_path;
    const imageUrl = `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${posterPath}`;

    const {data:genreData} = useMovieGenreQuery();
    
    const showGenre = (genreIdList) =>{
      if(!genreData){
        return []
      }
      const genreNameList = genreIdList.map((id)=>{
        const genreObj = genreData.find((genre)=>genre.id === id)
        return genreObj.name;
      })

      return genreNameList;
    }
  
  
    return (
    <div style={{background:`url(${imageUrl})`}} className='movie-card'>
      <div className='overlay'>
        <h4>{movie.title}</h4>
        {showGenre(movie.genre_ids).map((genre,index)=>(
          <Badge className="badge" bg="danger" key={index}>{genre}</Badge>
        ))}
        <div className='movie-detail-Info'>
          <div>영화 평점 : {movie?.vote_average}점</div>
          <div>누적관객 수 : {movie?.popularity}명</div>
          <div>연령제한 : {movie?.adult?'over 18':'under 18'}</div>
        </div>
      </div>
    </div>
    
  )
}

export default MovieCard
