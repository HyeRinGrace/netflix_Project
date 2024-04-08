//가장 큰 배너 이미지 출력

import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import Alert from 'react-bootstrap/Alert';
import './Banner.style.css';
import isLoadingSpinner from '../../../../common/Spinner/isLoadingSpinner';

const Banner = () => {
    let { data, isLoading, isError, error } = usePopularMoviesQuery();
    const randomNumber = Math.floor(Math.random() * 3);

    if (isLoading) {
      return <div>{isLoadingSpinner()}</div>
    }
    if (isError) {
      return <Alert variant="danger">{error.message}</Alert>; // JSX를 반환해야 합니다.
    }

    // data.results[0]가 정의되어 있는지 확인
    const backdropPath = data?.results[randomNumber].backdrop_path;
    const imageUrl = `https://image.tmdb.org/t/p/original${backdropPath}`

    return (
      <>
        <div style={{ backgroundImage: `url(${imageUrl})`}} className='banner'>
            <div className="text-white banner-text-area">
              <h1 className="banner-title">{data?.results[randomNumber].title}</h1>
              <p className="banner-overview">{data?.results[randomNumber].overview}</p>
            </div>
        </div>
      </>
    );
}

export default Banner;
