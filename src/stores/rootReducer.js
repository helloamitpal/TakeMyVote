import { combineReducers } from 'redux';
import voteReducer from '../containers/home/voteReducer';

// this is the root reducer to combine module wise reducers
const rootReducer = combineReducers({
  vote: voteReducer
});

export default rootReducer;
