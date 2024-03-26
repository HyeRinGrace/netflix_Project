import React, { useRef, useState, useEffect } from 'react';
import '../Cover/Cover.css';
import { Container } from 'react-bootstrap';
import Black from '../../../../assets/blackImage.png';
import { Fade } from "react-awesome-reveal";
import NetflixSound from '../../../../assets/netflixSound.mp3';
import {useNavigate} from 'react-router-dom';

const Cover = ({setCover}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(NetflixSound));
  const navigate = useNavigate();

  useEffect(() => {
    const audio = audioRef.current;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        setIsPlaying(true);
        setCover(false);
        setTimeout(()=>{
            navigate('/');
        },3000);
      }).catch(error => {
        console.error(error);
      });
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []); // 빈 배열로 설정하여 페이지가 처음 로드될 때만 실행

  return (
    <Container className='Cover'>
      <div className='coverContainer'>
        <img className ="blackImage" src={Black} alt="Black background"/>
        <Fade duration={5000} className='LOGO'>NETFLIX</Fade>
      </div>
    </Container>
  );
};

export default Cover;
