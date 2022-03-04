import actionTypes from "../actions-types";

const { SET_SLUG, SET_ARTICLE, NEW_ARTICLE_CREATED, CLEAR_ARTICLE_DATA } =
  actionTypes.articleData;

const initialState = {
  article: {},
  isTheArticleNew: false,
};

// eslint-disable-next-line default-param-last
const articleData = (state = initialState, action) => {
  switch (action.type) {
    case SET_SLUG:
      return {
        article: {
          slug: action.payload.slug,
        },
        isTheArticleNew: false,
      };

    case SET_ARTICLE:
      return {
        article: action.payload.article,
        isTheArticleNew: false,
      };

    case NEW_ARTICLE_CREATED:
      return {
        article: action.payload.article,
        isTheArticleNew: true,
      };

    case CLEAR_ARTICLE_DATA:
      return initialState;

    default:
      return state;
  }
};

export default articleData;
