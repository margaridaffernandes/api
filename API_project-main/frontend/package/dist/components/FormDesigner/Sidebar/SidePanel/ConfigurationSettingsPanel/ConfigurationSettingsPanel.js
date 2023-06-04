import ProviderCombinedContext from "../../../../../contexts/ProviderCombinedContext";
import SidePanel from "../SidePanel";
import React, { useContext } from "react";
import CombinedContext from "../../../../../contexts/CombinedContext";
import ComponentPanel from "./ComponentPanel";
import CharacterLimitPanel from "./CharacterLimitPanel";
import FileExtensionPanel from "./FilePanel/FileExtensionPanel";
import Dropdown from "../../../UI/DropdownWithoutContainer/Dropdown";
import FileSizePanel from "./FilePanel/FileSizePanel";

const ConfigurationSettingsPanel = props => {
  const context = useContext(CombinedContext);

  const handleCancelChanges = () => {
    props.onCancel();
  };

  const handleConfirmChanges = () => {};

  const dropData = [// {
    //     title: 'Propriedades',
    //     content: <ContentPanel/>
    // },
    // {
    //     title: 'Tamanho',
    //     content: ""
    // },
    // {
    //     title: 'Espaçamento',
    //     content: <SpacingPanel/>
    // },
  ];
  let dropData2;

  if (context.composition.openCompositionPlanningDatatype === "DV_TEXT" || context.composition.openCompositionPlanningDatatype === "DV_CODED_TEXT" && context.composition.compositionPlanning[context.composition.openCompositionPlanningPath].terminology !== "external") {
    if (context.composition.openCompositionPlanningDatatype === "DV_TEXT" && (context.datatypes.datatypes[context.composition.openCompositionPlanningPath] === "editor" || context.datatypes.datatypes[context.composition.openCompositionPlanningPath] === "textarea")) {
      dropData2 = [{
        title: 'Componente',
        content: /*#__PURE__*/React.createElement(ComponentPanel, null)
      }, {
        title: 'Limite de Caracteres',
        content: /*#__PURE__*/React.createElement(CharacterLimitPanel, null)
      }];
    } else {
      dropData2 = [{
        title: 'Componente',
        content: /*#__PURE__*/React.createElement(ComponentPanel, null)
      }];
    }
  } else if (context.composition.openCompositionPlanningDatatype === "DV_MULTIMEDIA") {
    dropData2 = [{
      title: 'Tipo de Ficheiro',
      content: /*#__PURE__*/React.createElement(FileExtensionPanel, null)
    }, {
      title: 'Tamanho do Ficheiro',
      content: /*#__PURE__*/React.createElement(FileSizePanel, null)
    }];
  }

  Array.prototype.push.apply(dropData, dropData2);
  const content = /*#__PURE__*/React.createElement(Dropdown, {
    dropData: dropData
  });
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(SidePanel, {
    title: "Configurar componente",
    content: content,
    isSidePanelOpen: props.isSidePanelOpen,
    collapseSidePanel: () => props.collapseSidePanel(),
    onCancelChanges: () => handleCancelChanges(),
    onClosed: () => handleConfirmChanges()
  }));
};

export default ConfigurationSettingsPanel;