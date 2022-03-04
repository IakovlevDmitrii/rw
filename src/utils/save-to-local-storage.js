const saveToLocalStorage = (state) => {
  try {
    const serialisedState = JSON.stringify(state);

    localStorage.setItem("realworldStr", serialisedState);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
  }
};

export default saveToLocalStorage;
