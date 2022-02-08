import BASE_URL from './base-url';

// Запрос на регистрацию нового пользователя
const registerUser = async (username, email, password) => {
  const url = `${BASE_URL}/users`;
  const data = {
    user: {
      username,
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

export default registerUser;
