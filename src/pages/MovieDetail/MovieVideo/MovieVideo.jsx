import React from 'react'
import '../MovieVideo/MovieVideo.style.css';
import {useParams} from'react-router-dom'
import { useMovieVideo } from '../../../hooks/useMovieVideo';

const MovieVideo = () => {
    let params = useParams();
    const {data} = useMovieVideo(params);
    let YOUTUBE_KEY = data?.results[0].key;
    const URL = `https://www.youtube.com/embed/${YOUTUBE_KEY}`

  return (
    <div>
      <iframe id="ytplayer" type="text/html" width="1300" height="500"
    src={URL}
    frameborder="0" allowfullscreen>
    </iframe>
    </div>
  )
}

export default MovieVideo
