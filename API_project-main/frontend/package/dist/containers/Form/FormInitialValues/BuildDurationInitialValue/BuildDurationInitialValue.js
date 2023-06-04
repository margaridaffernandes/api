const buildDurationInitialValue = (item, pathLabel, initialValues) => {
  let pathLabelArray = pathLabel.split("-");

  if (pathLabelArray[pathLabelArray.length - 1] === "unit") {
    let unit = item.value.unit === null ? "" : item.value.unit;
    initialValues[pathLabel] = unit;
  } else if (pathLabelArray[pathLabelArray.length - 1] === "value") {
    let duration = item.value.value === null ? "" : item.value.value;
    initialValues[pathLabel] = duration;
  }
};

export { buildDurationInitialValue };