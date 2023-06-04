const totalPoints = (total, newValue, oldValue) => {
  let sum = 0;

  if (total !== undefined || total !== "") {
    if (!isNaN(total)) {
      sum = Number(total);
    }
  }

  if (!isNaN(oldValue)) {
    sum -= Number(oldValue);
  }

  if (!isNaN(newValue)) {
    sum += Number(newValue);
  }

  return sum;
};

export { totalPoints };