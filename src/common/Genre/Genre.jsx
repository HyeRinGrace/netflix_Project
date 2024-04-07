import React from 'react'
import '../Genre/Genre.style.css';
import { Badge } from 'react-bootstrap';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';

const Genre = ({ movie }) => {
    const { data: genreData } = useMovieGenreQuery();

    const showGenre = (genreIdList) => {
        if (!genreData || !genreData.length) { // genreData가 정의되지 않았거나 빈 배열일 때
            return [];
        }

        const genreNameList = genreIdList.map((id) => {
            const genreObj = genreData.find((genre) => genre?.id === id);
            return genreObj?.name; // genreObj가 null 또는 undefined일 경우 예외 처리
        });

        return genreNameList.filter(Boolean); // null 또는 undefined인 요소 제거
    }

    return (
        <>
            {showGenre(movie?.genre_ids).map((genre, index) => (
                <Badge className="badge" bg="danger" key={index}>{genre}</Badge>
            ))}
        </>
    );
}

export default Genre;
