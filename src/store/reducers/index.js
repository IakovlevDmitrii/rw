import { combineReducers } from 'redux';
import articleData from './articleData-reducers';
import authentication from './auth-reducer';

const reducer = combineReducers({
  articleData,
  authentication,
});

export default reducer;
