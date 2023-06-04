import { ContentState, EditorState } from "draft-js";
import React, { useContext, useEffect, useRef, useState } from "react";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";
import FieldContainer from "../../UI/FieldContainer/FieldContainer";
import Label from "../../UI/Label/Label";
import ValidationError from "../../UI/ValidationError/ValidationError";
import WordCount from "../../UI/WordCounter/WordCounter";

const TextInput = props => {
  const context = useContext(CombinedContext);
  const [width, setWidth] = useState(0);
  const containerRef = useRef(null);

  const handleResize = event => {
    const w = containerRef.current.clientWidth;
    setWidth(w);
  };

  useEffect(() => {
    const w = containerRef.current.clientWidth;
    setWidth(w);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChange = (event, textId = -1) => {
    context.fields.updateValue(props.pathLabel);
    const text = EditorState.createWithContent(ContentState.createFromText(event.target.value));

    if (textId > -1) {
      let fields = [...props.value];
      fields.forEach(function (field) {
        if (field.textId === textId) {
          field.value = text;
        }
      });
      props.onTextInputChange(props.pathLabel, fields);
    } else {
      props.onTextInputChange(props.pathLabel, text);
    }
  };

  const handleTouch = () => {
    props.onTouch(props.pathLabel);
  };

  const removeField = textId => {
    let fields = props.value.filter(field => field.textId !== textId);
    props.onTextInputChange(props.pathLabel, fields);
  };

  const addField = () => {
    let maxId = 0;
    props.value.forEach(function (field) {
      if (field.textId > maxId) {
        maxId = field.textId;
      }
    });
    let newField = {
      textId: maxId + 1,
      value: EditorState.createEmpty()
    };
    let fields = [...props.value];
    props.onTextInputChange(props.pathLabel, [...fields, newField]);
  };

  const getHeight = text => {
    let height;
    const containerHeight = context.datatypes.textHeight[props.pathLabel];
    const values = {
      input: containerHeight ? {
        max: containerHeight + "px",
        min: containerHeight + "px"
      } : {
        max: "80px",
        min: "40px"
      },
      textarea: containerHeight ? {
        max: containerHeight + "px",
        min: containerHeight + "px"
      } : {
        max: "90px",
        min: "90px"
      }
    };

    if (text._immutable) {
      if (text.getCurrentContent().getPlainText("\n").split("\n").length > 1) {
        height = values[props.inputType].max;
      } else {
        if (text.getCurrentContent().getPlainText("\n").length * 8 < width) {
          height = values[props.inputType].min;
        } else {
          height = values[props.inputType].max;
        }
      }
    } else {
      if (text.length * 8 < width) {
        height = values[props.inputType].min;
      } else {
        height = values[props.inputType].max;
      }
    }

    return height;
  };

  let textInput = null;

  if (!Array.isArray(props.value)) {
    textInput = /*#__PURE__*/React.createElement("div", {
      className: "relative"
    }, /*#__PURE__*/React.createElement("textarea", {
      ref: containerRef,
      title: props.description,
      placeholder: "Insira o seu texto...",
      onBlur: () => handleTouch(),
      maxLength: context.datatypes.limitCharacters[props.path] ? context.datatypes.limitCharacters[props.path] : undefined,
      value: props.value._immutable ? props.value.getCurrentContent().getPlainText("\n") : props.value,
      onChange: event => handleChange(event),
      style: {
        fontSize: context.font.fontSize.field,
        height: getHeight(props.value)
      },
      className: props.error ? props.value !== "" ? "overflow-y-auto appearance-none w-full bg-gray-200 border border-red-500 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-red-500" : "overflow-y-auto appearance-none w-full bg-gray-200 border border-red-500 text-gray-500 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-red-500" : props.value !== "" ? "overflow-y-auto appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300" : "overflow-y-auto appearance-none w-full bg-gray-200 border border-gray-200 text-gray-500 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
    }), context.datatypes.limitCharacters[props.path] && /*#__PURE__*/React.createElement(WordCount, {
      type: "textarea",
      total: context.datatypes.limitCharacters[props.path],
      current: props.value._immutable ? props.value.getCurrentContent().getPlainText("\n").length : props.value.length
    }));
  } else if (Array.isArray(props.value)) {
    textInput = props.value.map((value, index) => /*#__PURE__*/React.createElement("div", {
      key: index
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative"
    }, /*#__PURE__*/React.createElement("textarea", {
      ref: containerRef,
      title: props.description,
      placeholder: "Insira o seu texto...",
      onBlur: () => handleTouch(),
      maxLength: context.datatypes.limitCharacters[props.path] ? context.datatypes.limitCharacters[props.path] : undefined,
      value: value.value._immutable ? value.value.getCurrentContent().getPlainText("\n") : value.value,
      onChange: event => handleChange(event, value.textId),
      style: {
        fontSize: context.font.fontSize.field,
        height: getHeight(props.value)
      },
      className: props.error ? value.value !== "" ? "overflow-y-auto appearance-none w-full bg-gray-200 border border-red-500 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-red-500" : "overflow-y-auto appearance-none w-full bg-gray-200 border border-red-500 text-gray-500 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-red-500" : value.value !== "" ? "overflow-y-auto appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300" : "overflow-y-auto appearance-none w-full bg-gray-200 border border-gray-200 text-gray-500 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
    }), context.datatypes.limitCharacters[props.path] && /*#__PURE__*/React.createElement(WordCount, {
      type: "textarea",
      total: context.datatypes.limitCharacters[props.path],
      current: value.value._immutable ? value.value.getCurrentContent().getPlainText("\n").length : value.value.length
    })), /*#__PURE__*/React.createElement("div", {
      className: index === props.value.length - 1 ? "flex flex-row justify-between" : "flex flex-row justify-end"
    }, index === props.value.length - 1 && /*#__PURE__*/React.createElement("label", {
      onClick: () => addField(),
      style: {
        fontSize: context.font.fontSize.field
      },
      className: "block tracking-wide mb-2 pt-2 text-blue-400 cursor-pointer hover:text-blue-500"
    }, "Adicionar"), props.value.length > 1 && /*#__PURE__*/React.createElement("label", {
      onClick: () => removeField(value.textId),
      style: {
        fontSize: context.font.fontSize.field
      },
      className: "block tracking-wide mb-2 pt-2 text-red-500 cursor-pointer hover:text-red-600"
    }, "Remover"))));
  }

  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement("div", {
    style: {
      order: props.order,
      width: context.sizes.sizes[props.path] ? context.sizes.sizes[props.path] : "100%"
    },
    className: "flex"
  }, /*#__PURE__*/React.createElement(FieldContainer, null, /*#__PURE__*/React.createElement(Label, {
    isRM: props.isRM,
    label: props.label,
    showLabel: props.showLabel,
    editMode: true,
    optional: props.optional,
    optionalMandatory: props.optionalMandatory,
    sectionOccurrence: props.sectionOccurrence
  }), textInput, props.error && /*#__PURE__*/React.createElement(ValidationError, {
    errorMessage: props.error
  }))));
};

export default TextInput;