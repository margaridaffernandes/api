function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import ob from "object-path";
import React, { Component } from "react";
import SectionsListConsultMode from "../../../components/SubForm/SectionsListConsultMode";
import SubForm from "../../../components/SubForm/SubForm";
import AddSectionContainer from "../../../components/UI/AddSection/AddSectionContainer";
import BodyContainer from "../../../components/UI/BodyContainer/BodyContainer";
import FormContainer from "../../../components/UI/FormContainer/FormContainer";
import FormHeader from "../../../components/UI/FormHeader/FormHeader";
import SectionContainer from "../../../components/UI/SectionContainer/SectionContainer";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";
import * as buildDatatypeConsultMode from '../BuildItems/BuildItemConsultMode/BuildItemConsultMode/BuildItemConsultMode';

class FormConsultComponent extends Component {
  constructor() {
    super();

    _defineProperty(this, "state", {
      isCollapsed: false,
      subForm: {
        openSubForm: false,
        sectionId: "",
        type: "",
        path: "",
        jdt: "",
        setFieldValue: ""
      }
    });

    _defineProperty(this, "handleCollapseSections", () => {
      // Atualizar o isCollapsed
      this.setState(prevState => ({ ...prevState,
        isCollapsed: !prevState.isCollapsed
      }));
      this.accordionsSectionContainerConsult.forEach(obj => {
        const level = obj.id.split("-").filter(x => x === "items").length; // Colapsar apenas as secções do nível 1

        if (level === 1) {
          obj.accordionOpen = this.state.isCollapsed;
        }
      });
      this.forceUpdate();
    });

    _defineProperty(this, "handleAccordionSectionContainerMode", path => {
      this.accordionsSectionContainerConsult.forEach(function (obj) {
        if (obj.id === path) {
          let newMode = obj.accordionOpen;
          obj.accordionOpen = !newMode;
        }
      }); // Ver se o formulário está collapsed

      let breaked = false;

      for (let i = 0; i < this.accordionsSectionContainerConsult.length; i++) {
        const level = this.accordionsSectionContainerConsult[i].id.split("-").filter(x => x === "items").length; // Collapsar apenas as secções do nível 1

        if (level === 1) {
          if (this.accordionsSectionContainerConsult[i].accordionOpen) {
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

    _defineProperty(this, "handleConsultSectionValue", (jdt, values, sectionPath) => {
      let mergedJSON = JSON.parse(JSON.stringify(jdt));
      Object.keys(values).forEach(function (label) {
        const indexRemove = sectionPath.split('-').length;
        const jdtLabel = label.split('.').slice(indexRemove);
        ob.set(mergedJSON, jdtLabel, values[label]);
      });
      this.setState(prevState => ({ ...prevState,
        subForm: { ...prevState.subForm,
          openSubForm: true,
          jdt: mergedJSON,
          path: sectionPath,
          type: "consult"
        }
      }));
    });

    _defineProperty(this, "handleCancelSubForm", () => {
      this.setState(prevState => ({ ...prevState,
        subForm: { ...prevState.subForm,
          openSubForm: false,
          jdt: "",
          path: "",
          type: "",
          sectionId: "",
          setFieldValue: ""
        }
      }));
    });

    _defineProperty(this, "sectionConstructor", (pathArray, buildAccordion) => {
      let path = pathArray.join('-');

      if (buildAccordion && this.accordionsSectionContainerConsult.filter(obj => obj.id === path).length === 0) {
        let sections = this.accordionsSectionContainerConsult;
        sections.push({
          id: path,
          accordionOpen: true
        });
        this.accordionsSectionContainerConsult = sections;
      }
    });

    _defineProperty(this, "buildSingleItem", (item, itemIndex, isAny = false, pathArray) => {
      return buildDatatypeConsultMode.buildItemConsultMode(item.dataType, item, itemIndex, isAny, this.props.professionalTasks, this.context.order, pathArray, this.props.idComposition);
    });

    _defineProperty(this, "buildSection", (item, itemIndex, pathArray, buildAccordion) => {
      const path = pathArray.join('-');
      const section = pathArray.filter(x => x === 'items').length;

      if (item.occurrences.upperOccurrences !== 1) {
        return /*#__PURE__*/React.createElement(SectionContainer, {
          item: item,
          section: section,
          pathArray: pathArray,
          sectionConstructor: () => this.sectionConstructor(pathArray, buildAccordion),
          isTitleVisible: this.context.datatypes.showSectionTitle && Object.keys(this.context.datatypes.showSectionTitle).length > 0 ? this.context.datatypes.showSectionTitle[pathArray.join(".")] : true,
          subForm: false,
          order: this.context.order ? this.context.order[pathArray.join('.')] : null,
          hsize: this.context.sizes.sizes ? this.context.sizes.sizes[pathArray.join('.')] : null,
          handleAccordionMode: () => this.handleAccordionSectionContainerMode(path),
          accordionOpen: this.accordionsSectionContainerConsult,
          professionalTasks: this.props.professionalTasks,
          description: item.node === null ? "" : item.node.description,
          key: itemIndex,
          label: item.node.text
        }, /*#__PURE__*/React.createElement(SectionsListConsultMode, {
          sectionPath: pathArray.join('-'),
          sections: item.value,
          jdt: item,
          onConsultSection: (jdt, values, sectionPath) => this.handleConsultSectionValue(jdt, values, sectionPath)
        }));
      }

      return /*#__PURE__*/React.createElement(SectionContainer, {
        item: item,
        section: section,
        pathArray: pathArray,
        sectionConstructor: () => this.sectionConstructor(pathArray, buildAccordion),
        isTitleVisible: this.context.datatypes.showSectionTitle && Object.keys(this.context.datatypes.showSectionTitle).length > 0 ? this.context.datatypes.showSectionTitle[pathArray.join(".")] : true,
        subForm: false,
        order: this.context.order ? this.context.order[pathArray.join('.')] : null,
        hsize: this.context.sizes.sizes ? this.context.sizes.sizes[pathArray.join('.')] : null,
        handleAccordionMode: () => this.handleAccordionSectionContainerMode(path),
        accordionOpen: this.accordionsSectionContainerConsult,
        professionalTasks: this.props.professionalTasks,
        description: item.node === null ? "" : item.node.description,
        key: itemIndex,
        label: item.node.text
      }, item.items.map((subItem, subItemIndex) => {
        let array = [];
        array.push('items', subItemIndex);
        return this.buildItem(subItem, subItemIndex, pathArray.concat(array), true);
      }), this.props.formRM && this.props.formRM.length > 0 && this.props.formRM.flatMap((rm_item, rm_index) => item.itemPath === rm_item.parentPath ? this.buildItem(rm_item, rm_index, ["rm"].concat(rm_item.itemPath.split(".")), false) : []), Object.keys(this.context.sectionArchetype.sectionArchetype).filter(x => this.context.sectionArchetype.sectionArchetype[x].parentPath === pathArray.join('.')).map(x => {
        return /*#__PURE__*/React.createElement(AddSectionContainer, {
          key: x,
          path: x,
          order: this.context.order ? this.context.order[x] : null,
          label: this.context.sectionArchetype.sectionArchetype[x].sectionName
        });
      }));
    });

    _defineProperty(this, "buildItem", (item, itemIndex, pathArray, buildAccordion) => {
      if (item.data_type === 'Title') {
        return this.buildSection(item, itemIndex, pathArray, buildAccordion);
      } else {
        if (Array.isArray(item)) {
          return item.map((itemAny, itemAnyIndex) => {
            let array = [];
            array.push(itemAnyIndex);
            return this.buildSingleItem(itemAny, itemAnyIndex, true, pathArray.concat(array));
          });
        } else {
          return this.buildSingleItem(item, itemIndex, false, pathArray);
        }
      }
    });

    this.accordionsSectionContainerConsult = []; // controlar o accordionMode 
  }

  render() {
    const form = /*#__PURE__*/React.createElement(FormContainer, {
      formTitle: this.props.formTitle,
      description: this.props.template.node.description
    }, /*#__PURE__*/React.createElement(FormHeader, {
      accordions: this.accordionsSectionContainerConsult,
      collapseSections: () => this.handleCollapseSections(),
      isCollapsed: this.state.isCollapsed,
      showPrint: this.props.showPrint,
      professionalTasks: this.props.professionalTasks,
      template: this.props.template,
      fields: this.context.formData.referenceModel
    }), /*#__PURE__*/React.createElement(BodyContainer, null, this.props.template.items.map((attribute, index) => {
      return attribute.map((att, attIndex) => {
        let array = [];
        array.push('items', index, attIndex);
        return this.buildItem(att, attIndex, array, true);
      });
    })));
    return /*#__PURE__*/React.createElement("div", null, this.state.subForm.openSubForm && /*#__PURE__*/React.createElement(SubForm, {
      level: this.state.subForm.path.split('-').filter(x => x === 'items').length,
      template: this.props.template,
      professionalTasks: this.props.professionalTasks,
      editMode: false,
      path: this.state.subForm.path,
      onCancel: () => this.handleCancelSubForm(),
      jdt: this.state.subForm.jdt
    }), form);
  }

}

_defineProperty(FormConsultComponent, "contextType", CombinedContext);

const FormConsultMode = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(FormConsultComponent, props));
};

export default FormConsultMode;