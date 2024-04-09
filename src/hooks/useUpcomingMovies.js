import api from "../utils/api";
import {useQuery} from '@tanstack/react-query';


const fetchUpcomingMovies = () =>{
    return api.get('/movie/upcoming?language=ko&page');
}

export const useUpcomingMoviesQuery = () =>{
    return useQuery({
        queryKey:['upcoming-movies'],
        queryFn:fetchUpcomingMovies,
        select:(result)=>result.data,
    })
}

