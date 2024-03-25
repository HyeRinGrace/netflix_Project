import React, { useRef, useState, useEffect } from 'react';
import '../Cover/Cover.css';
import { Container } from 'react-bootstrap';
import Black from '../../../../assets/blackImage.png';
import { Fade } from "react-awesome-reveal";
import NetflixSound from '../../../../assets/netflixSound.mp3';

const Cover = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(NetflixSound));

  useEffect(() => {
    const audio = audioRef.current;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error(error);
      });
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

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
