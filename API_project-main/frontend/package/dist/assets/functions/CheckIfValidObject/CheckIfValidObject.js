const checkIfValidObject = (obj1, obj2) => {
  const obj1Props = Object.keys(obj1);
  const obj2Props = Object.keys(obj2);

  if (obj1Props.length === obj2Props.length) {
    return obj1Props.every(p => {
      return obj2Props.indexOf(p) > -1;
    });
  }

  return false;
};

export { checkIfValidObject };