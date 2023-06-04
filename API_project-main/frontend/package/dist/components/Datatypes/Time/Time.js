function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import Label from "../../UI/Label/Label";
import ValidationError from "../../UI/ValidationError/ValidationError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faTimes } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import pt from "date-fns/locale/pt-BR";
import FieldContainer from "../../UI/FieldContainer/FieldContainer";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";
import ThemeContext from "../../../contexts/ThemeContext";
registerLocale("pt", pt);

class TimeComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      focused: false,
      calendarPosition: 'bottom'
    });

    _defineProperty(this, "handleChange", hour => {
      this.context.fields.updateValue(this.props.pathLabel);
      this.handleTouch();

      if (hour) {
        let selectedDate = new Date(hour);
        let h = selectedDate.getHours().toString().length === 1 ? "0" + selectedDate.getHours() : selectedDate.getHours();
        let m = selectedDate.getMinutes().toString().length === 1 ? "0" + selectedDate.getMinutes() : selectedDate.getMinutes();
        this.props.onTimeChange(this.props.pathLabel, h + ":" + m);
      } else {
        this.props.onTimeChange(this.props.pathLabel, "");
      }
    });

    _defineProperty(this, "handleTouch", () => {
      this.setState({
        focused: false
      });
      this.props.onTouch(this.props.pathLabel);
    });

    _defineProperty(this, "handleFocus", () => {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; // vertical size of the window

      const topOffset = document.activeElement.getBoundingClientRect().top; // top offset of the calendar (distance from top of the page relative to the window position)

      if (topOffset > windowHeight / 2) {
        this.setState({
          calendarPosition: 'top'
        });
      } else {
        this.setState({
          calendarPosition: 'bottom'
        });
      }

      if (!this.state.focused) {
        this.setState({
          focused: true
        });
      }
    });

    _defineProperty(this, "handleDatePickerMode", (value, timePicker) => {
      if (Array.isArray(value)) {
        document.documentElement.style.setProperty('--buttons-and-selected-options-color', value[1]);
        document.documentElement.style.setProperty('--header-color', value[1]);
        document.documentElement.style.setProperty('--selected-day', value[1]);
      } else {
        document.documentElement.style.setProperty('--buttons-and-selected-options-color', value.themePalette.$500);
        document.documentElement.style.setProperty('--header-color', value.themePalette.$200);
        document.documentElement.style.setProperty('--selected-day', value.themePalette.$400);
      }

      let time;

      if (this.props.editMode) {
        time = /*#__PURE__*/React.createElement("div", {
          className: "relative"
        }, /*#__PURE__*/React.createElement("div", {
          className: "cursor-default absolute inset-y-0 left-0 flex items-center px-3 text-gray-700"
        }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
          size: "sm",
          icon: faClock
        })), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: this.props.error ? this.props.value !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border border-red-500 text-gray-700 pl-8 " + "rounded-sm leading-tight " + (this.state.focused ? "outline-none bg-white" : "bg-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border border-red-500 text-gray-500 pl-8 " + "rounded-sm leading-tight " + (this.state.focused ? "outline-none bg-white" : "bg-gray-200") : this.props.value !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-700 pl-8 rounded-sm " + "leading-tight " + (this.state.focused ? "outline-none bg-white border-gray-300" : "bg-gray-200 border-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-500 pl-8 rounded-sm " + "leading-tight " + (this.state.focused ? "outline-none bg-white border-gray-300" : "bg-gray-200 border-gray-200"),
          title: this.props.description
        }, timePicker), /*#__PURE__*/React.createElement("div", {
          onClick: () => this.handleChange(undefined),
          className: "duration-500 cursor-pointer absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-700"
        }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
          size: "xs",
          icon: faTimes
        })));
      } else {
        time = /*#__PURE__*/React.createElement("div", {
          title: this.props.description,
          className: "relative"
        }, /*#__PURE__*/React.createElement("div", {
          className: "cursor-default absolute inset-y-0 left-0 flex items-center px-3 text-gray-700"
        }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
          size: "sm",
          icon: faClock
        })), /*#__PURE__*/React.createElement("input", {
          disabled: true,
          value: this.props.value === "" ? "hh:mm" : this.props.value,
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: this.props.value !== "" ? "block h-10 flex items-center appearance-none w-full bg-white border border-gray-400 text-gray-700 py-2 pl-8 rounded-sm leading-tight" : "block h-10 flex items-center appearance-none w-full bg-white border border-gray-400 text-gray-500 py-2 pl-8 rounded-sm leading-tight"
        }));
      }

      return time;
    });
  }

  render() {
    let timePicker = /*#__PURE__*/React.createElement(DatePicker, {
      onFocus: this.handleFocus,
      onBlur: this.handleTouch.bind(this),
      placeholderText: "hh:mm",
      showTimeSelect: true,
      showTimeSelectOnly: true,
      timeIntervals: 15,
      timeCaption: "Tempo",
      timeFormat: "p",
      dateFormat: "p",
      locale: "pt",
      selected: this.props.value === "" ? this.props.value : new Date(2000, 1, 1, this.props.value.split(":")[0], this.props.value.split(":")[1]),
      onChange: this.handleChange,
      popperPlacement: this.state.calendarPosition,
      popperModifiers: {
        flip: {
          behavior: ["bottom"]
        },
        preventOverflow: {
          enabled: false
        },
        hide: {
          enabled: false
        }
      }
    });
    return /*#__PURE__*/React.createElement(ThemeContext.Consumer, null, value => /*#__PURE__*/React.createElement("div", {
      style: {
        order: this.props.order,
        width: this.context.sizes.sizes[this.props.path] ? this.context.sizes.sizes[this.props.path] : "100%"
      },
      className: "flex"
    }, /*#__PURE__*/React.createElement(FieldContainer, null, /*#__PURE__*/React.createElement(Label, {
      label: this.props.label,
      editMode: this.props.editMode,
      optional: this.props.optional,
      showLabel: this.props.showLabel,
      optionalMandatory: this.props.optionalMandatory,
      sectionOccurrence: this.props.sectionOccurrence
    }), this.handleDatePickerMode(value, timePicker), this.props.error && /*#__PURE__*/React.createElement(ValidationError, {
      errorMessage: this.props.error
    }))));
  }

}

_defineProperty(TimeComponent, "contextType", CombinedContext);

const Time = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(TimeComponent, props));
};

export default Time;