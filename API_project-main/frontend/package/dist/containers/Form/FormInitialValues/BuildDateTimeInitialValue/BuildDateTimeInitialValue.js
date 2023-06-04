const buildDateTimeInitialValue = (item, pathLabel, initialValues) => {
  let pathLabelArray = pathLabel.split("-");

  if (pathLabelArray[pathLabelArray.length - 1] === "date") {
    let date = item.value.date === null ? "" : item.value.date;
    initialValues[pathLabel] = date;
  } else if (pathLabelArray[pathLabelArray.length - 1] === "time") {
    let time = item.value.time === null ? "" : item.value.time;
    initialValues[pathLabel] = time;
  }
};

export { buildDateTimeInitialValue };