import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Outlet,useNavigate} from 'react-router-dom'; //router안에 있는 자손들을 가지고 오게됨
import '../layout/AppLayout.css';

const AppLayout = () => {
    const [keyword,setKeyword] = useState('');
    const navigate = useNavigate();

    const toMoveMovies = () =>{
      navigate('/movies');
      window.location.reload();
    }

    const searchByKeyword = (event) =>{
      event.preventDefault();
      //keyword값으로 url을 변경시켜줘야함 이유눈 useParams 혹은 SearchParams이용을 위해...
      if (keyword.trim() !== '') {
        // 검색어가 공백이 아닌 경우에만 검색을 수행합니다.
        navigate(`/movies?q=${keyword}`);
      }
    }

    return (
        <div>
            <Navbar expand="lg" className="navContainer">
          <Container fluid>
            <Navbar.Brand href="/">
              <img className = "logo"src='https://images.crowdspring.com/blog/wp-content/uploads/2016/06/27132348/netflix-new-logo.png'/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link onClick={toMoveMovies}>Movies</Nav.Link>
              </Nav>
              <Form className="d-flex" onSubmit={(event)=>searchByKeyword(event)}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={keyword}
                  onChange={(event)=>setKeyword(event.target.value)}
                />
                <Button variant="outline-danger" type='submit'>Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet/>
        </div>
        
      );
}

export default AppLayout
