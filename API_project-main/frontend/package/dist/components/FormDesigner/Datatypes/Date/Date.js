function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { faCalendarAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import Label from "../../UI/Label/Label";
import ToolBarDesigner from "../../Toolbar/Toolbar";
registerLocale("pt", pt);

class CalendarComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      focused: false,
      calendarPosition: 'bottom'
    });

    _defineProperty(this, "handleChange", date => {
      this.handleTouch();

      if (date) {
        let selectedDate = new Date(date);
        let year = selectedDate.getFullYear();
        let selectedMonth = selectedDate.getMonth() + 1;
        let month = selectedMonth.toString().length === 1 ? "0" + selectedMonth : selectedMonth;
        let day = selectedDate.getDate().toString().length === 1 ? "0" + selectedDate.getDate() : selectedDate.getDate();
        this.props.onDateChange(this.props.pathLabel, year + "-" + month + "-" + day);
      } else {
        this.props.onDateChange(this.props.pathLabel, "");
      }
    });

    _defineProperty(this, "handleTouch", () => {
      this.setState({
        focused: false
      });
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

    let date;
    let datePicker = /*#__PURE__*/React.createElement(DatePicker, {
      showMonthDropdown: true,
      showYearDropdown: true,
      dropdownMode: "scroll",
      locale: "pt",
      onFocus: this.handleFocus,
      onBlur: this.handleTouch.bind(this),
      placeholderText: "dd/mm/aaaa",
      dateFormat: "dd/MM/yyyy",
      selected: this.props.value === "" ? this.props.value : new Date(this.props.value),
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
    date = /*#__PURE__*/React.createElement("div", {
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
      className: this.props.value !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-700 pl-8 rounded-sm leading-tight " + (this.state.focused ? "outline-none bg-white border-gray-300" : "bg-gray-100 border-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-500 pl-8 rounded-sm leading-tight " + (this.state.focused ? "outline-none bg-white border-gray-300" : "bg-gray-100 border-gray-200"),
      title: this.props.description
    }, datePicker), /*#__PURE__*/React.createElement("div", {
      onClick: () => this.handleChange(undefined),
      className: "duration-500 cursor-pointer absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-700"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      size: "xs",
      icon: faTimes
    })));
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
      datatype: "DV_DATE",
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
    }), date))));
  }

}

_defineProperty(CalendarComponent, "contextType", CombinedContext);

class Calendar extends Component {
  render() {
    return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(CalendarComponent, this.props));
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
})))(Calendar);