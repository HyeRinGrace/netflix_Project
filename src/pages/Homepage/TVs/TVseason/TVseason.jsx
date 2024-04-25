import React from 'react'
import { useParams } from 'react-router-dom';
import isLoadingSpinner from '../../../../common/Spinner/isLoadingSpinner';
import Alert from 'react-bootstrap/Alert';
import {Container,Row} from 'react-bootstrap';
import { useTvVideo } from '../../../../hooks/useTvVideo';

const TVseason = () => {
    const params = useParams();
    
    const {data, isLoading, isError, error} = useTvVideo(params);
    let YOUTUBE_KEY = data?.results[0]?.key; //유튜브 키가 0아니면 1로 고정되어있어서 0으로 일단 하드코딩
    const URL = `https://www.youtube.com/embed/${YOUTUBE_KEY}`


    if (isLoading) {
        return <div>{isLoadingSpinner()}</div>
      }
      if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
      }
    
      if (!URL) {
        return <h1>No video available</h1>;
      }

  return (
    <Container>
      <Row>
      <h4 style={{ color: 'white', padding:'50px' }}>영상 정보</h4>
      <iframe id="ytplayer" type="text/html" width="1300" height="700"
    src={URL&&URL}
    frameborder="0" allowfullscreen>
    </iframe>


      </Row>
    </Container>
  )
}

export default TVseason