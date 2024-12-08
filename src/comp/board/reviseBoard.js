import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { detailBoard, reviseBoard } from '../api/board';
import { useLocation } from "react-router";
import "../css/AddBoard.css"; // CSS 파일 import

export default function DetailBoard() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [boardId, setBoardId] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    const { state } = location; // location에서 state 가져오기

    function startRevise() {
        const obj = { board_idx: state.board_idx }; // 객체 생성
        setBoardId(state.board_idx);

        detailBoard(obj)
            .then(res => {
                if (res.data.code == '200') {
                    setTitle(res.data.data.title);
                    setContent(res.data.data.content);
                }
            })
    }

    function goSave() {
        const obj = new Object();
        obj.title = title;
        obj.content = content;
        obj.boardIdx = boardId;

        reviseBoard(obj)
        .then(res => {

            if(res.data.code == '200') {
                navigate("/boardList");
            } else {
                alert("게시글 수정 실패!");
            }

        })

    }

    useEffect(() => {
        startRevise();
    }, [])

    return (
        <div className="add-board-container">
            <h1 className="add-board-title">게시글 수정 페이지</h1>

            <div className="add-board-form">
                <input type="text" placeholder="제목" className="add-board-input"
                    value={title} onChange={e => setTitle(e.target.value)} />
                <textarea placeholder="내용" className="add-board-textarea" value={content}
                    onChange={e => setContent(e.target.value)}></textarea>
                <input type="button" value="수정완료" className="add-board-button" onClick={() => goSave()} />
            </div>
        </div>
    );
}
