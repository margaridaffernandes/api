const buildQuantityRangeInitialValue = (item, pathLabel, initialValues) => {
  let pathLabelArray = pathLabel.split("-");

  if (pathLabelArray[pathLabelArray.length - 1] === "unit") {
    let unit = item.value.unit === null ? "" : item.value.unit;
    initialValues[pathLabel] = unit;
  } else if (pathLabelArray[pathLabelArray.length - 1] === "start") {
    let start = item.value.value.start === null ? "" : item.value.value.start;
    initialValues[pathLabel] = start;
  } else if (pathLabelArray[pathLabelArray.length - 1] === "end") {
    let end = item.value.value.end === null ? "" : item.value.value.end;
    initialValues[pathLabel] = end;
  }
};

export { buildQuantityRangeInitialValue };