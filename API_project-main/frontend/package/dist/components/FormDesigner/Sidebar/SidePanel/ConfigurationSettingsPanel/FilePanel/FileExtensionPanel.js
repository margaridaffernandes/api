import React, { useContext, useEffect, useState } from "react";
import CombinedContext from "../../../../../../contexts/CombinedContext";
import PrefixInput from "../../../../../UI/Input/PrefixInput";
import IconButton from "../../../../UI/Button/IconButton";
import { FileIcon } from "../../../../../../assets/icons/svg_icons";
import { getItemsList } from "../../../../../../assets/data/SidebarData";

const FileExtensionPanel = props => {
  const context = useContext(CombinedContext);
  const [selectedFileExtensions, setFileExtensions] = useState([]);
  const [otherExtension, setOtherExtension] = useState("");
  useEffect(() => {
    if (context.datatypes.fileExtensions[context.composition.openCompositionPlanningPath]) {
      setFileExtensions(context.datatypes.fileExtensions[context.composition.openCompositionPlanningPath]);
      context.datatypes.fileExtensions[context.composition.openCompositionPlanningPath].forEach(f => f.description === "Outro" && setOtherExtension(f.extension));
    }
  }, [context.composition.openCompositionPlanningPath, context.datatypes.fileExtensions]);

  const handleFileExtensionChange = (e, obj) => {
    let value = selectedFileExtensions.filter(x => x.id === obj.id).length > 0 ? selectedFileExtensions.filter(x => x.id !== obj.id) // se o elemento já existe na lista é removido
    : obj.description === "Outro" || obj.description === "Todos os ficheiros" ? [obj] // se selecciona todos/outro os elementos são todos removidos
    : [...selectedFileExtensions.filter(x => x.description !== "Outro" && x.description !== "Todos os ficheiros"), obj];
    setFileExtensions(value);
    obj.description === "Outro" && setOtherExtension("");
    context.datatypes.handleFileExtensions(context.composition.openCompositionPlanningPath, value);
  };

  const handleOtherFileExtension = e => {
    let extensionValue = e.target.value;
    extensionValue = extensionValue.substring(0, 1) !== '.' ? '.' + extensionValue : extensionValue;
    let index = selectedFileExtensions.findIndex(x => x.description === "Outro");
    let finalValues = Object.values({ ...selectedFileExtensions,
      [index]: { ...selectedFileExtensions[index],
        extension: extensionValue
      }
    });
    context.datatypes.handleFileExtensions(context.composition.openCompositionPlanningPath, finalValues);
    setFileExtensions(finalValues);
    setOtherExtension(extensionValue);
  };

  let itemsList = getItemsList(otherExtension);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid gap-1 grid-cols-1 sm:grid-cols-2"
  }, Object.keys(itemsList).map(option => /*#__PURE__*/React.createElement(IconButton, {
    key: itemsList[option].id,
    icon: /*#__PURE__*/React.createElement(FileIcon, {
      fill: itemsList[option].color,
      text: itemsList[option].text
    }),
    type: "fileExtensions",
    color: itemsList[option].color,
    selected: context.datatypes.fileExtensions[context.composition.openCompositionPlanningPath] === undefined ? itemsList[option].isDefault && true : context.datatypes.fileExtensions[context.composition.openCompositionPlanningPath].filter(f => f.id === itemsList[option].id).length === 1,
    handleClick: e => handleFileExtensionChange(e, itemsList[option]),
    description: itemsList[option].description
  })))), selectedFileExtensions !== [] && selectedFileExtensions.filter(f => f.description === "Outro").length === 1 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PrefixInput, {
    prefix: "Qual?",
    onChange: event => handleOtherFileExtension(event),
    value: otherExtension
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 text-9 xl:text-10 xxl:text-11 xxxl:text-xs leading-tight mt-2 pb-4"
  }, /*#__PURE__*/React.createElement("b", null, "Nota:"), " Introduza a extens\xE3o do ficheiro (p.e: .txt)")));
};

export default FileExtensionPanel;