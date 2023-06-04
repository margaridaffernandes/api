import React from "react";
import ComponentsStyle from "../../../../styles/ComponentsStyle";
import FontSizesContext from "../../../../contexts/FontContext";

const Label = props => {
  return /*#__PURE__*/React.createElement(FontSizesContext.Consumer, null, value => /*#__PURE__*/React.createElement("div", {
    className: ComponentsStyle.fieldLabelRoot + " " + value.fontAlignment.fieldTitle
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: value.fontSize.fieldTitle
    },
    className: (props.showLabel ? ComponentsStyle.fieldLabelDefault : ComponentsStyle.fieldLabelDndisAny) + " " + value.fontLetters.fieldTitle + " " + value.fontStyle.fieldTitle.toString().replaceAll(",", " ") + " " + (props.optional && "pr-8")
  }, props.label), props.editMode && props.showLabel && /*#__PURE__*/React.createElement("label", {
    className: ComponentsStyle.fieldLabelDefaultMandatory
  }, !props.optional && (props.sectionOccurrence === 0 ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: value.fontSize.fieldTitle
    },
    className: ComponentsStyle.mandatoryOptional + " " + value.fontStyle.fieldTitle.toString().replaceAll(",", " ") + " " + (props.isRM && "pr-8")
  }, "*") : /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: value.fontSize.fieldTitle
    },
    className: ComponentsStyle.mandatoryAlways + " " + value.fontStyle.fieldTitle.toString().replaceAll(",", " ") + " " + (props.isRM && "pr-8")
  }, "*"))), props.isRM && /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: "9px",
      paddingTop: "1px",
      paddingRight: "29px"
    },
    className: "flex flex-row ml-auto pl-1 italic text-gray-600"
  }, "REFERENCE MODEL")));
};

export default Label;