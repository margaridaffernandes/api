function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { faCalendarAlt, faClock, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { eachDayOfInterval, isToday } from "date-fns";
import pt from "date-fns/locale/pt-BR";
import flow from "lodash/flow";
import React, { Component } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DragSource, DropTarget } from "react-dnd";
import CombinedContext from "../../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../../contexts/ProviderCombinedContext";
import ComponentsStyle from "../../../../styles/ComponentsStyle";
import "../../../../styles/datepickerstyles.css";
import FieldContainer from "../../../UI/FieldContainer/FieldContainer";
import { fieldSource } from "../../SpecificationMethods/Source/fieldSource";
import { fieldTarget } from "../../SpecificationMethods/Target/fieldTarget";
import { style } from "../../Style/Style";
import ToolBarDesigner from "../../Toolbar/Toolbar";
import Label from "../../UI/Label/Label";
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
          let year = selectedDate.getFullYear();
          let selectedMonth = selectedDate.getMonth() + 1;
          let month = selectedMonth.toString().length === 1 ? "0" + selectedMonth : selectedMonth;
          let day = selectedDate.getDate().toString().length === 1 ? "0" + selectedDate.getDate() : selectedDate.getDate();
          this.props.onDateTimeChange(this.props.pathLabelDate, year + "-" + month + "-" + day);
          this.props.onDateTimeChange(this.props.pathLabelTime, "");
        }
      } else {
        if (type === "time") {
          this.props.onDateTimeChange(this.props.pathLabelTime, "");
        } else if (type === "date") {
          this.props.onDateTimeChange(this.props.pathLabelDate, "");
          this.props.onDateTimeChange(this.props.pathLabelTime, "");
        }
      }
    });

    _defineProperty(this, "handleFocus", type => {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; // vertical size of the window

      const topOffset = document.activeElement.getBoundingClientRect().top; // top offset of the calendar (distance from top of the page relative to the window position)

      if (type === "time") {
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
      } else if (type === "date") {
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
      } else if (type === "date") {
        this.setState({
          focusedDate: false
        });
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
  }

  componentDidMount() {
    const context = this.context;

    if (this.props.path.split(".")[0] !== "rm" && this.props.internalFunctions.length !== 0) {
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

  render() {
    if (Array.isArray(this.context.theme)) {
      document.documentElement.style.setProperty('--buttons-and-selected-options-color', this.context.theme[1]);
      document.documentElement.style.setProperty('--header-color', this.context.theme[1]);
      document.documentElement.style.setProperty('--selected-day', this.context.theme[1]);
    } else {
      document.documentElement.style.setProperty('--buttons-and-selected-options-color', this.context.theme.themePalette.$500);
      document.documentElement.style.setProperty('--header-color', this.context.theme.themePalette.$200);
      document.documentElement.style.setProperty('--selected-day', this.context.theme.themePalette.$400);
    }

    let dateTime;
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
      className: this.props.valueDate !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-700 pl-8 rounded-sm leading-tight " + (this.state.focusedDate ? "outline-none bg-white border-gray-300" : "bg-gray-100 border-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-500 pl-8 rounded-sm leading-tight " + (this.state.focusedDate ? "outline-none bg-white border-gray-300" : "bg-gray-100 border-gray-200"),
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
      className: this.props.valueTime !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-700 pl-8 rounded-sm leading-tight " + (this.state.focusedTime ? "outline-none bg-white border-gray-300" : "bg-gray-100 border-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-500 pl-8 rounded-sm leading-tight " + (this.state.focusedTime ? "outline-none bg-white border-gray-300" : "bg-gray-100 border-gray-200"),
      title: this.props.description
    }, timePicker), /*#__PURE__*/React.createElement("div", {
      onClick: () => this.handleChange(undefined, "time"),
      className: "duration-500 cursor-pointer absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-700"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      size: "xs",
      icon: faTimes
    })))));
    const dndStyle = style(this.context.composition.openCompositionPlanningPath === this.props.path, this.props.isDragging, this.props.isOver, this.props.canDrop, true, this.props.isAny, this.props.showLabel, this.context.order, this.props.path, this.props.getItem);
    return this.props.connectDragSource && this.props.connectDropTarget && this.props.connectDragSource(this.props.connectDropTarget( /*#__PURE__*/React.createElement("div", {
      style: {
        order: this.props.order,
        opacity: dndStyle.opacity,
        boxShadow: dndStyle.boxShadow,
        borderWidth: dndStyle.borderWidth,
        borderStyle: dndStyle.borderStyle,
        backgroundColor: this.context.composition.openCompositionPlanningPath === this.props.path ? this.context.theme.themePalette.$100 : dndStyle.backgroundColor,
        marginTop: dndStyle.marginTop,
        marginBottom: dndStyle.marginBottom,
        borderColor: this.context.composition.openCompositionPlanningPath === this.props.path ? this.context.theme.themePalette.$300 : dndStyle.borderColor,
        width: this.context.sizes.sizes[this.props.path] ? this.context.sizes.sizes[this.props.path] : "100%"
      },
      className: ComponentsStyle.itemContainerRoot
    }, /*#__PURE__*/React.createElement(ToolBarDesigner, {
      path: this.props.path,
      datatype: "DV_DATE_TIME>",
      isRM: this.props.isRM,
      showDatatype: false
    }), /*#__PURE__*/React.createElement(FieldContainer, {
      path: this.props.path,
      datatype: this.props.item.dataType
    }, /*#__PURE__*/React.createElement(Label, {
      showLabel: this.props.showLabel,
      label: this.props.label,
      editMode: true,
      optional: this.props.optional,
      sectionOccurrence: this.props.sectionOccurrence
    }), dateTime))));
  }

}

_defineProperty(DateTimeComponent, "contextType", CombinedContext);

class DateTime extends Component {
  render() {
    return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(DateTimeComponent, this.props));
  }

}

export default flow(DragSource("form", fieldSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  getItem: monitor.getItem()
})), DropTarget("form", fieldTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
})))(DateTime);