const loadFromLocalStorage = () => {
  try {
    const serialisedState = localStorage.getItem('realworldStr');

    if (serialisedState === null) {
      return undefined;
    }

    return JSON.parse(serialisedState);
  } catch (error) {
    console.warn(error);

    return undefined;
  }
};

export default loadFromLocalStorage;
