import { handleIsVisible } from "../HandleTasks/handleIsVisible";

const handleSectionValidationDataType = (item, pathArray, array, professionalTasks) => {
  let isVisible;

  if (!item.TaskVisible) {
    isVisible = false;
  } else {
    isVisible = handleIsVisible(item, professionalTasks);
  }

  if (isVisible) {
    if (item.dataType === "DV_TEXT" || item.dataType === "DV_BOOLEAN" || item.dataType === "DV_CODED_TEXT" || item.dataType === "DV_DATE" || item.dataType === "DV_TIME" || item.dataType === "DV_COUNT" || item.dataType === "DV_IDENTIFIER" || item.dataType === "DV_MULTIMEDIA" || item.dataType === "DV_ORDINAL" || item.dataType === "DV_PROPORTION") {
      let value = [...array, "value"];
      return pathArray.concat(value).join("-");
    } else if (item.dataType === "DV_QUANTITY" || item.dataType === "DV_DURATION") {
      let unit = [...array, "value", "unit"];
      let value = [...array, "value", "value"];
      return [pathArray.concat(value).join("-"), pathArray.concat(unit).join("-")];
    } else if (item.dataType === "DV_DATE_TIME") {
      let date = [...array, "value", "date"];
      let time = [...array, "value", "time"];
      return [pathArray.concat(date).join("-"), pathArray.concat(time).join("-")];
    } else if (item.dataType === "DV_INTERVAL<DV_DATE>" || item.dataType === "DV_INTERVAL<DV_TIME>" || item.dataType === "DV_INTERVAL<DV_COUNT>") {
      let end = [...array, "value", "end"];
      let start = [...array, "value", "start"];
      return [pathArray.concat(start).join("-"), pathArray.concat(end).join("-")];
    } else if (item.dataType === "DV_INTERVAL<DV_DATE_TIME>") {
      let endDate = [...array, "value", "date", "end"];
      let startDate = [...array, "value", "date", "start"];
      let endTime = [...array, "value", "time", "end"];
      let startTime = [...array, "value", "time", "start"];
      return [pathArray.concat(startDate).join("-"), pathArray.concat(endDate).join("-"), pathArray.concat(endTime).join("-"), pathArray.concat(startTime).join("-")];
    } else if (item.dataType === "DV_INTERVAL<DV_QUANTITY>") {
      let end = [...array, "value", "value", "end"];
      let start = [...array, "value", "value", "start"];
      let unit = [...array, "value", "unit"];
      return [pathArray.concat(start).join("-"), pathArray.concat(end).join("-"), pathArray.concat(unit).join("-")];
    }
  }
};

const handleSectionValidationAny = (item, pathArray, array, professionalTasks) => {
  let paths = item.map((subItem, index) => {
    return handleSectionValidationDataType(subItem, pathArray, [...array, index], professionalTasks);
  });
  return paths;
};

const handleSectionValidationItem = (item, pathArray, array, professionalTasks) => {
  let paths = item.items.map((subItem, subItemIndex) => {
    if (subItem.data_type === "Title") {
      return handleSectionValidationItem(subItem, pathArray, [...array, "items", subItemIndex], professionalTasks);
    } else {
      if (Array.isArray(subItem)) {
        return handleSectionValidationAny(subItem, pathArray, [...array, "items", subItemIndex], professionalTasks);
      } else {
        return handleSectionValidationDataType(subItem, pathArray, [...array, "items", subItemIndex], professionalTasks);
      }
    }
  });
  return paths;
};

const handleSectionValidation = (item, pathArray, professionalTasks) => {
  let itemsPaths = item.items.map((item, index) => {
    if (item.data_type === "Title") {
      return handleSectionValidationItem(item, pathArray, ["items", index], professionalTasks);
    } else {
      if (Array.isArray(item)) {
        return handleSectionValidationAny(item, pathArray, ["items", index], professionalTasks);
      } else {
        return handleSectionValidationDataType(item, pathArray, ["items", index], professionalTasks);
      }
    }
  });
  const processed = itemsPaths.toString().split(",");
  return processed.filter(x => x !== "");
};

export { handleSectionValidation };