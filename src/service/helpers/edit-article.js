import BASE_URL from './base-url';

// Запрос на имзенение статьи
const editArticle = async (token, slug, detailsToChange) => {
  const url = `${BASE_URL}/articles/${slug}`;

  const requestBody = {
    article: {
      ...detailsToChange,
    },
  };

  const requestOptions = {
    method: 'PUT',
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

export default editArticle;
