// 점유율이 높은영화 hooks

import {useQuery} from '@tanstack/react-query';
import api from '../utils/api';

const fetchTopRatedMovies = () =>{
    return api.get(`/movie/top_rated?language=ko&page`);
}

export const useTopRatedMovieQuery = () =>{
    return useQuery({
        queryKey:['top-rated-movies'],
        queryFn:fetchTopRatedMovies,
        select:(result) => result.data,
    })
}