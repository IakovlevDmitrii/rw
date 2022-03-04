import actionTypes from "../actions-types";

const { SET_SLUG, SET_ARTICLE, NEW_ARTICLE_CREATED, CLEAR_ARTICLE_DATA } =
  actionTypes.articleData;

const setSlug = (slug) => ({
  type: SET_SLUG,
  payload: { slug },
});

const setArticle = (article) => ({
  type: SET_ARTICLE,
  payload: { article },
});

const newArticleCreated = (article) => ({
  type: NEW_ARTICLE_CREATED,
  payload: { article },
});

const clearArticleData = () => ({
  type: CLEAR_ARTICLE_DATA,
});

const articleData = {
  setSlug,
  setArticle,
  newArticleCreated,
  clearArticleData,
};

export default articleData;
