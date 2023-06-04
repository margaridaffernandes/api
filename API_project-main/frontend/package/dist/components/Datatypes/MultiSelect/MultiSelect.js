import { faCaretDown, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";
import "../../../styles/custom.module.css";
import FieldContainer from "../../UI/FieldContainer/FieldContainer";
import Label from "../../UI/Label/Label";
import ValidationError from "../../UI/ValidationError/ValidationError";

const MultiSelect = props => {
  const context = useContext(CombinedContext);
  const dropContainer = useRef(null);
  const inputContainer = useRef(null);
  const [height, setHeight] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    inputContainer.current !== null && setHeight(inputContainer.current.offsetHeight); // Se houver um link no Refset, vai buscar os items ao serviço

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props.refset, props.items, context.token]);
  useEffect(() => {
    if (height !== inputContainer.current.offsetHeight) {
      setHeight(inputContainer.current.offsetHeight);
    }
  }, [height]);

  const handleOpenDropList = () => {
    setShowDropdown(true);
  };

  const handleClickOutside = event => {
    if (dropContainer.current && !dropContainer.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const handleChange = item => {
    context.fields.updateValue(props.pathLabel);

    if (props.value.indexOf(item) > -1) {
      // Remover
      let value = [...props.value].filter(option => option.code !== item.code);
      props.onMultiselectChange(props.pathLabel, value);
    } else {
      // Adicionar
      let value = [...props.value];
      props.onMultiselectChange(props.pathLabel, [...value, item]);
    }
  };

  const handleRemoveItem = (event, obj) => {
    event.stopPropagation();
    context.fields.updateValue(props.pathLabel);
    let value = [...props.value].filter(option => option.code !== obj.code);
    props.onMultiselectChange(props.pathLabel, value);
  };

  const handleClearAll = () => {
    context.fields.updateValue(props.pathLabel);
    props.onMultiselectChange(props.pathLabel, []);
  };

  const handleTouch = () => {
    props.onTouch(props.pathLabel);
  };

  let dropListHeigth = {
    1: "h-8",
    2: "h-16",
    3: "h-24"
  };
  const focusedStyle = showDropdown ? "bg-white border-gray-300" : "bg-gray-200 border-gray-200";
  const styleError = showDropdown ? "bg-white border-red-500" : "bg-gray-200 border-red-500";
  const itemStyle = showDropdown ? "bg-gray-200 border-gray-300" : "bg-white border-gray-300";
  let dropList = /*#__PURE__*/React.createElement("div", {
    style: {
      zIndex: 99999999,
      marginTop: height
    },
    ref: dropContainer,
    className: dropListHeigth[items.length] ? dropListHeigth[items.length] + " w-full absolute inset-y-0 z-10 cursor-pointer bg-white overflow-y-auto border border-gray-200 rounded-sm" : "w-full absolute inset-y-0 z-10 cursor-pointer bg-white h-32 overflow-y-auto border border-gray-200 rounded-sm"
  }, items.map((elemento, index) => {
    return /*#__PURE__*/React.createElement("div", {
      onClick: () => handleChange(elemento),
      key: index,
      style: {
        fontSize: context.font.fontSize.field
      },
      className: props.value.filter(obj => obj.code === elemento.code).length > 0 ? "duration-300 bg-blue-100 hover:bg-blue-100 relative flex items-center text-gray-700 leading-tight h-8 px-4 hover:outline" : "duration-300 bg-white hover:bg-blue-100 flex items-center text-gray-700 leading-tight h-8 px-4 hover:outline hover:bg-gray-200"
    }, elemento.text, props.value.filter(obj => obj.code === elemento.code).length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      size: "xs",
      icon: faCheck
    })));
  }));
  let multiselect = props.isFieldEditable ? /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("div", {
    tabIndex: "1",
    ref: inputContainer,
    className: "outline-none",
    onBlur: () => handleTouch(),
    onClick: () => handleOpenDropList()
  }, /*#__PURE__*/React.createElement("div", {
    tabIndex: "1",
    disabled: true,
    title: props.description,
    style: {
      minHeight: "2.5rem",
      fontSize: context.font.fontSize.field
    },
    className: props.error ? props.value.length !== 0 ? "flex flex-row flex-wrap items-center cursor-pointer block appearance-none w-full border text-gray-700 px-1 rounded-sm leading-tight focus:outline-none " + styleError : "flex flex-row flex-wrap items-center cursor-pointer block appearance-none w-full border text-gray-500 px-4 rounded-sm leading-tight focus:outline-none " + styleError : props.value.length !== 0 ? "flex flex-row flex-wrap items-center cursor-pointer block appearance-none w-full border text-gray-700 px-1 rounded-sm leading-tight focus:outline-none " + focusedStyle : "flex flex-row flex-wrap items-center cursor-pointer block appearance-none w-full border text-gray-500 px-4 rounded-sm leading-tight focus:outline-none " + focusedStyle
  }, props.value.length === 0 ? "Selecione opções..." : props.value.map((obj, index) => {
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      className: index === props.value.length - 1 ? "mr-12 my-1 flex flex-row items-center rounded-sm shadow-xs py-1 px-1 border " + itemStyle : "mr-1 my-1 flex flex-row items-center rounded-sm shadow-xs py-1 px-1 border " + itemStyle
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: context.font.fontSize.field
      },
      className: "text-gray-700"
    }, obj.text), /*#__PURE__*/React.createElement("div", {
      onClick: event => handleRemoveItem(event, obj),
      className: "duration-500 flex items-center cursor-pointer ml-2 mr-1 text-gray-400 hover:text-gray-700"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      size: "xs",
      icon: faTimes
    })));
  }))), showDropdown && dropList, /*#__PURE__*/React.createElement("div", {
    className: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700"
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    size: "xs",
    icon: faCaretDown
  })), props.value.length > 0 && /*#__PURE__*/React.createElement("div", {
    onClick: () => handleClearAll(),
    className: "duration-500 cursor-pointer absolute inset-y-0 right-0 flex items-center px-10 text-gray-400 hover:text-gray-700"
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    size: "xs",
    icon: faTimes
  }))) : /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "2.5rem",
      fontSize: context.font.fontSize.field
    },
    className: `flex flex-row flex-wrap items-center cursor-not-allowed opacity-50 block appearance-none w-full border 
                rounded-sm text-gray-700 leading-tight focus:outline-none ${focusedStyle} ${props.value.length !== 0 ? "px-1" : "px-4"}`
  }, props.value.length === 0 ? "Selecione opções..." : props.value.map((obj, index) => {
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      className: index === props.value.length - 1 ? "mr-12 my-1 flex flex-row items-center rounded-sm shadow-xs py-1 px-1 border " + itemStyle : "mr-1 my-1 flex flex-row items-center rounded-sm shadow-xs py-1 px-1 border " + itemStyle
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: context.font.fontSize.field
      },
      className: "text-gray-700"
    }, obj.text));
  })));
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
  }), multiselect, props.error && /*#__PURE__*/React.createElement(ValidationError, {
    errorMessage: props.error
  }))));
};

export default MultiSelect;