import BASE_URL from './base-url';

// Запрос на авторизацию пользователя
const loginUser = async (email, password) => {
  const url = `${BASE_URL}/users/login`;

  const data = {
    user: {
      email,
      password,
    },
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
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

export default loginUser;
