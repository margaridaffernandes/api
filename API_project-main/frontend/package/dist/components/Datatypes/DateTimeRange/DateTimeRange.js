function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import Label from "../../UI/Label/Label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock, faTimes } from "@fortawesome/free-solid-svg-icons";
import ValidationError from "../../UI/ValidationError/ValidationError";
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

class DateTimeRangeComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      focusedDateStart: false,
      focusedTimeStart: false,
      focusedDateEnd: false,
      focusedTimeEnd: false,
      calendarDateStartPosition: 'bottom',
      calendarTimeStartPosition: 'bottom',
      calendarDateEndPosition: 'bottom',
      calendarTimeEndPosition: 'bottom'
    });

    _defineProperty(this, "handleChange", (value, type, dateType) => {
      this.handleTouch(type, dateType);

      if (value) {
        let selectedDate = new Date(value);

        if (type === "time") {
          let h = selectedDate.getHours().toString().length === 1 ? "0" + selectedDate.getHours() : selectedDate.getHours();
          let m = selectedDate.getMinutes().toString().length === 1 ? "0" + selectedDate.getMinutes() : selectedDate.getMinutes();

          if (dateType === "startTime") {
            this.context.fields.updateValue(this.props.pathLabelTimeStart);
            this.props.onDateTimeRangeChange(this.props.pathLabelTimeStart, h + ":" + m);
          } else if (dateType === "endTime") {
            this.context.fields.updateValue(this.props.pathLabelTimeEnd);
            this.props.onDateTimeRangeChange(this.props.pathLabelTimeEnd, h + ":" + m);
          }
        } else if (type === "date") {
          let year = selectedDate.getFullYear();
          let selectedMonth = selectedDate.getMonth() + 1;
          let month = selectedMonth.toString().length === 1 ? "0" + selectedMonth : selectedMonth;
          let day = selectedDate.getDate().toString().length === 1 ? "0" + selectedDate.getDate() : selectedDate.getDate();

          if (dateType === "startDate") {
            this.context.fields.updateValue(this.props.pathLabelDateStart);
            this.props.onDateTimeRangeChange(this.props.pathLabelDateStart, year + "-" + month + "-" + day);
          } else if (dateType === "endDate") {
            this.context.fields.updateValue(this.props.pathLabelDateEnd);
            this.props.onDateTimeRangeChange(this.props.pathLabelDateEnd, year + "-" + month + "-" + day);
          }
        }
      } else {
        if (type === "time") {
          if (dateType === "startTime") {
            this.context.fields.updateValue(this.props.pathLabelTimeStart);
            this.props.onDateTimeRangeChange(this.props.pathLabelTimeStart, "");
          } else if (dateType === "endTime") {
            this.context.fields.updateValue(this.props.pathLabelTimeEnd);
            this.props.onDateTimeRangeChange(this.props.pathLabelTimeEnd, "");
          }
        } else if (type === "date") {
          if (dateType === "startDate") {
            this.context.fields.updateValue(this.props.pathLabelDateStart);
            this.props.onDateTimeRangeChange(this.props.pathLabelDateStart, "");
          } else if (dateType === "endDate") {
            this.context.fields.updateValue(this.props.pathLabelDateEnd);
            this.props.onDateTimeRangeChange(this.props.pathLabelDateEnd, "");
          }
        }
      }
    });

    _defineProperty(this, "handleTouch", (type, dateType) => {
      if (type === "time") {
        if (dateType === "startTime") {
          this.setState({
            focusedTimeStart: false
          });
          this.props.onTouch(this.props.pathLabelTimeStart);
        } else if (dateType === "endTime") {
          this.setState({
            focusedTimeEnd: false
          });
          this.props.onTouch(this.props.pathLabelTimeEnd);
        }
      } else if (type === "date") {
        if (dateType === "startDate") {
          this.setState({
            focusedDateStart: false
          });
          this.props.onTouch(this.props.pathLabelDateStart);
        } else if (dateType === "endDate") {
          this.setState({
            focusedDateEnd: false
          });
          this.props.onTouch(this.props.pathLabelDateEnd);
        }
      }
    });

    _defineProperty(this, "handleFocus", (type, dateType) => {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; // vertical size of the window

      const topOffset = document.activeElement.getBoundingClientRect().top; // top offset of the calendar (distance from top of the page relative to the window position)

      if (type === "time") {
        if (dateType === "startTime") {
          if (!this.state.focusedTimeStart) {
            this.setState({
              focusedTimeStart: true
            });
          }

          if (topOffset > windowHeight / 2) {
            this.setState({
              calendarTimeStartPosition: 'top'
            });
          } else {
            this.setState({
              calendarTimeStartPosition: 'bottom'
            });
          }
        } else if (dateType === "endTime") {
          if (!this.state.focusedTimeEnd) {
            this.setState({
              focusedTimeEnd: true
            });
          }

          if (topOffset > windowHeight / 2) {
            this.setState({
              calendarTimeEndPosition: 'top'
            });
          } else {
            this.setState({
              calendarTimeEndPosition: 'bottom'
            });
          }
        }
      } else if (type === "date") {
        if (dateType === "startDate") {
          if (!this.state.focusedDateStart) {
            this.setState({
              focusedDateStart: true
            });
          }

          if (topOffset > windowHeight / 2) {
            this.setState({
              calendarDateStartPosition: 'top'
            });
          } else {
            this.setState({
              calendarDateStartPosition: 'bottom'
            });
          }
        } else if (dateType === "endDate") {
          if (!this.state.focusedDateEnd) {
            this.setState({
              focusedDateEnd: true
            });
          }

          if (topOffset > windowHeight / 2) {
            this.setState({
              calendarDateStartPosition: 'top'
            });
          } else {
            this.setState({
              calendarDateStartPosition: 'bottom'
            });
          }
        }
      }
    });

    _defineProperty(this, "handleDatePickerMode", (value, dateStartPicker, dateEndPicker, timeStartPicker, timeEndPicker) => {
      if (Array.isArray(value)) {
        document.documentElement.style.setProperty('--buttons-and-selected-options-color', value[1]);
        document.documentElement.style.setProperty('--header-color', value[1]);
        document.documentElement.style.setProperty('--selected-day', value[1]);
      } else {
        document.documentElement.style.setProperty('--buttons-and-selected-options-color', value.themePalette.$500);
        document.documentElement.style.setProperty('--header-color', value.themePalette.$200);
        document.documentElement.style.setProperty('--selected-day', value.themePalette.$400);
      }

      let dateTimeRange;

      if (this.props.editMode) {
        dateTimeRange = /*#__PURE__*/React.createElement("div", {
          className: "flex flex-col"
        }, /*#__PURE__*/React.createElement("div", {
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
          className: this.props.errorDateStart ? this.props.startDateValue !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border border-red-500 text-gray-700 pl-8 " + "rounded-sm leading-tight " + (this.state.focusedDateStart ? "outline-none bg-white" : "bg-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border border-red-500 text-gray-500 pl-8 " + "rounded-sm leading-tight " + (this.state.focusedDateStart ? "outline-none bg-white" : "bg-gray-200") : this.props.startDateValue !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-700 pl-8 rounded-sm leading-tight " + (this.state.focusedDateStart ? "outline-none bg-white border-gray-300" : "bg-gray-200 border-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-500 pl-8 rounded-sm leading-tight " + (this.state.focusedDateStart ? "outline-none bg-white border-gray-300" : "bg-gray-200 border-gray-200"),
          title: this.props.description
        }, dateStartPicker), /*#__PURE__*/React.createElement("div", {
          onClick: () => this.handleChange(undefined, "date", "startDate"),
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
          className: this.props.errorTimeStart ? this.props.startTimeValue !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border border-red-500 text-gray-700 pl-8 " + "rounded-sm leading-tight " + (this.state.focusedTimeStart ? "outline-none bg-white" : "bg-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border border-red-500 text-gray-500 pl-8 " + "rounded-sm leading-tight " + (this.state.focusedTimeStart ? "outline-none bg-white" : "bg-gray-200") : this.props.startTimeValue !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-700 pl-8 rounded-sm leading-tight " + (this.state.focusedTimeStart ? "outline-none bg-white border-gray-300" : "bg-gray-200 border-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-500 pl-8 rounded-sm leading-tight " + (this.state.focusedTimeStart ? "outline-none bg-white border-gray-300" : "bg-gray-200 border-gray-200"),
          title: this.props.description
        }, timeStartPicker), /*#__PURE__*/React.createElement("div", {
          onClick: () => this.handleChange(undefined, "time", "startTime"),
          className: "duration-500 cursor-pointer absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-700"
        }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
          size: "xs",
          icon: faTimes
        }))))), /*#__PURE__*/React.createElement("div", {
          className: "mt-4 flex flex-row justify-between items-end"
        }, /*#__PURE__*/React.createElement("div", {
          className: "w-1/2 flex flex-col mr-2"
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
          className: this.props.errorDateEnd ? this.props.endDateValue !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border border-red-500 text-gray-700 pl-8 " + "rounded-sm leading-tight" + (this.state.focusedDateEnd ? "outline-none bg-white" : "bg-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border border-red-500 text-gray-500 pl-8 " + "rounded-sm leading-tight" + (this.state.focusedDateEnd ? "outline-none bg-white" : "bg-gray-200") : this.props.endDateValue !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-700 pl-8 rounded-sm leading-tight " + (this.state.focusedDateEnd ? "outline-none bg-white border-gray-300" : "bg-gray-200 border-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-500 pl-8 rounded-sm leading-tight " + (this.state.focusedDateEnd ? "outline-none bg-white border-gray-300" : "bg-gray-200 border-gray-200"),
          title: this.props.description
        }, dateEndPicker), /*#__PURE__*/React.createElement("div", {
          onClick: () => this.handleChange(undefined, "date", "endDate"),
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
          className: this.props.errorTimeEnd ? this.props.endTimeValue !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border border-red-500 text-gray-700 pl-8 " + "rounded-sm leading-tight" + (this.state.focusedTimeEnd ? "outline-none bg-white" : "bg-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border border-red-500 text-gray-500 pl-8 " + "rounded-sm leading-tight" + (this.state.focusedTimeEnd ? "outline-none bg-white" : "bg-gray-200") : this.props.endTimeValue !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-700 pl-8 rounded-sm leading-tight " + (this.state.focusedTimeEnd ? "outline-none bg-white border-gray-300" : "bg-gray-200 border-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-500 pl-8 rounded-sm leading-tight " + (this.state.focusedTimeEnd ? "outline-none bg-white border-gray-300" : "bg-gray-200 border-gray-200"),
          title: this.props.description
        }, timeEndPicker), /*#__PURE__*/React.createElement("div", {
          onClick: () => this.handleChange(undefined, "time", "endTime"),
          className: "duration-500 cursor-pointer absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-700"
        }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
          size: "xs",
          icon: faTimes
        }))))));
      } else {
        dateTimeRange = /*#__PURE__*/React.createElement("div", {
          className: "flex flex-col"
        }, /*#__PURE__*/React.createElement("div", {
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
        })), /*#__PURE__*/React.createElement("input", {
          title: this.props.description,
          disabled: true,
          value: this.props.startDateValue === "" ? "dd/mm/aaaa" : this.props.startDateValue.split("-").reverse().join("/"),
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: this.props.startDateValue !== "" ? "block h-10 flex items-center appearance-none w-full bg-white border border-gray-400 text-gray-700 py-2 pl-8 rounded-sm leading-tight" : "block h-10 flex items-center appearance-none w-full bg-white border border-gray-400 text-gray-500 py-2 pl-8 rounded-sm leading-tight"
        }))), /*#__PURE__*/React.createElement("div", {
          className: "w-1/2 flex flex-col"
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
          title: this.props.description,
          disabled: true,
          value: this.props.startTimeValue === "" ? "hh:mm" : this.props.startTimeValue,
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: this.props.startTimeValue !== "" ? "block flex items-center h-10 appearance-none w-full bg-white border border-gray-400 text-gray-700 py-2 pl-8 rounded-sm leading-tight" : "block flex items-center h-10 appearance-none w-full bg-white border border-gray-400 text-gray-500 py-2 pl-8 rounded-sm leading-tight"
        })))), /*#__PURE__*/React.createElement("div", {
          className: "mt-4 flex flex-row justify-between items-end"
        }, /*#__PURE__*/React.createElement("div", {
          className: "w-1/2 flex flex-col mr-2"
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
          title: this.props.description,
          disabled: true,
          value: this.props.endDateValue === "" ? "dd/mm/aaaa" : this.props.endDateValue.split("-").reverse().join("/"),
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: this.props.endDateValue !== "" ? "block h-10 flex items-center appearance-none w-full bg-white border border-gray-400 text-gray-700 py-2 pl-8 rounded-sm leading-tight" : "block h-10 flex items-center appearance-none w-full bg-white border border-gray-400 text-gray-500 py-2 pl-8 rounded-sm leading-tight"
        }))), /*#__PURE__*/React.createElement("div", {
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
          title: this.props.description,
          disabled: true,
          value: this.props.endTimeValue === "" ? "hh:mm" : this.props.endTimeValue,
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: this.props.endTimeValue !== "" ? "block h-10 flex items-center appearance-none w-full bg-white border border-gray-400 text-gray-700 py-2 pl-8 rounded-sm leading-tight" : "block h-10 flex items-center appearance-none w-full bg-white border border-gray-400 text-gray-500 py-2 pl-8 rounded-sm leading-tight"
        })))));
      }

      return dateTimeRange;
    });
  }

  render() {
    let dateStartPicker = /*#__PURE__*/React.createElement(DatePicker, {
      showMonthDropdown: true,
      showYearDropdown: true,
      dropdownMode: "scroll",
      locale: "pt",
      maxDate: this.props.endDateValue === "" ? this.props.endDateValue : new Date(this.props.endDateValue),
      onFocus: this.handleFocus.bind(this, "date", "startDate"),
      onBlur: this.handleTouch.bind(this, "date", "startDate"),
      placeholderText: "dd/mm/aaaa",
      dateFormat: "dd/MM/yyyy",
      selected: this.props.startDateValue === "" ? this.props.startDateValue : new Date(this.props.startDateValue),
      onChange: date => this.handleChange(date, "date", "startDate"),
      popperPlacement: this.state.calendarDateStartPosition,
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
    let timeStartPicker = /*#__PURE__*/React.createElement(DatePicker, {
      onFocus: this.handleFocus.bind(this, "time", "startTime"),
      onBlur: this.handleTouch.bind(this, "time", "startTime"),
      placeholderText: "hh:mm",
      showTimeSelect: true,
      showTimeSelectOnly: true,
      timeIntervals: 15,
      timeCaption: "Tempo",
      timeFormat: "p",
      dateFormat: "p",
      locale: "pt",
      minTime: new Date(2000, 1, 1, 24, 0),
      maxTime: this.props.startDateValue !== "" && this.props.endDateValue !== "" && this.props.endTimeValue !== "" && this.props.startDateValue === this.props.endDateValue ? new Date(2000, 1, 1, this.props.endTimeValue.split(":")[0], this.props.endTimeValue.split(":")[1]) : new Date(2000, 1, 1, 23, 59),
      selected: this.props.startTimeValue === "" ? this.props.startTimeValue : new Date(2000, 1, 1, this.props.startTimeValue.split(":")[0], this.props.startTimeValue.split(":")[1]),
      onChange: time => this.handleChange(time, "time", "startTime"),
      popperPlacement: this.state.calendarTimeStartPosition,
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
    let dateEndPicker = /*#__PURE__*/React.createElement(DatePicker, {
      showMonthDropdown: true,
      showYearDropdown: true,
      dropdownMode: "scroll",
      locale: "pt",
      minDate: this.props.startDateValue === "" ? this.props.startDateValue : new Date(this.props.startDateValue),
      onFocus: this.handleFocus.bind(this, "date", "endDate"),
      onBlur: this.handleTouch.bind(this, "date", "endDate"),
      placeholderText: "dd/mm/aaaa",
      dateFormat: "dd/MM/yyyy",
      selected: this.props.endDateValue === "" ? this.props.endDateValue : new Date(this.props.endDateValue),
      onChange: date => this.handleChange(date, "date", "endDate"),
      popperPlacement: this.state.calendarDateEndPosition,
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
    let timeEndPicker = /*#__PURE__*/React.createElement(DatePicker, {
      onFocus: this.handleFocus.bind(this, "time", "endTime"),
      onBlur: this.handleTouch.bind(this, "time", "endTime"),
      placeholderText: "hh:mm",
      showTimeSelect: true,
      showTimeSelectOnly: true,
      timeIntervals: 15,
      timeCaption: "Tempo",
      timeFormat: "p",
      dateFormat: "p",
      locale: "pt",
      maxTime: new Date(2000, 1, 1, 23, 59),
      minTime: this.props.startDateValue !== "" && this.props.endDateValue !== "" && this.props.startTimeValue !== "" && this.props.startDateValue === this.props.endDateValue ? new Date(2000, 1, 1, this.props.startTimeValue.split(":")[0], this.props.startTimeValue.split(":")[1]) : new Date(2000, 1, 1, 24, 0),
      selected: this.props.endTimeValue === "" ? this.props.endTimeValue : new Date(2000, 1, 1, this.props.endTimeValue.split(":")[0], this.props.endTimeValue.split(":")[1]),
      onChange: time => this.handleChange(time, "time", "endTime"),
      popperPlacement: this.state.calendarTimeEndPosition,
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
    }), this.handleDatePickerMode(value, dateStartPicker, dateEndPicker, timeStartPicker, timeEndPicker), (this.props.errorDateEnd || this.props.errorDateStart || this.props.errorTimeEnd || this.props.errorTimeStart) && /*#__PURE__*/React.createElement(ValidationError, {
      errorMessage: this.props.errorDateEnd || this.props.errorDateStart || this.props.errorTimeEnd || this.props.errorTimeStart
    }))));
  }

}

_defineProperty(DateTimeRangeComponent, "contextType", CombinedContext);

const DateTimeRange = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(DateTimeRangeComponent, props));
};

export default DateTimeRange;