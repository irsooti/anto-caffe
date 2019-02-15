export const updateState = (oldState, newState) => {
  return {
    ...oldState,
    ...newState
  };
};

export const normalizeToDashcase = str => {
  str = str.replace(/\W+(?!$)/g, '-').toLowerCase();
  str = str.replace(/\W+$/, '').toLowerCase();

  return str;
};

export const reduceFirebaseUuid = val => {
  return Object.keys(val).map(fb => {
    let o = val[fb];
    o._id = fb;
    return o;
  });
};

export const getTodayPath = () => {
  let today = new Date();
  return today.getDate() + '' + today.getFullYear() + '' + today.getMonth();
};
