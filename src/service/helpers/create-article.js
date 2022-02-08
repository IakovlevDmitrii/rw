import BASE_URL from './base-url';

// Запрос на авторизацию пользователя
const createArticle = async (token, newArticleContent) => {
  const url = `${BASE_URL}/articles`;

  const requestBody = {
    article: {
      ...newArticleContent,
    },
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
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

export default createArticle;
