import React from "react";
import DateTime from "../../../../../components/FormDesigner/Datatypes/DateTime/DateTime";
import { buildInitialValueEditMode } from "../../../FormInitialValues/BuildInitialValue/BuildInitialValue";
import { firstAnyItem } from "../../../../../assets/functions/FirstAnyItem/FirstAnyItem";

const buildDateTimeFormDesigner = (item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder) => {
  const isRM = pathArray[0] === "rm" ? true : false;
  const label = isRM ? item.itemName : item.node === null ? item.text : item.node.text;
  let arrayDate = [];
  let arrayTime = [];
  arrayDate.push("value", "date");
  arrayTime.push("value", "time");
  const pathLabelDate = pathArray.concat(arrayDate).join("-");
  const pathLabelTime = pathArray.concat(arrayTime).join("-");
  buildInitialValueEditMode(item, pathLabelDate, initialValues);
  buildInitialValueEditMode(item, pathLabelTime, initialValues);
  return /*#__PURE__*/React.createElement(DateTime, {
    isRM: isRM,
    data: isRM && item,
    isSection: false,
    groupID: item.groupID,
    path: pathArray.join("."),
    handleFormOrder: handleFormOrder,
    internalFunctions: item.InternalFunctions,
    order: formOrder ? formOrder[pathArray.join(".")] : null,
    item: item,
    key: itemIndex,
    isAny: isAny,
    showLabel: !isAny || (formOrder ? firstAnyItem(formOrder, pathArray, isAny) : itemIndex === 0),
    valueDate: values[pathLabelDate],
    valueTime: values[pathLabelTime],
    onDateTimeChange: setFieldValue,
    label: label,
    pathLabelDate: pathLabelDate,
    pathLabelTime: pathLabelTime,
    optional: item.occurrences.lowerOccurrences === 0,
    sectionOccurrence: itemSection[itemSection.length - 1],
    description: isRM ? item.description : item.node === null ? "" : item.node.description,
    excludePastDates: item.excludePastDates ? item.excludePastDates : false
  });
};

export { buildDateTimeFormDesigner };