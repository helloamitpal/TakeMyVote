import * as actionTypes from './voteActionTypes';

// Action for getting the all question list
export const getQuestionList = () => (dispatch, getState, { api }) => {
    dispatch({
        type: actionTypes.GET_ALL_QUESTIONS,
        promise: api.get('/questions'),
        payload: {}
    });
};

// Action for casting the vote
export const castVote = (url, payload) => (dispatch, getState, { api }) => {
    dispatch({
        type: actionTypes.CAST_VOTE,
        promise: api.post(url, payload),
        payload: {}
    });
};

// Action for getting the selected question details
export const getQuestionDetails = (url) => (dispatch, getState, { api }) => {
    dispatch({
        type: actionTypes.GET_QUESTION_DETAILS,
        promise: api.get(url),
        payload: { url }
    });
};

// Action for creating a new vote
export const createVote = (payload) => (dispatch, getState, { api }) => {
    dispatch({
        type: actionTypes.CREATE_VOTE,
        promise: api.post('/questions?', payload),
        payload: {}
    });
};
