import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { detailBoard, goodBoard, deleteBoard } from '../api/board';
import { useLocation } from "react-router";
import '../css/DetailBoard.css';

export default function DetailBoard() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [writerId, setWriterId] = useState('');
    const [writerName, setWriterName] = useState('');
    const [like, setLike] = useState();

    const nowUserId = localStorage.getItem("userId");

    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location; // location에서 state 가져오기

    function startDetail() {

        const obj = { board_idx: state.board_idx}; // 객체 생성
        detailBoard(obj)
            .then(res => {
                console.log(res.data);
                if (res.data.code == '200') {
                    setTitle(res.data.data.title);
                    setContent(res.data.data.content);
                    setWriterId(res.data.data.userId);
                    setWriterName(res.data.data.userName);
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

    function deleteAction(board_idx) {
        const obj = new Object();
        obj.board_idx = board_idx;

        console.log(obj);
        
        deleteBoard(obj)
            .then(res => {
                if(res.data.code == '200') {
                    console.log('삭제 성공!');
                    navigate("/boardList");
                } else {
                    console.log('삭제 실패');
                }

            })
    }

    useEffect(() => {
        startDetail();
    }, [])

    return (
        <div className="detail-container">
            <h1 className="detail-title">게시글 상세보기</h1>
            <p className="detail-text">작성자 : {writerName}</p>
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
                {nowUserId === writerId && (
                    <div>
                        <button className="detail-button" >
                            수정
                        </button>
                        <button className="detail-button" onClick={()=>deleteAction(state.board_idx)}>
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
