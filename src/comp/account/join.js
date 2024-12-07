import { useEffect, useState, useRef } from 'react';
import { memberIdCheck, areaList, memberRegist } from '../api/member'

function Join() {

    const [아이디, 변경아이디] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('M');
    const [birth, setBirth] = useState('');
    const idRef = useRef();

    const [idChechk, setIdCheck] = useState('');

    function joinAction() {

    }

    return (
        <div className="App">
            {/* 아이디 */}
            <input
                type='text'
                placeholder='아이디 입력'
                value={아이디}
                ref={idRef}
                onChange={e => {
                    변경아이디(e.target.value);
                }}
            />
            <input type='button' value='중복 체크' onClick={
                () => {
                    let obj = new Object();
                    obj.id = 아이디;

                    const check = memberIdCheck(obj);

                    //성공!
                    check.then(res => {
                        console.log('===== 중복체크 성공!!!');
                        console.log(res);
                        setIdk(아이디);
                        idRef.current.disabled = true;
                    })

                    //실패
                    check.catch(err => {
                        console.log(err);
                    })
                }
            } /><br />

            <input
                type="password" placeholder='비밀번호 입력' value={password}
                onChange={
                    e => setPassword(e.target.value)
                } /><br />
            <input
                type="text" placeholder='이름 입력해주세요.' value={name}
                onChange={e => setName(e.target.value)} /><br />
            <input
                type="email" placeholder='이메일 입력해주세요.' value={email}
                onChange={e => setEmail(e.target.value)} /><br />
            <input
                type="radio" name="gender" value="M" checked
                onChange={e => { setGender(e.target.value) }} />남자
            <input
                type="radio" name="gender" value="F"
                onChange={e => { setGender(e.target.value) }} />여자<br />
            생년월일 <input type="date" value={birth}
                onChange={e => { setBirth(e.target.value) }} /> <br />

            {/* submit은 유효성 검사가 힘들다. */}
            <input type="button" value="회원가입" onClick={joinAction} />
        </div>
    );
}

export default Study;