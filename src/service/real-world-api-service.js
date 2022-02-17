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

// const articles = {
//   getPreviews: (page) => getArticlesPreviews(page),
//   getArticle: (slug) => getArticle(slug),
//   favorite: (token, slug) => favoriteArticle(token, slug),
//   unfavorite: (token, slug) => unfavoriteArticle(token, slug),
//   create: (token, content) => createArticle(token, content),
//   edit: (token, slug, detailsToChange) => editArticle(token, slug, detailsToChange),
//   delete: (token, slug) => deleteArticle(token, slug),
// };

class RealWorldApiService {
  articles = {
    getPreviews: (page) => getArticlesPreviews(page),
    getArticle: (slug) => getArticle(slug),
    favorite: (token, slug) => favoriteArticle(token, slug),
    unfavorite: (token, slug) => unfavoriteArticle(token, slug),
    create: (token, content) => createArticle(token, content),
    edit: (token, slug, detailsToChange) => editArticle(token, slug, detailsToChange),
    delete: (token, slug) => deleteArticle(token, slug),
  };

  authentication = authentication;

  BASE_URL = 'http://kata.academy:8022/api';

  async getResource(extraUrl, requestOptions) {
    try {
      const response = await fetch(`${this.BASE_URL}/${extraUrl}`, requestOptions);

      return response.json();
    } catch {
      throw new Error();
    }
  }

  // запрос на то, чтобы поставить лайк статье
  async favoriteArticle(token, slug) {
    const extraUrl = `articles/${slug}/favorite`;

    // Заголовки запроса
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    };

    const res = await this.getResource(extraUrl, requestOptions);

    // если ответ res содержит объект article, значит запрос на лайк прошел успешно
    return !!res.article;
  }
}

const realWorldApiService = new RealWorldApiService();

export default realWorldApiService;
