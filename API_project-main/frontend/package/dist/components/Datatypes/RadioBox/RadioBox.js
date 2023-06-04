import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";
import "../../../styles/custom.module.css";
import FieldContainer from "../../UI/FieldContainer/FieldContainer";
import Label from "../../UI/Label/Label";
import ValidationError from "../../UI/ValidationError/ValidationError";
import { handleInternalFunctions } from "../../../assets/functions/InternalFuntions/handleInternalFunctions";

const RadioBox = props => {
  const context = useContext(CombinedContext);
  const [items, setItems] = useState([]);
  useEffect(() => {
    // Se houver um link no Refset, vai buscar os items ao serviço
    async function fetchItems() {
      if (Array.isArray(props.refset) && props.refset.length > 0) {
        await axios({
          method: "get",
          url: props.refset[0],
          headers: {
            Authorization: `Bearer ${context.token}`
          }
        }).then(res => {
          if (res.data.success === true || res.data.success === "true") {
            setItems(res.data.concepts);
          } else {
            setItems(props.items);
          }
        }).catch(err => {
          setItems(props.items);
        });
      } else {
        setItems(props.items);
      }
    }

    fetchItems();
  });

  const handleChange = async obj => {
    handleTouch();
    await context.fields.updateValue(props.pathLabel);

    if (obj.code === props.value.code) {
      await props.onRadioChange(props.pathLabel, "");
    } else {
      await props.onRadioChange(props.pathLabel, obj);
    } // Ver se internal functions para processar


    if (Array.isArray(props.internalFunctions) && props.internalFunctions.length > 0) {
      await handleInternalFunctions(props.internalFunctions, props.onRadioChange, context.token, props.values, context.fields);
    }
  };

  const handleTouch = () => {
    props.onTouch(props.pathLabel);
  };

  let radio = /*#__PURE__*/React.createElement("div", {
    title: props.description,
    className: "flex w-full flex-wrap justify-center items-center"
  }, items.map((element, index) => {
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      className: "flex items-center mx-2 my-2"
    }, /*#__PURE__*/React.createElement("input", {
      onClick: () => props.isFieldEditable && handleChange(element),
      id: props.pathLabel + element.code,
      type: "radio",
      className: "hidden"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: props.pathLabel + element.code,
      style: {
        fontSize: context.font.fontSize.field
      },
      className: `flex items-center text-gray-700 leading-tight ${props.isFieldEditable ? 'cursor-pointer' : 'cursor-not-allowed'}`
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        backgroundColor: props.value.code === element.code ? Array.isArray(context.theme) ? context.theme[1] : context.theme.themePalette.$400 : "transparent",
        boxShadow: props.value.code === element.code ? "0px 0px 0px 2px white inset" : null
      },
      className: `transform duration-300 w-4 h-4 inline-block mr-1 rounded-full border border-gray-400 
                                ${props.isFieldEditable ? 'hover:scale-110' : 'opacity-50'}`
    }), element.text));
  }));
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement("div", {
    style: {
      order: props.order,
      width: context.sizes.sizes[props.path] ? context.sizes.sizes[props.path] : "100%"
    },
    className: "flex"
  }, /*#__PURE__*/React.createElement(FieldContainer, null, /*#__PURE__*/React.createElement(Label, {
    label: props.label,
    editMode: props.editMode,
    showLabel: props.showLabel,
    optional: props.optional,
    optionalMandatory: props.optionalMandatory,
    sectionOccurrence: props.sectionOccurrence
  }), radio, props.error && /*#__PURE__*/React.createElement(ValidationError, {
    errorMessage: props.error
  }))));
};

export default RadioBox;