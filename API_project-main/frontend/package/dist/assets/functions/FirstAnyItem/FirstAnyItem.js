// Verifica se é o primeiro item de um campo any
const firstAnyItem = (formOrder, pathArray, isAny) => {
  if (isAny) {
    const array = [...pathArray];
    array.pop();
    let breaked = false;
    let min = formOrder[pathArray.join(".")];
    Object.keys(formOrder).forEach(p => {
      if (p.indexOf(array.join(".") + ".") > -1) {
        if (formOrder[p] < min) {
          breaked = true;
        }
      }
    });

    if (breaked === false) {
      return true;
    }
  }

  return false;
};

export { firstAnyItem };