import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../../../contexts/ThemeContext";
import ChevronUp from "../ChevronSection/ChevronUp";
import ChevronDown from "../ChevronSection/ChevronDown";
import SectionLabel from "../SectionLabel/SectionLabel";
import ComponentsStyle from "../../../styles/ComponentsStyle";
import { getWidth } from "../../../assets/functions/GetWidth/getWidth";
import CombinedContext from "../../../contexts/CombinedContext";
import { handleIsVisible } from "../../../assets/functions/HandleTasks/handleIsVisible";
import { getDLMConditions } from "../../../assets/functions/HandleDLM/getDLMConditions";
import { checkDLMRules } from "../../../assets/functions/HandleDLM/checkDLMRules";

const SectionContainer = props => {
  const context = useContext(CombinedContext);
  let {
    item,
    path,
    professionalTasks,
    templateRules,
    pathArray,
    values,
    idJDT
  } = props;
  let isVisible,
      content = null;

  if (!item.TaskVisible) {
    isVisible = false;
  } else {
    isVisible = handleIsVisible(item, professionalTasks);
  }

  const getTheme = (value, variable) => {
    let componentStyle;
    let theme;
    let themeColor;
    let margin;

    switch (props.section) {
      case 1:
        componentStyle = "";
        theme = value[1];
        themeColor = value.themePalette.$400;
        break;

      case 2:
        componentStyle = ComponentsStyle.subSectionContainerXPadding;
        theme = value[1];
        themeColor = value.themePalette.$400;
        break;

      case 3:
        componentStyle = ComponentsStyle.subSubSectionContainerXPadding;
        theme = value[2];
        themeColor = value.themePalette.$300;
        break;

      case 4:
        componentStyle = ComponentsStyle.subSubSubSectionContainerXPadding;
        theme = value[3];
        themeColor = value.themePalette.$200;
        break;

      case 5:
        componentStyle = ComponentsStyle.subSubSubSubSectionContainerXPadding;
        theme = value[3];
        themeColor = value.themePalette.$200;
        break;

      case 6:
        componentStyle = ComponentsStyle.subSubSubSubSubSectionContainerXPadding;
        theme = value[3];
        themeColor = value.themePalette.$200;
        break;

      default:
        componentStyle = "";
        theme = value[3];
        themeColor = value.themePalette.$200;
        margin = 1.5 + 0.25 * (props.section - 6);
        break;
    }

    switch (variable) {
      case 'componentStyle':
        return componentStyle;

      case 'theme':
        return theme;

      case 'themeColor':
        return themeColor;

      case 'margin':
        return margin.toString();

      default:
        return;
    }
  };

  const [conditionValues, setConditionValues] = useState({});
  const [visible, setVisibility] = useState(isVisible);
  let dlmConditions, pathLabel;

  if (context.formMode === 'edit') {
    dlmConditions = getDLMConditions(item, templateRules);
    let array = [];
    array.push("value");
    pathLabel = pathArray.concat(array).join("-");
  }

  useEffect(() => {
    if (context.formMode === 'edit') {
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
    }
  }, [values, dlmConditions, conditionValues, context.formMode]);
  useEffect(() => {
    if (context.formMode === 'edit') {
      setVisibility(isVisible);
      checkDLMRules(context.token, context.dlm.updateIsDlmFinished, idJDT, item.dlmRules, templateRules, path, pathLabel, conditionValues).then(rules => {
        if (Array.isArray(rules[0]) && rules[0].length > 0) {
          for (const rule of rules[0]) {
            if (rule.itemPath === path) {
              const action = rule.action;

              switch (action) {
                // case "isNotEditable":
                //     setFieldEditable(false);
                //     break;
                // case "isMandatory":
                //     setRuleMandatory(true);
                //     break;
                case "isVisible":
                  setVisibility(true);
                  break;

                case "isNotVisible":
                  setVisibility(false);
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
    }
  }, [conditionValues, context.token, idJDT, item.dlmRules, path, pathLabel, templateRules, context.formMode]);

  if (visible) {
    props.sectionConstructor();
    let accordionOpen = props.subForm ? props.accordionOpen : props.accordionOpen?.filter(obj => obj.id === pathArray.join("-"))[0].accordionOpen;
    content = /*#__PURE__*/React.createElement(ThemeContext.Consumer, null, value => /*#__PURE__*/React.createElement("div", {
      style: {
        order: props.order,
        width: props.hsize !== undefined && props.hsize !== null ? props.section !== 1 ? props.hsize : getWidth(props.hsize) : props.section !== 1 ? "100%" : "91.67%"
      },
      className: props.section === 1 ? ComponentsStyle.sectionContainerRoot : ComponentsStyle.defaultSectionContainerRoot
    }, props.isTitleVisible && /*#__PURE__*/React.createElement("div", {
      className: getTheme(value, 'componentStyle')
    }, /*#__PURE__*/React.createElement("div", {
      onClick: props.handleAccordionMode,
      title: props.description,
      style: {
        borderColor: Array.isArray(value) ? getTheme(value, 'theme') : getTheme(value, 'themeColor'),
        backgroundColor: props.section !== 1 ? null : Array.isArray(value) ? value[1] : value.themePalette.$400,
        paddingTop: ComponentsStyle.defaultSectionContainerYPadding,
        paddingBottom: ComponentsStyle.defaultSectionContainerYPadding
      },
      className: `flex flex-row ${context.font.fontAlignment.sectionTitle}
                                ${props.section === 1 ? ComponentsStyle.sectionContainer : ComponentsStyle.defaultSectionContainer}`
    }, /*#__PURE__*/React.createElement(SectionLabel, {
      isMandatory: props.isMandatory,
      label: props.label,
      color: props.section === 1 ? "text-white pl-2" : "text-gray-600"
    }), /*#__PURE__*/React.createElement("div", {
      className: "pl-8"
    }, !accordionOpen && !props.subForm && /*#__PURE__*/React.createElement(ChevronDown, {
      color: props.section === 1 ? "text-white" : "text-gray-600"
    }), accordionOpen && !props.subForm && /*#__PURE__*/React.createElement(ChevronUp, {
      color: props.section === 1 ? "text-white" : "text-gray-600"
    })))), accordionOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        flexFlow: "wrap",
        paddingLeft: props.section > 6 ? getTheme(value, 'margin') + "rem" : null,
        paddingRight: props.section > 6 ? getTheme(value, 'margin') + "rem" : null
      },
      className: "flex w-full " + getTheme(value, 'componentStyle')
    }, props.children)));
  }

  return content;
};

export default SectionContainer;