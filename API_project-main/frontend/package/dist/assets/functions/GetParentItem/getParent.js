import ob from "object-path";

const getParent = (itemPath, temp) => {
  let res;
  let parentPath = [...itemPath];
  parentPath.pop();
  parentPath.pop();

  if (parentPath.length === 1) {
    res = "parentless";
  } else {
    res = ob.get(temp, parentPath);
  }

  return res;
};

export { getParent };