function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { faClock, faTimes } from "@fortawesome/free-solid-svg-icons";
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
import FieldContainer from "../../../UI/FieldContainer/FieldContainer";
import { fieldSource } from "../../SpecificationMethods/Source/fieldSource";
import { fieldTarget } from "../../SpecificationMethods/Target/fieldTarget";
import { style } from "../../Style/Style";
import ToolBarDesigner from "../../Toolbar/Toolbar";
import Label from "../../UI/Label/Label";
registerLocale("pt", pt);

class TimeComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      focused: false,
      calendarPosition: 'bottom'
    });

    _defineProperty(this, "handleChange", hour => {
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

    let time;
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
      className: this.props.value !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-700 pl-8 rounded-sm leading-tight " + (this.state.focused ? "outline-none bg-white border-gray-300" : "bg-gray-100 border-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-500 pl-8 rounded-sm leading-tight " + (this.state.focused ? "outline-none bg-white border-gray-300" : "bg-gray-100 border-gray-200"),
      title: this.props.description
    }, timePicker), /*#__PURE__*/React.createElement("div", {
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
      datatype: "DV_TIME",
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
    }), time))));
  }

}

_defineProperty(TimeComponent, "contextType", CombinedContext);

class Time extends Component {
  render() {
    return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(TimeComponent, this.props));
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
})))(Time);