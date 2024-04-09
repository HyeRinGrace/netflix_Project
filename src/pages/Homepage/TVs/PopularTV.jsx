import React, { useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { usePopularTV } from '../../../hooks/usePopularTV';
import './PopularTV.css';
import isLoadingSpinner from '../../../common/Spinner/isLoadingSpinner';
import { useNavigate } from 'react-router-dom';

const PopularTV = () => {
  const { data, isLoading, isError, error } = usePopularTV();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>{isLoadingSpinner()}</div>
  }
  if(isError){
      return <Alert variant = "danger">{error.message}</Alert>
  }

  // 여기서 클릭된 id를 useQuery 한테 전달하면 됨
  const handlerTV = (id) => {
    navigate(`/tvs/${id}`);
    window.scrollTo(0,0); //최상단으로 이동되는 경로 추가
  }

  return (
    <Container>
      <h3 className="section-title">해외 인기있는 TV 프로그램</h3>
      <Row>
        {data.results.map((item, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <div className="tv-card">
              <div className="tv-image-wrapper">
                <img
                  className="tv-poster"
                  src={`https://image.tmdb.org/t/p/w220_and_h330_bestv2${item.poster_path}`}
                  alt={item.name}
                />
                <div className="tv-card-overlay" onClick={() => handlerTV(item?.id)}>
                  <h4 className="tv-title">{item?.name}</h4>
                  <div className="tv-info">
                    <div>평점: {item?.vote_average}</div>
                    <div>누적관객 수: {item?.popularity}</div>
                    <div>연령제한: {item?.adult?'over 18':'under 18'}</div>
                  </div>
                  
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PopularTV;
