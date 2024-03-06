import React from 'react'
import { useMovieReviews } from '../../../hooks/useMovieReviews'
import {useParams} from 'react-router-dom'

const MovieReviews = () => {
    let params = useParams();
    const{data} = useMovieReviews(params);

    console.log(data);
  return (
    <div>

    </div>
  )
}

export default MovieReviews
