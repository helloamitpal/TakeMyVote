import * as actionTypes from './voteActionTypes';

export const getQuestionList = () => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.GET_ALL_QUESTIONS,
    promise: api.get('/questions'),
    payload: {}
  });
};
