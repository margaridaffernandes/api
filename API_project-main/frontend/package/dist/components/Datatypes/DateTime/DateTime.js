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
import { eachDayOfInterval, isToday } from "date-fns";
import axios from "axios";
import ThemeContext from "../../../contexts/ThemeContext";
registerLocale("pt", pt);

class DateTimeComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      focusedDate: false,
      focusedTime: false,
      calendarDatePosition: 'bottom',
      calendarTimePosition: 'bottom',
      highlightedDates: [],
      includedDates: [],
      maxHours: {},
      minHours: {},
      shouldHaveSlots: false
    });

    _defineProperty(this, "handleChange", (value, type) => {
      this.handleTouch(type);

      if (value) {
        let selectedDate = new Date(value);

        if (type === "time") {
          this.context.fields.updateValue(this.props.pathLabelTime);
          let h = selectedDate.getHours().toString().length === 1 ? "0" + selectedDate.getHours() : selectedDate.getHours();
          let m = selectedDate.getMinutes().toString().length === 1 ? "0" + selectedDate.getMinutes() : selectedDate.getMinutes(); // Comparar para ver se está no intervalo de tempo permitido

          if (this.state.minHours[this.props.valueDate] || this.state.maxHours[this.props.valueDate]) {
            const minTime = this.state.minHours[this.props.valueDate] ? new Date(2000, 1, 1, parseInt(this.state.minHours[this.props.valueDate].hour), parseInt(this.state.minHours[this.props.valueDate].min)) : new Date(2000, 1, 1, 24, 0);
            const maxTime = this.state.maxHours[this.props.valueDate] ? new Date(2000, 1, 1, parseInt(this.state.maxHours[this.props.valueDate].hour), parseInt(this.state.maxHours[this.props.valueDate].min)) : new Date(2000, 1, 1, 23, 59);

            if (new Date(2000, 1, 1, h, m) >= minTime && new Date(2000, 1, 1, h, m) <= maxTime) {
              this.props.onDateTimeChange(this.props.pathLabelTime, h + ":" + m);
            } else {
              this.props.onDateTimeChange(this.props.pathLabelTime, "");
            }
          } else {
            this.props.onDateTimeChange(this.props.pathLabelTime, h + ":" + m);
          }
        } else if (type === "date") {
          this.context.fields.updateValue(this.props.pathLabelDate);
          let year = selectedDate.getFullYear();
          let selectedMonth = selectedDate.getMonth() + 1;
          let month = selectedMonth.toString().length === 1 ? "0" + selectedMonth : selectedMonth;
          let day = selectedDate.getDate().toString().length === 1 ? "0" + selectedDate.getDate() : selectedDate.getDate();
          this.props.onDateTimeChange(this.props.pathLabelDate, year + "-" + month + "-" + day);
          this.props.onDateTimeChange(this.props.pathLabelTime, "");
        }
      } else {
        if (type === "time") {
          this.context.fields.updateValue(this.props.pathLabelTime);
          this.props.onDateTimeChange(this.props.pathLabelTime, "");
        } else if (type === "date") {
          this.context.fields.updateValue(this.props.pathLabelDate);
          this.context.fields.updateValue(this.props.pathLabelTime);
          this.props.onDateTimeChange(this.props.pathLabelDate, "");
          this.props.onDateTimeChange(this.props.pathLabelTime, "");
        }
      }
    });

    _defineProperty(this, "handleFocus", type => {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; // vertical size of the window

      const topOffset = document.activeElement.getBoundingClientRect().top; // top offset of the calendar (distance from top of the page relative to the window position)

      if (type === 'time') {
        if (!this.state.focusedTime) {
          this.setState({
            focusedTime: true
          });
        }

        if (topOffset > windowHeight / 2) {
          this.setState({
            calendarTimePosition: 'top'
          });
        } else {
          this.setState({
            calendarTimePosition: 'bottom'
          });
        }
      } else if (type === 'date') {
        if (!this.state.focusedDate) {
          this.setState({
            focusedDate: true
          });
        }

        if (topOffset > windowHeight / 2) {
          this.setState({
            calendarDatePosition: 'top'
          });
        } else {
          this.setState({
            calendarDatePosition: 'bottom'
          });
        }
      }
    });

    _defineProperty(this, "handleTouch", type => {
      if (type === "time") {
        this.setState({
          focusedTime: false
        });
        this.props.onTouch(this.props.pathLabelTime);
      } else if (type === "date") {
        this.setState({
          focusedDate: false
        });
        this.props.onTouch(this.props.pathLabelDate);
      }
    });

    _defineProperty(this, "handleMinTime", () => {
      let minTime;

      if (this.state.minHours[this.props.valueDate] || this.state.maxHours[this.props.valueDate]) {
        minTime = this.state.minHours[this.props.valueDate] ? new Date(2000, 1, 1, parseInt(this.state.minHours[this.props.valueDate].hour), parseInt(this.state.minHours[this.props.valueDate].min)) : new Date(2000, 1, 1, 24, 0);
      } else {
        minTime = this.props.excludePastDates === true && this.props.valueDate && isToday(new Date(this.props.valueDate)) ? new Date() : null;
      }

      return minTime;
    });

    _defineProperty(this, "handleMaxTime", () => {
      let maxTime;

      if (this.state.minHours[this.props.valueDate] || this.state.maxHours[this.props.valueDate]) {
        maxTime = this.state.maxHours[this.props.valueDate] ? new Date(2000, 1, 1, parseInt(this.state.maxHours[this.props.valueDate].hour), parseInt(this.state.maxHours[this.props.valueDate].min)) : new Date(2000, 1, 1, 23, 59);
      } else {
        maxTime = this.props.excludePastDates === true && this.props.valueDate && isToday(new Date(this.props.valueDate)) ? new Date(2000, 1, 1, 23, 59) : null;
      }

      return maxTime;
    });

    _defineProperty(this, "handleDatePickerMode", (value, datePicker, timePicker) => {
      if (Array.isArray(value)) {
        document.documentElement.style.setProperty('--buttons-and-selected-options-color', value[1]);
        document.documentElement.style.setProperty('--header-color', value[1]);
        document.documentElement.style.setProperty('--selected-day', value[1]);
      } else {
        document.documentElement.style.setProperty('--buttons-and-selected-options-color', value.themePalette.$500);
        document.documentElement.style.setProperty('--header-color', value.themePalette.$200);
        document.documentElement.style.setProperty('--selected-day', value.themePalette.$400);
      }

      let dateTime;

      if (this.props.editMode) {
        dateTime = /*#__PURE__*/React.createElement("div", {
          className: "flex flex-row justify-between items-end"
        }, /*#__PURE__*/React.createElement("div", {
          className: "w-1/2 flex flex-col mr-2"
        }, /*#__PURE__*/React.createElement("div", {
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
          className: this.props.errorDate ? this.props.valueDate !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border border-red-500 text-gray-700 pl-8 " + "rounded-sm leading-tight " + (this.state.focusedDate ? "outline-none bg-white" : "bg-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border border-red-500 text-gray-500 pl-8 " + "rounded-sm leading-tight " + (this.state.focusedDate ? "outline-none bg-white" : "bg-gray-200") : this.props.valueDate !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-700 pl-8 rounded-sm " + "leading-tight " + (this.state.focusedDate ? "outline-none bg-white border-gray-300" : "bg-gray-200 border-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-500 pl-8 rounded-sm " + "leading-tight " + (this.state.focusedDate ? "outline-none bg-white border-gray-300" : "bg-gray-200 border-gray-200"),
          title: this.props.description
        }, datePicker), /*#__PURE__*/React.createElement("div", {
          onClick: () => this.handleChange(undefined, "date"),
          className: "duration-500 cursor-pointer absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-700"
        }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
          size: "xs",
          icon: faTimes
        })))), /*#__PURE__*/React.createElement("div", {
          className: "w-1/2 flex flex-col"
        }, /*#__PURE__*/React.createElement("div", {
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
          className: this.props.errorTime ? this.props.valueTime !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border border-red-500 text-gray-700 pl-8 " + "rounded-sm leading-tight " + (this.state.focusedTime ? "outline-none bg-white" : "bg-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border border-red-500 text-gray-500 pl-8 " + "rounded-sm leading-tight " + (this.state.focusedTime ? "outline-none bg-white" : "bg-gray-200") : this.props.valueTime !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-700 pl-8 rounded-sm " + "leading-tight " + (this.state.focusedTime ? "outline-none bg-white border-gray-300" : "bg-gray-200 border-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-500 pl-8 rounded-sm " + "leading-tight " + (this.state.focusedTime ? "outline-none bg-white border-gray-300" : "bg-gray-200 border-gray-200"),
          title: this.props.description
        }, timePicker), /*#__PURE__*/React.createElement("div", {
          onClick: () => this.handleChange(undefined, "time"),
          className: "duration-500 cursor-pointer absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-700"
        }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
          size: "xs",
          icon: faTimes
        })))));
      } else {
        dateTime = /*#__PURE__*/React.createElement("div", {
          className: "flex flex-row justify-between items-end"
        }, /*#__PURE__*/React.createElement("div", {
          title: this.props.description,
          className: "w-1/2 flex flex-col mr-2"
        }, /*#__PURE__*/React.createElement("div", {
          className: "relative"
        }, /*#__PURE__*/React.createElement("div", {
          className: "cursor-default absolute inset-y-0 left-0 flex items-center px-3 text-gray-700"
        }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
          size: "sm",
          icon: faCalendarAlt
        })), /*#__PURE__*/React.createElement("input", {
          disabled: true,
          value: this.props.valueDate === "" ? "dd/mm/aaaa" : this.props.valueDate.split("-").reverse().join("/"),
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: this.props.valueDate !== "" ? "block h-10 flex items-center appearance-none w-full bg-white border border-gray-400 text-gray-700 py-2 pl-8 rounded-sm leading-tight" : "block h-10 flex items-center appearance-none w-full bg-white border border-gray-400 text-gray-500 py-2 pl-8 rounded-sm leading-tight"
        }))), /*#__PURE__*/React.createElement("div", {
          title: this.props.description,
          className: "w-1/2 flex flex-col"
        }, /*#__PURE__*/React.createElement("div", {
          className: "relative"
        }, /*#__PURE__*/React.createElement("div", {
          className: "cursor-default absolute inset-y-0 left-0 flex items-center px-3 text-gray-700"
        }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
          size: "sm",
          icon: faClock
        })), /*#__PURE__*/React.createElement("input", {
          disabled: true,
          value: this.props.valueTime === "" ? "hh:mm" : this.props.valueTime,
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: this.props.valueTime !== "" ? "block h-10 flex items-center appearance-none w-full bg-white border border-gray-400 text-gray-700 py-2 pl-8 rounded-sm leading-tight" : "block h-10 flex items-center appearance-none w-full bg-white border border-gray-400 text-gray-500 py-2 pl-8 rounded-sm leading-tight"
        }))));
      }

      return dateTime;
    });
  }

  componentDidMount() {
    if (this.props.editMode) {
      const context = this.context;

      if (this.props.functions.length !== 0) {
        this.props.functions.forEach(f => {
          if (f === "getSysdate" && this.props.valueDate === "" && this.props.valueTime === "") {
            let year = new Date().getFullYear();
            let selectedMonth = new Date().getMonth() + 1;
            let month = selectedMonth.toString().length === 1 ? "0" + selectedMonth : selectedMonth;
            let day = new Date().getDate().toString().length === 1 ? "0" + new Date().getDate() : new Date().getDate();
            this.props.onDateTimeChange(this.props.pathLabelDate, year + "-" + month + "-" + day);
            let h = new Date().getHours().toString().length === 1 ? "0" + new Date().getHours() : new Date().getHours();
            let m = new Date().getMinutes().toString().length === 1 ? "0" + new Date().getMinutes() : new Date().getMinutes();
            this.props.onDateTimeChange(this.props.pathLabelTime, h + ":" + m);
          }
        });
      }

      if (this.props.internalFunctions.length !== 0) {
        let objGetAvailableSlot = null; // Vou logo buscar o getAvailableSlot e vejo se existe porque só tendo esta função é que posso proceder com o resto de modo a definir o highlightedDates, includedDates, minHours, maxHours

        this.props.internalFunctions.forEach(obj => {
          if (obj.name === "getAvailableSlot") {
            objGetAvailableSlot = obj;
          }
        });

        if (objGetAvailableSlot !== null) {
          let params = {};
          let url = objGetAvailableSlot.url + objGetAvailableSlot.name;

          if (objGetAvailableSlot.definedParams !== null) {
            params = { ...objGetAvailableSlot.definedParams
            };
          }

          if (objGetAvailableSlot.undefinedParams !== null) {
            Object.keys(objGetAvailableSlot.undefinedParams).forEach(function (key) {
              context.formData.referenceModel.forEach(obj => {
                if (key === obj.item) {
                  params[key] = obj.value;
                }
              });
            });
          }

          axios({
            method: objGetAvailableSlot.method,
            url: url,
            headers: {
              Authorization: "Bearer " + context.token
            },
            data: params
          }).then(response => {
            if (Array.isArray(response.data.data)) {
              const result = response.data.data;
              let datesHighlighted = [];
              let datesIncluded = [];
              let minHours = {};
              let maxHours = {};
              result.forEach(obj => {
                if (!isNaN(new Date(obj.dta_fim)) && !isNaN(new Date(obj.dta_ini)) && obj.prioridade) {
                  // Extração do range de datas
                  const dates = eachDayOfInterval({
                    start: new Date(obj.dta_ini),
                    end: new Date(obj.dta_fim)
                  }); // Merge no array que contém todas as datas possíveis

                  datesIncluded.push(...dates); // Merge no array que contém as datas por prioridade

                  const label = "prioridade" + obj.prioridade;
                  datesHighlighted.push({
                    [label]: dates
                  });
                  const sIndex = obj.dta_ini.indexOf(" ");
                  const eIndex = obj.dta_fim.indexOf(" ");
                  const sDate = obj.dta_ini.slice(0, sIndex);
                  const eDate = obj.dta_fim.slice(0, eIndex);
                  const sHour = obj.dta_ini.slice(sIndex + 1).split(":")[0];
                  const eHour = obj.dta_fim.slice(eIndex + 1).split(":")[0];
                  const sMin = obj.dta_ini.slice(sIndex + 1).split(":")[1];
                  const eMin = obj.dta_fim.slice(eIndex + 1).split(":")[1];
                  minHours[sDate] = {
                    hour: sHour,
                    min: sMin
                  };
                  maxHours[eDate] = {
                    hour: eHour,
                    min: eMin
                  };
                }
              }); // Update do estado com os valores para inserir no picker

              this.setState({
                includedDates: datesIncluded,
                highlightedDates: datesHighlighted,
                maxHours: maxHours,
                minHours: minHours,
                shouldHaveSlots: true
              });
            } else {
              this.setState({
                shouldHaveSlots: true
              });
            }
          }).catch(error => {
            this.setState({
              shouldHaveSlots: true
            });
          });
        }
      }
    }
  }

  render() {
    let datePicker = /*#__PURE__*/React.createElement(DatePicker, {
      showMonthDropdown: true,
      showYearDropdown: true,
      dropdownMode: "scroll",
      locale: "pt",
      onFocus: this.handleFocus.bind(this, "date"),
      onBlur: this.handleTouch.bind(this, "date"),
      placeholderText: "dd/mm/aaaa",
      dateFormat: "dd/MM/yyyy",
      selected: this.props.valueDate === "" ? this.props.valueDate : new Date(this.props.valueDate),
      onChange: date => this.handleChange(date, "date"),
      minDate: !this.state.shouldHaveSlots && (this.props.excludePastDates === true ? new Date() : null) // Excluir datas passadas
      ,
      includeDates: this.state.shouldHaveSlots && this.state.includedDates,
      highlightDates: this.state.shouldHaveSlots && this.state.highlightedDates,
      popperPlacement: this.state.calendarDatePosition,
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
    }, this.state.shouldHaveSlots && /*#__PURE__*/React.createElement("div", {
      className: "pl-2 pb-1 text-green-500 text-xs"
    }, "Datas com prioridade"));
    let timePicker = /*#__PURE__*/React.createElement(DatePicker, {
      onFocus: this.handleFocus.bind(this, "time"),
      onBlur: this.handleTouch.bind(this, "time"),
      placeholderText: "hh:mm",
      minTime: this.handleMinTime(),
      maxTime: this.handleMaxTime(),
      showTimeSelect: true,
      showTimeSelectOnly: true,
      timeIntervals: 5,
      timeCaption: "Tempo",
      timeFormat: "p",
      dateFormat: "p",
      locale: "pt",
      selected: this.props.valueTime === "" ? this.props.valueTime : new Date(2000, 1, 1, this.props.valueTime.split(":")[0], this.props.valueTime.split(":")[1]),
      onChange: time => this.handleChange(time, "time"),
      popperPlacement: this.state.calendarTimePosition,
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
    }), this.handleDatePickerMode(value, datePicker, timePicker), (this.props.errorDate || this.props.errorTime) && /*#__PURE__*/React.createElement(ValidationError, {
      errorMessage: this.props.errorDate || this.props.errorTime
    }))));
  }

}

_defineProperty(DateTimeComponent, "contextType", CombinedContext);

const DateTime = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(DateTimeComponent, props));
};

export default DateTime;