import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import { Alert } from 'react-bootstrap';
import 'react-multi-carousel/lib/styles.css';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';
import isLoadingSpinner from '../../../../common/Spinner/isLoadingSpinner';

const PopularMovieSlide = () => {
    const{data,isLoading,isError,error} = usePopularMoviesQuery();

    console.log(data);

    if (isLoading) {
      return <div>{isLoadingSpinner()}</div>
    }
    if(isError){
        return <Alert variant = "danger">{error.message}</Alert>
    }

  return (
    <div>
      <MovieSlider title="인기있는 영화" movies={data.results} responsive={responsive}/>
    </div>
  )
}

export default PopularMovieSlide;
