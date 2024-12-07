import React, { useEffect, useRef, useState } from "react";
import "../css/Login.css";
import { login } from '../api/member' 
import { useNavigate } from "react-router-dom"

export default function Login() {
    const idRef = useRef("");
    const pwRef = useRef("");

    const [focused, setFocused] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [animationClass, setAnimationClass] = useState("");
    const navigate = useNavigate();

    // 페이지 접속 시 localStorage 초기화
    useEffect(() => {
        localStorage.removeItem("userId");
    }, []);

    const handleFocus = () => {
        setFocused(true);
        setAnimationClass(completed ? "face-up-right" : "face-up-left");
    };

    const handleBlur = () => {
        setAnimationClass("");
    };

    const handleInputChange = () => {
        const isCompleted =
            idRef.current.value !== "" && pwRef.current.value !== "";
        setCompleted(isCompleted);
        setAnimationClass(isCompleted ? "face-up-right" : "face-up-left");
    };

    const loginAction = (e) => {
        e.preventDefault();
        setAnimationClass(""); // 애니메이션 초기화
    
        if (completed) {
            setAnimationClass("form-complete"); // 성공 애니메이션 클래스 추가
            setTimeout(() => {
                setAnimationClass(""); // 애니메이션 클래스 초기화
                setCompleted(false);
    
                // 애니메이션이 완료된 후 서버로 데이터 전송
                const obj = {
                    userId: idRef.current.value,
                    userPw: pwRef.current.value,
                };
    
                console.log(obj);
    
                login(obj)
                    .then((res) => {
                        alert("로그인 성공");
                        localStorage.setItem("userId", idRef.current.value);
                        navigate("/boardList");
                    })
                    .catch((err) => {
                        alert("아이디 또는 비밀번호 재입력");
                    });
            }, 2000); // 애니메이션 시간과 일치시킴
        } else {
            setAnimationClass("form-error"); // 실패 애니메이션 클래스 추가
            setTimeout(() => {
                setAnimationClass(""); // 애니메이션 클래스 초기화
            }, 2000);
        }
    };
    

    const goJoin = () => {
        navigate("/join");
    }

    return (
    
        <div className={`form ${animationClass}`}>
            <div className="field email">
                <div className="icon"></div>
                <input
                    className="input"
                    id="email"
                    type="email"
                    placeholder="ID"
                    autoComplete="off"
                    ref={idRef}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                />
            </div>
            <div className="field password">
                <div className="icon"></div>
                <input
                    className="input"
                    id="password"
                    type="password"
                    placeholder="PASSWORD"
                    ref={pwRef}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                />
            </div>
            <button className="button" id="submit" onClick={loginAction}>
                LOGIN
                <div className="side-top-bottom"></div>
                <div className="side-left-right"></div>
            </button>
            <small onClick={goJoin}>Do you want to register?</small>
        </div>
    );
}
