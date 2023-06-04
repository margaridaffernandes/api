import React from "react";
import FontSizesContext from "../../../contexts/FontContext";

const SectionLabel = props => /*#__PURE__*/React.createElement(FontSizesContext.Consumer, null, value => /*#__PURE__*/React.createElement("label", {
  style: {
    fontSize: value.fontSize.sectionTitle
  },
  className: props.color + ` flex flex-row break-all tracking-wide ${value.fontLetters.sectionTitle}
        ${value.fontStyle.sectionTitle.toString().replaceAll(",", " ")}`
}, props.label, props.isMandatory && /*#__PURE__*/React.createElement("p", {
  style: {
    fontSize: value.fontSize.sectionTitle
  },
  className: `ml-1 text-red-500 font-bold ${value.fontLetters.sectionTitle}
            ${value.fontStyle.sectionTitle.toString().replaceAll(",", " ")}`
}, "*")));

export default SectionLabel;