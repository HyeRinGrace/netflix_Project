import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

export const useTvDetails = ({id}) =>{
    return useQuery({
        queryKey:['tv-details',{id}],
        queryFn:()=>{
            return api.get(`/tv/${id}`);
        },
        select:(result) => result.data,
    })
}


