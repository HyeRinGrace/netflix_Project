import React from 'react'
import { useTvDetails } from '../../hooks/useTvDetails';
import { useParams } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert';
import isLoadingSpinner from '../../common/Spinner/isLoadingSpinner';
import { Row, Col, Container, Badge } from 'react-bootstrap';
import TVseason from '../Homepage/TVs/TVseason/TVseason';

const TvDetailPage = () => {
    const params = useParams();
    
    const { data, isLoading, isError, error } = useTvDetails(params);

    console.log(data);

    const posterPath = data?.poster_path;
    const backPoster = data?.backdrop_path;
    
    const poster_URL = `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${posterPath}`;
    const backPoster_URL = `https://image.tmdb.org/t/p/original${backPoster}`;

    if (isLoading) {
        return <div>{isLoadingSpinner()}</div>
      }
      if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
      }

  return (
    <>
    <div className='MainPoster' style={{backgroundImage:`url(${backPoster_URL})`}}>
      <Container className='Container'>
        <div className='InfoContainer'>
          <Row>
            <Col sm={4} className='MovieInfo'>
              <div className='MovieDetailInfoImage' style={{ backgroundImage: `url(${poster_URL})` }}></div>
            </Col>
            <Col sm={8} className='MovieInfoContainer'>
              <h1>{data?.name}</h1>
              <p>{data?.overview}</p>
              <p className='OverviewContainer'></p>
              <p>
                {data?.genres.map((item, index) => (
                  <Badge className="badge" bg="danger" key={index}>{item?.name}</Badge>
                ))}
              </p>
                <p> 연령제한 : {data?.adult ? 'over 18' : 'under 18'}</p>
                <p> 첫 상영일자 : {data?.first_air_date}</p>
                <p> 최근 방영일자 : {data?.last_air_date}</p>
                <p> 평점 : {data?.vote_average}점</p>
            </Col>
          </Row>
        </div>
      </Container>
      </div>
      
      <Container>
      <Row>
        <Col><TVseason/></Col>
      </Row>
      </Container>
      </>
  )
}

export default TvDetailPage