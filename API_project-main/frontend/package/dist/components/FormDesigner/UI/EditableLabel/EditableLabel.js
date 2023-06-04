function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import ProviderCombinedContext from "../../../../contexts/ProviderCombinedContext";
import CombinedContext from "../../../../contexts/CombinedContext";

class EditableLabelComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      isEditing: false,
      previewLabel: this.props.labelValue
    });

    _defineProperty(this, "toggleEditMode", () => {
      const {
        isEditing,
        previewLabel
      } = this.state;
      const {
        editChangeEvent
      } = this.props; //para quando se carrega no botão de confirmar

      if (isEditing === true) {
        if (editChangeEvent) {
          this.setState({
            isEditing: false
          });
          editChangeEvent(previewLabel);
        }

        return;
      }

      this.setState({
        isEditing: true
      });
    });

    _defineProperty(this, "cancelEditMode", () => {
      const {
        labelValue
      } = this.props;
      this.setState({
        isEditing: false,
        previewLabel: labelValue
      });
    });

    _defineProperty(this, "simpleLabelMode", () => {
      const {
        labelValue
      } = this.props;
      return /*#__PURE__*/React.createElement("p", {
        className: "cursor-pointer break-words tracking-wide text-white " + this.props.className,
        onClick: this.toggleEditMode,
        style: this.props.style,
        onMouseOver: () => this.setState({
          isHovering: true
        }),
        onMouseLeave: () => this.setState({
          isHovering: false
        })
      }, labelValue);
    });

    _defineProperty(this, "labelOnChange", e => {
      const previewLabel = e.target.value;

      if (previewLabel.length > 0) {
        this.setState({
          previewLabel
        });
        return;
      }

      this.setState({
        previewLabel
      });
    });

    _defineProperty(this, "editLabelMode", () => {
      const {
        previewLabel
      } = this.state;
      return /*#__PURE__*/React.createElement("div", {
        className: "inline"
      }, /*#__PURE__*/React.createElement("input", {
        className: "border-none break-words text-center outline-none tracking-wide rounded-sm",
        type: "text",
        value: previewLabel,
        key: "input-value-label",
        onChange: this.labelOnChange,
        autoFocus: true
      }), /*#__PURE__*/React.createElement("button", {
        className: "h-4 w-4 border-none ml-2 transition duration-500 ease-in-out focus:outline-none hover:text-white",
        key: "input-value-cancel-button",
        onClick: this.cancelEditMode
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        icon: faTimes
      })), /*#__PURE__*/React.createElement("button", {
        className: "h-4 w-4 border-none ml-2 transition duration-500 ease-in-out focus:outline-none hover:text-white",
        key: "input-value-approve-button",
        onClick: this.toggleEditMode
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        icon: faCheck
      })));
    });
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    const {
      isEditing
    } = this.state;
    const showThisComponent = isEditing ? this.editLabelMode() : this.simpleLabelMode();
    return /*#__PURE__*/React.createElement("div", null, showThisComponent);
  }

}

_defineProperty(EditableLabelComponent, "contextType", CombinedContext);

const EditableLabel = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(EditableLabelComponent, props));
};

export default EditableLabel;