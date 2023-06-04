import React, { useContext } from "react";
import QuantityRange from "../../../../../components/Datatypes/QuantityRange/QuantityRange";
import { buildValidationEditMode } from "../../../FormValidation/BuildValidation/BuildValidation";
import { buildInitialValueEditMode } from "../../../FormInitialValues/BuildInitialValue/BuildInitialValue";
import { handleIsVisible } from "../../../../../assets/functions/HandleTasks/handleIsVisible";
import { handleIsEditable } from "../../../../../assets/functions/HandleTasks/handleIsEditable";
import { handleRules } from "../../../../../assets/functions/HandleRules/handleRules";
import { firstAnyItem } from "../../../../../assets/functions/FirstAnyItem/FirstAnyItem";
import { getParent } from "../../../../../assets/functions/GetParentItem/getParent";
import CombinedContext from "../../../../../contexts/CombinedContext";

const BuildQuantityRangeEditMode = (item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order) => {
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

  if (isVisible || item.value.unit !== null && item.value.value.start !== null && item.value.value.end !== null) {
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
    let ruleVisibility;

    if (!item.ruleVisibility) {
      ruleVisibility = true;
    } else {
      ruleVisibility = handleRules(item, values, "visibility");
    }

    if (isVisible && isEditable && parentSectionVisibility) {
      buildValidationEditMode(item, pathLabelStart, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections);
      buildValidationEditMode(item, pathLabelEnd, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections);
      buildValidationEditMode(item, pathLabelUnit, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections);
    }

    if (ruleVisibility) {
      if (isEditable) {
        const ruleMandatory = handleRules(item, values, "mandatory");
        let unitsList = [];

        if (Array.isArray(item.units)) {
          item.units.forEach(obj => {
            unitsList.push(obj.unit);
          });
        } else {
          unitsList.push(item.units.unit);
        }

        return /*#__PURE__*/React.createElement(QuantityRange, {
          key: itemIndex,
          showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
          editMode: true,
          startValue: values[pathLabelStart],
          endValue: values[pathLabelEnd],
          unitValue: values[pathLabelUnit],
          onQuantityRangeChange: setFieldValue,
          label: label,
          unitsList: unitsList,
          path: pathArray.join("."),
          pathLabelStart: pathLabelStart,
          pathLabelEnd: pathLabelEnd,
          pathLabelUnit: pathLabelUnit,
          errorStart: touched[pathLabelStart] && errors[pathLabelStart] || touched[pathLabelEnd] && errors[pathLabelStart] || touched[pathLabelUnit] && errors[pathLabelStart],
          errorEnd: touched[pathLabelEnd] && errors[pathLabelEnd] || touched[pathLabelStart] && errors[pathLabelEnd] || touched[pathLabelUnit] && errors[pathLabelEnd],
          errorUnit: touched[pathLabelUnit] && errors[pathLabelUnit] || touched[pathLabelStart] && errors[pathLabelUnit] || touched[pathLabelEnd] && errors[pathLabelUnit],
          onTouch: setFieldTouched,
          sectionOccurrence: itemSection[itemSection.length - 1],
          optional: item.occurrences.lowerOccurrences === 0,
          optionalMandatory: !ruleMandatory,
          description: isRM ? item.description : item.node === null ? "" : item.node.description,
          order: order ? order[pathArray.join(".")] : null
        });
      } else {
        return /*#__PURE__*/React.createElement(QuantityRange, {
          key: itemIndex,
          showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
          editMode: false,
          path: pathArray.join("."),
          startValue: values[pathLabelStart] === "" ? "" : values[pathLabelStart] + " " + values[pathLabelUnit],
          endValue: values[pathLabelEnd] === "" ? "" : values[pathLabelEnd] + " " + values[pathLabelUnit],
          label: label,
          description: isRM ? item.description : item.node === null ? "" : item.node.description,
          order: order ? order[pathArray.join(".")] : null
        });
      }
    }
  }
};

export default BuildQuantityRangeEditMode;