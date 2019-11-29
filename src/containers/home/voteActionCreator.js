import * as actionTypes from './voteActionTypes';

export const getVotingList = () => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.GET_ALL_VOTING,
    promise: api.get('/voting'),
    payload: {}
  });
};
