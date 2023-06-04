import { faCaretDown, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { handleInternalFunctions } from "../../../assets/functions/InternalFuntions/handleInternalFunctions";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";
import "../../../styles/custom.module.css";
import FieldContainer from "../../UI/FieldContainer/FieldContainer";
import Label from "../../UI/Label/Label";
import ValidationError from "../../UI/ValidationError/ValidationError";

const Dropdown = props => {
  const context = useContext(CombinedContext);
  const dropContainer = useRef(null);
  const [width, setWidth] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [items, setItems] = useState([]);

  const handleClickOutside = event => {
    if (dropContainer.current && !dropContainer.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const handleOpenDropList = () => {
    setShowDropdown(true);
  };

  const handleChange = async obj => {
    await context.fields.updateValue(props.pathLabel);
    setShowDropdown(false);
    await props.onDropdownChange(props.pathLabel, obj); // Ver se internal functions para processar

    if (Array.isArray(props.internalFunctions) && props.internalFunctions.length > 0) {
      await handleInternalFunctions(props.internalFunctions, props.onDropdownChange, context.token, props.values, context.fields);
    }
  };

  const handleClearSelectedValue = () => {
    context.fields.updateValue(props.pathLabel);
    props.onDropdownChange(props.pathLabel, "");
  };

  const handleTouch = () => {
    props.onTouch(props.pathLabel);
  };

  const handleResize = () => {
    const w = dropContainer.current.clientWidth;
    setWidth(w);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    if (!props.editMode) {
      const w = dropContainer.current.clientWidth;
      setWidth(w);
      window.addEventListener("resize", handleResize);
    } // Se houver um link no Refset, vai buscar os items ao serviço


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

      if (!props.editMode) {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [context.token, props.editMode, props.items, props.refset]);
  let dropdown;
  let dropList;
  let dropListHeigth = {
    1: "h-8",
    2: "h-16",
    3: "h-24"
  };

  if (props.editMode) {
    dropList = /*#__PURE__*/React.createElement("div", {
      ref: dropContainer,
      style: {
        zIndex: 99999999
      },
      className: dropListHeigth[items.length] ? dropListHeigth[items.length] + " w-full absolute inset-y-0 mt-10 z-10 cursor-pointer bg-white overflow-y-auto border border-gray-200 rounded-sm" : "w-full absolute inset-y-0 mt-10 z-10 cursor-pointer bg-white h-32 overflow-y-auto border border-gray-200 rounded-sm"
    }, items.map((element, index) => {
      return /*#__PURE__*/React.createElement("div", {
        onClick: () => handleChange(element),
        key: index,
        style: {
          fontSize: context.font.fontSize.field
        },
        className: props.value.code === element.code ? "duration-300 relative flex items-center bg-blue-100 text-gray-700 leading-tight h-8 px-4 hover:outline hover:bg-blue-100" : "duration-300 relative flex items-center bg-white text-gray-700 leading-tight h-8 px-4 hover:outline hover:bg-blue-100"
      }, element.text, props.value.code === element.code && /*#__PURE__*/React.createElement("div", {
        className: "absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "xs",
        icon: faCheck
      })));
    }));
  }

  if (props.editMode && props.isFieldEditable) {
    dropdown = /*#__PURE__*/React.createElement("div", {
      className: "relative w-full"
    }, items.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "relative"
    }, /*#__PURE__*/React.createElement("div", {
      tabIndex: "1",
      className: "outline-none",
      onBlur: () => handleTouch(),
      onClick: () => handleOpenDropList()
    }, /*#__PURE__*/React.createElement("div", {
      disabled: true,
      tabIndex: "1",
      title: props.description,
      className: props.error ? "truncate flex items-center cursor-pointer block h-10 appearance-none w-full bg-gray-200 border border-red-500 px-4 py-2 rounded-sm focus:outline-none focus:bg-white focus:border-red-500" : "truncate flex items-center cursor-pointer block h-10 appearance-none w-full bg-gray-200 border border-gray-200 px-4 py-2 rounded-sm focus:outline-none focus:bg-white focus:border-gray-300"
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: context.font.fontSize.field
      },
      className: props.value !== "" ? "text-gray-700 leading-tight" : "text-gray-500 leading-tight"
    }, props.value === "" ? "Selecione uma opção..." : props.value.text))), showDropdown && dropList), /*#__PURE__*/React.createElement("div", {
      className: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      size: "xs",
      icon: faCaretDown
    })), props.value !== "" && /*#__PURE__*/React.createElement("div", {
      onClick: () => handleClearSelectedValue(),
      className: "duration-500 cursor-pointer absolute inset-y-0 right-0 flex items-center px-10 text-gray-400 hover:text-gray-700"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      size: "xs",
      icon: faTimes
    })));
  } else if (props.editMode && !props.isFieldEditable) {
    dropdown = /*#__PURE__*/React.createElement("div", {
      className: "relative w-full"
    }, /*#__PURE__*/React.createElement("div", {
      className: `truncate flex items-center block h-10 appearance-none w-full bg-gray-200 border border-gray-200 px-4 
                    py-2 rounded-sm focus:outline-none focus:bg-white focus:border-gray-300 ${props.isFieldEditable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: context.font.fontSize.field
      },
      className: "text-gray-700 leading-tight"
    }, props.value === "" ? "Selecione uma opção..." : props.value.text)));
  } else {
    dropdown = /*#__PURE__*/React.createElement("div", {
      ref: dropContainer,
      title: props.description,
      style: {
        fontSize: context.font.fontSize.field
      },
      className: `flex items-center block overflow-auto appearance-none w-full bg-white border border-gray-400 
                        text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight ${props.value.length * 7 < width ? 'h-10' : 'h-20'}`
    }, props.value);
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
    showLabel: props.showLabel,
    optional: props.optional,
    optionalMandatory: props.optionalMandatory,
    sectionOccurrence: props.sectionOccurrence
  }), dropdown, props.error && /*#__PURE__*/React.createElement(ValidationError, {
    errorMessage: props.error
  }))));
};

export default Dropdown;