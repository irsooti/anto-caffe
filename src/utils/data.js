export const updateState = (oldState, newState) => {
  return {
    ...oldState,
    ...newState
  };
};
