const findRMComponent = (obj, arr) => {
  let res = arr;

  for (const key in obj) {
    const value = obj[key]; // só coloca na lista os items do RM_MATERIALIZED que contém um internalPath e apenas se esse internalPath existir no RETRIEVAL_RM
    //if (key === 'internalPath' && obj[key] === ) {

    if (key === 'internalPath') {
      res.push(obj);
    } else if (typeof value === 'object' && value) {
      findRMComponent(obj[key], res);
    }
  }

  return res;
};

export { findRMComponent };