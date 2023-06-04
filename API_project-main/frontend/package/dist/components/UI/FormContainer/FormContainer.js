function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";
import EditableLabel from "../../FormDesigner/UI/EditableLabel/EditableLabel";
import { handleCompositionPlanning } from "../../../assets/functions/handleCompositionPlanning/handleCompositionPlanning";

class FormContainerComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      isFormSelected: false
    });

    _defineProperty(this, "setFormSelected", () => {
      this.setState(prevState => ({ ...prevState,
        isFormSelected: !prevState.isFormSelected
      }));
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "w-full flex justify-center"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "10px",
        borderWidth: "0.9px",
        borderStyle: "dashed",
        borderColor: this.context.composition.openCompositionPlanningPath === "root" ? this.context.theme.themePalette.$300 : "transparent",
        backgroundColor: this.context.composition.openCompositionPlanningPath === "root" ? this.context.theme.themePalette.$100 : "transparent"
      },
      className: "w-full bg-transparent h-full"
    }, /*#__PURE__*/React.createElement("div", {
      onClick: e => {
        this.setFormSelected();
        this.props.showToolbar && handleCompositionPlanning(e, this.context, "root", "SECTION");
      },
      title: this.props.description,
      style: {
        padding: "0.1rem 0rem",
        backgroundColor: Array.isArray(this.context.theme) ? this.context.theme[0] : this.context.theme.themePalette.$500
      },
      className: "mb-2 px-2 relative rounded-sm cursor-pointer flex " + this.context.font.fontAlignment.formTitle
    }, this.props.showToolbar && /*#__PURE__*/React.createElement(EditableLabel, {
      labelValue: this.props.formTitle,
      editChangeEvent: this.props.updateFormTitle,
      style: {
        fontSize: this.context.font.fontSize.formTitle
      },
      className: `${this.context.font.fontLetters.formTitle} 
                                ${this.context.font.fontStyle.formTitle.toString().replaceAll(",", " ")}`
    }) || /*#__PURE__*/React.createElement("label", {
      style: {
        fontSize: this.context.font.fontSize.formTitle
      },
      className: `break-words tracking-wide text-lg text-white ${this.context.font.fontAlignment.formTitle} 
                                ${this.context.font.fontLetters.formTitle}
                                ${this.context.font.fontStyle.formTitle.toString().replaceAll(",", " ")}`
    }, this.props.formTitle)), /*#__PURE__*/React.createElement("form", {
      className: "flex w-full flex-col items-center"
    }, this.props.children)));
  }

}

_defineProperty(FormContainerComponent, "contextType", CombinedContext);

const FormContainer = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(FormContainerComponent, props));
};

export default FormContainer;