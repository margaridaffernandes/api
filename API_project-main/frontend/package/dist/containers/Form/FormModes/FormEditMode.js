function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Formik } from "formik";
import ob from "object-path";
import React, { Component } from "react";
import * as Yup from "yup";
import { handleCardinality } from "../../../assets/functions/HandleCardinality/HandleCardinality";
import { handleSectionValidation } from "../../../assets/functions/HandleSectionValidation/handleSectionValidation";
import { processItemSection } from "../../../assets/functions/HandleSectionValidation/processItemSection";
import { maxValueArray } from "../../../assets/functions/Maximum/maxValueArray";
import SectionsListEditMode from "../../../components/SubForm/SectionsListEditMode";
import SubForm from "../../../components/SubForm/SubForm";
import AddSectionContainer from "../../../components/UI/AddSection/AddSectionContainer";
import AddSectionButton from "../../../components/UI/AddSectionButton/AddSectionButton";
import BodyContainer from "../../../components/UI/BodyContainer/BodyContainer";
import CancelButton from "../../../components/UI/CancelButton/CancelButton";
import FormContainer from "../../../components/UI/FormContainer/FormContainer";
import FormHeader from "../../../components/UI/FormHeader/FormHeader";
import SaveButton from "../../../components/UI/SaveButton/SaveButton";
import SectionContainer from "../../../components/UI/SectionContainer/SectionContainer";
import SubmitButton from "../../../components/UI/SubmitButton/SubmitButton";
import { buildSectionInitialValue } from "../FormInitialValues/BuildSectionInitialValue/BuildSectionInitialValue";
import { buildSectionValidation } from "../FormValidation/BuildSectionValidation/BuildSectionValidation";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";
import * as buildDatatypeEditMode from "../BuildItems/BuildItemEditMode/BuildItemEditMode/BuildItemEditMode";
import axios from "axios";
import { getEnvUrl } from "../../../environment";

class FormEditComponent extends Component {
  constructor() {
    super();

    _defineProperty(this, "state", {
      isCollapsed: false,
      checkValidation: false,
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
      this.accordionsSectionContainerEdit.forEach(obj => {
        const level = obj.id.split("-").filter(x => x === "items").length; // Colapsar apenas as secções do nível 1

        if (level === 1) {
          obj.accordionOpen = this.state.isCollapsed;
        }
      });
      this.forceUpdate();
    });

    _defineProperty(this, "handleAccordionSectionContainerMode", path => {
      this.accordionsSectionContainerEdit.forEach(function (obj) {
        if (obj.id === path) {
          let newMode = obj.accordionOpen;
          obj.accordionOpen = !newMode;
        }
      }); // Ver se o formulário está collapsed

      let breaked = false;

      for (let i = 0; i < this.accordionsSectionContainerEdit.length; i++) {
        const level = this.accordionsSectionContainerEdit[i].id.split("-").filter(x => x === "items").length; // Collapsar apenas as secções do nível 1

        if (level === 1) {
          if (this.accordionsSectionContainerEdit[i].accordionOpen) {
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

    _defineProperty(this, "handleAddSection", (pathArray, setFieldValue, setFieldTouched) => {
      const section = this.multipleSections.filter(obj => obj.path === pathArray.join("-"))[0];
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
      setFieldTouched(pathArray.join("-"));
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

    _defineProperty(this, "handleEditSectionValue", (sectionPath, id) => {
      const section = this.multipleSections.filter(obj => obj.path === sectionPath)[0];
      const sectionValues = section.values.filter(obj => obj.id === id)[0].values;
      let mergedJSON = JSON.parse(JSON.stringify(section.jdt));
      Object.keys(sectionValues).forEach(function (label) {
        const indexRemove = sectionPath.split("-").length;
        const jdtLabel = label.split(".").slice(indexRemove);
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

    _defineProperty(this, "buildSingleItemEditMode", (item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionNotMandatoryObject, sectionValidation) => {
      const itemSection = processItemSection(pathArray, isAny, sectionNotMandatoryObject);
      return buildDatatypeEditMode.buildItemEditMode(item.dataType, item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, this.initialValuesEdit, this.validationSchemaEdit, itemSection, this.multipleSections, this.props.professionalTasks, this.context.order, this.context.datatypes.datatypes[pathArray.join(".")], this.props.template.templateRules, this.props.idJDT, this.props.idComposition, this.props.userInfo);
    });

    _defineProperty(this, "buildInitialValueSection", (occurrences, pathLabel) => {
      buildSectionInitialValue(occurrences, pathLabel, this.initialValuesEdit);
    });

    _defineProperty(this, "buildValidationSection", (minOccurrences, pathLabel) => {
      buildSectionValidation(minOccurrences, pathLabel, this.validationSchemaEdit);
    });

    _defineProperty(this, "sectionConstructor", (item, pathArray, buildAccordion, cardinalityObject, sectionNotMandatoryObject, sectionValidation) => {
      let path = pathArray.join("-");

      if (buildAccordion && this.accordionsSectionContainerEdit.filter(obj => obj.id === path).length === 0) {
        let sections = this.accordionsSectionContainerEdit;
        sections.push({
          id: path,
          accordionOpen: true
        });
        this.accordionsSectionContainerEdit = sections;
      } // A cardinalidade só é processada se for um campo que não pode ser repetido => depois será validado no seu respetivo subForm


      if (item.occurrences.upperOccurrences === 1 && item.cardinality !== undefined && item.cardinality.interval.lowerOccurrences > 0) {
        cardinalityObject[path] = [...handleCardinality(item, pathArray, this.props.professionalTasks), item.node.text, item.cardinality.interval.lowerOccurrences];
      }

      sectionNotMandatoryObject[path] = [...handleSectionValidation(item, pathArray, this.props.professionalTasks), item.node.text, item.occurrences.lowerOccurrences]; // Só processo a validação da secção se for um campo que não pode ser repetido (depois será validado no seu respetivo subForm)
      // e se tiver upperOccurrences diferente de 0

      if (item.occurrences.lowerOccurrences !== 0 && item.occurrences.upperOccurrences === 1) {
        // Por defeito, queremos que pelo menos um campo esteja preenchido => logo tenho 1
        sectionValidation[path] = [...handleCardinality(item, pathArray, this.props.professionalTasks), item.node.text, 1];
      }
    });

    _defineProperty(this, "buildSectionEditMode", (item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, cardinalityObject, sectionNotMandatoryObject, sectionValidation, buildAccordion) => {
      const path = pathArray.join("-");
      const section = pathArray.filter(x => x === "items").length;

      if (item.occurrences.upperOccurrences !== 1) {
        if (this.multipleSections.filter(obj => obj.path === pathArray.join("-")).length === 0) {
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
            path: pathArray.join("-"),
            jdt: item,
            occurrences: occs,
            minOccurrences: item.occurrences.lowerOccurrences,
            values: vals
          });
          this.multipleSections = sections;
          this.buildInitialValueSection(occs, pathArray.join("-"));
          this.buildValidationSection(item.occurrences.lowerOccurrences, pathArray.join("-"));
        }

        return /*#__PURE__*/React.createElement(SectionContainer, {
          item: item,
          values: values,
          subForm: false,
          sectionConstructor: () => this.sectionConstructor(item, pathArray, buildAccordion, cardinalityObject, sectionNotMandatoryObject, sectionValidation),
          isTitleVisible: this.context.datatypes.showSectionTitle && Object.keys(this.context.datatypes.showSectionTitle).length > 0 ? this.context.datatypes.showSectionTitle[pathArray.join(".")] : true,
          idJDT: this.props.idJDT,
          templateRules: this.props.template.templateRules,
          isMandatory: item.occurrences.lowerOccurrences !== 0,
          order: this.context.order ? this.context.order[pathArray.join(".")] : null,
          hsize: this.context.sizes.sizes ? this.context.sizes.sizes[pathArray.join(".")] : null,
          handleAccordionMode: () => this.handleAccordionSectionContainerMode(path),
          path: item.itemPath,
          pathArray: pathArray,
          accordionOpen: this.accordionsSectionContainerEdit,
          description: item.node === null ? "" : item.node.description,
          key: itemIndex,
          label: item.node.text,
          professionalTasks: this.props.professionalTasks
        }, /*#__PURE__*/React.createElement(AddSectionButton, {
          error: touched[pathArray.join("-")] && errors[pathArray.join("-")],
          handleAddSection: () => this.handleAddSection(pathArray, setFieldValue, setFieldTouched),
          disabled: item.occurrences.upperOccurrences === "*" ? false : this.multipleSections.filter(obj => obj.path === pathArray.join("-"))[0].occurrences >= item.occurrences.upperOccurrences
        }), /*#__PURE__*/React.createElement(SectionsListEditMode, {
          error: touched[pathArray.join("-")] && errors[pathArray.join("-")],
          onEditSection: (sectionPath, id) => this.handleEditSectionValue(sectionPath, id),
          onRemoveSection: (sectionPath, id) => this.handleRemoveSectionValue(sectionPath, id, setFieldValue),
          sections: this.multipleSections.filter(obj => obj.path === pathArray.join("-"))[0]
        }));
      }

      return /*#__PURE__*/React.createElement(SectionContainer, {
        idJDT: this.props.idJDT,
        item: item,
        values: values,
        section: section,
        sectionConstructor: () => this.sectionConstructor(item, pathArray, buildAccordion, cardinalityObject, sectionNotMandatoryObject, sectionValidation),
        subForm: false,
        isTitleVisible: this.context.datatypes.showSectionTitle && Object.keys(this.context.datatypes.showSectionTitle).length > 0 ? this.context.datatypes.showSectionTitle[pathArray.join(".")] : true,
        isMandatory: item.occurrences.lowerOccurrences !== 0,
        templateRules: this.props.template.templateRules,
        order: this.context.order ? this.context.order[pathArray.join(".")] : null,
        hsize: this.context.sizes.sizes ? this.context.sizes.sizes[pathArray.join(".")] : null,
        cardinality: item.cardinality !== undefined && item.cardinality.interval.lowerOccurrences,
        handleAccordionMode: () => this.handleAccordionSectionContainerMode(path),
        path: item.itemPath,
        pathArray: pathArray,
        accordionOpen: this.accordionsSectionContainerEdit,
        description: item.node === null ? "" : item.node.description,
        key: itemIndex,
        label: item.node.text,
        professionalTasks: this.props.professionalTasks
      }, item.items.map((subItem, subItemIndex) => {
        let array = [];
        array.push("items", subItemIndex);
        return this.buildItemEditMode(subItem, subItemIndex, pathArray.concat(array), setFieldValue, values, errors, touched, setFieldTouched, cardinalityObject, true, sectionNotMandatoryObject, sectionValidation);
      }), this.props.formRM && this.props.formRM.length > 0 && this.props.formRM.flatMap((rm_item, rm_index) => {
        if (item.itemPath === rm_item.parentPath) {
          return this.buildItemEditMode(rm_item, rm_index, ["rm"].concat(rm_item.itemPath.split(".")), setFieldValue, values, errors, touched, setFieldTouched, cardinalityObject, true, sectionNotMandatoryObject, sectionValidation);
        } else {
          return [];
        }
      }), Object.keys(this.context.sectionArchetype.sectionArchetype).filter(x => this.context.sectionArchetype.sectionArchetype[x].parentPath === pathArray.join(".")).map(x => {
        return /*#__PURE__*/React.createElement(AddSectionContainer, {
          key: x,
          path: x,
          order: this.context.order ? this.context.order[x] : null,
          label: this.context.sectionArchetype.sectionArchetype[x].sectionName
        });
      }));
    });

    _defineProperty(this, "buildItemEditMode", (item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, cardinalityObject, buildAccordion, sectionNotMandatoryObject, sectionValidation) => {
      if (item.data_type === "Title") {
        return this.buildSectionEditMode(item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, cardinalityObject, sectionNotMandatoryObject, sectionValidation, buildAccordion);
      } else {
        if (Array.isArray(item)) {
          return item.map((itemAny, itemAnyIndex) => {
            let array = [];
            array.push(itemAnyIndex);
            return this.buildSingleItemEditMode(itemAny, itemAnyIndex, pathArray.concat(array), setFieldValue, values, errors, touched, setFieldTouched, true, cardinalityObject, sectionNotMandatoryObject, sectionValidation);
          });
        } else {
          return this.buildSingleItemEditMode(item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, false, cardinalityObject, sectionNotMandatoryObject, sectionValidation);
        }
      }
    });

    this.multipleSections = []; // controlar as secções que podem ser multiplicadas

    this.accordionsSectionContainerEdit = []; // controlar o accordionMode

    this.initialValuesEdit = {}; // initialValues do formulário

    this.validationSchemaEdit = {}; // validationSchema do formulário
  }

  render() {
    const form = /*#__PURE__*/React.createElement(Formik, {
      initialValues: this.initialValuesEdit,
      validationSchema: this.props.buttonClickType !== "save" && Yup.object().shape(this.validationSchemaEdit),
      validateOnMount: this.props.buttonClickType !== "save" && true,
      onSubmit: async values => {
        let valuesToSend = { ...values
        }; // ver se existem ficheiros multimedia carregados
        // em caso afirmativo, chamar o serviço do Eng. Bruno para cada entrada do array - sem o ID da composition nem do ficheiro

        let files = this.props.multimediaFields; // array de objetos c/ o path + o file em base 64

        let count1 = 0; // criar um array de objetos c/ os paths e os índices a remover no fim do processo

        let indexFiles = [];

        if (files.length > 0) {
          for (let file of files) {
            let count2 = 0;
            let path = Object.keys(file)[0].concat(".value").split(".").join("-");
            let pathValue = values[path];

            for (let f of pathValue) {
              if (count1 === count2) {
                let res = await axios({
                  method: "post",
                  url: `${getEnvUrl('aidaauth', '4000')}/saveMultimedia`,
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + this.context.token
                  },
                  data: {
                    file: file,
                    formTitle: this.props.formTitle,
                    patientData: this.props.patientData,
                    userInfo: this.props.userInfo,
                    values: values,
                    estado: "1"
                  }
                }); // DEVIDO À FIREWALL FOI NECESSÁRIO MIGRAR AS CHAMADAS PARA UM SERVIÇO FORA DA APP
                // let uri = await saveMultimediaFiles(file, this.props.formTitle, this.props.patientData, this.props.userInfo, values);

                if (res.data.success) {
                  let uri = res.data.fileData;
                  f['URI'] = uri;
                } //caso dê erro remover a info do ficheiro e remover o ficheiro
                else {
                    let obj = {};
                    obj[path] = count2;
                    indexFiles.push(obj);
                  }
              }

              count2 += 1;
            }

            count1 += 1;
            valuesToSend = { ...values,
              pathValue
            };
          } //no fim de fazer todas as chamadas ao serviço, caso existam índices a remover


          indexFiles.length > 0 && indexFiles.forEach(item => {
            let pathOfFileToRemove = Object.keys(item)[0];
            let pathValueOfFileToRemove = valuesToSend[pathOfFileToRemove];
            pathValueOfFileToRemove.splice(item[pathOfFileToRemove], 1);
          });
        }

        this.props.handleSubmit(valuesToSend, this.multipleSections);
      }
    }, ({
      values,
      handleSubmit,
      setFieldValue,
      errors,
      touched,
      setFieldTouched
    }) => /*#__PURE__*/React.createElement(FormContainer, {
      formTitle: this.props.formTitle,
      description: this.props.template.node.description
    }, /*#__PURE__*/React.createElement(FormHeader, {
      accordions: this.accordionsSectionContainerEdit,
      collapseSections: () => this.handleCollapseSections(),
      isCollapsed: this.state.isCollapsed,
      showPrint: this.props.showPrint,
      showInformacaoComplementar: this.props.showInformacaoComplementar,
      showHeader: this.props.showHeader,
      professionalTasks: this.props.professionalTasks,
      template: this.props.template,
      fields: this.context.formData.referenceModel
    }), /*#__PURE__*/React.createElement(BodyContainer, null, this.props.template.items.map((attribute, index) => {
      return attribute.map((att, attIndex) => {
        let array = [];
        array.push("items", index, attIndex);
        return this.buildItemEditMode(att, attIndex, array, setFieldValue, values, errors, touched, setFieldTouched, {}, true, {}, {});
      });
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        order: this.context.order ? maxValueArray(Object.values(this.context.order)) + 1 : null
      },
      className: "flex flex-row"
    }, this.props.canSave && /*#__PURE__*/React.createElement(SaveButton, {
      canSubmit: this.props.canSubmit,
      label: "Gravar",
      disabled: this.props.saveButtonDisabled === true,
      clicked: () => {
        this.props.handleButtonClicked("save");
        this.setState(prevState => ({ ...prevState,
          checkValidation: !prevState.checkValidation
        }), () => {
          //this.props.handleButtonClicked("save");
          handleSubmit();
        });
      }
    }), this.props.canSubmit && /*#__PURE__*/React.createElement(SubmitButton, {
      label: "Submeter",
      disabled: this.props.submitButtonDisabled === true ? true : !this.context.dlm.isDlmFinished,
      clicked: () => this.setState(prevState => ({ ...prevState,
        checkValidation: !prevState.checkValidation
      }), () => {
        this.props.handleButtonClicked("submit");
        handleSubmit();
      })
    }), this.props.canCancel && /*#__PURE__*/React.createElement(CancelButton, {
      clicked: this.props.handleCancelForm
    }))));
    return /*#__PURE__*/React.createElement("div", null, this.state.subForm.openSubForm && /*#__PURE__*/React.createElement(SubForm, {
      level: this.state.subForm.path.split("-").filter(x => x === "items").length,
      template: this.props.template,
      professionalTasks: this.props.professionalTasks,
      idJDT: this.props.idJDT,
      templateRules: this.props.template.templateRules,
      editMode: true,
      path: this.state.subForm.path,
      onSubmitSubForm: values => this.handleSubmitSubForm(values, this.state.subForm.path, this.state.subForm.type, this.state.subForm.sectionId, this.state.subForm.setFieldValue),
      onCancel: () => this.handleCancelSubForm(),
      jdt: this.state.subForm.jdt
    }), form);
  }

}

_defineProperty(FormEditComponent, "contextType", CombinedContext);

const FormEditMode = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(FormEditComponent, props));
};

export default FormEditMode;