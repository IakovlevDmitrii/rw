import {
  getArticle,
  getArticlesPreviews,
  favoriteArticle,
  unfavoriteArticle,
  createArticle,
  editArticle,
  deleteArticle,
  registerUser,
  loginUser,
  editProfile,
} from './helpers';

const authentication = {
  register: (username, email, password) => registerUser(username, email, password),
  login: (email, password) => loginUser(email, password),
  edit: (token, detailsToChange) => editProfile(token, detailsToChange),
};

const articles = {
  getPreviews: (page) => getArticlesPreviews(page),
  getArticle: (slug) => getArticle(slug),
  favorite: (token, slug) => favoriteArticle(token, slug),
  unfavorite: (token, slug) => unfavoriteArticle(token, slug),
  create: (token, content) => createArticle(token, content),
  edit: (token, slug, detailsToChange) => editArticle(token, slug, detailsToChange),
  delete: (token, slug) => deleteArticle(token, slug),
};

class RealWorldApiService {
  articles = articles;

  authentication = authentication;
}

const realWorldApiService = new RealWorldApiService();

export default realWorldApiService;
