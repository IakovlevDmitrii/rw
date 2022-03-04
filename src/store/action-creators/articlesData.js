import actionTypes from "../actions-types";

const { SET_ARTICLES } = actionTypes.articlesData;

const setArticles = (articles) => ({
  type: SET_ARTICLES,
  payload: { articles },
});

const articlesData = {
  setArticles,
};

export default articlesData;
