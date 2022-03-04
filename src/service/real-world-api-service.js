import { format } from "date-fns";
import { createRequestOptions, cropText } from "../utils";

class RealWorldApiService {
  articles = {
    getList: (page) => this.getArticleList(page),
    getOne: (slug) => this.getArticle(slug),
    favorite: (token, slug) => this.favoriteArticle(token, slug),
    unfavorite: (token, slug) => this.unfavoriteArticle(token, slug),
    create: (token, content) => this.createArticle(token, content),
    edit: (token, slug, detailsToChange) =>
      this.editArticle(token, slug, detailsToChange),
    delete: (token, slug) => this.deleteArticle(token, slug),
  };

  authentication = {
    register: (username, email, password) =>
      this.registerUser(username, email, password),
    login: (email, password) => this.loginUser(email, password),
    edit: (token, detailsToChange) => this.editProfile(token, detailsToChange),
  };

// BASE_URL = 'https://conduit.productionready.io/api';
  BASE_URL = "http://kata.academy:8022/api";
// BASE_URL = 'https://api.realworld.io/api';

// BASE_URL = 'https://cirosantilli-realworld-express.herokuapp.com/api';

//    "email":"a@a.a",
//    "username":"iakovlev",
//    password: "aaaaaa"

  async getResource(extraUrl, method, token) {
    try {
      const response = await fetch(
        `${this.BASE_URL}/${extraUrl}`,
        createRequestOptions(method, token)
      );

      return response.json();
    } catch {
      throw new Error();
    }
  }

  // запрос на получение списка статей
  async getArticleList(page) {
    const extraUrl = `articles?limit=5&offset=${(page - 1) * 5}`;

    const response = await this.getResource(extraUrl);
    const { articles, articlesCount } = response;

    // в newArticles сохраним только то, чем будем пользоваться
    const newArticles = articles.map((article) => {
      const {
        author,
        body,
        createdAt,
        description,
        favorited,
        favoritesCount,
        slug,
        tagList,
        title,
      } = article;

      return {
        author: {
          image: author.image,
          username: author.username,
        },
        body,
        createdAt: format(new Date(createdAt), "MMMM d, yyyy"),
        description: cropText(description, 170),
        favorited,
        favoritesCount,
        slug,
        tagList,
        title,
      };
    });

    return {
      articles: newArticles,
      articlesCount,
    };
  }

  // запрос на получение статьи
  async getArticle(segment) {
    const extraUrl = `articles/${segment}`;

    const response = await this.getResource(extraUrl);
    const { article } = response;
    const {
      author,
      body = "",
      createdAt,
      description,
      favorited,
      favoritesCount,
      slug,
      tagList,
      title,
    } = article;

    // вернем только то, чем будем пользоваться
    return {
      author: {
        image: author.image,
        username: author.username,
      },
      body,
      createdAt: format(new Date(createdAt), "MMMM d, yyyy"),
      description: cropText(description, 170),
      favorited,
      favoritesCount,
      slug,
      tagList,
      title: cropText(title, 100),
    };
  }

  // запрос на то, чтобы поставить лайк статье
  async favoriteArticle(token, slug) {
    const url = `articles/${slug}/favorite`;
    const response = await this.getResource(url, "POST", token);

    // если ответ res содержит объект article, значит запрос прошел успешно
    return !!response.article;
  }

  // запрос на то, чтобы удалить лайк у статьи
  async unfavoriteArticle(token, slug) {
    const url = `articles/${slug}/favorite`;
    const response = await this.getResource(url, "DELETE", token);

    // если ответ res содержит объект article, значит запрос прошел успешно
    return !!response.article;
  }

  // Запрос на авторизацию пользователя
  async createArticle (token, newArticleContent) {
    const url = `${this.BASE_URL}/articles`;

    const requestBody = {
      article: {
        ...newArticleContent,
      },
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(requestBody),
    };

    try {
      const response = await fetch(url, requestOptions);
      return response.json();
    } catch {
      throw new Error();
    }
  };

  // Запрос на имзенение статьи
  async editArticle (token, slug, detailsToChange) {
    const url = `${this.BASE_URL}/articles/${slug}`;

    const requestBody = {
      article: {
        ...detailsToChange,
      },
    };

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(requestBody),
    };

    try {
      const response = await fetch(url, requestOptions);
      return response.json();
    } catch {
      throw new Error();
    }
  };

  // запрос на удаление статьи
  async deleteArticle(token, slug) {
    const url = `${this.BASE_URL}/articles/${slug}`;

    try {
      const response = await fetch(url, createRequestOptions("DELETE", token));

      return !!response.ok;
    } catch {
      throw new Error();
    }
  }

  // Запрос на регистрацию нового пользователя
  async registerUser(username, email, password){
    const url = `${this.BASE_URL}/users`;
    const data = {
      user: {
        username,
        email,
        password,
      },
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, requestOptions);

      return response.json();
    } catch {
      throw new Error();
    }
  };

  // Запрос на авторизацию пользователя
  async loginUser(email, password){
    const url = `${this.BASE_URL}/users/login`;
    const data = {
      user: {
        email,
        password,
      },
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, requestOptions);

      return response.json();
    } catch {
      throw new Error();
    }
  };

  // Запрос на имзенение информации о пользователе
  async editProfile(token, detailsToChange){
    const url = `${this.BASE_URL}/user`;

    const requestBody = {
      user: {
        ...detailsToChange,
      },
    };

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(requestBody),
    };

    try {
      const response = await fetch(url, requestOptions);

      return response.json();
    } catch {
      throw new Error();
    }
  };
}

const realWorldApiService = new RealWorldApiService();

export default realWorldApiService;
