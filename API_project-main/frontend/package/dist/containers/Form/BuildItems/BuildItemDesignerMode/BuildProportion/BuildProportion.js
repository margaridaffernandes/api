import React from "react";
import Proportion from "../../../../../components/FormDesigner/Datatypes/Proportion/Proportion";
import { buildInitialValueEditMode } from "../../../FormInitialValues/BuildInitialValue/BuildInitialValue";
import { firstAnyItem } from "../../../../../assets/functions/FirstAnyItem/FirstAnyItem";

const buildProportionFormDesigner = (item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder) => {
  const isRM = pathArray[0] === "rm" ? true : false;
  const label = isRM ? item.itemName : item.node === null ? item.text : item.node.text;
  let array = [];
  array.push("value");
  const pathLabel = pathArray.concat(array).join("-");
  buildInitialValueEditMode(item, pathLabel, initialValues);
  return /*#__PURE__*/React.createElement(Proportion, {
    isRM: isRM,
    data: isRM && item,
    isSection: false,
    groupID: item.groupID,
    handleFormOrder: handleFormOrder,
    order: formOrder ? formOrder[pathArray.join(".")] : null,
    item: item,
    key: itemIndex,
    isAny: isAny,
    path: pathArray.join("."),
    showLabel: !isAny || (formOrder ? firstAnyItem(formOrder, pathArray, isAny) : itemIndex === 0),
    value: values[pathLabel],
    onProportionChange: setFieldValue,
    label: label,
    pathLabel: pathLabel,
    optional: item.occurrences.lowerOccurrences === 0,
    sectionOccurrence: itemSection[itemSection.length - 1],
    description: isRM ? item.description : item.node === null ? "" : item.node.description,
    type: item.type
  });
};

export { buildProportionFormDesigner };