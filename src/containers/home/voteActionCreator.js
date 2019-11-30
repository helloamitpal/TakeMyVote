import * as actionTypes from './voteActionTypes';

export const getQuestionList = () => (dispatch, getState, { api }) => {
    dispatch({
        type: actionTypes.GET_ALL_QUESTIONS,
        promise: api.get('/questions'),
        payload: {}
    });
};

export const castVote = (url, payload) => (dispatch, getState, { api }) => {
    dispatch({
        type: actionTypes.CAST_VOTE,
        promise: api.post(url),
        payload
    });
};

export const getQuestionDetails = (url) => (dispatch, getState, { api }) => {
    dispatch({
        type: actionTypes.GET_QUESTION_DETAILS,
        promise: api.get(url),
        payload: {}
    });
};
