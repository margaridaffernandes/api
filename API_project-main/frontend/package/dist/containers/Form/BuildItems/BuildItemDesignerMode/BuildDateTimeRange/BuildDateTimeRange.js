import React from "react";
import DateTimeRange from "../../../../../components/FormDesigner/Datatypes/DateTimeRange/DateTimeRange";
import { buildInitialValueEditMode } from "../../../FormInitialValues/BuildInitialValue/BuildInitialValue";
import { firstAnyItem } from "../../../../../assets/functions/FirstAnyItem/FirstAnyItem";

const buildDateTimeRangeFormDesigner = (item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder) => {
  const isRM = pathArray[0] === "rm" ? true : false;
  const label = isRM ? item.itemName : item.node === null ? item.text : item.node.text;
  let arrayDateStart = [];
  let arrayDateEnd = [];
  let arrayTimeStart = [];
  let arrayTimeEnd = [];
  arrayDateStart.push("value", "date", "start");
  arrayDateEnd.push("value", "date", "end");
  arrayTimeStart.push("value", "time", "start");
  arrayTimeEnd.push("value", "time", "end");
  const pathLabelDateStart = pathArray.concat(arrayDateStart).join("-");
  const pathLabelDateEnd = pathArray.concat(arrayDateEnd).join("-");
  const pathLabelTimeStart = pathArray.concat(arrayTimeStart).join("-");
  const pathLabelTimeEnd = pathArray.concat(arrayTimeEnd).join("-");
  buildInitialValueEditMode(item, pathLabelDateStart, initialValues);
  buildInitialValueEditMode(item, pathLabelDateEnd, initialValues);
  buildInitialValueEditMode(item, pathLabelTimeStart, initialValues);
  buildInitialValueEditMode(item, pathLabelTimeEnd, initialValues);
  return /*#__PURE__*/React.createElement(DateTimeRange, {
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
    startDateValue: values[pathLabelDateStart],
    endDateValue: values[pathLabelDateEnd],
    startTimeValue: values[pathLabelTimeStart],
    endTimeValue: values[pathLabelTimeEnd],
    onDateTimeRangeChange: setFieldValue,
    label: label,
    pathLabelDateStart: pathLabelDateStart,
    pathLabelDateEnd: pathLabelDateEnd,
    pathLabelTimeStart: pathLabelTimeStart,
    pathLabelTimeEnd: pathLabelTimeEnd,
    optional: item.occurrences.lowerOccurrences === 0,
    sectionOccurrence: itemSection[itemSection.length - 1],
    description: isRM ? item.description : item.node === null ? "" : item.node.description
  });
};

export { buildDateTimeRangeFormDesigner };