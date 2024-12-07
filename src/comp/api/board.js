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
 * 게시글 상세보기
 * @param {} obj 
 * @returns 
 */
export const detailBoard = (param) => {
    return api.get('/board/find', { 
        params: param
    });
};