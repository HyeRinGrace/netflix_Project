//인기있는 영화 hooks

import {useQuery} from '@tanstack/react-query';
import api from '../utils/api';

const fetchPopularMovies= ()=>{
    return api.get(`/movie/popular?language=ko&page`);
}

export const usePopularMoviesQuery = () =>{
    return useQuery({
        queryKey:['movie-popular'],
        queryFn:fetchPopularMovies,
        select:(result) => result.data
    })
}