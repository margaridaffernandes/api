const buildIdentifierInitialValue = (item, pathLabel, initialValues) => {
  if (item.occurrences.upperOccurrences === 1) {
    if (item.value === null) {
      initialValues[pathLabel] = "";
    } else {
      initialValues[pathLabel] = item.value;
    }
  } else {
    if (item.value === null) {
      initialValues[pathLabel] = [{
        identifierId: 0,
        value: ""
      }];
    } else {
      initialValues[pathLabel] = item.value;
    }
  }
};

export { buildIdentifierInitialValue };