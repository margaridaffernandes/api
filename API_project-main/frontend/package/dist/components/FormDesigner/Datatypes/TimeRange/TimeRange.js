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
import "../../../../styles/datepickerstyles.css";
import FieldContainer from "../../../UI/FieldContainer/FieldContainer";
import { fieldSource } from "../../SpecificationMethods/Source/fieldSource";
import { fieldTarget } from "../../SpecificationMethods/Target/fieldTarget";
import { style } from "../../Style/Style";
import ToolBarDesigner from "../../Toolbar/Toolbar";
import Label from "../../UI/Label/Label";
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
          this.props.onTimeRangeChange(this.props.pathLabelStart, h + ":" + m);
        } else if (dateType === "endValue") {
          this.props.onTimeRangeChange(this.props.pathLabelEnd, h + ":" + m);
        }
      } else {
        if (dateType === "startValue") {
          this.props.onTimeRangeChange(this.props.pathLabelStart, "");
        } else if (dateType === "endValue") {
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
      } else if (type === "startValue") {
        this.setState({
          startFocused: false
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

    let timeRange;
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
      className: this.props.startValue !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-700 pl-8 rounded-sm leading-tight " + (this.state.startFocused ? "outline-none bg-white border-gray-300" : "bg-gray-100 border-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-500 pl-8 rounded-sm leading-tight " + (this.state.startFocused ? "outline-none bg-white border-gray-300" : "bg-gray-100 border-gray-200"),
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
      className: this.props.endValue !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-700 pl-8 rounded-sm leading-tight " + (this.state.endFocused ? "outline-none bg-white border-gray-300" : "bg-gray-100 border-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-500 pl-8 rounded-sm leading-tight " + (this.state.endFocused ? "outline-none bg-white border-gray-300" : "bg-gray-100 border-gray-200"),
      title: this.props.description
    }, endTimePicker), /*#__PURE__*/React.createElement("div", {
      onClick: () => this.handleChange(undefined, "endValue"),
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
      datatype: "DV_INTERVAL<DV_TIME>",
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
    }), timeRange))));
  }

}

_defineProperty(TimeRangeComponent, "contextType", CombinedContext);

class TimeRange extends Component {
  render() {
    return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(TimeRangeComponent, this.props));
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
})))(TimeRange);