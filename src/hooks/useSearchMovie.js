import {useQuery} from '@tanstack/react-query';
import api from '../utils/api';

const fetchSearchMovie = ({keyword, page}) =>{
    return keyword?api.get(`/search/movie?query=${keyword}&page=${page}`)
    :api.get(`/movie/popular?page=${page}`);
    //키워드가 있다면, 키워드 값으로 url을 전달받고, 키워드가 없다면 인기있는 영화를 보여줄거임
}

export const useSearchMovieQuery = ({keyword, page}) =>{
    return useQuery({
        queryKey:['search-movie',{keyword,page}],
        queryFn:()=>fetchSearchMovie({keyword, page}),
        select:(result) => result.data,
    })
}