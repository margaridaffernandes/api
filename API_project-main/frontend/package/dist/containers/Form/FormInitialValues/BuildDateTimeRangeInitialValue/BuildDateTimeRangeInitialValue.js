const buildDateTimeRangeInitialValue = (item, pathLabel, initialValues) => {
  let pathLabelArray = pathLabel.split("-");

  if (pathLabelArray[pathLabelArray.length - 1] === "end" && pathLabelArray[pathLabelArray.length - 2] === "date") {
    let endDate = item.value.date.end === null ? "" : item.value.date.end;
    initialValues[pathLabel] = endDate;
  } else if (pathLabelArray[pathLabelArray.length - 1] === "start" && pathLabelArray[pathLabelArray.length - 2] === "date") {
    let startDate = item.value.date.start === null ? "" : item.value.date.start;
    initialValues[pathLabel] = startDate;
  } else if (pathLabelArray[pathLabelArray.length - 1] === "start" && pathLabelArray[pathLabelArray.length - 2] === "time") {
    let startTime = item.value.time.start === null ? "" : item.value.time.start;
    initialValues[pathLabel] = startTime;
  } else if (pathLabelArray[pathLabelArray.length - 1] === "end" && pathLabelArray[pathLabelArray.length - 2] === "time") {
    let endTime = item.value.time.end === null ? "" : item.value.time.end;
    initialValues[pathLabel] = endTime;
  }
};

export { buildDateTimeRangeInitialValue };