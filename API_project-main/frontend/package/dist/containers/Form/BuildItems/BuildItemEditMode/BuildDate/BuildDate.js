import React, { useContext, useEffect, useState } from "react";
import Date from "../../../../../components/Datatypes/Date/Date";
import { buildValidationEditMode } from "../../../FormValidation/BuildValidation/BuildValidation";
import { buildInitialValueEditMode } from "../../../FormInitialValues/BuildInitialValue/BuildInitialValue";
import { handleIsVisible } from "../../../../../assets/functions/HandleTasks/handleIsVisible";
import { handleIsEditable } from "../../../../../assets/functions/HandleTasks/handleIsEditable";
import { handleRules } from "../../../../../assets/functions/HandleRules/handleRules";
import { firstAnyItem } from "../../../../../assets/functions/FirstAnyItem/FirstAnyItem";
import { getDLMConditions } from "../../../../../assets/functions/HandleDLM/getDLMConditions";
import { checkDLMRules } from "../../../../../assets/functions/HandleDLM/checkDLMRules";
import CombinedContext from "../../../../../contexts/CombinedContext";
import { getParent } from "../../../../../assets/functions/GetParentItem/getParent";

const BuildDateEditMode = (item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order, templateRules, idJDT) => {
  const context = useContext(CombinedContext);
  const isRM = pathArray[0] === "rm";
  const isEditable = !item.TaskEditable ? false : handleIsEditable(item, professionalTasks);
  const isVisible = !item.TaskVisible ? false : handleIsVisible(item, professionalTasks);
  const initialRuleVisibility = !item.ruleVisibility ? true : handleRules(item, values, "visibility");
  const initialRuleMandatory = !item.ruleMandatory ? true : handleRules(item, values, "mandatory");
  const [ruleVisibility, setRuleVisibility] = useState(initialRuleVisibility);
  const [ruleMandatory, setRuleMandatory] = useState(initialRuleMandatory);
  const [isFieldEditable, setFieldEditable] = useState(true);
  const [conditionValues, setConditionValues] = useState({});
  const parentSection = isRM ? getParent(item.parentPath.split("."), context.composition.template) : getParent(pathArray, context.composition.template);
  const parentSectionVisibility = parentSection === "parentless" ? true : parentSection.TaskVisible.indexOf("All") > -1 ? true : false;
  const label = isRM ? item.itemName : item.node === null ? item.text : item.node.text;
  let array = [];
  array.push("value");
  const pathLabel = pathArray.concat(array).join("-");
  const path = pathArray.join(".");
  const dlmConditions = getDLMConditions(item, templateRules);
  useEffect(() => {
    const newConditionValues = Object.keys(values).filter(key => dlmConditions.includes(key)).reduce((obj, key) => {
      if (values[key]._immutable) {
        obj[key] = values[key].getCurrentContent().getPlainText("\n").split("\n")[0];
      } else {
        obj[key] = values[key];
      }

      return obj;
    }, {});

    if (JSON.stringify(conditionValues) !== JSON.stringify(newConditionValues)) {
      setConditionValues(newConditionValues);
    }
  }, [values, dlmConditions, conditionValues]);
  useEffect(() => {
    // para o caso de haver um update nos valores do form e a regra já não se verificar
    setFieldEditable(isEditable);
    setFieldValue(pathLabel, initialValues[pathLabel]);
    setRuleVisibility(initialRuleVisibility);
    setRuleMandatory(initialRuleMandatory);
    checkDLMRules(context.token, context.dlm.updateIsDlmFinished, idJDT, item.dlmRules, templateRules, path, pathLabel, conditionValues).then(rules => {
      if (Array.isArray(rules[0]) && rules[0].length > 0) {
        for (const rule of rules[0]) {
          if (rule.itemPath === path) {
            const value = rule.value;
            const action = rule.action;

            switch (action) {
              case "isEqualTo":
                setFieldValue(pathLabel, value);
                break;

              case "isNotEditable":
                setFieldEditable(false);
                break;

              case "isMandatory":
                setRuleMandatory(true);
                break;

              case "isVisible":
                setRuleVisibility(true);
                break;

              case "isNotVisible":
                setRuleVisibility(false);
                break;

              default:
                break;
            }
          }
        }

        context.dlm.updateIsDlmFinished(true);
      } else {
        context.dlm.updateIsDlmFinished(true);
      }
    });
  }, [conditionValues, context.token, idJDT, initialRuleMandatory, initialRuleVisibility, isEditable, item.dlmRules, path, pathLabel, setFieldValue, templateRules]);

  if (isVisible || item.value !== null) {
    buildInitialValueEditMode(item, pathLabel, initialValues);

    if (isEditable && parentSectionVisibility) {
      buildValidationEditMode(item, pathLabel, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections, ruleMandatory);
    }
  }

  if (isVisible && ruleVisibility) {
    if (isEditable) {
      return /*#__PURE__*/React.createElement(Date, {
        order: order ? order[pathArray.join(".")] : null,
        key: itemIndex,
        showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
        editMode: true,
        functions: item.Functions,
        isFieldEditable: isFieldEditable,
        value: values[pathLabel],
        onDateChange: setFieldValue,
        label: label,
        path: pathArray.join("."),
        pathLabel: pathLabel,
        error: touched[pathLabel] && errors[pathLabel],
        onTouch: setFieldTouched,
        sectionOccurrence: itemSection[itemSection.length - 1],
        optional: item.occurrences.lowerOccurrences === 0,
        optionalMandatory: !ruleMandatory,
        description: isRM ? item.description : item.node === null ? "" : item.node.description
      });
    } else {
      return /*#__PURE__*/React.createElement(Date, {
        order: order ? order[pathArray.join(".")] : null,
        key: itemIndex,
        showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
        editMode: false,
        path: pathArray.join("."),
        value: values[pathLabel] === "" ? "" : values[pathLabel],
        label: label,
        description: isRM ? item.description : item.node === null ? "" : item.node.description
      });
    }
  }
};

export default BuildDateEditMode;