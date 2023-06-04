function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Formik } from "formik";
import React, { Component } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { handleSectionValidationDnd } from "../../../assets/functions/HandleSectionValidation/handleSectionValidationDnd";
import { processItemSection } from "../../../assets/functions/HandleSectionValidation/processItemSection";
import { maxValueArray } from "../../../assets/functions/Maximum/maxValueArray";
import AddSection from "../../../components/FormDesigner/AddSection/AddSection";
import DesignerBodyContainer from "../../../components/FormDesigner/UI/DesignerBodyContainer/DesignerBodyContainer";
import DesignerFormContainer from "../../../components/FormDesigner/UI/DesignerFormContainer/DesignerFormContainer";
import SaveButtonDnd from "../../../components/FormDesigner/UI/SaveButtonDnd/SaveButtonDnd";
import CancelButton from "../../../components/UI/CancelButton/CancelButton";
import FormContainer from "../../../components/UI/FormContainer/FormContainer";
import FormHeader from "../../../components/UI/FormHeader/FormHeader";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";
import * as buildDatatypeFormDesigner from "../BuildItems/BuildItemDesignerMode/BuildItemFormDesigner/BuildItemFormDesigner";
import AddSectionContainerDnd from "../../../components/FormDesigner/AddSection/AddSectionContainerDnd";
import SectionContainerDnd from "../../../components/FormDesigner/UI/SectionContainerDnd/SectionContainerDnd";
import Sidebar from "../../../components/FormDesigner/Sidebar/Sidebar";

class FormDesignerComponent extends Component {
  constructor() {
    super();

    _defineProperty(this, "state", {
      isCollapsed: false,
      isSidePanelOpen: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) >= 1024
    });

    _defineProperty(this, "buildSingleItemDesignerMode", (item, itemIndex, pathArray, setFieldValue, values, isAny, sectionNotMandatoryObject) => {
      const itemSection = processItemSection(pathArray, isAny, sectionNotMandatoryObject);
      return buildDatatypeFormDesigner.buildItemFormDesigner(item.dataType, item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, this.initialValuesDnd, this.props.handleFormOrder, this.context.order, this.context.datatypes.datatypes[pathArray.join(".")]);
    });

    _defineProperty(this, "handleCollapseSections", () => {
      // Atualizar o isCollapsed
      this.setState(prevState => ({ ...prevState,
        isCollapsed: !prevState.isCollapsed
      }));
      this.accordionsSectionContainerDnd.forEach(obj => {
        const level = obj.id.split("-").filter(x => x === "items").length; // Colapsar apenas as secções do nível 1

        if (level === 1) {
          obj.accordionOpen = this.state.isCollapsed;
        }
      });
      this.forceUpdate();
    });

    _defineProperty(this, "handleCollapseSidePanel", () => {
      this.setState(prevState => ({ ...prevState,
        isSidePanelOpen: !prevState.isSidePanelOpen
      }));
    });

    _defineProperty(this, "handleAccordionSectionContainerMode", path => {
      this.accordionsSectionContainerDnd.forEach(function (obj) {
        if (obj.id === path) {
          let newMode = obj.accordionOpen;
          obj.accordionOpen = !newMode;
        }
      }); // Ver se o formulário está collapsed

      let breaked = false;

      for (let i = 0; i < this.accordionsSectionContainerDnd.length; i++) {
        const level = this.accordionsSectionContainerDnd[i].id.split("-").filter(x => x === "items").length; // Collapsar apenas as secções do nível 1

        if (level === 1) {
          if (this.accordionsSectionContainerDnd[i].accordionOpen) {
            this.setState({
              isCollapsed: false
            });
            breaked = true;
            break;
          }
        }
      }

      if (!breaked) {
        this.setState({
          isCollapsed: true
        });
      }

      this.forceUpdate();
    });

    _defineProperty(this, "buildSectionDesignerMode", (item, itemIndex, pathArray, setFieldValue, values, sectionNotMandatoryObject) => {
      const path = pathArray.join("-");
      const section = pathArray.filter(x => x === "items").length;
      return /*#__PURE__*/React.createElement(SectionContainerDnd, {
        section: section,
        isSection: true,
        hasManyOccurrences: item.occurrences.upperOccurrences !== 1,
        isMandatory: item.occurrences.lowerOccurrences !== 0,
        groupID: item.groupID,
        path: pathArray.join("."),
        order: this.context.order ? this.context.order[pathArray.join(".")] : null,
        handleFormOrder: this.props.handleFormOrder,
        handleAccordionMode: () => this.handleAccordionSectionContainerMode(path),
        accordionOpen: this.accordionsSectionContainerDnd.filter(obj => obj.id === path)[0].accordionOpen,
        description: item.node === null ? "" : item.node.description,
        key: itemIndex,
        label: item.node.text
      }, item.items.map((subItem, subItemIndex) => {
        let array = [];
        array.push("items", subItemIndex);
        return this.buildItemDesignerMode(subItem, subItemIndex, pathArray.concat(array), setFieldValue, values, true, sectionNotMandatoryObject);
      }), this.context.rmData.rmForm.flatMap((rm_item, rm_index) => {
        if (item.itemPath === rm_item.parentPath) {
          return this.buildRmItemDesignerMode(rm_item, rm_index, ["rm"].concat(rm_item.itemPath.split(".")), setFieldValue, values, {});
        } else {
          return [];
        }
      }), Object.keys(this.context.sectionArchetype.sectionArchetype).filter(x => this.context.sectionArchetype.sectionArchetype[x].parentPath === pathArray.join(".")).map(x => {
        return /*#__PURE__*/React.createElement(AddSectionContainerDnd, {
          key: x,
          isSection: false,
          handleFormOrder: this.props.handleFormOrder,
          groupID: this.context.sectionArchetype.sectionArchetype[x].groupID,
          path: x,
          order: this.context.order ? this.context.order[x] : null,
          isAny: false,
          showLabel: true,
          label: this.context.sectionArchetype.sectionArchetype[x].sectionName
        });
      }));
    });

    _defineProperty(this, "buildRmItemDesignerMode", (item, itemIndex, pathArray, setFieldValue, values, sectionNotMandatoryObject) => {
      return this.buildSingleItemDesignerMode(item, itemIndex, pathArray, setFieldValue, values, false, sectionNotMandatoryObject);
    });

    _defineProperty(this, "buildItemDesignerMode", (item, itemIndex, pathArray, setFieldValue, values, buildAccordion, sectionNotMandatoryObject) => {
      if (item.data_type === "Title") {
        let path = pathArray.join("-");

        if (buildAccordion && this.accordionsSectionContainerDnd.filter(obj => obj.id === path).length === 0) {
          let sections = this.accordionsSectionContainerDnd;
          sections.push({
            id: path,
            accordionOpen: true
          });
          this.accordionsSectionContainerDnd = sections;
        }

        sectionNotMandatoryObject[path] = [...handleSectionValidationDnd(item, pathArray), item.node.text, item.occurrences.lowerOccurrences];
        return this.buildSectionDesignerMode(item, itemIndex, pathArray, setFieldValue, values, sectionNotMandatoryObject);
      } else {
        if (Array.isArray(item)) {
          return item.map((itemAny, itemAnyIndex) => {
            let array = [];
            array.push(itemAnyIndex);
            return this.buildSingleItemDesignerMode(itemAny, itemAnyIndex, pathArray.concat(array), setFieldValue, values, true, sectionNotMandatoryObject);
          });
        } else {
          return this.buildSingleItemDesignerMode(item, itemIndex, pathArray, setFieldValue, values, false, sectionNotMandatoryObject);
        }
      }
    });

    this.initialValuesDnd = {}; // initialValues do formulário

    this.accordionsSectionContainerDnd = []; // controlar o accordionMode
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: '1px solid #edf2f7'
      },
      className: `grid bg-white h-screen w-full flex flex-row items-center ${this.state.isSidePanelOpen ? 'grid-cols-4' : 'grid-cols-25'}`
    }, /*#__PURE__*/React.createElement(DndProvider, {
      backend: HTML5Backend
    }, /*#__PURE__*/React.createElement(Sidebar, {
      isSidePanelOpen: this.state.isSidePanelOpen,
      handleCollapseSidePanel: this.handleCollapseSidePanel
    }), /*#__PURE__*/React.createElement("div", {
      className: `flex-1 flex h-full overflow-hidden ${this.state.isSidePanelOpen ? 'col-span-3' : 'col-span-24'}`,
      style: {
        marginLeft: this.state.isSidePanelOpen ? (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1045 ? '9%' : (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1065 ? '8%' : (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1100 ? '7%' : (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1120 ? '6%' : (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1150 ? '5%' : (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1190 ? '4%' : (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1210 ? '3%' : (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1250 ? '2%' : (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1285 ? '1%' : null : (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 650 ? '5%' : (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 730 ? '4%' : (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 920 ? '3%' : (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1005 ? '2%' : (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1190 ? '1%' : null
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: `flex-1 overflow-y-scroll flex-col w-full`
    }, /*#__PURE__*/React.createElement(Formik, {
      initialValues: this.initialValuesDnd
    }, ({
      values,
      setFieldValue
    }) => /*#__PURE__*/React.createElement(FormContainer, {
      showToolbar: true,
      formTitle: this.props.formTitle,
      updateFormTitle: this.props.updateFormTitle,
      description: this.props.templateGroupId.node.description
    }, /*#__PURE__*/React.createElement(FormHeader, {
      accordions: this.accordionsSectionContainerDnd,
      collapseSections: () => this.handleCollapseSections(),
      isCollapsed: this.state.isCollapsed,
      showPrint: false
    }), /*#__PURE__*/React.createElement(DesignerBodyContainer, null, /*#__PURE__*/React.createElement(DesignerFormContainer, {
      menuOpened: false
    }, this.props.templateGroupId.items.map((attribute, index) => {
      return attribute.map((att, attIndex) => {
        let array = [];
        array.push("items", index, attIndex);
        return this.buildItemDesignerMode(att, attIndex, array, setFieldValue, values, true, {});
      });
    })), this.context.sectionArchetype.openSectionArchetype && /*#__PURE__*/React.createElement(AddSection, null)), /*#__PURE__*/React.createElement("div", {
      style: {
        order: maxValueArray(Object.values(this.context.order)) + 1
      } // A ordem do botão deve ser a última porque senão o botão fica no topo do formulário
      ,
      className: "flex flex-row"
    }, this.props.canCreateFD && /*#__PURE__*/React.createElement(SaveButtonDnd, {
      disabled: this.props.createFDButtonDisabled === true,
      bgColor: "bg-green-400",
      hoverBgColor: "hover:bg-green-500",
      label: "Criar Novo Formul\xE1rio",
      clicked: () => this.props.handleSaveFormDesigner("create")
    }), this.props.canSaveFD && /*#__PURE__*/React.createElement(SaveButtonDnd, {
      disabled: this.props.saveFDButtonDisabled === true,
      bgColor: "bg-blue-400",
      hoverBgColor: "hover:bg-blue-500",
      label: "Guardar Altera\xE7\xF5es",
      clicked: () => this.props.handleSaveFormDesigner("save")
    }), this.props.canCancel && /*#__PURE__*/React.createElement(CancelButton, {
      clicked: this.props.handleCancelForm
    }))))))));
  }

}

_defineProperty(FormDesignerComponent, "contextType", CombinedContext);

const FormDesignerMode = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(FormDesignerComponent, props));
};

export default FormDesignerMode;