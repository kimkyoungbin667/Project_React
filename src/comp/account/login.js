import React, { useEffect, useRef, useState } from "react";
import "../css/Login.css";
import { login } from '../api/member';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const idRef = useRef("");
    const pwRef = useRef("");

    const [completed, setCompleted] = useState(false);
    const [animationClass, setAnimationClass] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userIdx");
        localStorage.removeItem("userName");
    }, []);

    const handleFocus = () => {
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

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            document.getElementById("submit").click();
        }
    };

    const loginAction = (e) => {
        e.preventDefault();
        setAnimationClass("");

        if (completed) {
            setAnimationClass("form-complete");
            setTimeout(() => {
                setAnimationClass("");
                setCompleted(false);

                const obj = {
                    userId: idRef.current.value,
                    userPw: pwRef.current.value,
                };

                login(obj)
                    .then((res) => {
                        if (res.data.code === '200') {
                            localStorage.setItem("userIdx", res.data.data.userIdx);
                            localStorage.setItem("userId", res.data.data.userId);
                            localStorage.setItem("userName", res.data.data.userName);
                            alert(`${res.data.data.userName} 님 환영합니다`);
                            navigate("/boardList");
                        } else {
                            alert("아이디 또는 비밀번호를 재입력해주세요.");
                            idRef.current.value = '';
                            pwRef.current.value = '';
                        }
                    })
                    .catch(() => {
                        alert("아이디 또는 비밀번호를 재입력해주세요.");
                        idRef.current.value = '';
                        pwRef.current.value = '';
                    });
            }, 2000);
        } else {
            setAnimationClass("form-error");
            setTimeout(() => {
                setAnimationClass("");
            }, 2000);
        }
    };

    const goJoin = () => {
        navigate("/join");
    };

    return (
        <div onKeyDown={handleKeyDown} className="form-container">
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
        </div>
    );
}
