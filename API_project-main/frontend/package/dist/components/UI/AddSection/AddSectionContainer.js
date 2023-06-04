function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";
import ComponentsStyle from "../../../styles/ComponentsStyle";
import SectionLabel from "../../UI/SectionLabel/SectionLabel";

class AddSectionContainerComponent extends Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        order: this.props.order,
        width: this.context.sizes.sizes[this.props.path] ? this.context.sizes.sizes[this.props.path] : "100%"
      },
      className: ComponentsStyle.defaultSectionContainerRoot
    }, /*#__PURE__*/React.createElement("div", {
      className: "px-2"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        borderColor: "#e2e8f0",
        paddingTop: ComponentsStyle.defaultSectionContainerYPadding,
        paddingBottom: ComponentsStyle.defaultSectionContainerYPadding
      },
      className: `flex flex-row ${this.context.font.fontAlignment.sectionTitle} ${ComponentsStyle.addSectionContainer}`
    }, /*#__PURE__*/React.createElement(SectionLabel, {
      isMandatory: false,
      label: this.props.label,
      color: "text-gray-600"
    }))));
  }

}

_defineProperty(AddSectionContainerComponent, "contextType", CombinedContext);

const AddSectionContainer = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(AddSectionContainerComponent, props));
};

export default AddSectionContainer;