import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import { Alert } from 'react-bootstrap';
import 'react-multi-carousel/lib/styles.css';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';
import isLoadingSpinner from '../../../../common/Spinner/isLoadingSpinner';
import '../PopularMovieSlide/PopularMovieSlide.style.css';

const PopularMovieSlide = () => {
    const{data,isLoading,isError,error} = usePopularMoviesQuery();


    if (isLoading) {
      return <div>{isLoadingSpinner()}</div>
    }
    if(isError){
        return <Alert variant = "danger">{error.message}</Alert>
    }

  return (
    <div className='movieContainer'>
      <MovieSlider title="인기있는 영화" movies={data.results} responsive={responsive}/>
    </div>
  )
}

export default PopularMovieSlide;
