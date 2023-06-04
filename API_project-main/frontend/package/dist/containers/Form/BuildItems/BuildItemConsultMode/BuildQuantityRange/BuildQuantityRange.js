import React from "react";
import QuantityRange from "../../../../../components/Datatypes/QuantityRange/QuantityRange";
import { handleIsVisible } from "../../../../../assets/functions/HandleTasks/handleIsVisible";
import { firstAnyItem } from "../../../../../assets/functions/FirstAnyItem/FirstAnyItem";

const buildQuantityRange = (item, itemIndex, isAny = false, professionalTasks, order, pathArray) => {
  let isVisible;

  if (!item.TaskVisible) {
    isVisible = false;
  } else {
    isVisible = handleIsVisible(item, professionalTasks);
  }

  const isRM = pathArray[0] === "rm" ? true : false;

  if (isVisible) {
    return /*#__PURE__*/React.createElement(QuantityRange, {
      key: itemIndex,
      showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
      editMode: false,
      path: pathArray.join("."),
      startValue: item.value.value.start === null ? "" : item.value.value.start + " " + item.value.unit,
      endValue: item.value.value.end === null ? "" : item.value.value.end + " " + item.value.unit,
      label: isRM ? item.itemName : item.node === null ? item.text : item.node.text,
      description: isRM ? item.description : item.node === null ? "" : item.node.description,
      order: order ? order[pathArray.join(".")] : null
    });
  }
};

export { buildQuantityRange };