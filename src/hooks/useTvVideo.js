import {useQuery} from '@tanstack/react-query';
import api from '../utils/api';


export const useTvVideo = ({id}) =>{
    return useQuery({
        queryKey:['tv-video',{id}],
        queryFn:()=>{
            return id?api.get(`/tv/${id}/videos`):'';
        },
        select:(result) => result.data,

    })
}