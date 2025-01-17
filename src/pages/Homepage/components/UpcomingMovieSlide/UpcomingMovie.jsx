import React from 'react'
import {useUpcomingMoviesQuery} from '../../../../hooks/useUpcomingMovies'
import { Alert } from 'react-bootstrap';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';
import isLoadingSpinner from '../../../../common/Spinner/isLoadingSpinner';

const UpcomingMovie = () => {
    const {data,isLoading,isError,error} = useUpcomingMoviesQuery();

    if (isLoading) {
      return <div>{isLoadingSpinner()}</div>
    }
    if(isError){
        return <Alert variant = "danger">{error.message}</Alert>
    }

  return (
    <div className='movieContainer'>
      <MovieSlider title="개봉 예정 영화" movies={data?.results} responsive={responsive}/>
    </div>
  )
}

export default UpcomingMovie
