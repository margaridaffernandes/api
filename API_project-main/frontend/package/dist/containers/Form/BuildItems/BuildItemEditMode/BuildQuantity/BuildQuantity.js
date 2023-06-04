import React, { useContext } from "react";
import Quantity from "../../../../../components/Datatypes/Quantity/Quantity";
import QuantitySingleUnit from "../../../../../components/Datatypes/QuantitySingleUnit/QuantitySingleUnit";
import { buildValidationEditMode } from "../../../FormValidation/BuildValidation/BuildValidation";
import { buildInitialValueEditMode } from "../../../FormInitialValues/BuildInitialValue/BuildInitialValue";
import { handleIsVisible } from "../../../../../assets/functions/HandleTasks/handleIsVisible";
import { handleIsEditable } from "../../../../../assets/functions/HandleTasks/handleIsEditable";
import { handleRules } from "../../../../../assets/functions/HandleRules/handleRules";
import { firstAnyItem } from "../../../../../assets/functions/FirstAnyItem/FirstAnyItem";
import CombinedContext from "../../../../../contexts/CombinedContext";
import { getParent } from "../../../../../assets/functions/GetParentItem/getParent";

const BuildQuantityEditMode = (item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order) => {
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
    let arrayQuantity = [];
    arrayUnit.push("value", "unit");
    arrayQuantity.push("value", "value");
    const pathLabelUnit = pathArray.concat(arrayUnit).join("-");
    const pathLabelQuantity = pathArray.concat(arrayQuantity).join("-");
    buildInitialValueEditMode(item, pathLabelUnit, initialValues);
    buildInitialValueEditMode(item, pathLabelQuantity, initialValues);
    let unitsList = [];

    if (Array.isArray(item.units)) {
      item.units.forEach(obj => {
        unitsList.push(obj.unit);
      });
    } else {
      unitsList.push(item.units.unit);
    }

    let ruleVisibility;

    if (!item.ruleVisibility) {
      ruleVisibility = true;
    } else {
      ruleVisibility = handleRules(item, values, "visibility");
    }

    if (isEditable && parentSectionVisibility) {
      // Só processo a validação das unidades caso tiver mais do que uma unidade na unitList
      if (unitsList.length > 1) {
        buildValidationEditMode(item, pathLabelUnit, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections);
      }

      buildValidationEditMode(item, pathLabelQuantity, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections);
    }

    if (isVisible && ruleVisibility) {
      if (isEditable) {
        const ruleMandatory = handleRules(item, values, "mandatory");

        if (unitsList.length > 1) {
          return /*#__PURE__*/React.createElement(Quantity, {
            key: itemIndex,
            showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
            editMode: true,
            valueUnit: values[pathLabelUnit],
            valueQuantity: values[pathLabelQuantity],
            onQuantityChange: setFieldValue,
            label: label,
            path: pathArray.join("."),
            pathLabelUnit: pathLabelUnit,
            pathLabelQuantity: pathLabelQuantity,
            errorUnit: touched[pathLabelUnit] && errors[pathLabelUnit] || touched[pathLabelQuantity] && errors[pathLabelUnit],
            errorQuantity: touched[pathLabelQuantity] && errors[pathLabelQuantity] || touched[pathLabelUnit] && errors[pathLabelQuantity],
            onTouch: setFieldTouched,
            unitsList: unitsList,
            sectionOccurrence: itemSection[itemSection.length - 1],
            optional: item.occurrences.lowerOccurrences === 0,
            optionalMandatory: !ruleMandatory,
            description: isRM ? item.description : item.node === null ? "" : item.node.description,
            order: order ? order[pathArray.join(".")] : null
          });
        } else {
          return /*#__PURE__*/React.createElement(QuantitySingleUnit, {
            key: itemIndex,
            showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
            editMode: true,
            valueQuantity: values[pathLabelQuantity],
            onQuantityChange: setFieldValue,
            label: label,
            path: pathArray.join("."),
            pathLabelQuantity: pathLabelQuantity,
            pathLabelUnit: pathLabelUnit,
            errorQuantity: touched[pathLabelQuantity] && errors[pathLabelQuantity],
            onTouch: setFieldTouched,
            unitsList: unitsList,
            sectionOccurrence: itemSection[itemSection.length - 1],
            optional: item.occurrences.lowerOccurrences === 0,
            optionalMandatory: !ruleMandatory,
            description: isRM ? item.description : item.node === null ? "" : item.node.description,
            order: order ? order[pathArray.join(".")] : null
          });
        }
      } else {
        return /*#__PURE__*/React.createElement(Quantity, {
          key: itemIndex,
          showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
          editMode: false,
          path: pathArray.join("."),
          value: values[pathLabelQuantity] === "" ? "" : values[pathLabelQuantity] + " " + values[pathLabelUnit],
          label: label,
          description: isRM ? item.description : item.node === null ? "" : item.node.description,
          order: order ? order[pathArray.join(".")] : null
        });
      }
    }
  }
};

export default BuildQuantityEditMode;