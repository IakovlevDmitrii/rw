import BASE_URL from './base-url';

const deleteArticle = async (token, slug) => {
  const url = `${BASE_URL}/articles/${slug}`;

  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
  };

  try {
    const response = await fetch(url, requestOptions);

    if (response.ok) {
      return 'ok';
    }
    return response.json();
  } catch {
    throw new Error();
  }
};

export default deleteArticle;
