import React from 'react'
import { Alert } from 'react-bootstrap';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';
import {useTopRatedMovieQuery} from '../../../../hooks/useTopRatedMovies'
import isLoadingSpinner from '../../../../common/Spinner/isLoadingSpinner';

const TopRatedMovie = () => {
    let {data,isError,isLoading,error} = useTopRatedMovieQuery();
    
    if (isLoading) {
      return <div>{isLoadingSpinner()}</div>
    }
    if(isError){
        return <Alert variant = "danger">{error.message}</Alert>
    }
  return (
    <div>
      <MovieSlider title="높은 순위 영화" movies={data?.results} responsive={responsive}/>
    </div>
  )
}

export default TopRatedMovie
