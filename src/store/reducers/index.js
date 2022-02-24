import { combineReducers } from "redux";
import articleData from "./articleData-reducers";
import articlesData from "./articlesData-reducers";
import authentication from "./auth-reducer";
import loading from "./loading-reducer";

const reducer = combineReducers({
  articleData,
  articlesData,
  authentication,
  loading,
});

export default reducer;
