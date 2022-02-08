const saveToLocalStorage = (state) => {
  try {
    const serialisedState = JSON.stringify(state);

    localStorage.setItem('realworldStr', serialisedState);
  } catch (error) {
    console.warn(error);
  }
};

export default saveToLocalStorage;
