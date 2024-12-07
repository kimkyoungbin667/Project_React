import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { boardList } from '../api/board';
import '../css/BoardList.css'; 


export default function BoardList() {

    const [boards, setBoards] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [nowOption, setNowOption] = useState('제목');
    const navigate = useNavigate();

    function startItemList(inputKeyword) {

        boardList(inputKeyword)
            .then(res => {
                console.log(res.data);
                setBoards(res.data);
            })
    }

    function detailBoard(idx) {
        navigate('/detailBoard', { state: { boardId: idx } }); // 객체로 전달
    }

    function findKeyword() {
        let param = new Object();

        if (nowOption === "제목") {
            param.keyword = keyword;
        } else if (nowOption === "작성자") {
            param.created = keyword;
        }

        startItemList(param); // 게시글 검색
    }

    useEffect(() => {
        startItemList();
    }, [])

    useEffect(() => {
        findKeyword();
    }, [keyword, nowOption]);

    return (
        <div>
            <h1>게시글 목록 페이지</h1>

            <select onChange={e => { setNowOption(e.target.value); console.log(e.target.value) }}
                style={
                    {
                        'padding': '10px',
                        'fontSize': '20sp'
                    }
                }>
                <option key="1">제목</option>
                <option key="2">작성자</option>
            </select>

            <input style={
                {
                    'padding': '10px',
                    'fontSize': '20sp'
                }
            }
                type="text"
                placeholder='검색하기'
                value={keyword}
                onChange={
                    e => setKeyword(e.target.value)
                } />

            <div className="table-container">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>추천수</th>
                            <th>작성자</th>
                            <th>생성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boards.map(
                            (item, index) => {
                                console.log(item);
                                return (
                                    //<tr key={index} onClick={e => { detailBoard(item.boardIdx - 1) }}>
                                    <tr key={index}>
                                        <td>{item.title}</td>
                                        <td>{item.good}</td>
                                        <td>{item.createBy}</td>
                                        <td>{item.created}</td>
                                        
                                    </tr>
                                )

                            }
                        )}
                    </tbody>
                </table>
            </div>

            <input type='button' value='글쓰기' onClick={() => navigate("/addBoard")} />
        </div >
    )
}