import { handle } from 'redux-pack';

import * as actionTypes from './voteActionTypes';

const initialState = {
  votes: null,
  error: '',
  loading: false
};

const voteReducer = (state = initialState, action = '') => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_ALL_VOTING: {
      return handle(state, action, {
        start: (prevState) => ({
          ...prevState,
          error: '',
          loading: true
        }),
        success: (prevState) => ({
          ...prevState,
          weathers: [...payload.list]
        }),
        failure: (prevState) => ({
          ...prevState,
          error: 'Something went wrong. Please try again after some time.'
        }),
        finish: (prevState) => ({
          ...prevState,
          loading: false
        })
      });
    }

    default:
      return state;
  }
};

export default voteReducer;
