import React, { useContext } from "react";
import Label from "../../UI/Label/Label";
import ValidationError from "../../UI/ValidationError/ValidationError";
import FieldContainer from "../../UI/FieldContainer/FieldContainer";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";

const Boolean = props => {
  const context = useContext(CombinedContext);

  const handleChange = value => {
    context.fields.updateValue(props.pathLabel);
    props.onBooleanChange(props.pathLabel, value);
  };

  const handleTouch = () => {
    props.onTouch(props.pathLabel);
  };

  let boolean = null;

  if (props.editMode) {
    boolean = /*#__PURE__*/React.createElement("div", {
      title: props.description,
      className: `w-40 h-8 rounded-sm bg-gray-200 inline-block ${props.isFieldEditable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-row"
    }, props.value === "Sim" ? /*#__PURE__*/React.createElement("div", {
      onClick: () => props.isFieldEditable && handleChange(""),
      onBlur: () => handleTouch(),
      tabIndex: "1",
      style: {
        backgroundColor: Array.isArray(context.theme) ? context.theme[1] : context.theme.themePalette.$400
      },
      className: "duration-500 flex items-center justify-center w-1/2 h-8 rounded-sm focus:outline-none break-all"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: context.font.fontSize.field
      },
      className: "tracking-wide text-white"
    }, "Sim")) : /*#__PURE__*/React.createElement("div", {
      onClick: () => props.isFieldEditable && handleChange("Sim"),
      onBlur: () => handleTouch(),
      tabIndex: "1",
      className: props.error ? "flex items-center justify-center w-1/2 h-8 border-red-500 border rounded-sm focus:outline-none break-all" : "flex items-center justify-center w-1/2 h-8 border-r border-gray-300 rounded-sm focus:outline-none break-all"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: context.font.fontSize.field
      },
      className: "tracking-wide text-gray-500"
    }, "Sim")), props.value === "Não" ? /*#__PURE__*/React.createElement("div", {
      onClick: () => props.isFieldEditable && handleChange(""),
      onBlur: () => handleTouch(),
      tabIndex: "1",
      style: {
        backgroundColor: Array.isArray(context.theme) ? context.theme[1] : context.theme.themePalette.$400
      },
      className: "duration-500 flex items-center justify-center w-1/2 h-8 rounded-sm focus:outline-none break-all"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: context.font.fontSize.field
      },
      className: "tracking-wide text-white"
    }, "N\xE3o")) : /*#__PURE__*/React.createElement("div", {
      onClick: () => props.isFieldEditable && handleChange("Não"),
      onBlur: () => handleTouch(),
      tabIndex: "1",
      className: props.error ? "flex items-center justify-center w-1/2 h-8 border-r border-t border-b border-red-500 rounded-sm focus:outline-none break-all" : "flex items-center justify-center w-1/2 h-8 border-l border-gray-300 rounded-sm focus:outline-none break-all"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: context.font.fontSize.field
      },
      className: "tracking-wide text-gray-500"
    }, "N\xE3o"))));
  } else if (!props.editMode) {
    boolean = /*#__PURE__*/React.createElement("input", {
      disabled: true,
      style: {
        fontSize: context.font.fontSize.field
      },
      value: props.value,
      title: props.description,
      className: "block flex items-center h-10 appearance-none w-full bg-white border border-gray-400 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight"
    });
  }

  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement("div", {
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
  }), boolean, props.error && /*#__PURE__*/React.createElement(ValidationError, {
    errorMessage: props.error
  }))));
};

export default Boolean;