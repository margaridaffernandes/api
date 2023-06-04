import React, { useContext, useEffect, useState } from "react";
import Dropdown from "../../../../../components/Datatypes/Dropdown/Dropdown";
import MultiSelect from "../../../../../components/Datatypes/MultiSelect/MultiSelect";
import RadioBox from "../../../../../components/Datatypes/RadioBox/RadioBox";
import RadioBoxMultiple from "../../../../../components/Datatypes/RadioBoxMultiple/RadioBoxMultiple";
import SelectSearch from "../../../../../components/Datatypes/SelectSearch/SelectSearch";
import MultipleSelectSearch from "../../../../../components/Datatypes/MultipleSelectSearch/MultipleSelectSearch";
import { buildValidationEditMode } from "../../../FormValidation/BuildValidation/BuildValidation";
import { buildInitialValueEditMode } from "../../../FormInitialValues/BuildInitialValue/BuildInitialValue";
import { handleIsVisible } from "../../../../../assets/functions/HandleTasks/handleIsVisible";
import { handleIsEditable } from "../../../../../assets/functions/HandleTasks/handleIsEditable";
import { handleRules } from "../../../../../assets/functions/HandleRules/handleRules";
import { firstAnyItem } from "../../../../../assets/functions/FirstAnyItem/FirstAnyItem";
import { checkDLMRules } from "../../../../../assets/functions/HandleDLM/checkDLMRules";
import { getDLMConditions } from "../../../../../assets/functions/HandleDLM/getDLMConditions";
import CombinedContext from "../../../../../contexts/CombinedContext";
import { getParent } from "../../../../../assets/functions/GetParentItem/getParent";

const BuildCodedTextEditMode = (item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order, datatype, templateRules, idJDT) => {
  const context = useContext(CombinedContext);
  const isRM = pathArray[0] === "rm";
  const isEditable = !item.TaskEditable ? false : handleIsEditable(item, professionalTasks); // VER PORQUE É QUE HÁ DOIS TIPOS DE VISIBILIDADE A CUMPRIR

  const isVisible = !item.TaskVisible ? false : handleIsVisible(item, professionalTasks);
  const initialRuleVisibility = !item.ruleVisibility ? true : handleRules(item, values, "visibility");
  const initialRuleMandatory = !item.ruleMandatory ? true : handleRules(item, values, "mandatory");
  const [ruleVisibility, setRuleVisibility] = useState(initialRuleVisibility);
  const [ruleMandatory, setRuleMandatory] = useState(initialRuleMandatory);
  const [isFieldEditable, setFieldEditable] = useState(true);
  const [conditionValues, setConditionValues] = useState({});
  const [conceptsData, setConceptsData] = useState([]);
  const label = isRM ? item.itemName : item.node === null ? item.text : item.node.text;
  let array = [];
  array.push("value");
  const pathLabel = pathArray.concat(array).join("-");
  const path = pathArray.join(".");
  const dlmConditions = getDLMConditions(item, templateRules);
  const parentSection = isRM ? getParent(item.parentPath.split("."), context.composition.template) : getParent(pathArray, context.composition.template);
  const parentSectionVisibility = parentSection === "parentless" ? true : parentSection.TaskVisible.indexOf("All") > -1 ? true : false; // primeiro ciclo que corre sempre que os valores dos campos do formulário são alterados
  // serve para verificar se houve alterações nos valores das condições associadas a um item

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
  }, [values, dlmConditions, conditionValues]); // segundo ciclo -> apenas corre quando os valores das condições são alterados
  // serve para verificar se há alguma regra a executar, se o checkDLMRules for vazio não faz nada

  useEffect(() => {
    // para o caso de haver um update nos valores do form e a regra já não se verificar
    setFieldEditable(isEditable);
    setFieldValue(pathLabel, initialValues[pathLabel]);
    setConceptsData([]);
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

              case "isEqualToBinding":
                setConceptsData(value);
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

    if (isVisible && ruleVisibility) {
      if (isEditable) {
        let items = item.itemsList === undefined ? [] : [...item.itemsList]; // do tipo "local_terms", "local", "SNOMED-CT", "Ereq"

        if (item.terminology_id !== "external" && items.length > 0 && item.occurrences.upperOccurrences === 1) {
          if (datatype === "radio") {
            return /*#__PURE__*/React.createElement(RadioBox, {
              order: order ? order[pathArray.join(".")] : null,
              key: itemIndex,
              showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
              editMode: true,
              isFieldEditable: isFieldEditable,
              value: values[pathLabel],
              values: values,
              onRadioChange: setFieldValue,
              label: label,
              pathLabel: pathLabel,
              error: touched[pathLabel] && errors[pathLabel],
              onTouch: setFieldTouched,
              items: items,
              internalFunctions: item.InternalFunctions,
              refset: item.Refset,
              path: pathArray.join("."),
              sectionOccurrence: itemSection[itemSection.length - 1],
              optional: item.occurrences.lowerOccurrences === 0,
              optionalMandatory: !ruleMandatory,
              description: item.node === null ? "" : item.node.description
            });
          } else {
            // default
            return /*#__PURE__*/React.createElement(Dropdown, {
              order: order ? order[pathArray.join(".")] : null,
              key: itemIndex,
              showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
              editMode: true,
              isFieldEditable: isFieldEditable,
              value: values[pathLabel],
              values: values,
              onDropdownChange: setFieldValue,
              label: label,
              pathLabel: pathLabel,
              error: touched[pathLabel] && errors[pathLabel],
              onTouch: setFieldTouched,
              internalFunctions: item.InternalFunctions,
              items: items,
              refset: item.Refset,
              path: pathArray.join("."),
              sectionOccurrence: itemSection[itemSection.length - 1],
              optional: item.occurrences.lowerOccurrences === 0,
              optionalMandatory: !ruleMandatory,
              description: item.node === null ? "" : item.node.description
            });
          }
        } // do tipo "local_terms", "local", "SNOMED-CT", "Ereq"
        else if (item.terminology_id !== "external" && items.length > 0 && item.occurrences.upperOccurrences !== 1) {
            if (datatype === "radio") {
              return /*#__PURE__*/React.createElement(RadioBoxMultiple, {
                order: order ? order[pathArray.join(".")] : null,
                key: itemIndex,
                showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
                editMode: true,
                isFieldEditable: isFieldEditable,
                value: values[pathLabel],
                values: values,
                onRadioMultipleChange: setFieldValue,
                label: label,
                path: pathArray.join("."),
                pathLabel: pathLabel,
                error: touched[pathLabel] && errors[pathLabel],
                onTouch: setFieldTouched,
                items: items,
                internalFunctions: item.InternalFunctions,
                refset: item.Refset,
                sectionOccurrence: itemSection[itemSection.length - 1],
                optional: item.occurrences.lowerOccurrences === 0,
                optionalMandatory: !ruleMandatory,
                description: isRM ? item.description : item.node === null ? "" : item.node.description
              });
            } else {
              // default
              return /*#__PURE__*/React.createElement(MultiSelect, {
                order: order ? order[pathArray.join(".")] : null,
                key: itemIndex,
                showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
                editMode: true,
                isFieldEditable: isFieldEditable,
                value: values[pathLabel],
                values: values,
                onMultiselectChange: setFieldValue,
                label: label,
                path: pathArray.join("."),
                pathLabel: pathLabel,
                error: touched[pathLabel] && errors[pathLabel],
                onTouch: setFieldTouched,
                items: items,
                internalFunctions: item.InternalFunctions,
                refset: item.Refset,
                sectionOccurrence: itemSection[itemSection.length - 1],
                optional: item.occurrences.lowerOccurrences === 0,
                optionalMandatory: !ruleMandatory,
                description: isRM ? item.description : item.node === null ? "" : item.node.description
              });
            }
          } else if ((item.terminology_id === "external" || items.length === 0) && item.occurrences.upperOccurrences === 1) {
            return /*#__PURE__*/React.createElement(SelectSearch, {
              order: order ? order[pathArray.join(".")] : null,
              key: itemIndex,
              showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
              editMode: true,
              isFieldEditable: isFieldEditable,
              value: values[pathLabel],
              values: values,
              onSelectSearchChange: setFieldValue,
              label: label,
              path: pathArray.join("."),
              pathLabel: pathLabel,
              error: touched[pathLabel] && errors[pathLabel],
              onTouch: setFieldTouched,
              internalFunctions: item.InternalFunctions,
              refset: item.Refset,
              sectionOccurrence: itemSection[itemSection.length - 1],
              optional: item.occurrences.lowerOccurrences === 0,
              optionalMandatory: !ruleMandatory,
              description: isRM ? item.description : item.node === null ? "" : item.node.description,
              concepts: conceptsData
            });
          } else if ((item.terminology_id === "external" || items.length === 0) && item.occurrences.upperOccurrences !== 1) {
            return /*#__PURE__*/React.createElement(MultipleSelectSearch, {
              order: order ? order[pathArray.join(".")] : null,
              key: itemIndex,
              showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
              editMode: true,
              isFieldEditable: isFieldEditable,
              value: values[pathLabel],
              values: values,
              onMultiSelectSearchChange: setFieldValue,
              label: label,
              path: pathArray.join("."),
              pathLabel: pathLabel,
              error: touched[pathLabel] && errors[pathLabel],
              onTouch: setFieldTouched,
              internalFunctions: item.InternalFunctions,
              refset: item.Refset,
              sectionOccurrence: itemSection[itemSection.length - 1],
              optional: item.occurrences.lowerOccurrences === 0,
              optionalMandatory: !ruleMandatory,
              description: isRM ? item.description : item.node === null ? "" : item.node.description,
              concepts: conceptsData
            });
          }
      } else {
        return /*#__PURE__*/React.createElement(Dropdown, {
          order: order ? order[pathArray.join(".")] : null,
          key: itemIndex,
          showLabel: !isAny || (order ? firstAnyItem(order, pathArray, isAny) : itemIndex === 0),
          editMode: false,
          path: pathArray.join("."),
          value: values[pathLabel] === "" ? "" : Array.isArray(values[pathLabel]) ? values[pathLabel].map(obj => {
            return obj.text;
          }).join(", ") : values[pathLabel].text,
          label: label,
          description: isRM ? item.description : item.node === null ? "" : item.node.description
        });
      }
    }
  }
};

export default BuildCodedTextEditMode;