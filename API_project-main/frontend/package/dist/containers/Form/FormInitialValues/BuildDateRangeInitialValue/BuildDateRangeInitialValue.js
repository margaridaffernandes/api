const buildDateRangeInitialValue = (item, pathLabel, initialValues) => {
  let pathLabelArray = pathLabel.split("-");

  if (pathLabelArray[pathLabelArray.length - 1] === "end") {
    let end = item.value.end === null ? "" : item.value.end;
    initialValues[pathLabel] = end;
  } else if (pathLabelArray[pathLabelArray.length - 1] === "start") {
    let start = item.value.start === null ? "" : item.value.start;
    initialValues[pathLabel] = start;
  }
};

export { buildDateRangeInitialValue };