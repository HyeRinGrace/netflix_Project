import {useQuery} from '@tanstack/react-query';
import api from "../utils/api";

const fetchPopularTVs= ()=>{
    return api.get(`/tv/popular?language=ko&page`);
}

export const usePopularTV = () =>{
    return useQuery({
        queryKey:['popular-tv'],
        queryFn:fetchPopularTVs,
        select:(result) => result.data,
    })
}