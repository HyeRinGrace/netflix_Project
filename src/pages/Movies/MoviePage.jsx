import React,{useState,useEffect} from 'react'
import { useSearchParams } from 'react-router-dom'
import { Alert } from 'react-bootstrap';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import {Col,Row,Container,Button,Badge} from 'react-bootstrap';
import '../Movies/MoviePage.style.css';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import isLoadingSpinner from '../../common/Spinner/isLoadingSpinner';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';

const PAGE_SIZE = 10;

const MoviePage = () => {
  const [query] = useSearchParams(); //URL 찾기위해 선언
  const [page, setPage] = useState(1); //페이지네이션 상태함수(초기값 1)
  const [sortedData, setSortedData] = useState(null);//인기있는 영화 정렬 상태함수(초기값 NULL)
  const [sortedRankData, setSortedRankData] = useState(null);//최신순 영화 정렬 상태함수
  const [selectedGenre, setSelectedGenre] = useState(null);//장르 정렬 상태 함수


  const keyword = query.get('q');//q 뒤에오는 값 가져오기
  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });//searchQuery 훅 가져와서 사용

 
  const { data: genre } = useMovieGenreQuery(); //장르 Hook 가져와서 사용

  
  //페이지 이동함수
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  //인기있는 함수
  const handleSortPopularRank = () => {
    const sortedMovies = [...data.results].sort((a, b) => b.popularity - a.popularity);
    setSortedData(sortedMovies);
    setSortedRankData(null);
  };

  //최신 영화 함수
  const handleSortRecentRank = () => {
    const sortedRankMovies = [...data.results].sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    setSortedRankData(sortedRankMovies);
    setSortedData(null);
  };

  // 페이지 이동 시 초기화
  useEffect(() => {
    setSortedData(null);
    setSortedRankData(null);
  }, [keyword]);


   // 검색 시 초기화
   useEffect(() => {
    setSortedData(null);
    setSortedRankData(null);
  }, [page]);

  useEffect(() => {
  }, [selectedGenre, data]); 


  //장르 필터 
  const ReadingGenre = (event) => {
    const selectedGenreName = event.target.innerText;
    const selectedGenreId = genre.find((item) => item?.name === selectedGenreName)?.id;
  
    if (selectedGenreId) {
      const filteredMovies = data?.results.filter((movie) => movie?.genre_ids.includes(selectedGenreId));
      setSelectedGenre(filteredMovies);
      setSortedData(null);
      setSortedRankData(null);
      setPage(1); // 선택한 장르가 변경되었으므로 페이지를 1로 초기화
    }
  };

  //로딩스피너
  if (isLoading) {
    return <div>{isLoadingSpinner()}</div>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  const displayData = sortedData || sortedRankData || selectedGenre || data.results; //뿌려줄 데이터들 모아놓기
  const pageCount = selectedGenre ? Math.ceil(selectedGenre.length / PAGE_SIZE) : Math.ceil(data?.total_results / PAGE_SIZE);
  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          <Container className='SortButton'>
            <Button variant='danger' onClick={handleSortPopularRank}>인기순</Button>
            <Button variant='danger' onClick={handleSortRecentRank}>최신순</Button>
            <Container className='MovieGenreContainer'>
            <Col lg={8} xs={10}>
            {genre?.map((item) => (
              <Badge className="GenreBadge"key={item?.id} bg="danger" onClick={(event) => ReadingGenre(event)}>{item?.name} </Badge>
            ))}
            </Col>
          </Container>
          </Container>
    
        </Col>
        <Col lg={8} xs={12} className='MovieBox'>
          {displayData.length === 0 && <h4 className= "NoGenre" variant="info">선택한 장르가 존재하지 않습니다.</h4>}
          <Row>
            {displayData.map((movie, index) => (
              <Col key={index} lg={4} xs={8}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          <div className='paginationContainer'>
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              forcePage={page - 1}
              style={{ backgroundColor: 'black' }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default MoviePage;
