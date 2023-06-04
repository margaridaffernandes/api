import React from "react";
import Dropdown from "../../../../../components/Datatypes/Dropdown/Dropdown";
import { handleIsVisible } from "../../../../../assets/functions/HandleTasks/handleIsVisible";
import { firstAnyItem } from "../../../../../assets/functions/FirstAnyItem/FirstAnyItem";

const buildCodedText = (item, itemIndex, isAny = false, professionalTasks, order, pathArray) => {
  let isVisible;

  if (!item.TaskVisible) {
    isVisible = false;
  } else {
    isVisible = handleIsVisible(item, professionalTasks);
  }

  const isRM = pathArray[0] === "rm" ? true : false;

  if (isVisible) {
    return /*#__PURE__*/React.createElement(Dropdown, {
      order: order ? order[pathArray.join(".")] : null,
      key: itemIndex,
      showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
      editMode: false,
      path: pathArray.join("."),
      value: item.value === null ? "" : Array.isArray(item.value) ? item.value.map(obj => {
        return obj.text;
      }).join(", ") : item.value.text,
      label: isRM ? item.itemName : item.node === null ? item.text : item.node.text,
      description: isRM ? item.description : item.node === null ? "" : item.node.description
    });
  }
};

export { buildCodedText };