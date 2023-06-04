import React, { useContext } from "react";
import DateTimeRange from "../../../../../components/Datatypes/DateTimeRange/DateTimeRange";
import { buildValidationEditMode } from "../../../FormValidation/BuildValidation/BuildValidation";
import { buildInitialValueEditMode } from "../../../FormInitialValues/BuildInitialValue/BuildInitialValue";
import { handleIsVisible } from "../../../../../assets/functions/HandleTasks/handleIsVisible";
import { handleIsEditable } from "../../../../../assets/functions/HandleTasks/handleIsEditable";
import { handleRules } from "../../../../../assets/functions/HandleRules/handleRules";
import { firstAnyItem } from "../../../../../assets/functions/FirstAnyItem/FirstAnyItem";
import CombinedContext from "../../../../../contexts/CombinedContext";
import { getParent } from "../../../../../assets/functions/GetParentItem/getParent";

const BuildDateTimeRangeEditMode = (item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order) => {
  const context = useContext(CombinedContext);
  let isVisible;

  if (!item.TaskVisible) {
    isVisible = false;
  } else {
    isVisible = handleIsVisible(item, professionalTasks);
  }

  let isEditable;

  if (!item.TaskEditable) {
    isEditable = false;
  } else {
    isEditable = handleIsEditable(item, professionalTasks);
  }

  const isRM = pathArray[0] === "rm";
  const parentSection = isRM ? getParent(item.parentPath.split("."), context.composition.template) : getParent(pathArray, context.composition.template);
  const parentSectionVisibility = parentSection === "parentless" ? true : parentSection.TaskVisible.indexOf("All") > -1 ? true : false;

  if (isVisible || item.value.date.start !== null && item.value.date.end !== null && item.value.time.start !== null && item.value.time.end !== null) {
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
    let ruleVisibility;

    if (!item.ruleVisibility) {
      ruleVisibility = true;
    } else {
      ruleVisibility = handleRules(item, values, "visibility");
    }

    if (isEditable && parentSectionVisibility) {
      buildValidationEditMode(item, pathLabelDateStart, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections);
      buildValidationEditMode(item, pathLabelDateEnd, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections);
      buildValidationEditMode(item, pathLabelTimeStart, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections);
      buildValidationEditMode(item, pathLabelTimeEnd, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections);
    }

    if (isVisible && ruleVisibility) {
      if (isEditable) {
        const ruleMandatory = handleRules(item, values, "mandatory");
        return /*#__PURE__*/React.createElement(DateTimeRange, {
          key: itemIndex,
          showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
          editMode: true,
          startDateValue: values[pathLabelDateStart],
          endDateValue: values[pathLabelDateEnd],
          startTimeValue: values[pathLabelTimeStart],
          endTimeValue: values[pathLabelTimeEnd],
          onDateTimeRangeChange: setFieldValue,
          label: label,
          path: pathArray.join("."),
          pathLabelDateStart: pathLabelDateStart,
          pathLabelDateEnd: pathLabelDateEnd,
          pathLabelTimeStart: pathLabelTimeStart,
          pathLabelTimeEnd: pathLabelTimeEnd,
          errorDateStart: touched[pathLabelDateStart] && errors[pathLabelDateStart] || touched[pathLabelDateEnd] && errors[pathLabelDateStart] || touched[pathLabelTimeEnd] && errors[pathLabelDateStart] || touched[pathLabelTimeStart] && errors[pathLabelDateStart],
          errorDateEnd: touched[pathLabelDateEnd] && errors[pathLabelDateEnd] || touched[pathLabelDateStart] && errors[pathLabelDateEnd] || touched[pathLabelTimeStart] && errors[pathLabelDateEnd] || touched[pathLabelTimeEnd] && errors[pathLabelDateEnd],
          errorTimeEnd: touched[pathLabelTimeEnd] && errors[pathLabelTimeEnd] || touched[pathLabelDateStart] && errors[pathLabelTimeEnd] || touched[pathLabelTimeStart] && errors[pathLabelTimeEnd] || touched[pathLabelDateEnd] && errors[pathLabelTimeEnd],
          errorTimeStart: touched[pathLabelTimeStart] && errors[pathLabelTimeStart] || touched[pathLabelDateStart] && errors[pathLabelTimeStart] || touched[pathLabelTimeEnd] && errors[pathLabelTimeStart] || touched[pathLabelDateEnd] && errors[pathLabelTimeStart],
          onTouch: setFieldTouched,
          sectionOccurrence: itemSection[itemSection.length - 1],
          optional: item.occurrences.lowerOccurrences === 0,
          optionalMandatory: !ruleMandatory,
          description: isRM ? item.description : item.node === null ? "" : item.node.description,
          order: order ? order[pathArray.join(".")] : null
        });
      } else {
        return /*#__PURE__*/React.createElement(DateTimeRange, {
          key: itemIndex,
          showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
          editMode: false,
          path: pathArray.join("."),
          endTimeValue: values[pathLabelTimeEnd] === "" ? "" : values[pathLabelTimeEnd],
          startTimeValue: values[pathLabelTimeStart] === "" ? "" : values[pathLabelTimeStart],
          endDateValue: values[pathLabelDateEnd] === "" ? "" : values[pathLabelDateEnd],
          startDateValue: values[pathLabelDateStart] === "" ? "" : values[pathLabelDateStart],
          label: label,
          description: isRM ? item.description : item.node === null ? "" : item.node.description,
          order: order ? order[pathArray.join(".")] : null
        });
      }
    }
  }
};

export default BuildDateTimeRangeEditMode;