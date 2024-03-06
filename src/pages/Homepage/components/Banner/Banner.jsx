//가장 큰 배너 이미지 출력

import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import Alert from 'react-bootstrap/Alert';
import './Banner.style.css';
import {Container} from 'react-bootstrap'

const Banner = () => {
    let { data, isLoading, isError, error } = usePopularMoviesQuery();
    if (isLoading) {
      return <h1>Loading...</h1>
    }
    if (isError) {
      return <Alert variant="danger">{error.message}</Alert>; // JSX를 반환해야 합니다.
    }

    // data.results[0]가 정의되어 있는지 확인
    const posterPath = data?.results[0].poster_path;
    const imageUrl = `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/${posterPath}`

    return (
      <>
        <div style={{ backgroundImage: `url(${imageUrl})`}} className='banner'>
            <div className="text-white banner-text-area">
              <h1 className="banner-title">{data?.results[0].title}</h1>
              <p className="banner-overview">{data?.results[0].overview}</p>
            </div>
        </div>
      </>
    );
}

export default Banner;
