import React, { useContext } from "react";
import Multimedia from "../../../../../components/Datatypes/Multimedia/Multimedia";
import { buildValidationEditMode } from "../../../FormValidation/BuildValidation/BuildValidation";
import { buildInitialValueEditMode } from "../../../FormInitialValues/BuildInitialValue/BuildInitialValue";
import { handleIsVisible } from "../../../../../assets/functions/HandleTasks/handleIsVisible";
import { handleIsEditable } from "../../../../../assets/functions/HandleTasks/handleIsEditable";
import { handleRules } from "../../../../../assets/functions/HandleRules/handleRules";
import { firstAnyItem } from "../../../../../assets/functions/FirstAnyItem/FirstAnyItem";
import CombinedContext from "../../../../../contexts/CombinedContext";
import { getParent } from "../../../../../assets/functions/GetParentItem/getParent";

const BuildMultimediaEditMode = (item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order, templateRules, idJDT, idComposition, userInfo) => {
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

  if (isVisible || item.value !== null) {
    const label = isRM ? item.itemName : item.node === null ? item.text : item.node.text;
    let array = [];
    array.push("value");
    const pathLabel = pathArray.concat(array).join("-");
    buildInitialValueEditMode(item, pathLabel, initialValues);
    let ruleVisibility;

    if (!item.ruleVisibility) {
      ruleVisibility = true;
    } else {
      ruleVisibility = handleRules(item, values, "visibility");
    }

    if (isEditable && parentSectionVisibility) {
      buildValidationEditMode(item, pathLabel, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections, context.datatypes.fileMaxSize[pathArray.join(".")]);
    }

    if (isVisible && ruleVisibility) {
      if (isEditable) {
        const ruleMandatory = handleRules(item, values, "mandatory");
        return /*#__PURE__*/React.createElement(Multimedia, {
          key: itemIndex,
          showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
          editMode: true,
          value: values[pathLabel],
          onMultimediaChange: setFieldValue,
          label: label,
          path: pathArray.join("."),
          pathLabel: pathLabel,
          error: touched[pathLabel] && errors[pathLabel],
          onTouch: setFieldTouched,
          sectionOccurrence: itemSection[itemSection.length - 1],
          optional: item.occurrences.lowerOccurrences === 0,
          optionalMandatory: !ruleMandatory,
          description: isRM ? item.description : item.node === null ? "" : item.node.description,
          order: order ? order[pathArray.join(".")] : null,
          idComposition: idComposition,
          userInfo: userInfo
        });
      } else {
        return /*#__PURE__*/React.createElement(Multimedia, {
          key: itemIndex,
          showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
          editMode: false,
          path: pathArray.join("."),
          value: values[pathLabel],
          label: label,
          description: isRM ? item.description : item.node === null ? "" : item.node.description,
          order: order ? order[pathArray.join(".")] : null,
          idComposition: idComposition
        });
      }
    }
  }
};

export default BuildMultimediaEditMode;