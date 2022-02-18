import { format } from "date-fns";
import { cropText } from "../utils";

import {
  createArticle,
  editArticle,
  deleteArticle,
  registerUser,
  loginUser,
  editProfile,
} from "./helpers";

class RealWorldApiService {
  articles = {
    getList: (page) => this.getList(page),
    getOne: (slug) => this.getOne(slug),
    favorite: (token, slug) => this.favoriteArticle(token, slug),
    unfavorite: (token, slug) => this.unfavoriteArticle(token, slug),
    create: (token, content) => createArticle(token, content),
    edit: (token, slug, detailsToChange) =>
      editArticle(token, slug, detailsToChange),
    delete: (token, slug) => deleteArticle(token, slug),
  };

  authentication = {
    register: (username, email, password) =>
      registerUser(username, email, password),
    login: (email, password) => loginUser(email, password),
    edit: (token, detailsToChange) => editProfile(token, detailsToChange),
  };

  BASE_URL = "http://kata.academy:8022/api";

  async getResource(extraUrl, requestOptions) {
    try {
      const response = await fetch(
        `${this.BASE_URL}/${extraUrl}`,
        requestOptions
      );

      return response.json();
    } catch {
      throw new Error();
    }
  }

  // запрос на получение списка статей
  async getList(page) {
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
  async getOne(segment) {
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

    // Заголовки запроса
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${token}`,
      },
    };

    const response = await this.getResource(url, requestOptions);

    // если ответ res содержит объект article, значит запрос прошел успешно
    return !!response.article;
  }

  // запрос на то, чтобы удалить лайк у статьи
  async unfavoriteArticle(token, slug) {
    const url = `articles/${slug}/favorite`;

    // Заголовки запроса
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${token}`,
      },
    };

    const response = await this.getResource(url, requestOptions);

    // если ответ res содержит объект article, значит запрос прошел успешно
    return !!response.article;
  }
}

const realWorldApiService = new RealWorldApiService();

export default realWorldApiService;
