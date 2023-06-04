import React from "react";
import QuantityRange from "../../../../../components/FormDesigner/Datatypes/QuantityRange/QuantityRange";
import { buildInitialValueEditMode } from "../../../FormInitialValues/BuildInitialValue/BuildInitialValue";
import { firstAnyItem } from "../../../../../assets/functions/FirstAnyItem/FirstAnyItem";

const buildQuantityRangeFormDesigner = (item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder) => {
  const isRM = pathArray[0] === "rm" ? true : false;
  const label = isRM ? item.itemName : item.node === null ? item.text : item.node.text;
  let arrayStart = [];
  let arrayEnd = [];
  let arrayUnit = [];
  arrayStart.push("value", "value", "start");
  arrayEnd.push("value", "value", "end");
  arrayUnit.push("value", "unit");
  const pathLabelStart = pathArray.concat(arrayStart).join("-");
  const pathLabelEnd = pathArray.concat(arrayEnd).join("-");
  const pathLabelUnit = pathArray.concat(arrayUnit).join("-");
  buildInitialValueEditMode(item, pathLabelStart, initialValues);
  buildInitialValueEditMode(item, pathLabelEnd, initialValues);
  buildInitialValueEditMode(item, pathLabelUnit, initialValues);
  let unitsList = [];

  if (Array.isArray(item.units)) {
    item.units.forEach(obj => {
      unitsList.push(obj.unit);
    });
  } else {
    unitsList.push(item.units.unit);
  }

  return /*#__PURE__*/React.createElement(QuantityRange, {
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
    unitValue: values[pathLabelUnit],
    onQuantityRangeChange: setFieldValue,
    label: label,
    unitsList: unitsList,
    pathLabelStart: pathLabelStart,
    pathLabelEnd: pathLabelEnd,
    pathLabelUnit: pathLabelUnit,
    optional: item.occurrences.lowerOccurrences === 0,
    sectionOccurrence: itemSection[itemSection.length - 1],
    description: isRM ? item.description : item.node === null ? "" : item.node.description
  });
};

export { buildQuantityRangeFormDesigner };