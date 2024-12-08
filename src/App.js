import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './comp/account/login'
import Join from './comp/account/join'
import BoardList from './comp/board/boardList'
import BoardDetail from './comp/board/boardDetail'
import AddBoard from './comp/board/addBoard'
import ReviseBoard from './comp/board/reviseBoard'

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/join"} element={<Join />} />
        <Route path={"/boardList"} element={<BoardList />} />
        <Route path={"/boardDetail"} element={<BoardDetail />} />
        <Route path={"/addBoard"} element={<AddBoard />} />
        <Route path={"/reviseBoard"} element={<ReviseBoard />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Home() {
  return (
    <div>
      <Login></Login>
    </div>
  )
}

export default App;
