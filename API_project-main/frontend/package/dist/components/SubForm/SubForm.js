function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Formik } from "formik";
import ob from "object-path";
import React, { Component } from "react";
import * as Yup from "yup";
import { handleCardinality } from "../../assets/functions/HandleCardinality/HandleCardinality";
import { handleSectionValidation } from "../../assets/functions/HandleSectionValidation/handleSectionValidation";
import { processItemSection } from "../../assets/functions/HandleSectionValidation/processItemSection";
import { handleSubmit } from "../../assets/functions/HandleSubmit/handleSubmit";
import * as buildDatatypeConsultMode from "../../containers/Form/BuildItems/BuildItemConsultMode/BuildItemConsultMode/BuildItemConsultMode";
import * as buildDatatypeEditMode from "../../containers/Form/BuildItems/BuildItemEditMode/BuildItemEditMode/BuildItemEditMode";
import { buildSectionInitialValue } from '../../containers/Form/FormInitialValues/BuildSectionInitialValue/BuildSectionInitialValue';
import { buildSectionValidation } from "../../containers/Form/FormValidation/BuildSectionValidation/BuildSectionValidation";
import CombinedContext from "../../contexts/CombinedContext";
import ProviderCombinedContext from "../../contexts/ProviderCombinedContext";
import AddSectionContainer from "../UI/AddSection/AddSectionContainer";
import AddSectionButton from "../UI/AddSectionButton/AddSectionButton";
import SectionContainer from "../UI/SectionContainer/SectionContainer";
import SectionsListConsultMode from "./SectionsListConsultMode";
import SectionsListEditMode from "./SectionsListEditMode";
import SubFormContainerConsultMode from "./SubFormContainerConsultMode";
import SubFormContainerEditMode from "./SubFormContainerEditMode";

class SubFormComponent extends Component {
  constructor() {
    super();

    _defineProperty(this, "state", {
      checkValidation: false,
      confirmEditMode: false,
      template: null,
      professionalTasks: [],
      subForm: {
        openSubForm: false,
        sectionId: "",
        type: "",
        path: "",
        jdt: "",
        setFieldValue: ""
      },
      level: 0
    });

    _defineProperty(this, "handleSubmit", values => {
      let jsonValues = handleSubmit(this.state.template, values);
      this.multipleSections.forEach(function (section) {
        const path = section.path.split('-').join('.') + ".value";
        jsonValues[path] = section.values;
      });
      this.props.onSubmitSubForm(jsonValues);
    });

    _defineProperty(this, "handleAddSection", (pathArray, setFieldValue, setFieldTouched) => {
      const section = this.multipleSections.filter(obj => obj.path === pathArray.join('-'))[0];
      this.setState(prevState => ({ ...prevState,
        subForm: { ...prevState.subForm,
          openSubForm: true,
          jdt: section.jdt,
          path: section.path,
          type: "new",
          sectionId: "",
          setFieldValue: setFieldValue
        }
      }));
      setFieldTouched(pathArray.join('-'));
    });

    _defineProperty(this, "handleEditSectionValue", (sectionPath, id) => {
      const section = this.multipleSections.filter(obj => obj.path === sectionPath)[0];
      const sectionValues = section.values.filter(obj => obj.id === id)[0].values;
      let mergedJSON = JSON.parse(JSON.stringify(section.jdt));
      Object.keys(sectionValues).forEach(function (label) {
        const indexRemove = sectionPath.split('-').length;
        const jdtLabel = label.split('.').slice(indexRemove);
        ob.set(mergedJSON, jdtLabel, sectionValues[label]);
      });
      this.setState(prevState => ({ ...prevState,
        subForm: { ...prevState.subForm,
          openSubForm: true,
          jdt: mergedJSON,
          path: section.path,
          type: "edit",
          sectionId: id
        }
      }));
    });

    _defineProperty(this, "handleRemoveSectionValue", (sectionPath, id, setFieldValue) => {
      this.context.fields.updateValue(`${sectionPath}-value`);
      this.multipleSections.forEach(function (obj) {
        if (obj.path === sectionPath) {
          const occurrence = obj.occurrences;
          const valuesSections = obj.values.filter(obj => obj.id !== id);
          obj.occurrences = occurrence - 1;
          obj.values = valuesSections;
          setFieldValue(sectionPath, occurrence - 1);
        }
      });
      this.forceUpdate();
    });

    _defineProperty(this, "handleSubmitSubForm", (values, path, type, sectionId, setFieldValue = null) => {
      this.context.fields.updateValue(`${path}-value`);

      if (type === "new") {
        this.multipleSections.forEach(function (obj) {
          if (obj.path === path) {
            const occurrence = obj.occurrences;
            const valuesSections = obj.values;
            let maxId = 0;
            valuesSections.forEach(function (val) {
              if (val.id >= maxId) {
                maxId = val.id;
              }
            });
            obj.occurrences = occurrence + 1;
            obj.values = [...valuesSections, {
              id: maxId + 1,
              values: values
            }];
            setFieldValue(path, occurrence + 1);
          }
        });
      } else if (type === "edit") {
        this.multipleSections.forEach(function (obj) {
          if (obj.path === path) {
            const valuesSections = obj.values.filter(section => section.id !== sectionId);
            obj.values = [...valuesSections, {
              id: sectionId,
              values: values
            }];
          }
        });
      }

      this.handleCancelSubForm();
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

    _defineProperty(this, "buildSingleItemSubFormEditMode", (item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionNotMandatoryObject, sectionValidation) => {
      const itemSection = processItemSection(pathArray, isAny, sectionNotMandatoryObject);
      return buildDatatypeEditMode.buildItemEditMode(item.dataType, item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, this.initialValuesSubForm, this.validationSchemaSubForm, itemSection, this.multipleSections, this.state.professionalTasks, this.context.order, this.context.datatypes.datatypes[pathArray.join('.')]);
    });

    _defineProperty(this, "buildSingleItemSubFormConsultMode", (item, itemIndex, isAny = false, pathArray) => {
      return buildDatatypeConsultMode.buildItemConsultMode(item.dataType, item, itemIndex, isAny, this.state.professionalTasks, this.context.order, pathArray);
    });

    _defineProperty(this, "buildInitialValueSection", (occurrences, pathLabel) => {
      buildSectionInitialValue(occurrences, pathLabel, this.initialValuesSubForm);
    });

    _defineProperty(this, "buildValidationSection", (minOccurrences, pathLabel) => {
      buildSectionValidation(minOccurrences, pathLabel, this.validationSchemaSubForm);
    });

    _defineProperty(this, "sectionConstructor", (pathArray, item, cardinalityObject, sectionNotMandatoryObject, sectionValidation) => {
      let path = pathArray.join('-'); // Se a cardinalidade da secção for diferente de 0, há necessidade de ver na validação se o número de campos pedidos é respeitado

      if (item.cardinality !== undefined && item.cardinality.interval.lowerOccurrences > 0) {
        cardinalityObject[path] = [...handleCardinality(item, pathArray, this.state.professionalTasks), item.node.text, item.cardinality.interval.lowerOccurrences];
      } // Para cada secção vamos ver quais os items existentes para depois verificar se o item é required ou não dependendo da lowerOccurrence da secção


      sectionNotMandatoryObject[path] = [...handleSectionValidation(item, pathArray, this.state.professionalTasks), item.node.text, item.occurrences.lowerOccurrences]; // Se a occorrência da secção for diferente de 0, há necessidade de ver na validação de pelo menos um dos campos está preenchido

      if (item.occurrences.lowerOccurrences !== 0) {
        sectionValidation[path] = [...handleCardinality(item, pathArray, this.state.professionalTasks), item.node.text, 1];
      }
    });

    _defineProperty(this, "buildSectionSubFormEditMode", (item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, cardinalityObject, sectionNotMandatoryObject, sectionValidation) => {
      const section = pathArray.filter(x => x === 'items').length;

      if (item.occurrences.upperOccurrences !== 1 && pathArray.join('-') !== this.props.path) {
        if (this.multipleSections.filter(obj => obj.path === pathArray.join('-')).length === 0) {
          let sections = this.multipleSections;
          let vals = [];
          let occs = 0;

          if (item.value) {
            if (item.value.length > 0) {
              vals = item.value;
              occs = item.value.length;
            }
          }

          sections.push({
            path: pathArray.join('-'),
            jdt: item,
            occurrences: occs,
            minOccurrences: item.occurrences.lowerOccurrences,
            values: vals
          });
          this.multipleSections = sections;
          this.buildInitialValueSection(occs, pathArray.join('-'));
          this.buildValidationSection(item.occurrences.lowerOccurrences, pathArray.join('-'));
        }

        return /*#__PURE__*/React.createElement(SectionContainer, {
          item: item,
          path: item.itemPath,
          pathArray: pathArray,
          idJDT: this.props.idJDT,
          templateRules: this.props.templateRules,
          professionalTasks: this.state.professionalTasks,
          values: values,
          sectionConstructor: () => this.sectionConstructor(pathArray, item, cardinalityObject, sectionNotMandatoryObject, sectionValidation),
          section: section,
          isTitleVisible: this.context.datatypes.showSectionTitle && Object.keys(this.context.datatypes.showSectionTitle).length > 0 ? this.context.datatypes.showSectionTitle[pathArray.join(".")] : true,
          accordionOpen: true,
          subForm: true,
          isMandatory: item.occurrences.lowerOccurrences !== 0,
          order: this.context.order ? this.context.order[pathArray.join('.')] : null,
          hsize: this.context.sizes.sizes ? this.context.sizes.sizes[pathArray.join('.')] : null,
          description: item.node === null ? "" : item.node.description,
          key: itemIndex,
          label: item.node.text
        }, /*#__PURE__*/React.createElement(AddSectionButton, {
          error: touched[pathArray.join('-')] && errors[pathArray.join('-')],
          handleAddSection: () => this.handleAddSection(pathArray, setFieldValue, setFieldTouched),
          disabled: item.occurrences.upperOccurrences === '*' ? false : this.multipleSections.filter(obj => obj.path === pathArray.join('-'))[0].occurrences >= item.occurrences.upperOccurrences
        }), /*#__PURE__*/React.createElement(SectionsListEditMode, {
          error: touched[pathArray.join('-')] && errors[pathArray.join('-')],
          onEditSection: (sectionPath, id) => this.handleEditSectionValue(sectionPath, id),
          onRemoveSection: (sectionPath, id) => this.handleRemoveSectionValue(sectionPath, id, setFieldValue),
          sections: this.multipleSections.filter(obj => obj.path === pathArray.join('-'))[0]
        }));
      }

      return /*#__PURE__*/React.createElement(SectionContainer, {
        item: item,
        path: item.itemPath,
        pathArray: pathArray,
        idJDT: this.props.idJDT,
        templateRules: this.props.templateRules,
        professionalTasks: this.state.professionalTasks,
        values: values,
        sectionConstructor: () => this.sectionConstructor(pathArray, item, cardinalityObject, sectionNotMandatoryObject, sectionValidation),
        section: section,
        isTitleVisible: this.context.datatypes.showSectionTitle && Object.keys(this.context.datatypes.showSectionTitle).length > 0 ? this.context.datatypes.showSectionTitle[pathArray.join(".")] : true,
        accordionOpen: true,
        subForm: true,
        isMandatory: item.occurrences.lowerOccurrences !== 0,
        order: this.context.order ? this.context.order[pathArray.join('.')] : null,
        hsize: this.context.sizes.sizes ? this.context.sizes.sizes[pathArray.join('.')] : null,
        cardinality: item.cardinality !== undefined && item.cardinality.interval.lowerOccurrences,
        description: item.node === null ? "" : item.node.description,
        key: itemIndex,
        label: item.node.text
      }, item.items.map((subItem, subItemIndex) => {
        let array = [];
        array.push('items', subItemIndex);
        return this.buildItemSubFormEditMode(subItem, subItemIndex, pathArray.concat(array), setFieldValue, values, errors, touched, setFieldTouched, cardinalityObject, sectionNotMandatoryObject, sectionValidation);
      }), Object.keys(this.context.sectionArchetype.sectionArchetype).filter(x => this.context.sectionArchetype.sectionArchetype[x].parentPath === pathArray.join('.')).map(x => {
        return /*#__PURE__*/React.createElement(AddSectionContainer, {
          key: x,
          path: x,
          order: this.context.order ? this.context.order[x] : null,
          label: this.context.sectionArchetype.sectionArchetype[x].sectionName
        });
      }));
    });

    _defineProperty(this, "buildSectionSubFormConsultMode", (item, itemIndex, pathArray) => {
      const section = pathArray.filter(x => x === 'items').length;

      if (item.occurrences.upperOccurrences !== 1 && pathArray.join('-') !== this.props.path) {
        return /*#__PURE__*/React.createElement(SectionContainer, {
          item: item,
          pathArray: pathArray,
          section: section,
          isTitleVisible: this.context.datatypes.showSectionTitle && Object.keys(this.context.datatypes.showSectionTitle).length > 0 ? this.context.datatypes.showSectionTitle[pathArray.join(".")] : true,
          subForm: true,
          accordionOpen: true,
          order: this.context.order ? this.context.order[pathArray.join('.')] : null,
          hsize: this.context.sizes.sizes ? this.context.sizes.sizes[pathArray.join('.')] : null,
          description: item.node === null ? "" : item.node.description,
          key: itemIndex,
          professionalTasks: this.state.professionalTasks,
          label: item.node.text
        }, /*#__PURE__*/React.createElement(SectionsListConsultMode, {
          sectionPath: pathArray.join('-'),
          sections: item.value,
          jdt: item,
          onConsultSection: this.handleConsultSectionValue
        }));
      }

      return /*#__PURE__*/React.createElement(SectionContainer, {
        item: item,
        pathArray: pathArray,
        section: section,
        isTitleVisible: this.context.datatypes.showSectionTitle && Object.keys(this.context.datatypes.showSectionTitle).length > 0 ? this.context.datatypes.showSectionTitle[pathArray.join(".")] : true,
        subForm: true,
        accordionOpen: true,
        order: this.context.order ? this.context.order[pathArray.join('.')] : null,
        hsize: this.context.sizes.sizes ? this.context.sizes.sizes[pathArray.join('.')] : null,
        description: item.node === null ? "" : item.node.description,
        key: itemIndex,
        professionalTasks: this.state.professionalTasks,
        label: item.node.text
      }, item.items.map((subItem, subItemIndex) => {
        let array = [];
        array.push('items', subItemIndex);
        return this.buildItemSubFormConsultMode(subItem, subItemIndex, pathArray.concat(array));
      }), Object.keys(this.context.sectionArchetype.sectionArchetype).filter(x => this.context.sectionArchetype.sectionArchetype[x].parentPath === pathArray.join('.')).map(x => {
        return /*#__PURE__*/React.createElement(AddSectionContainer, {
          key: x,
          path: x,
          order: this.context.order ? this.context.order[x] : null,
          label: this.context.sectionArchetype.sectionArchetype[x].sectionName
        });
      }));
    });

    _defineProperty(this, "buildItemSubFormEditMode", (item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, cardinalityObject, sectionNotMandatoryObject, sectionValidation) => {
      if (item.data_type === 'Title') {
        return this.buildSectionSubFormEditMode(item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, cardinalityObject, sectionNotMandatoryObject, sectionValidation);
      } else {
        if (Array.isArray(item)) {
          return item.map((itemAny, itemAnyIndex) => {
            let array = [];
            array.push(itemAnyIndex);
            return this.buildSingleItemSubFormEditMode(itemAny, itemAnyIndex, pathArray.concat(array), setFieldValue, values, errors, touched, setFieldTouched, true, cardinalityObject, sectionNotMandatoryObject, sectionValidation);
          });
        } else {
          return this.buildSingleItemSubFormEditMode(item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, false, cardinalityObject, sectionNotMandatoryObject, sectionValidation);
        }
      }
    });

    _defineProperty(this, "buildItemSubFormConsultMode", (item, itemIndex, pathArray) => {
      if (item.data_type === 'Title') {
        return this.buildSectionSubFormConsultMode(item, itemIndex, pathArray);
      } else {
        if (Array.isArray(item)) {
          return item.map((itemAny, itemAnyIndex) => {
            let array = [];
            array.push(itemAnyIndex);
            return this.buildSingleItemSubFormConsultMode(itemAny, itemAnyIndex, true, pathArray.concat(array));
          });
        } else {
          return this.buildSingleItemSubFormConsultMode(item, itemIndex, false, pathArray);
        }
      }
    });

    _defineProperty(this, "openSubForm", () => {
      return /*#__PURE__*/React.createElement(SubForm, {
        level: this.state.subForm.path.split('-').filter(x => x === 'items').length,
        template: this.state.template,
        professionalTasks: this.state.professionalTasks,
        editMode: this.props.editMode,
        path: this.state.subForm.path,
        onSubmitSubForm: values => this.handleSubmitSubForm(values, this.state.subForm.path, this.state.subForm.type, this.state.subForm.sectionId, this.state.subForm.setFieldValue),
        onCancel: () => this.handleCancelSubForm(),
        jdt: this.state.subForm.jdt
      });
    });

    this.initialValuesSubForm = {};
    this.validationSchemaSubForm = {};
    this.multipleSections = [];
  }

  componentDidMount() {
    if (this.props.editMode && !this.state.confirmEditMode) {
      this.setState(prevState => ({ ...prevState,
        confirmEditMode: !prevState.confirmEditMode
      }));
    }

    this.setState({
      template: this.props.template,
      professionalTasks: this.props.professionalTasks,
      level: this.props.level
    });
  }

  render() {
    let form = null;

    if (this.props.editMode) {
      form = /*#__PURE__*/React.createElement(Formik, {
        initialValues: this.initialValuesSubForm,
        validationSchema: Yup.object().shape(this.validationSchemaSubForm),
        onSubmit: values => this.handleSubmit(values),
        validateOnMount: true // REVER

      }, ({
        values,
        handleSubmit,
        setFieldValue,
        errors,
        touched,
        setFieldTouched,
        isSubmitting
      }) => /*#__PURE__*/React.createElement(SubFormContainerEditMode, {
        level: this.state.level,
        onCancel: this.props.onCancel,
        onHandleSubmit: () => this.setState(prevState => ({ // REVER
          ...prevState,
          checkValidation: !prevState.checkValidation
        }), handleSubmit),
        onDisabled: isSubmitting
      }, this.buildItemSubFormEditMode(this.props.jdt, this.props.path.split("-")[this.props.path.split("-").length - 1], this.props.path.split("-"), setFieldValue, values, errors, touched, setFieldTouched, {}, {}, {})));
    } else {
      form = /*#__PURE__*/React.createElement(SubFormContainerConsultMode, {
        level: this.state.level,
        onCancel: this.props.onCancel
      }, this.buildItemSubFormConsultMode(this.props.jdt, this.props.path.split("-")[this.props.path.split("-").length - 1], this.props.path.split("-")));
    }

    return /*#__PURE__*/React.createElement("div", null, this.state.subForm.openSubForm && this.openSubForm(), form);
  }

}

_defineProperty(SubFormComponent, "contextType", CombinedContext);

const SubForm = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(SubFormComponent, props));
};

export default SubForm;