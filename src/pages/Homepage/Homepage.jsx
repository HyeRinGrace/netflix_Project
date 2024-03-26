import React, { useEffect, useState } from 'react';
import Banner from './components/Banner/Banner';
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide';
import TopRatedMovieSlide from './components/TopRatedMovieSlide/TopRatedMovie';
import UpcomingMovieSlide from './components/UpcomingMovieSlide/UpcomingMovie';
// import Cover from './components/Cover/Cover';
import '../Homepage/Homepage.style.css';

const Homepage = () => {

  return (
    <div className='HomPageContainer'>
      <Banner/>
      <PopularMovieSlide />
      <TopRatedMovieSlide />
      <UpcomingMovieSlide />
    </div>
  );
};

export default Homepage;
