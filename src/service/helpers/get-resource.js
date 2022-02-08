const getResource = async (url) => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch {
    throw new Error();
  }
};

export default getResource;
