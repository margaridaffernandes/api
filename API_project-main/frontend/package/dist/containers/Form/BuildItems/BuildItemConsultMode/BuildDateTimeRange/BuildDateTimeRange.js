import React from "react";
import DateTimeRange from "../../../../../components/Datatypes/DateTimeRange/DateTimeRange";
import { handleIsVisible } from "../../../../../assets/functions/HandleTasks/handleIsVisible";
import { firstAnyItem } from "../../../../../assets/functions/FirstAnyItem/FirstAnyItem";

const buildDateTimeRange = (item, itemIndex, isAny = false, professionalTasks, order, pathArray) => {
  let isVisible;

  if (!item.TaskVisible) {
    isVisible = false;
  } else {
    isVisible = handleIsVisible(item, professionalTasks);
  }

  const isRM = pathArray[0] === "rm" ? true : false;

  if (isVisible) {
    return /*#__PURE__*/React.createElement(DateTimeRange, {
      order: order ? order[pathArray.join(".")] : null,
      key: itemIndex,
      showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
      editMode: false,
      path: pathArray.join("."),
      endTimeValue: item.value.time.end === null ? "" : item.value.time.end,
      startTimeValue: item.value.time.start === null ? "" : item.value.time.start,
      endDateValue: item.value.date.end === null ? "" : item.value.date.end,
      startDateValue: item.value.date.start === null ? "" : item.value.date.start,
      label: isRM ? item.itemName : item.node === null ? item.text : item.node.text,
      description: isRM ? item.description : item.node === null ? "" : item.node.description
    });
  }
};

export { buildDateTimeRange };