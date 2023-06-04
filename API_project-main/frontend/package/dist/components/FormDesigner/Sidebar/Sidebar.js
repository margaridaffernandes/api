import React, { useContext, useEffect, useState } from "react";
import Toolbox from "./Toolbox/Toolbox";
import ThemeSettingsPanel from "./SidePanel/ThemeSettingsPanel/ThemeSettingsPanel";
import ReferenceModelPanel from "./SidePanel/ReferenceModelPanel/ReferenceModelPanel";
import RefsetSettingsPanel from "./SidePanel/CompositionPlanningPanels/RefsetSettingsPanel/RefsetSettingsPanel";
import { faPalette, faFont, faPencilAlt, faLink, faSubscript, faCog, faEye, faShapes } from "@fortawesome/free-solid-svg-icons";
import FontSettingsPanel from "./SidePanel/FontSettingsPanel/FontSettingsPanel";
import CombinedContext from "../../../contexts/CombinedContext";
import FunctionSettingsPanel from "./SidePanel/CompositionPlanningPanels/FunctionSettingsPanel/FunctionSettingsPanel";
import VisibilitySettingsPanel from "./SidePanel/CompositionPlanningPanels/TaskSettingsPanel/VisibilitySettings/VisibilitySettings";
import EditableSettingsPanel from "./SidePanel/CompositionPlanningPanels/TaskSettingsPanel/EditableSettingsPanel/EditableSettingsPanel";
import ConfigurationSettingsPanel from "./SidePanel/ConfigurationSettingsPanel/ConfigurationSettingsPanel";

const Sidebar = props => {
  const context = useContext(CombinedContext);
  const [activeIndex, setActiveIndex] = useState(0); //por default o primeiro botão de tooling está seleccionado

  useEffect(() => {
    //quando o utilizador selecciona um campo, abre a sidebar no 1º toolbox de configurações individuais
    if (context.composition.openCompositionPlanning) {
      if (context.composition.openCompositionPlanningDatatype === "DV_MULTIMEDIA" || context.composition.openCompositionPlanningDatatype === "DV_TEXT" || context.composition.openCompositionPlanningDatatype === "DV_CODED_TEXT" && context.composition.compositionPlanning[context.composition.openCompositionPlanningPath].terminology !== "external") {
        setActiveIndex(2);
      } else if (context.composition.openCompositionPlanningDatatype === "SECTION") {
        setActiveIndex(3);
      } else {
        setActiveIndex(4);
      }
    } //quando o utilizador deselecciona um campo, abre a sidebar no 1º toolbox de configurações gerais
    else {
        setActiveIndex(0);
      }
  }, [context.composition.openCompositionPlanning, context.composition.openCompositionPlanningPath, context.composition.compositionPlanning, context.composition.openCompositionPlanningDatatype]);

  const handleToolButtonClick = i => {
    if (activeIndex === i) {
      setActiveIndex(0);
    } else {
      setActiveIndex(i);
    } //verificar se o painel já está aberto, abrir em caso contrário


    !props.isSidePanelOpen && props.handleCollapseSidePanel();
  };

  const data = [{
    key: 0,
    icon: faPalette,
    type: 'geral',
    isEnabled: true,
    content: /*#__PURE__*/React.createElement(ThemeSettingsPanel, {
      key: 0,
      isSidePanelOpen: props.isSidePanelOpen,
      collapseSidePanel: () => props.handleCollapseSidePanel(),
      onCancel: () => props.handleCollapseSidePanel()
    })
  }, {
    key: 1,
    icon: faFont,
    type: 'geral',
    isEnabled: true,
    content: /*#__PURE__*/React.createElement(FontSettingsPanel, {
      key: 1,
      isSidePanelOpen: props.isSidePanelOpen,
      collapseSidePanel: () => props.handleCollapseSidePanel(),
      onCancel: () => props.handleCollapseSidePanel()
    })
  }, {
    key: 2,
    icon: faCog,
    type: 'individual',
    isEnabled: context.composition.openCompositionPlanning && (context.composition.openCompositionPlanningDatatype === "DV_MULTIMEDIA" || context.composition.openCompositionPlanningDatatype === "DV_TEXT" || context.composition.openCompositionPlanningDatatype === "DV_CODED_TEXT" && context.composition.compositionPlanning[context.composition.openCompositionPlanningPath].terminology !== "external"),
    content: /*#__PURE__*/React.createElement(ConfigurationSettingsPanel, {
      key: 3,
      isSidePanelOpen: props.isSidePanelOpen,
      collapseSidePanel: () => props.handleCollapseSidePanel(),
      onCancel: () => props.handleCollapseSidePanel()
    })
  }, {
    key: 3,
    icon: faShapes,
    type: 'individual',
    isEnabled: context.composition.openCompositionPlanning && context.composition.openCompositionPlanningDatatype === "SECTION",
    content: /*#__PURE__*/React.createElement(ReferenceModelPanel, {
      key: 2,
      isSidePanelOpen: props.isSidePanelOpen,
      collapseSidePanel: () => props.handleCollapseSidePanel(),
      onCancel: () => props.handleCollapseSidePanel()
    })
  }, {
    key: 4,
    icon: faPencilAlt,
    type: 'individual',
    isEnabled: context.composition.openCompositionPlanning,
    content: /*#__PURE__*/React.createElement(EditableSettingsPanel, {
      key: 4,
      isSidePanelOpen: props.isSidePanelOpen,
      collapseSidePanel: () => props.handleCollapseSidePanel(),
      onCancel: () => props.handleCollapseSidePanel()
    })
  }, {
    key: 5,
    icon: faEye,
    type: 'individual',
    isEnabled: context.composition.openCompositionPlanning,
    content: /*#__PURE__*/React.createElement(VisibilitySettingsPanel, {
      key: 5,
      isSidePanelOpen: props.isSidePanelOpen,
      collapseSidePanel: () => props.handleCollapseSidePanel(),
      onCancel: () => props.handleCollapseSidePanel()
    })
  }, {
    key: 6,
    icon: faSubscript,
    type: 'individual',
    isEnabled: context.composition.openCompositionPlanning && context.composition.openCompositionPlanningDatatype !== "SECTION",
    content: /*#__PURE__*/React.createElement(FunctionSettingsPanel, {
      key: 6,
      isSidePanelOpen: props.isSidePanelOpen,
      collapseSidePanel: () => props.handleCollapseSidePanel(),
      onCancel: () => props.handleCollapseSidePanel()
    })
  }, {
    key: 7,
    icon: faLink,
    type: 'individual',
    isEnabled: context.composition.openCompositionPlanningDatatype === "DV_CODED_TEXT",
    content: /*#__PURE__*/React.createElement(RefsetSettingsPanel, {
      key: 7,
      isSidePanelOpen: props.isSidePanelOpen,
      collapseSidePanel: () => props.handleCollapseSidePanel(),
      onCancel: () => props.handleCollapseSidePanel()
    })
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "h-full flex sticky top-0 z-20"
  }, /*#__PURE__*/React.createElement(Toolbox, {
    data: data,
    activeIndex: activeIndex,
    handleToolButtonClick: handleToolButtonClick
  }), data.map((item, index) => index === activeIndex && item.content));
};

export default Sidebar;