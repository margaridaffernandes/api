import React, { useContext } from "react";
import TimeRange from "../../../../../components/Datatypes/TimeRange/TimeRange";
import { buildValidationEditMode } from "../../../FormValidation/BuildValidation/BuildValidation";
import { buildInitialValueEditMode } from "../../../FormInitialValues/BuildInitialValue/BuildInitialValue";
import { handleIsVisible } from "../../../../../assets/functions/HandleTasks/handleIsVisible";
import { handleIsEditable } from "../../../../../assets/functions/HandleTasks/handleIsEditable";
import { handleRules } from "../../../../../assets/functions/HandleRules/handleRules";
import { firstAnyItem } from "../../../../../assets/functions/FirstAnyItem/FirstAnyItem";
import CombinedContext from "../../../../../contexts/CombinedContext";
import { getParent } from "../../../../../assets/functions/GetParentItem/getParent";

const BuildTimeRangeEditMode = (item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order) => {
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

  if (isVisible || item.value.start !== null && item.value.end !== null) {
    const label = isRM ? item.itemName : item.node === null ? item.text : item.node.text;
    let arrayStart = [];
    let arrayEnd = [];
    arrayStart.push("value", "start");
    arrayEnd.push("value", "end");
    const pathLabelStart = pathArray.concat(arrayStart).join("-");
    const pathLabelEnd = pathArray.concat(arrayEnd).join("-");
    buildInitialValueEditMode(item, pathLabelStart, initialValues);
    buildInitialValueEditMode(item, pathLabelEnd, initialValues);
    let ruleVisibility;

    if (!item.ruleVisibility) {
      ruleVisibility = true;
    } else {
      ruleVisibility = handleRules(item, values, "visibility");
    }

    if (isEditable && parentSectionVisibility) {
      buildValidationEditMode(item, pathLabelStart, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections);
      buildValidationEditMode(item, pathLabelEnd, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections);
    }

    if (isVisible && ruleVisibility) {
      if (isEditable) {
        const ruleMandatory = handleRules(item, values, "mandatory");
        return /*#__PURE__*/React.createElement(TimeRange, {
          key: itemIndex,
          showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
          editMode: true,
          startValue: values[pathLabelStart],
          endValue: values[pathLabelEnd],
          onTimeRangeChange: setFieldValue,
          label: label,
          pathLabelStart: pathLabelStart,
          pathLabelEnd: pathLabelEnd,
          path: pathArray.join("."),
          errorStart: touched[pathLabelStart] && errors[pathLabelStart] || touched[pathLabelEnd] && errors[pathLabelStart],
          errorEnd: touched[pathLabelEnd] && errors[pathLabelEnd] || touched[pathLabelStart] && errors[pathLabelEnd],
          onTouch: setFieldTouched,
          sectionOccurrence: itemSection[itemSection.length - 1],
          optional: item.occurrences.lowerOccurrences === 0,
          optionalMandatory: !ruleMandatory,
          description: isRM ? item.description : item.node === null ? "" : item.node.description,
          order: order ? order[pathArray.join(".")] : null
        });
      } else {
        return /*#__PURE__*/React.createElement(TimeRange, {
          key: itemIndex,
          showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
          editMode: false,
          path: pathArray.join("."),
          endValue: values[pathLabelEnd] === "" ? "" : values[pathLabelEnd],
          startValue: values[pathLabelStart] === "" ? "" : values[pathLabelStart],
          label: label,
          description: isRM ? item.description : item.node === null ? "" : item.node.description,
          order: order ? order[pathArray.join(".")] : null
        });
      }
    }
  }
};

export default BuildTimeRangeEditMode;