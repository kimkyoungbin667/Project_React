import api from '../ax/axiosSetting'

/**
 * 로그인
 * @param {id: 아이디, pw: 비밀번호} obj
 * @returns 
 */
export const login = (obj) => {
    return api.post('/member/login', JSON.stringify(obj),
        {
            headers: {
                'Content-Type': 'application/json',
            }
        })
}
