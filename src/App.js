import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Join from './comp/account/join'
import Login from './comp/account/login'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/join"} element={<Join />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>홈페이지</h1>
      
      <Link to="/login">로그인</Link>
      <br />
      <Link to="/join">회원가입하기</Link>
    </div>
  )
}

export default App;
