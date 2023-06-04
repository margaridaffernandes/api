const buildQuantityInitialValue = (item, pathLabel, initialValues) => {
  let pathLabelArray = pathLabel.split("-");

  if (pathLabelArray[pathLabelArray.length - 1] === "unit") {
    let defaultUnit = null;

    if (item.default) {
      if (item.default.unit) {
        defaultUnit = item.default.unit;
      }
    }

    let unitsList = [];

    if (Array.isArray(item.units)) {
      item.units.forEach(obj => {
        unitsList.push(obj.unit);
      });
    } else {
      unitsList.push(item.units.unit);
    }

    let unit; // Se houver mais do que uma unidade, vou meter o default value se houver

    if (unitsList.length > 1) {
      // Só é colocado o default quando não há valor definido no item.value.unit e se o defaultValue for diferente de null
      unit = item.value.unit === null ? defaultUnit !== null ? defaultUnit : "" : item.value.unit;
    } else {
      // Se só houver uma unidade não ponho nada na unidade 
      unit = item.value.unit === null ? "" : item.value.unit;
    }

    initialValues[pathLabel] = unit;
  } else if (pathLabelArray[pathLabelArray.length - 1] === "value") {
    let quantity = item.value.value === null ? "" : item.value.value;
    initialValues[pathLabel] = quantity;
  }
};

export { buildQuantityInitialValue };