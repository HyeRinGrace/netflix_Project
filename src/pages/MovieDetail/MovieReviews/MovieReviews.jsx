import React, { useState } from 'react';
import { useMovieReviews } from '../../../hooks/useMovieReviews';
import { useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

const MovieReviews = () => {
    let params = useParams();
    const { data } = useMovieReviews(params);
    const [visibleReviews, setVisibleReviews] = useState(3); // 초기에 보여지는 리뷰의 수를 설정

    const handleShowMoreReviews = () => {
        // 더보기 버튼을 클릭할 때마다 보여지는 리뷰의 수를 증가시킵니다.
        setVisibleReviews(visibleReviews + 3); // 예를 들어, 3개씩 추가적으로 보여줍니다.
    };

    return (
        <Container>
            <h4 style={{ color: 'white' }}>Reviews</h4>
            {data?.results.slice(0, visibleReviews).map((review, index) => (
                <Card key={index} className="my-3" style={{ backgroundColor: '#f8f9fa' }}>
                    <Card.Body>
                        <Card.Title style={{ color: 'white' }}>{review?.author}</Card.Title>
                        <Card.Text style={{ color: 'white' }}>{review?.content}</Card.Text>
                    </Card.Body>
                </Card>
            ))}
            {/* 더보기 버튼 */}
            {visibleReviews < data?.results.length && (
                <div className="text-center mt-4">
                    <Button variant="danger" onClick={handleShowMoreReviews}>더 많은 리뷰 보기</Button>
                </div>
            )}
        </Container>
    );
}

export default MovieReviews;