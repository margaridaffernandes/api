import React from "react";
import Duration from "../../../../../components/FormDesigner/Datatypes/Duration/Duration";
import { buildInitialValueEditMode } from "../../../FormInitialValues/BuildInitialValue/BuildInitialValue";
import { firstAnyItem } from "../../../../../assets/functions/FirstAnyItem/FirstAnyItem";

const buildDurationFormDesigner = (item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder) => {
  const isRM = pathArray[0] === "rm" ? true : false;
  const label = isRM ? item.itemName : item.node === null ? item.text : item.node.text;
  let arrayUnit = [];
  let arrayDuration = [];
  arrayUnit.push("value", "unit");
  arrayDuration.push("value", "value");
  const pathLabelUnit = pathArray.concat(arrayUnit).join("-");
  const pathLabelDuration = pathArray.concat(arrayDuration).join("-");
  buildInitialValueEditMode(item, pathLabelUnit, initialValues);
  buildInitialValueEditMode(item, pathLabelDuration, initialValues);
  let unitsList = [];

  if (item.units.unit) {
    if (Array.isArray(item.units.unit)) {
      unitsList = item.units.unit;
    } else {
      unitsList.push(item.units.unit);
    }
  } else if (!item.units.unit) {
    unitsList = item.units;
  }

  return /*#__PURE__*/React.createElement(Duration, {
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
    valueUnit: values[pathLabelUnit],
    valueDuration: values[pathLabelDuration],
    onDurationChange: setFieldValue,
    label: label,
    pathLabelUnit: pathLabelUnit,
    pathLabelDuration: pathLabelDuration,
    unitsList: unitsList,
    optional: item.occurrences.lowerOccurrences === 0,
    sectionOccurrence: itemSection[itemSection.length - 1],
    description: isRM ? item.description : item.node === null ? "" : item.node.description
  });
};

export { buildDurationFormDesigner };