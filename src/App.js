import './App.css';
import AppLayout from './layout/AppLayout';
import {Routes,Route} from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import MoviePage from './pages/Movies/MoviePage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bottom from './pages/Homepage/components/Bottom/Bottom';
import Cover from './pages/Homepage/components/Cover/Cover';


// 홈페이지 
// 영화 전체보여주는 페이지 
// 영화 디테일 페이지
function App() {
  return (
    <>
    <Routes>
      <Route path ="/" element = {<AppLayout/>}>
          <Route path='/home' element={<Homepage/>}/>
          <Route path='/' element = {<Cover/>}/>
          <Route path='/movies'>
          <Route index element = {<MoviePage/>}/>
            <Route path=':id' element={<MovieDetailPage/>}/>
          </Route>
      </Route>

      <Route path='*' element ={<NotFoundPage/>}/>
    </Routes>
    <Bottom/>
    </>
  );
}

export default App;
