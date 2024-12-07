import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"

export default function Login() {

    const navigate = useNavigate();

    const idRef = useRef('');
    const pwRef = useRef('');

    //페이지 접속했을때.
    useEffect(() => {
        localStorage.removeItem('userId');
    }, [])

    const loginAction = () => {
        const idValue = idRef.current.value;
        const pwValue = pwRef.current.value;
        
        let obj = new Object();
        obj.userId = idValue;
        obj.userPw = pwValue;
    }

    return (
        <div>
            <h1>로그인</h1>
            <input type ='text' placeholder="아이디 입력" ref={idRef}/> <br/>
            <input type='password' placeholder="패스워드 입력" ref={pwRef}/> <br/>

            <input type='button' value='회원가입' onClick={() => navigate("/join")}/>
            <input type='button' value='로그인' onClick={loginAction}/>
        </div>
    )

}