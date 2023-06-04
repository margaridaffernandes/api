function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import Label from "../../UI/Label/Label";
import ValidationError from "../../UI/ValidationError/ValidationError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faTimes } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../styles/datepickerstyles.css";
import { registerLocale } from "react-datepicker";
import pt from "date-fns/locale/pt-BR";
import FieldContainer from "../../UI/FieldContainer/FieldContainer";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";
import ThemeContext from "../../../contexts/ThemeContext";
registerLocale("pt", pt);

class TimeRangeComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      startFocused: false,
      endFocused: false,
      calendarStartPosition: 'bottom',
      calendarEndPosition: 'bottom'
    });

    _defineProperty(this, "handleChange", (hour, dateType) => {
      this.handleTouch(dateType);

      if (hour) {
        let selectedDate = new Date(hour);
        let h = selectedDate.getHours().toString().length === 1 ? "0" + selectedDate.getHours() : selectedDate.getHours();
        let m = selectedDate.getMinutes().toString().length === 1 ? "0" + selectedDate.getMinutes() : selectedDate.getMinutes();

        if (dateType === "startValue") {
          this.context.fields.updateValue(this.props.pathLabelStart);
          this.props.onTimeRangeChange(this.props.pathLabelStart, h + ":" + m);
        } else if (dateType === "endValue") {
          this.context.fields.updateValue(this.props.pathLabelEnd);
          this.props.onTimeRangeChange(this.props.pathLabelEnd, h + ":" + m);
        }
      } else {
        if (dateType === "startValue") {
          this.context.fields.updateValue(this.props.pathLabelStart);
          this.props.onTimeRangeChange(this.props.pathLabelStart, "");
        } else if (dateType === "endValue") {
          this.context.fields.updateValue(this.props.pathLabelEnd);
          this.props.onTimeRangeChange(this.props.pathLabelEnd, "");
        }
      }
    });

    _defineProperty(this, "handleFocus", type => {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; // vertical size of the window

      const topOffset = document.activeElement.getBoundingClientRect().top; // top offset of the calendar (distance from top of the page relative to the window position)

      if (type === "startValue") {
        if (!this.state.startFocused) {
          this.setState({
            startFocused: true
          });
        }

        if (topOffset > windowHeight / 2) {
          this.setState({
            calendarStartPosition: 'top'
          });
        } else {
          this.setState({
            calendarStartPosition: 'bottom'
          });
        }
      } else if (type === "endValue") {
        if (!this.state.endFocused) {
          this.setState({
            endFocused: true
          });
        }

        if (topOffset > windowHeight / 2) {
          this.setState({
            calendarEndPosition: 'top'
          });
        } else {
          this.setState({
            calendarEndPosition: 'bottom'
          });
        }
      }
    });

    _defineProperty(this, "handleTouch", type => {
      if (type === "endValue") {
        this.setState({
          endFocused: false
        });
        this.props.onTouch(this.props.pathLabelEnd);
      } else if (type === "startValue") {
        this.setState({
          startFocused: false
        });
        this.props.onTouch(this.props.pathLabelStart);
      }
    });

    _defineProperty(this, "handleDatePickerMode", (value, startTimePicker, endTimePicker) => {
      if (Array.isArray(value)) {
        document.documentElement.style.setProperty('--buttons-and-selected-options-color', value[1]);
        document.documentElement.style.setProperty('--header-color', value[1]);
        document.documentElement.style.setProperty('--selected-day', value[1]);
      } else {
        document.documentElement.style.setProperty('--buttons-and-selected-options-color', value.themePalette.$500);
        document.documentElement.style.setProperty('--header-color', value.themePalette.$200);
        document.documentElement.style.setProperty('--selected-day', value.themePalette.$400);
      }

      let timeRange;

      if (this.props.editMode) {
        timeRange = /*#__PURE__*/React.createElement("div", {
          className: "flex flex-row justify-between items-end"
        }, /*#__PURE__*/React.createElement("div", {
          className: "w-1/2 flex flex-col mr-2"
        }, /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: "block text-left appearance-none bg-transparent text-gray-700 py-2 pr-4 leading-tight"
        }, "Tempo Inicial"), /*#__PURE__*/React.createElement("div", {
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
          className: this.props.errorStart ? this.props.startValue !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border border-red-500 text-gray-700 pl-8 " + "rounded-sm leading-tight " + (this.state.startFocused ? "outline-none bg-white" : "bg-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border border-red-500 text-gray-500 pl-8 " + "rounded-sm leading-tight " + (this.state.startFocused ? "outline-none bg-white" : "bg-gray-200") : this.props.startValue !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-700 pl-8 rounded-sm " + "leading-tight " + (this.state.startFocused ? "outline-none bg-white border-gray-300" : "bg-gray-200 border-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-500 pl-8 rounded-sm " + "leading-tight " + (this.state.startFocused ? "outline-none bg-white border-gray-300" : "bg-gray-200 border-gray-200"),
          title: this.props.description
        }, startTimePicker), /*#__PURE__*/React.createElement("div", {
          onClick: () => this.handleChange(undefined, "startValue"),
          className: "duration-500 cursor-pointer absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-700"
        }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
          size: "xs",
          icon: faTimes
        })))), /*#__PURE__*/React.createElement("div", {
          className: "w-1/2 flex flex-col"
        }, /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: "block text-left appearance-none bg-transparent text-gray-700 py-2 pr-4 leading-tight"
        }, "Tempo Final"), /*#__PURE__*/React.createElement("div", {
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
          className: this.props.errorEnd ? this.props.endValue !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border border-red-500 text-gray-700 pl-8 " + "rounded-sm leading-tight " + (this.state.endFocused ? "outline-none bg-white" : "bg-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border border-red-500 text-gray-500 pl-8 " + "rounded-sm leading-tight " + (this.state.endFocused ? "outline-none bg-white" : "bg-gray-200") : this.props.endValue !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-700 pl-8 rounded-sm " + "leading-tight " + (this.state.endFocused ? "outline-none bg-white border-gray-300" : "bg-gray-200 border-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-500 pl-8 rounded-sm " + "leading-tight " + (this.state.endFocused ? "outline-none bg-white border-gray-300" : "bg-gray-200 border-gray-200"),
          title: this.props.description
        }, endTimePicker), /*#__PURE__*/React.createElement("div", {
          onClick: () => this.handleChange(undefined, "endValue"),
          className: "duration-500 cursor-pointer absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-700"
        }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
          size: "xs",
          icon: faTimes
        })))));
      } else {
        timeRange = /*#__PURE__*/React.createElement("div", {
          className: "flex flex-row justify-between items-end"
        }, /*#__PURE__*/React.createElement("div", {
          title: this.props.description,
          className: "w-1/2 flex flex-col mr-2"
        }, /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: "block text-left appearance-none bg-transparent text-gray-700 py-2 pr-4 leading-tight"
        }, "Tempo Inicial"), /*#__PURE__*/React.createElement("div", {
          className: "relative"
        }, /*#__PURE__*/React.createElement("div", {
          className: "cursor-default absolute inset-y-0 left-0 flex items-center px-3 text-gray-700"
        }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
          size: "sm",
          icon: faClock
        })), /*#__PURE__*/React.createElement("input", {
          disabled: true,
          value: this.props.startValue === "" ? "hh:mm" : this.props.startValue,
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: this.props.startValue !== "" ? "block h-10 flex items-center appearance-none w-full bg-white border border-gray-400 text-gray-700 py-2 pl-8 rounded-sm leading-tight" : "block h-10 flex items-center appearance-none w-full bg-white border border-gray-400 text-gray-500 py-2 pl-8 rounded-sm leading-tight"
        }))), /*#__PURE__*/React.createElement("div", {
          title: this.props.description,
          className: "w-1/2 flex flex-col"
        }, /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: "block text-left appearance-none bg-transparent text-gray-700 py-2 pr-4 leading-tight"
        }, "Tempo Final"), /*#__PURE__*/React.createElement("div", {
          className: "relative"
        }, /*#__PURE__*/React.createElement("div", {
          className: "cursor-default absolute inset-y-0 left-0 flex items-center px-3 text-gray-700"
        }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
          size: "sm",
          icon: faClock
        })), /*#__PURE__*/React.createElement("input", {
          disabled: true,
          value: this.props.endValue === "" ? "hh:mm" : this.props.endValue,
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: this.props.endValue !== "" ? "block h-10 flex items-center appearance-none w-full bg-white border border-gray-400 text-gray-700 py-2 pl-8 rounded-sm leading-tight" : "block h-10 flex items-center appearance-none w-full bg-white border border-gray-400 text-gray-500 py-2 pl-8 rounded-sm leading-tight"
        }))));
      }

      return timeRange;
    });
  }

  render() {
    let startTimePicker = /*#__PURE__*/React.createElement(DatePicker, {
      onFocus: this.handleFocus.bind(this, "startValue"),
      onBlur: this.handleTouch.bind(this, "startValue"),
      placeholderText: "hh:mm",
      showTimeSelect: true,
      showTimeSelectOnly: true,
      timeIntervals: 15,
      timeCaption: "Tempo",
      timeFormat: "p",
      dateFormat: "p",
      locale: "pt",
      minTime: new Date(2000, 1, 1, 24, 0),
      maxTime: this.props.endValue !== "" ? new Date(2000, 1, 1, this.props.endValue.split(":")[0], this.props.endValue.split(":")[1]) : new Date(2000, 1, 1, 23, 59),
      selected: this.props.startValue === "" ? this.props.startValue : new Date(2000, 1, 1, this.props.startValue.split(":")[0], this.props.startValue.split(":")[1]),
      onChange: date => this.handleChange(date, "startValue"),
      popperPlacement: this.state.calendarStartPosition,
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
    let endTimePicker = /*#__PURE__*/React.createElement(DatePicker, {
      onFocus: this.handleFocus.bind(this, "endValue"),
      onBlur: this.handleTouch.bind(this, "endValue"),
      placeholderText: "hh:mm",
      showTimeSelect: true,
      showTimeSelectOnly: true,
      timeIntervals: 15,
      timeCaption: "Tempo",
      timeFormat: "p",
      dateFormat: "p",
      locale: "pt",
      maxTime: new Date(2000, 1, 1, 23, 59),
      minTime: this.props.startValue !== "" ? new Date(2000, 1, 1, this.props.startValue.split(":")[0], this.props.startValue.split(":")[1]) : new Date(2000, 1, 1, 24, 0),
      selected: this.props.endValue === "" ? this.props.endValue : new Date(2000, 1, 1, this.props.endValue.split(":")[0], this.props.endValue.split(":")[1]),
      onChange: date => this.handleChange(date, "endValue"),
      popperPlacement: this.state.calendarEndPosition,
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
    }), this.handleDatePickerMode(value, startTimePicker, endTimePicker), (this.props.errorStart || this.props.errorEnd) && /*#__PURE__*/React.createElement(ValidationError, {
      errorMessage: this.props.errorStart || this.props.errorEnd
    }))));
  }

}

_defineProperty(TimeRangeComponent, "contextType", CombinedContext);

const TimeRange = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(TimeRangeComponent, props));
};

export default TimeRange;