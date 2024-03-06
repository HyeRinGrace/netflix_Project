import React from 'react'
import { Alert } from 'react-bootstrap';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';
import {useTopRatedMovieQuery} from '../../../../hooks/useTopRatedMovies'

const TopRatedMovie = () => {
    let {data,isError,isLoading,error} = useTopRatedMovieQuery();
    
    if(isLoading){
        return <h1>Loading...</h1>
    }
    if(isError){
        return <Alert variant = "danger">{error.message}</Alert>
    }
  return (
    <div>
      <MovieSlider title="Top Rated Movies" movies={data?.results} responsive={responsive}/>
    </div>
  )
}

export default TopRatedMovie
