import React from "react";
import ComponentsStyle from "../../../styles/ComponentsStyle";
import FontSizesContext from "../../../contexts/FontContext";

const Label = props => {
  return /*#__PURE__*/React.createElement(FontSizesContext.Consumer, null, value => /*#__PURE__*/React.createElement("div", {
    className: ComponentsStyle.fieldLabelRoot + " " + value.fontAlignment.fieldTitle
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: value.fontSize.fieldTitle
    },
    className: (props.showLabel ? ComponentsStyle.fieldLabelDefault : ComponentsStyle.fieldLabelDndisAny) + " " + value.fontLetters.fieldTitle + " " + value.fontStyle.fieldTitle.toString().replaceAll(",", " ")
  }, props.label), props.editMode && props.showLabel && /*#__PURE__*/React.createElement("label", {
    className: ComponentsStyle.fieldLabelDefaultMandatory
  }, !props.optionalMandatory ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: value.fontSize.fieldTitle
    },
    className: `text-sm text-red-500 font-bold ${value.fontStyle.fieldTitle.toString().replaceAll(",", " ")}`
  }, "*") : !props.optional && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: value.fontSize.fieldTitle
    },
    className: (props.sectionOccurrence === 0 ? ComponentsStyle.mandatoryOptional : ComponentsStyle.mandatoryAlways) + " " + value.fontStyle.fieldTitle.toString().replaceAll(",", " ")
  }, "*"))));
};

export default Label;