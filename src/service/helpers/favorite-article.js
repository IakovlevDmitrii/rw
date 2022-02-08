import BASE_URL from './base-url';

const favoriteArticle = async (token, slug) => {
  const url = `${BASE_URL}/articles/${slug}/favorite`;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
  };

  try {
    const response = await fetch(url, requestOptions);
    return response.json();
  } catch {
    throw new Error();
  }
};

export default favoriteArticle;
