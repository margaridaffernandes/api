import React, { useContext } from "react";
import Duration from "../../../../../components/Datatypes/Duration/Duration";
import { buildValidationEditMode } from "../../../FormValidation/BuildValidation/BuildValidation";
import { buildInitialValueEditMode } from "../../../FormInitialValues/BuildInitialValue/BuildInitialValue";
import { handleIsVisible } from "../../../../../assets/functions/HandleTasks/handleIsVisible";
import { handleIsEditable } from "../../../../../assets/functions/HandleTasks/handleIsEditable";
import { handleRules } from "../../../../../assets/functions/HandleRules/handleRules";
import { firstAnyItem } from "../../../../../assets/functions/FirstAnyItem/FirstAnyItem";
import { getParent } from "../../../../../assets/functions/GetParentItem/getParent";
import CombinedContext from "../../../../../contexts/CombinedContext";

const BuildDurationEditMode = (item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order) => {
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

  if (isVisible || item.value.unit !== null && item.value.value !== null) {
    const label = isRM ? item.itemName : item.node === null ? item.text : item.node.text;
    let arrayUnit = [];
    let arrayDuration = [];
    arrayUnit.push("value", "unit");
    arrayDuration.push("value", "value");
    const pathLabelUnit = pathArray.concat(arrayUnit).join("-");
    const pathLabelDuration = pathArray.concat(arrayDuration).join("-");
    buildInitialValueEditMode(item, pathLabelUnit, initialValues);
    buildInitialValueEditMode(item, pathLabelDuration, initialValues);
    let ruleVisibility;

    if (!item.ruleVisibility) {
      ruleVisibility = true;
    } else {
      ruleVisibility = handleRules(item, values, "visibility");
    }

    if (isEditable && parentSectionVisibility) {
      buildValidationEditMode(item, pathLabelUnit, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections);
      buildValidationEditMode(item, pathLabelDuration, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections);
    }

    if (isVisible && ruleVisibility) {
      if (isEditable) {
        const ruleMandatory = handleRules(item, values, "mandatory");
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
          key: itemIndex,
          showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
          editMode: true,
          valueUnit: values[pathLabelUnit],
          valueDuration: values[pathLabelDuration],
          onDurationChange: setFieldValue,
          label: label,
          path: pathArray.join("."),
          pathLabelUnit: pathLabelUnit,
          pathLabelDuration: pathLabelDuration,
          errorUnit: touched[pathLabelUnit] && errors[pathLabelUnit] || touched[pathLabelDuration] && errors[pathLabelUnit],
          errorDuration: touched[pathLabelDuration] && errors[pathLabelDuration] || touched[pathLabelUnit] && errors[pathLabelDuration],
          onTouch: setFieldTouched,
          unitsList: unitsList,
          sectionOccurrence: itemSection[itemSection.length - 1],
          optional: item.occurrences.lowerOccurrences === 0,
          optionalMandatory: !ruleMandatory,
          description: isRM ? item.description : item.node === null ? "" : item.node.description,
          order: order ? order[pathArray.join(".")] : null
        });
      } else {
        return /*#__PURE__*/React.createElement(Duration, {
          key: itemIndex,
          showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
          editMode: false,
          path: pathArray.join("."),
          value: values[pathLabelDuration] === "" ? "" : values[pathLabelDuration] + " " + values[pathLabelUnit],
          label: label,
          description: isRM ? item.description : item.node === null ? "" : item.node.description,
          order: order ? order[pathArray.join(".")] : null
        });
      }
    }
  }
};

export default BuildDurationEditMode;