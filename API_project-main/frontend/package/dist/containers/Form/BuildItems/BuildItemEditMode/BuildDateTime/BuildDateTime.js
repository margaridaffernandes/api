import React, { useContext } from "react";
import DateTime from "../../../../../components/Datatypes/DateTime/DateTime";
import { buildValidationEditMode } from "../../../FormValidation/BuildValidation/BuildValidation";
import { buildInitialValueEditMode } from "../../../FormInitialValues/BuildInitialValue/BuildInitialValue";
import { handleIsVisible } from "../../../../../assets/functions/HandleTasks/handleIsVisible";
import { handleIsEditable } from "../../../../../assets/functions/HandleTasks/handleIsEditable";
import { handleRules } from "../../../../../assets/functions/HandleRules/handleRules";
import { firstAnyItem } from "../../../../../assets/functions/FirstAnyItem/FirstAnyItem";
import CombinedContext from "../../../../../contexts/CombinedContext";
import { getParent } from "../../../../../assets/functions/GetParentItem/getParent";

const BuildDateTimeEditMode = (item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order) => {
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

  if (isVisible || item.value.date !== null && item.value.time !== null) {
    const label = isRM ? item.itemName : item.node === null ? item.text : item.node.text;
    let arrayDate = [];
    let arrayTime = [];
    arrayDate.push("value", "date");
    arrayTime.push("value", "time");
    const pathLabelDate = pathArray.concat(arrayDate).join("-");
    const pathLabelTime = pathArray.concat(arrayTime).join("-");
    buildInitialValueEditMode(item, pathLabelDate, initialValues);
    buildInitialValueEditMode(item, pathLabelTime, initialValues);
    let ruleVisibility;

    if (!item.ruleVisibility) {
      ruleVisibility = true;
    } else {
      ruleVisibility = handleRules(item, values, "visibility");
    }

    if (isEditable && parentSectionVisibility) {
      buildValidationEditMode(item, pathLabelDate, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections);
      buildValidationEditMode(item, pathLabelTime, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections);
    }

    if (isVisible && ruleVisibility) {
      if (isEditable) {
        const ruleMandatory = handleRules(item, values, "mandatory");
        return /*#__PURE__*/React.createElement(DateTime, {
          key: itemIndex,
          showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
          editMode: true,
          internalFunctions: item.InternalFunctions,
          functions: item.Functions,
          valueDate: values[pathLabelDate],
          valueTime: values[pathLabelTime],
          onDateTimeChange: setFieldValue,
          label: label,
          path: pathArray.join("."),
          pathLabelDate: pathLabelDate,
          pathLabelTime: pathLabelTime,
          errorDate: touched[pathLabelDate] && errors[pathLabelDate] || touched[pathLabelTime] && errors[pathLabelDate],
          errorTime: touched[pathLabelTime] && errors[pathLabelTime] || touched[pathLabelDate] && errors[pathLabelTime],
          onTouch: setFieldTouched,
          sectionOccurrence: itemSection[itemSection.length - 1],
          optional: item.occurrences.lowerOccurrences === 0,
          optionalMandatory: !ruleMandatory,
          description: item.node === null ? "" : item.node.description,
          order: order ? order[pathArray.join(".")] : null,
          excludePastDates: item.excludePastDates ? item.excludePastDates : false
        });
      } else {
        return /*#__PURE__*/React.createElement(DateTime, {
          key: itemIndex,
          showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
          editMode: false,
          path: pathArray.join("."),
          valueDate: values[pathLabelDate] === "" ? "" : values[pathLabelDate],
          valueTime: values[pathLabelTime] === "" ? "" : values[pathLabelTime],
          label: item.node === null ? item.text : item.node.text,
          description: item.node === null ? "" : item.node.description,
          order: order ? order[pathArray.join(".")] : null
        });
      }
    }
  }
};

export default BuildDateTimeEditMode;