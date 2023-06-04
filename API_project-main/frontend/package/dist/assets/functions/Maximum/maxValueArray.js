const maxValueArray = array => {
  let max = 0;
  array.forEach(x => {
    if (x > max) {
      max = x;
    }
  });
  return max;
};

export { maxValueArray };