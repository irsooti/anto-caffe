export const updateState = (oldState, newState) => {
  return {
    ...oldState,
    ...newState
  };
};

export const normalizeToDashcase = (str) => {
  str = str.replace(/\W+(?!$)/g, '-').toLowerCase();
  str = str.replace(/\W+$/, '').toLowerCase();

  return str;
}
