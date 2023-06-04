const orderObjectByValue = obj => {
  let sortable = [];
  let newObj = {};

  for (let i in obj) {
    sortable.push([i, obj[i]]);
  }

  sortable.sort(function (a, b) {
    return a[1] - b[1];
  });
  sortable.forEach(x => {
    newObj[x[0]] = x[1];
  });
  return newObj;
};

export { orderObjectByValue };