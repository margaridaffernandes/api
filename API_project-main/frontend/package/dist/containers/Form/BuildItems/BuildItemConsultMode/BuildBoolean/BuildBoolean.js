import React from "react";
import Boolean from "../../../../../components/Datatypes/Boolean/Boolean";
import { handleIsVisible } from "../../../../../assets/functions/HandleTasks/handleIsVisible";
import { firstAnyItem } from "../../../../../assets/functions/FirstAnyItem/FirstAnyItem";

const buildBoolean = (item, itemIndex, isAny = false, professionalTasks, order, pathArray) => {
  let isVisible;

  if (!item.TaskVisible) {
    isVisible = false;
  } else {
    isVisible = handleIsVisible(item, professionalTasks);
  }

  const isRM = pathArray[0] === "rm" ? true : false;

  if (isVisible) {
    return /*#__PURE__*/React.createElement(Boolean, {
      order: order ? order[pathArray.join(".")] : null,
      key: itemIndex,
      path: pathArray.join("."),
      showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
      editMode: false,
      value: item.value === null ? "" : item.value,
      label: isRM ? item.itemName : item.node === null ? item.text : item.node.text,
      description: isRM ? item.description : item.node === null ? "" : item.node.description
    });
  }
};

export { buildBoolean };