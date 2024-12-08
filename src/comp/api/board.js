import api from '../ax/axiosSetting'

/**
 * 게시글 목록 갖고오기
 * @param {} obj 
 * @returns 
 */
export const boardList = (param) => {
    return api.get('/board/findAll', { 
        params: param
    });
}

/**
 * 게시글 작성하기
 * @param {} param 
 * @returns 
 */
export const addBoard = (obj) => {
    return api.post('/board/writeBoard', JSON.stringify(obj))
}

/**
 * 게시글 상세보기
 * @param {} obj 
 * @returns 
 */
export const detailBoard = (param) => {
    return api.get('/board/detailBoard', { 
        params: param
    });
};

/**
 * 게시글 좋아요하기
 * @param {*} obj 
 * @returns 
 */
export const goodBoard = (obj) => {
    return api.post('/board/good', JSON.stringify(obj))
}

/**
 * 게시글 삭제하기
 * @param {*} obj 
 * @returns 
 */
export const deleteBoard = (obj) => {
    console.log('deleteBoard 실행');
    return api.post('/board/deleteBoard', JSON.stringify(obj))
}