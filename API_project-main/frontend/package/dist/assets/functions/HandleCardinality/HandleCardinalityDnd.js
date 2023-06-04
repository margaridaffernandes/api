// Quando são campos que têm mais do que um path (tipo quantity, duration, etc)
// só uso um deles para assinalar o campo
const handleCardinalityDataType = (item, pathArray, array) => {
  if (item.dataType === "DV_TEXT" || item.dataType === "DV_BOOLEAN" || item.dataType === "DV_CODED_TEXT" || item.dataType === "DV_DATE" || item.dataType === "DV_TIME" || item.dataType === "DV_COUNT" || item.dataType === "DV_IDENTIFIER" || item.dataType === "DV_MULTIMEDIA" || item.dataType === "DV_ORDINAL" || item.dataType === "DV_PROPORTION") {
    let value = [...array, "value"];
    return pathArray.concat(value).join("-");
  } else if (item.dataType === "DV_QUANTITY" || item.dataType === "DV_DURATION") {
    let value = [...array, "value", "value"];
    return pathArray.concat(value).join("-");
  } else if (item.dataType === "DV_DATE_TIME") {
    let date = [...array, "value", "date"];
    return pathArray.concat(date).join("-");
  } else if (item.dataType === "DV_INTERVAL<DV_DATE>" || item.dataType === "DV_INTERVAL<DV_TIME>" || item.dataType === "DV_INTERVAL<DV_COUNT>") {
    let start = [...array, "value", "start"];
    return pathArray.concat(start).join("-");
  } else if (item.dataType === "DV_INTERVAL<DV_DATE_TIME>") {
    let startDate = [...array, "value", "date", "start"];
    return pathArray.concat(startDate).join("-");
  } else if (item.dataType === "DV_INTERVAL<DV_QUANTITY>") {
    let start = [...array, "value", "value", "start"];
    return pathArray.concat(start).join("-");
  }
};

const handleCardinalityAny = (item, pathArray, array) => {
  let paths = item.map((subItem, index) => {
    return handleCardinalityDataType(subItem, pathArray, [...array, index]);
  });
  return paths;
};

const handleCardinalityItem = (item, pathArray, array) => {
  let paths = item.items.map((subItem, subItemIndex) => {
    if (subItem.data_type === "Title") {
      return handleCardinalityItem(subItem, pathArray, [...array, "items", subItemIndex]);
    } else {
      if (Array.isArray(subItem)) {
        return handleCardinalityAny(subItem, pathArray, [...array, "items", subItemIndex]);
      } else {
        return handleCardinalityDataType(subItem, pathArray, [...array, "items", subItemIndex]);
      }
    }
  });
  return paths;
};

const handleCardinalityDnd = (item, pathArray) => {
  let itemsPaths = item.items.map((item, index) => {
    if (item.data_type === "Title") {
      return handleCardinalityItem(item, pathArray, ["items", index]);
    } else {
      if (Array.isArray(item)) {
        return handleCardinalityAny(item, pathArray, ["items", index]);
      } else {
        return handleCardinalityDataType(item, pathArray, ["items", index]);
      }
    }
  });
  return itemsPaths.toString().split(",");
};

export { handleCardinalityDnd };