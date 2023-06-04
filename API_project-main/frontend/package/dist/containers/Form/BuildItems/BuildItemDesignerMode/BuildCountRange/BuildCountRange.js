import React from "react";
import CountRange from "../../../../../components/FormDesigner/Datatypes/CountRange/CountRange";
import { buildInitialValueEditMode } from "../../../FormInitialValues/BuildInitialValue/BuildInitialValue";
import { firstAnyItem } from "../../../../../assets/functions/FirstAnyItem/FirstAnyItem";

const buildCountRangeFormDesigner = (item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder) => {
  const isRM = pathArray[0] === "rm" ? true : false;
  const label = isRM ? item.itemName : item.node === null ? item.text : item.node.text;
  let arrayStart = [];
  let arrayEnd = [];
  arrayStart.push("value", "start");
  arrayEnd.push("value", "end");
  const pathLabelStart = pathArray.concat(arrayStart).join("-");
  const pathLabelEnd = pathArray.concat(arrayEnd).join("-");
  buildInitialValueEditMode(item, pathLabelStart, initialValues);
  buildInitialValueEditMode(item, pathLabelEnd, initialValues);
  return /*#__PURE__*/React.createElement(CountRange, {
    isRM: isRM,
    data: isRM && item,
    isSection: false,
    groupID: item.groupID,
    path: pathArray.join("."),
    handleFormOrder: handleFormOrder,
    order: formOrder ? formOrder[pathArray.join(".")] : null,
    item: item,
    key: itemIndex,
    isAny: isAny,
    showLabel: !isAny || (formOrder ? firstAnyItem(formOrder, pathArray, isAny) : itemIndex === 0),
    startValue: values[pathLabelStart],
    endValue: values[pathLabelEnd],
    onCountRangeChange: setFieldValue,
    label: label,
    pathLabelStart: pathLabelStart,
    pathLabelEnd: pathLabelEnd,
    optional: item.occurrences.lowerOccurrences === 0,
    sectionOccurrence: itemSection[itemSection.length - 1],
    description: isRM ? item.description : item.node === null ? "" : item.node.description
  });
};

export { buildCountRangeFormDesigner };