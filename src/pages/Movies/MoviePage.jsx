import React,{useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import { Alert } from 'react-bootstrap';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import {Col,Row,Container,Button} from 'react-bootstrap';
import '../Movies/MoviePage.style.css';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import '../Movies/MoviePage.style.css';

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
  const [page,setPage] = useState(1);
  const keyword = query.get('q');

  const {data,isLoading,isError,error} = useSearchMovieQuery({
    keyword,
    page,
  }); //키워드를 넘겨줌

  // 페이지네이션 클릭할때 실행시킬 함수
  const handlePageClick = ({selected}) =>{
    setPage(selected+1);
  }
  //인기순 버튼으로 클릭했을 때 실행시킬 함수
  const SortPopularRank = () =>{
    data.results.map((item) =>{
      const best = item.popularity;
    })
  }


  if(isLoading){
    return <h1>Loading...</h1>
  }
  if(isError){
    return <Alert variant = "danger">{error.message}</Alert>
  }
  

  return (
  <Container>
    <Row>
      <Col lg={4} xs={12}>
        <Container className='SortButton'>
          <Button variant='danger' onClick={SortPopularRank}>인기순</Button>
          <Button variant='danger'>최신순</Button>
        </Container>
      </Col>
      <Col lg={8} xs={12}> 
        <Row>
        {data?.results.map((movie,index)=> (
        <Col key={index} lg={4} xs={12}>
          <MovieCard movie={movie}/>
        </Col>
      ))}
      </Row>
      
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5} // 한 번에 보여줄 페이지 수
        marginPagesDisplayed={2}
        pageCount={data.total_pages} // 전체 페이지 수
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        // breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={page - 1} // 현재 페이지
        style={{ backgroundColor: 'black' }} // 페이지네이션의 배경색을 검은색으로 설정
      />
      </Col>
    </Row>
  </Container>
  );
        }

export default MoviePage
