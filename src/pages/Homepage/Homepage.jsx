import React, { useEffect, useState } from 'react'
import Banner from './components/Banner/Banner'
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide'
import TopRatedMovieSlide from './components/TopRatedMovieSlide/TopRatedMovie'
import UpcomingMovieSlide from './components/UpcomingMovieSlide/UpcomingMovie'
import Cover from './components/Cover/Cover'
import '../Homepage/Homepage.style.css';

const Homepage = () => {
  const [cover, setCover] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setCover(false);
    }, 4000);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머 클리어
  }, []);

  return (
    <div className='HomPageContainer'>
      {cover ? <Cover /> : null}
      <Banner />
      <PopularMovieSlide />
      <TopRatedMovieSlide />
      <UpcomingMovieSlide />
    </div>
  )
}

export default Homepage
