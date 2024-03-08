import React,{useState,useEffect} from 'react'
import { useSearchParams } from 'react-router-dom'
import { Alert } from 'react-bootstrap';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import {Col,Row,Container,Button} from 'react-bootstrap';
import '../Movies/MoviePage.style.css';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import '../Movies/MoviePage.style.css';
import isLoadingSpinner from '../../common/Spinner/isLoadingSpinner';

//검색
//1. 검색어 입력 없이 movie 메뉴를 통해 진입 => popular movie 보여주기
//2. 검색어 입력을 통해 검색과 동시에 movie페이지로 이동 => keyword와 관련된 영화들을 보여줌

//페이지네이션
//1.페이지네이션 설치
//2.Page state 만들기
//3. 페이지네이션 클릭할떄마다 page 바꿔주기
//4. page 값이 바뀔때 마다 useSearchMovie에 page까지 넣어서 fetch
const MoviePage = () => {
  const [query] = useSearchParams();
  const [page, setPage] = useState(1);
  const [sortedData, setSortedData] = useState(null);
  const [sortedRankData, setSortedRankData] = useState(null);
  const keyword = query.get('q');
  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });


  //페이지네이션 클릭시, 함수 동작
  const handlePageClick = ({ selected }) => {
      setPage(selected + 1);
  }

  //인기순으로 정렬
  const SortPopularRank = () => {
      const sortedMovies = [...data.results].sort((a, b) => b.popularity - a.popularity);
      setSortedData(sortedMovies);
      setSortedRankData(null);
  }

  //최신순으로 정렬
  const SortRecentRank = () => {
      const sortedRankMovies = [...data.results].sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
      setSortedRankData(sortedRankMovies);
      setSortedData(null);
  }

    // 페이지 이동 시 초기화
    useEffect(() => {
      setPage(1);
      setSortedData(null);
      setSortedRankData(null);
    }, [keyword]);
  
    // 검색 시 초기화
    useEffect(() => {
      setSortedData(null);
      setSortedRankData(null);
    }, [page]);
  


  if (isLoading) {
      return <div>{isLoadingSpinner()}</div>
  }
  if (isError) {
      return <Alert variant="danger">{error.message}</Alert>
  }

  return (
      <Container>
          <Row>
            <Col lg={4} xs={12}>
                  <Container className='SortButton'>
                      <Button variant='danger' onClick={SortPopularRank}>인기순</Button>
                      <Button variant='danger' onClick={SortRecentRank}>최신순</Button>
                  </Container>
              </Col>
              <Col lg={8} xs={10} className='MovieBox'>
                  <Row>
                      {(sortedRankData || sortedData || data?.results)?.map((movie, index) => (
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
                      pageCount={data.total_pages}
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
                      renderOnZeroPageCount={null}
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