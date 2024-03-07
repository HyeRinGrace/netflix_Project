import React from 'react';
import { useParams } from 'react-router-dom';
import { useMovieDetails } from '../../hooks/useMovieDetails';
import Alert from 'react-bootstrap/Alert';
import { Row, Col, Container } from 'react-bootstrap';
import '../MovieDetail/MovieDetailPage.style.css';
import {Badge} from 'react-bootstrap';
import MovieTab from './MovieTabs/MovieTab';
import MovieRecommendation from './MovieRecommendation/MovieRecommendation';

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
      <h1 style={{ color: 'white' }}>영화 정보</h1>
      <div className='InfoContainer'>
      <Row>
          <Col sm={7} className='MovieDetailInfoImage' style={{ backgroundImage: `url(${URL})` }}>
          </Col>
          <Col sm={5} className='MovieInfo'>
            <p className='MovieInfoContainer'>
            <h1>{data?.title}</h1>
            <p>{data?.overview}</p>
            <p>{data.genres.map((item,index)=>(
              <Badge className="badge" bg="danger" key={index}>{item?.name}</Badge>
            ))}
            </p>

            <p className='MovieDetailInfo'>
              <p> 연령제한 : {data?.adult?'over 18':'under 18'}</p>
              <p> 개봉일자 : {data?.release_date}</p>
              <p> 상영시간 : {data?.runtime}분</p>
              <p> 평점 : {data?.vote_average} 점</p>
            </p>
            </p>
          </Col>
      </Row>
      </div>
      <Row>
        <Col><MovieTab/></Col>
      </Row>
      <Row>
        <Col><MovieRecommendation/></Col>
      </Row>
    </Container>
  );
};

export default MovieDetail;