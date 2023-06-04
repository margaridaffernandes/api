const buildCodedTextInitialValue = (item, pathLabel, initialValues) => {
  let defaultValue = undefined;
  let items;

  if (item.itemsList === undefined || Array.isArray(item.Refset) && item.Refset.length > 0) {
    items = [];
  } else {
    items = item.itemsList;
  }

  if (item.constraints !== undefined) {
    let possibleDefaultValues = [];
    item.constraints.forEach(obj => {
      let objs = items.filter(x => x.code === obj.default_value.code);
      possibleDefaultValues.push(...objs);
    });

    if (possibleDefaultValues.length !== 0) {
      if (item.occurrences.upperOccurrences === 1) {
        defaultValue = possibleDefaultValues[0]; // objeto
      } else {
        defaultValue = possibleDefaultValues; // array
      }
    }
  }

  let value = item.value === null ? "" : item.value;

  if (item.occurrences.upperOccurrences === 1) {
    initialValues[pathLabel] = value === "" && defaultValue !== undefined ? defaultValue : value; // defaultValue já está em objeto
  } else {
    if (value === "") {
      initialValues[pathLabel] = defaultValue !== undefined ? defaultValue : []; // defaultValue já está em array
    } else {
      initialValues[pathLabel] = value;
    }
  }
};

export { buildCodedTextInitialValue };