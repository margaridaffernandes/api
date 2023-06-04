import React from "react";
import DateRange from "../../../../../components/Datatypes/DateRange/DateRange";
import { handleIsVisible } from "../../../../../assets/functions/HandleTasks/handleIsVisible";
import { firstAnyItem } from "../../../../../assets/functions/FirstAnyItem/FirstAnyItem";

const buildDateRange = (item, itemIndex, isAny = false, professionalTasks, order, pathArray) => {
  let isVisible;

  if (!item.TaskVisible) {
    isVisible = false;
  } else {
    isVisible = handleIsVisible(item, professionalTasks);
  }

  const isRM = pathArray[0] === "rm" ? true : false;

  if (isVisible) {
    return /*#__PURE__*/React.createElement(DateRange, {
      order: order ? order[pathArray.join(".")] : null,
      key: itemIndex,
      showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
      editMode: false,
      path: pathArray.join("."),
      endValue: item.value.end === null ? "" : item.value.end,
      startValue: item.value.start === null ? "" : item.value.start,
      label: isRM ? item.itemName : item.node === null ? item.text : item.node.text,
      description: isRM ? item.description : item.node === null ? "" : item.node.description
    });
  }
};

export { buildDateRange };