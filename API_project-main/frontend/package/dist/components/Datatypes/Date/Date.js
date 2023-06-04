import { faCalendarAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import pt from "date-fns/locale/pt-BR";
import React, { useContext, useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../styles/datepickerstyles.css";
import FieldContainer from "../../UI/FieldContainer/FieldContainer";
import Label from "../../UI/Label/Label";
import ValidationError from "../../UI/ValidationError/ValidationError";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";
import ThemeContext from "../../../contexts/ThemeContext";
registerLocale("pt", pt);

const Calendar = props => {
  const context = useContext(CombinedContext);
  const [focused, setFocused] = useState(false);
  const [calendarPosition, setCalendarPosition] = useState('bottom');
  useEffect(() => {
    if (props.editMode && props.functions.length !== 0) {
      props.functions.forEach(f => {
        if (f === "getSysdate" && props.value === "") {
          props.onDateChange(props.pathLabel, new Date());
        }
      });
    }
  }, []);

  const handleChange = date => {
    context.fields.updateValue(props.pathLabel);
    handleTouch();

    if (date) {
      let selectedDate = new Date(date);
      let year = selectedDate.getFullYear();
      let selectedMonth = selectedDate.getMonth() + 1;
      let month = selectedMonth.toString().length === 1 ? "0" + selectedMonth : selectedMonth;
      let day = selectedDate.getDate().toString().length === 1 ? "0" + selectedDate.getDate() : selectedDate.getDate();
      props.onDateChange(props.pathLabel, year + "-" + month + "-" + day);
    } else {
      props.onDateChange(props.pathLabel, "");
    }
  };

  const handleTouch = () => {
    setFocused(false);
    props.onTouch(props.pathLabel);
  };

  const handleFocus = () => {
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; // vertical size of the window

    const topOffset = document.activeElement.getBoundingClientRect().top; // top offset of the calendar (distance from top of the page relative to the window position)

    topOffset > windowHeight / 2 ? setCalendarPosition('top') : setCalendarPosition('bottom');
    !focused && setFocused(true);
  };

  const handleDatePickerMode = (value, datePicker) => {
    if (Array.isArray(value)) {
      document.documentElement.style.setProperty('--buttons-and-selected-options-color', value[1]);
      document.documentElement.style.setProperty('--header-color', value[1]);
      document.documentElement.style.setProperty('--selected-day', value[1]);
    } else {
      document.documentElement.style.setProperty('--buttons-and-selected-options-color', value.themePalette.$500);
      document.documentElement.style.setProperty('--header-color', value.themePalette.$200);
      document.documentElement.style.setProperty('--selected-day', value.themePalette.$400);
    }

    let date;

    if (props.editMode) {
      date = /*#__PURE__*/React.createElement("div", {
        className: "relative"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cursor-default absolute inset-y-0 left-0 flex items-center px-3 text-gray-700"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "sm",
        icon: faCalendarAlt
      })), props.isFieldEditable ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: context.font.fontSize.field
        },
        className: props.error ? props.value !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border border-red-500 text-gray-700 pl-8 rounded-sm " + "leading-tight " + (focused ? "outline-none bg-white" : "bg-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border border-red-500 text-gray-500 pl-8 rounded-sm " + "leading-tight " + (focused ? "outline-none bg-white" : "bg-gray-200") : props.value !== "" ? "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-700 pl-8 rounded-sm leading-tight " + (focused ? "outline-none bg-white border-gray-300" : "bg-gray-200 border-gray-200") : "cursor-text flex items-center block h-10 appearance-none w-full border text-gray-500 pl-8 rounded-sm leading-tight " + (focused ? "outline-none bg-white border-gray-300" : "bg-gray-200 border-gray-200"),
        title: props.description
      }, datePicker), /*#__PURE__*/React.createElement("div", {
        onClick: () => handleChange(undefined),
        className: "duration-500 cursor-pointer absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-700"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "xs",
        icon: faTimes
      }))) : /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: context.font.fontSize.field
        },
        className: "cursor-not-allowed opacity-50 flex items-center block h-10 appearance-none w-full text-gray-700 pl-8 rounded-sm leading-tight bg-gray-200",
        title: props.description
      }, props.value === "" ? "dd/mm/aaaa" : props.value.split("-").reverse().join("/")));
    } else {
      date = /*#__PURE__*/React.createElement("div", {
        title: props.description,
        className: "relative"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cursor-default absolute inset-y-0 left-0 flex items-center px-3 text-gray-700"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "sm",
        icon: faCalendarAlt
      })), /*#__PURE__*/React.createElement("input", {
        disabled: true,
        value: props.value === "" ? "dd/mm/aaaa" : props.value.split("-").reverse().join("/"),
        style: {
          fontSize: context.font.fontSize.field
        },
        className: props.value !== "" ? "block h-10 flex items-center appearance-none w-full bg-white border border-gray-400 text-gray-700 py-2 pl-8 rounded-sm leading-tight" : "block h-10 flex items-center appearance-none w-full bg-white border border-gray-400 text-gray-500 py-2 pl-8 rounded-sm leading-tight"
      }));
    }

    return date;
  };

  let datePicker = /*#__PURE__*/React.createElement(DatePicker, {
    showMonthDropdown: true,
    showYearDropdown: true,
    dropdownMode: "scroll",
    locale: "pt",
    onFocus: () => handleFocus(),
    onBlur: () => handleTouch(),
    placeholderText: "dd/mm/aaaa",
    dateFormat: "dd/MM/yyyy",
    selected: props.value === "" ? props.value : new Date(props.value),
    onChange: date => handleChange(date),
    popperPlacement: calendarPosition,
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
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(ThemeContext.Consumer, null, value => /*#__PURE__*/React.createElement("div", {
    style: {
      order: props.order,
      width: context.sizes.sizes[props.path] ? context.sizes.sizes[props.path] : "100%"
    },
    className: "flex"
  }, /*#__PURE__*/React.createElement(FieldContainer, null, /*#__PURE__*/React.createElement(Label, {
    label: props.label,
    editMode: props.editMode,
    optional: props.optional,
    showLabel: props.showLabel,
    optionalMandatory: props.optionalMandatory,
    sectionOccurrence: props.sectionOccurrence
  }), handleDatePickerMode(value, datePicker), props.error && /*#__PURE__*/React.createElement(ValidationError, {
    errorMessage: props.error
  })))));
};

export default Calendar;