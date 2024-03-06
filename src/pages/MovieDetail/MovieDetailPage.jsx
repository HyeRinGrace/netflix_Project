import React from 'react';
import { useParams } from 'react-router-dom';
import { useMovieDetails } from '../../hooks/useMovieDetails';
import Alert from 'react-bootstrap/Alert';
import { Row, Col, Container } from 'react-bootstrap';
import '../MovieDetail/MovieDetailPage.style.css';
import MovieVideo from './MovieVideo/MovieVideo';
import MovieReviews from './MovieReviews/MovieReviews';

const MovieDetail = () => {
  let params = useParams();
  const { data, isLoading, isError, error } = useMovieDetails(params);

  const posterPath = data?.poster_path;
  const URL = `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${posterPath}`;

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <Container className='Container'>
      <h1>영화 정보</h1>
      <div className='InfoContainer'>
      <Row>
          <Col sm={7} className='MovieDetailInfoImage' style={{ backgroundImage: `url(${URL})` }}>
          </Col>
          <Col sm={5} className='MovieInfo'>
            <h1>{data.title}</h1>
            <p>{data.overview}</p>
            <p>개봉일 : {data.release_date}</p>
          </Col>
      </Row>
      </div>
      <Row>
        <Col><MovieReviews/></Col>

      </Row>

      <Row>
        <Col>
          <h2>비디오</h2>
          <MovieVideo />
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetail;