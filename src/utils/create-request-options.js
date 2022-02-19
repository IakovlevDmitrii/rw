// функция для создания тела запроса при взаимодействии с api
const createRequestOptions = (method, token) => ({
  method,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: `Token ${token}`,
  },
});

export default createRequestOptions;
