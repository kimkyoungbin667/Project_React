import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { detailBoard, goodBoard } from '../api/board';
import { useLocation } from "react-router";
import '../css/DetailBoard.css';

export default function DetailBoard() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [writer, setWriter] = useState('');
    const [like, setLike] = useState();
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location; // location에서 state 가져오기

    const nowMemberId = localStorage.getItem('userId');

    function startDetail() {

        console.log(nowMemberId);
        const obj = { idx: state.idx}; // 객체 생성
        detailBoard(obj)
            .then(res => {
                if (res.data.code == '200') {
                    setTitle(res.data.data.title);
                    setContent(res.data.data.content);
                    setWriter(res.data.data.createBy);
                    setLike(res.data.data.boardGood);
                }
            })
    }


    function goReviseBoard(boardId) {
        navigate('/reviseBoard', { state: { boardId: boardId } }); // 객체로 전달
    }

    function goodUp(boardId) {
        setLike(like+1);

        goodUpAction(boardId);
    }

    function goodUpAction(boardId) {

        const obj = new Object();
        obj.boardId = boardId;

        goodBoard(obj);
    }

    useEffect(() => {
        startDetail();
    }, [])

    return (
        <div className="detail-container">
            <h1 className="detail-title">게시글 상세보기</h1>
            <p className="detail-text">작성자 : {writer}</p>
            <div className="detail-content">
                <h2 className="detail-heading">{title}</h2>
                <p className="detail-text">{content}</p>
                <a onClick={
                    e => {
                        e.preventDefault();
                        goodUp(state.boardId+1);
                    }
                }>👍 추천 </a>{like}
                {/* 조건부 렌더링 */}
                {writer === nowMemberId && (
                    <div>
                        <button className="detail-button" >
                            수정
                        </button>
                        <button className="detail-button" >
                            삭제
                        </button>
                    </div>
                )}
            </div>
            <button className="detail-button" onClick={() => navigate("/boardList")}>
                목록으로
            </button>
        </div>
    );
}
