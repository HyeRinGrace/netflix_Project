import React from 'react'
import './MovieSlider.style.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../MovieCard/MovieCard';

const MovieSlider = ({title,movies, responsive}) => {

  //캐러셀 설정 부분
  return (
    
    <div>
    <h3>{title}</h3>
    <Carousel
        draggable={true}
        infinite={true}
        centerMode={false}
        itemClass='movie-slider p-1'
        containerClass='carousel-container'
        responsive={responsive}
        transitionDuration={500}
        removeArrowOnDeviceType={[]}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        partialVisible={true}
        ssr={true} // means to render carousel on server-side.
    >
    {movies.map((movie,index)=><MovieCard movie={movie} key={index}/>)}
    </Carousel>;
    
    </div>
  )
}

export default MovieSlider
