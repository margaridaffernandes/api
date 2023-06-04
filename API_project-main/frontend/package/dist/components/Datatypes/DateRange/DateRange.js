function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import Label from "../../UI/Label/Label";
import ValidationError from "../../UI/ValidationError/ValidationError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
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

class DateRangeComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      startFocused: false,
      endFocused: false,
      calendarStartPosition: 'bottom',
      calendarEndPosition: 'bottom'
    });

    _defineProperty(this, "handleChange", (date, dateType) => {
      this.handleTouch(dateType);

      if (date) {
        let selectedDate = new Date(date);
        let year = selectedDate.getFullYear();
        let selectedMonth = selectedDate.getMonth() + 1;
        let month = selectedMonth.toString().length === 1 ? "0" + selectedMonth : selectedMonth;
        let day = selectedDate.getDate().toString().length === 1 ? "0" + selectedDate.getDate() : selectedDate.getDate();

        if (dateType === "startValue") {
          this.context.fields.updateValue(this.props.pathLabelStart);
          this.props.onDateRangeChange(this.props.pathLabelStart, year + "-" + month + "-" + day);
        } else if (dateType === "endValue") {
          this.context.fields.updateValue(this.props.pathLabelEnd);
          this.props.onDateRangeChange(this.props.pathLabelEnd, year + "-" + month + "-" + day);
        }
      } else {
        if (dateType === "startValue") {
          this.context.fields.updateValue(this.props.pathLabelStart);
          this.props.onDateRangeChange(this.props.pathLabelStart, "");
        } else if (dateType === "endValue") {
          this.context.fields.updateValue(this.props.pathLabelEnd);
          this.props.onDateRangeChange(this.props.pathLabelEnd, "");
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

    _defineProperty(this, "handleDatePickerMode", (value, startDatePicker, endDatePicker) => {
      if (Array.isArray(value)) {
        document.documentElement.style.setProperty('--buttons-and-selected-options-color', value[1]);
        document.documentElement.style.setProperty('--header-color', value[1]);
        document.documentElement.style.setProperty('--selected-day', value[1]);
      } else {
        document.documentElement.style.setProperty('--buttons-and-selected-options-color', value.themePalette.$500);
        document.documentElement.style.setProperty('--header-color', value.themePalette.$200);
        document.documentElement.style.setProperty('--selected-day', value.themePalette.$400);
      }

      let dateRange;

      if (this.props.editMode) {
        dateRange = /*#__PURE__*/React.createElement("div", {
          className: "flex flex-row justify-between items-end"
        }, /*#__PURE__*/React.createElement("div", {
          className: "w-1/2 flex flex-col mr-2"
        }, /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: "block text-left appearance-none bg-transparent text-gray-700 py-2 pr-4 leading-tight"
        }, "Data Inicial"), /*#__PURE__*/React.createElement("div", {
          className: "relative"
        }, /*#__PURE__*/React.createElement("div", {
          className: "cursor-default absolute inset-y-0 left-0 flex items-center px-3 text-gray-700"
        }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
          size: "sm",
          icon: faCalendarAlt
        })), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: this.props.errorStart ? this.props.startValue !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border border-red-500 text-gray-700 pl-8 " + "rounded-sm leading-tight " + (this.state.startFocused ? "outline-none bg-white" : "bg-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border border-red-500 text-gray-500 pl-8 " + "rounded-sm leading-tight " + (this.state.startFocused ? "outline-none bg-white" : "bg-gray-200") : this.props.startValue !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-700 pl-8 rounded-sm " + "leading-tight " + (this.state.startFocused ? "outline-none bg-white border-gray-300" : "bg-gray-200 border-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-500 pl-8 rounded-sm " + "leading-tight " + (this.state.startFocused ? "outline-none bg-white border-gray-300" : "bg-gray-200 border-gray-200"),
          title: this.props.description
        }, startDatePicker), /*#__PURE__*/React.createElement("div", {
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
        }, "Data Final"), /*#__PURE__*/React.createElement("div", {
          className: "relative"
        }, /*#__PURE__*/React.createElement("div", {
          className: "cursor-default absolute inset-y-0 left-0 flex items-center px-3 text-gray-700"
        }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
          size: "sm",
          icon: faCalendarAlt
        })), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: this.props.errorEnd ? this.props.endValue !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border border-red-500 text-gray-700 pl-8 rounded-sm " + "leading-tight " + (this.state.endFocused ? "outline-none bg-white" : "bg-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border border-red-500 text-gray-500 pl-8 rounded-sm " + "leading-tight " + (this.state.endFocused ? "outline-none bg-white" : "bg-gray-200") : this.props.endValue !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-700 pl-8 rounded-sm leading-tight " + +(this.state.endFocused ? "outline-none bg-white border-gray-300" : "bg-gray-200 border-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-500 pl-8 rounded-sm leading-tight " + +(this.state.endFocused ? "outline-none bg-white border-gray-300" : "bg-gray-200 border-gray-200"),
          title: this.props.description
        }, endDatePicker), /*#__PURE__*/React.createElement("div", {
          onClick: () => this.handleChange(undefined, "endValue"),
          className: "duration-500 cursor-pointer absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-700"
        }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
          size: "xs",
          icon: faTimes
        })))));
      } else {
        dateRange = /*#__PURE__*/React.createElement("div", {
          className: "flex flex-row justify-between items-end"
        }, /*#__PURE__*/React.createElement("div", {
          title: this.props.description,
          className: "w-1/2 flex flex-col mr-2"
        }, /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: "block text-left appearance-none bg-transparent text-gray-700 py-2 pr-4 leading-tight"
        }, "Data Inicial"), /*#__PURE__*/React.createElement("div", {
          className: "relative"
        }, /*#__PURE__*/React.createElement("div", {
          className: "cursor-default absolute inset-y-0 left-0 flex items-center px-3 text-gray-700"
        }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
          size: "sm",
          icon: faCalendarAlt
        })), /*#__PURE__*/React.createElement("input", {
          disabled: true,
          value: this.props.startValue === "" ? "dd/mm/aaaa" : this.props.startValue.split("-").reverse().join("/"),
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
        }, "Data Final"), /*#__PURE__*/React.createElement("div", {
          className: "relative"
        }, /*#__PURE__*/React.createElement("div", {
          className: "cursor-default absolute inset-y-0 left-0 flex items-center px-3 text-gray-700"
        }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
          size: "sm",
          icon: faCalendarAlt
        })), /*#__PURE__*/React.createElement("input", {
          disabled: true,
          value: this.props.endValue === "" ? "dd/mm/aaaa" : this.props.endValue.split("-").reverse().join("/"),
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: this.props.endValue !== "" ? "block h-10 flex items-center appearance-none w-full bg-white border border-gray-400 text-gray-700 py-2 pl-8 rounded-sm leading-tight" : "block h-10 flex items-center appearance-none w-full bg-white border border-gray-400 text-gray-500 py-2 pl-8 rounded-sm leading-tight"
        }))));
      }

      return dateRange;
    });
  }

  render() {
    let startDatePicker = /*#__PURE__*/React.createElement(DatePicker, {
      showMonthDropdown: true,
      showYearDropdown: true,
      dropdownMode: "scroll",
      locale: "pt",
      maxDate: this.props.endValue === "" ? this.props.endValue : new Date(this.props.endValue),
      onFocus: this.handleFocus.bind(this, "startValue"),
      onBlur: this.handleTouch.bind(this, "startValue"),
      placeholderText: "dd/mm/aaaa",
      dateFormat: "dd/MM/yyyy",
      selected: this.props.startValue === "" ? this.props.startValue : new Date(this.props.startValue),
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
    let endDatePicker = /*#__PURE__*/React.createElement(DatePicker, {
      showMonthDropdown: true,
      showYearDropdown: true,
      dropdownMode: "scroll",
      locale: "pt",
      minDate: this.props.startValue === "" ? this.props.startValue : new Date(this.props.startValue),
      onFocus: this.handleFocus.bind(this, "endValue"),
      onBlur: this.handleTouch.bind(this, "endValue"),
      placeholderText: "dd/mm/aaaa",
      dateFormat: "dd/MM/yyyy",
      selected: this.props.endValue === "" ? this.props.endValue : new Date(this.props.endValue),
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
    }), this.handleDatePickerMode(value, startDatePicker, endDatePicker), (this.props.errorStart || this.props.errorEnd) && /*#__PURE__*/React.createElement(ValidationError, {
      errorMessage: this.props.errorStart || this.props.errorEnd
    }))));
  }

}

_defineProperty(DateRangeComponent, "contextType", CombinedContext);

const DateRange = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(DateRangeComponent, props));
};

export default DateRange;