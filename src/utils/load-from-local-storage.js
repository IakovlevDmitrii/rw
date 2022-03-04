const loadFromLocalStorage = () => {
  try {
    const serialisedState = localStorage.getItem("realworldStr");

    if (serialisedState === null) {
      return undefined;
    }

    return JSON.parse(serialisedState);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);

    return undefined;
  }
};

export default loadFromLocalStorage;
