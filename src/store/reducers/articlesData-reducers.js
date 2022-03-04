import actionTypes from "../actions-types";

const { SET_ARTICLES } = actionTypes.articlesData;

const initialState = {
  articles: [],
};

// eslint-disable-next-line default-param-last
const articlesData = (state = initialState, action) => {
  if (action.type === SET_ARTICLES) {
    return {
      articles: action.payload.articles,
    };
  }
  return state;
};

export default articlesData;
