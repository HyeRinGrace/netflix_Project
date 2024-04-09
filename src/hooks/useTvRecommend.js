import {useQuery} from '@tanstack/react-query';
import api from '../utils/api';


export const useTvRecommend = ({id}) =>{
    return useQuery({
        queryKey:['TV-recommend',{id}],
        queryFn:()=>{
            return api.get(`/tv/${id}/recommendations`)
        },
        select:(result) => result.data
    })

}