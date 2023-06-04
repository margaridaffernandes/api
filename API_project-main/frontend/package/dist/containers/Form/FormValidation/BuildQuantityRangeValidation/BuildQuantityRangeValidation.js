import * as Yup from "yup";
import { handleIfMandatoryValidation } from "../../../../assets/functions/HandleRules/handleIfMandatoryValidation";
import { handleConditionValidation } from "../../../../assets/functions/HandleRules/handleConditionValidation";
import { handleRules } from "../../../../assets/functions/HandleRules/handleRules";
import { handleRequiredValidation } from "../../../../assets/functions/HandleSectionValidation/handleRequiredValidation";
import { handleRequiredSection } from "../../../../assets/functions/HandleSectionValidation/handleRequiredSection"; // ATENÇÃO: CADA NOVA VALIDAÇÃO DEVE VER SE O CAMPO É VISÍVEL!

const buildQuantityRangeValidation = (item, pathLabel, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections) => {
  const checkMandatory = handleIfMandatoryValidation(item);
  let pathLabelArray = pathLabel.split("-");
  let pathArray = [...pathLabelArray];
  pathArray.pop();

  if (item.occurrences.lowerOccurrences === 1 && item.occurrences.upperOccurrences === 1) {
    if (pathLabelArray[pathLabelArray.length - 1] === "end") {
      pathArray.push("start");
      let pathLabelStart = pathArray.join("-");
      validationSchema[pathLabel] = Yup.number().typeError("Campo inválido: deve ser um número ou utilize o ponto como separador das decimais").test("required", "Campo obrigatório", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        const passedRequired = handleRequiredValidation(value, this.parent, itemSection);

        if (passedRequired) {
          return true;
        } else {
          return false;
        }
      }).test(pathLabel + "superiorigual", "O valor máximo deve ser superior ou igual ao valor mínimo", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        let startValue = this.parent[pathLabelStart];

        if (value < startValue) {
          return false;
        }

        return true;
      }).test("section-validation", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        const res = handleRequiredSection(sectionValidation, pathLabel, this.parent, multipleSections);

        if (res === true) {
          return true;
        } else {
          const sectionsError = res;

          if (sectionsError.length > 1) {
            return this.createError({
              message: "Precisa de preencher mais campos nas secções: " + sectionsError.toString().toLocaleLowerCase()
            });
          } else if (sectionsError.length === 1) {
            return this.createError({
              message: "Precisa de preencher mais campos na secção " + sectionsError.toString().toLocaleLowerCase()
            });
          }
        }
      }).test("at-least-one", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        const res = handleRequiredSection(cardinalityObject, pathLabel, this.parent, multipleSections);

        if (res === true) {
          return true;
        } else {
          const sectionsError = res;

          if (sectionsError.length > 1) {
            return this.createError({
              message: "Precisa de preencher mais campos nas secções: " + sectionsError.toString().toLocaleLowerCase()
            });
          } else if (sectionsError.length === 1) {
            return this.createError({
              message: "Precisa de preencher mais campos na secção " + sectionsError.toString().toLocaleLowerCase()
            });
          }
        }
      });
    } else if (pathLabelArray[pathLabelArray.length - 1] === "start") {
      pathArray.push("end");
      let pathLabelEnd = pathArray.join("-");
      validationSchema[pathLabel] = Yup.number().typeError("Campo inválido: deve ser um número ou utilize o ponto como separador das decimais").test("required", "Campo obrigatório", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        const passedRequired = handleRequiredValidation(value, this.parent, itemSection);

        if (passedRequired) {
          return true;
        } else {
          return false;
        }
      }).test(pathLabel + "inferiorigual", "O valor mínimo deve ser inferior ou igual ao valor máximo", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        let endValue = this.parent[pathLabelEnd];

        if (value > endValue) {
          return false;
        }

        return true;
      }).test("section-validation", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        const res = handleRequiredSection(sectionValidation, pathLabel, this.parent, multipleSections);

        if (res === true) {
          return true;
        } else {
          const sectionsError = res;

          if (sectionsError.length > 1) {
            return this.createError({
              message: "Precisa de preencher mais campos nas secções: " + sectionsError.toString().toLocaleLowerCase()
            });
          } else if (sectionsError.length === 1) {
            return this.createError({
              message: "Precisa de preencher mais campos na secção " + sectionsError.toString().toLocaleLowerCase()
            });
          }
        }
      }).test("at-least-one", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        const res = handleRequiredSection(cardinalityObject, pathLabel, this.parent, multipleSections);

        if (res === true) {
          return true;
        } else {
          const sectionsError = res;

          if (sectionsError.length > 1) {
            return this.createError({
              message: "Precisa de preencher mais campos nas secções: " + sectionsError.toString().toLocaleLowerCase()
            });
          } else if (sectionsError.length === 1) {
            return this.createError({
              message: "Precisa de preencher mais campos na secção " + sectionsError.toString().toLocaleLowerCase()
            });
          }
        }
      });
    } else if (pathLabelArray[pathLabelArray.length - 1] === "unit") {
      validationSchema[pathLabel] = Yup.string().test("required", "Campo obrigatório", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        const passedRequired = handleRequiredValidation(value, this.parent, itemSection);

        if (passedRequired) {
          return true;
        } else {
          return false;
        }
      }).test("section-validation", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        const res = handleRequiredSection(sectionValidation, pathLabel, this.parent, multipleSections);

        if (res === true) {
          return true;
        } else {
          const sectionsError = res;

          if (sectionsError.length > 1) {
            return this.createError({
              message: "Precisa de preencher mais campos nas secções: " + sectionsError.toString().toLocaleLowerCase()
            });
          } else if (sectionsError.length === 1) {
            return this.createError({
              message: "Precisa de preencher mais campos na secção " + sectionsError.toString().toLocaleLowerCase()
            });
          }
        }
      }).test("at-least-one", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        const res = handleRequiredSection(cardinalityObject, pathLabel, this.parent, multipleSections);

        if (res === true) {
          return true;
        } else {
          const sectionsError = res;

          if (sectionsError.length > 1) {
            return this.createError({
              message: "Precisa de preencher mais campos nas secções: " + sectionsError.toString().toLocaleLowerCase()
            });
          } else if (sectionsError.length === 1) {
            return this.createError({
              message: "Precisa de preencher mais campos na secção " + sectionsError.toString().toLocaleLowerCase()
            });
          }
        }
      });
    }
  } else if (item.occurrences.lowerOccurrences === 0 && item.occurrences.upperOccurrences === 1) {
    if (pathLabelArray[pathLabelArray.length - 1] === "end") {
      let arrayUnit = [...pathArray];
      arrayUnit.pop();
      let pathLabelUnit = [...arrayUnit, "unit"].join("-");
      let pathLabelStart = [...pathArray, "start"].join("-");
      validationSchema[pathLabel] = Yup.number().typeError("Campo inválido: deve ser um número ou utilize o ponto como separador das decimais").test(pathLabel, "Campo obrigatório", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        let start = this.parent[pathLabelStart];
        let unit = this.parent[pathLabelUnit];

        if (start === undefined && value === undefined && unit === undefined || start !== undefined && value !== undefined && unit !== undefined) {
          return true;
        } else if (value !== undefined) {
          return true;
        } else if ((start !== undefined || unit !== undefined) && value === undefined) {
          return false;
        }
      }).test(pathLabel + "superiorigual", "O valor máximo deve ser superior ou igual ao valor mínimo", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        let startValue = this.parent[pathLabelStart];

        if (value < startValue) {
          return false;
        }

        return true;
      }).test("section-validation", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        const res = handleRequiredSection(sectionValidation, pathLabel, this.parent, multipleSections);

        if (res === true) {
          return true;
        } else {
          const sectionsError = res;

          if (sectionsError.length > 1) {
            return this.createError({
              message: "Precisa de preencher mais campos nas secções: " + sectionsError.toString().toLocaleLowerCase()
            });
          } else if (sectionsError.length === 1) {
            return this.createError({
              message: "Precisa de preencher mais campos na secção " + sectionsError.toString().toLocaleLowerCase()
            });
          }
        }
      }).test("at-least-one", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        const res = handleRequiredSection(cardinalityObject, pathLabel, this.parent, multipleSections);

        if (res === true) {
          return true;
        } else {
          const sectionsError = res;

          if (sectionsError.length > 1) {
            return this.createError({
              message: "Precisa de preencher mais campos nas secções: " + sectionsError.toString().toLocaleLowerCase()
            });
          } else if (sectionsError.length === 1) {
            return this.createError({
              message: "Precisa de preencher mais campos na secção " + sectionsError.toString().toLocaleLowerCase()
            });
          }
        }
      }).test("rule-mandatory", "Campo obrigatório", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        if (!checkMandatory) {
          return true;
        } else {
          let i;

          for (i = 0; i < item.ruleMandatory.length; i++) {
            const rule = item.ruleMandatory[i];
            let mandatory;

            if (rule["$or"]) {
              mandatory = false;
              let j;
              const conditionsArray = rule["$or"];

              for (j = 0; j < conditionsArray.length; j++) {
                const condition = conditionsArray[j];
                const path = condition["$ItemPath"].split(".").join("-");
                const conditionValidation = handleConditionValidation(condition, this.parent[path]);

                if (conditionValidation) {
                  mandatory = true;
                  break;
                }
              }
            } else if (rule["$and"]) {
              mandatory = true;
              let j;
              const conditionsArray = rule["$and"];

              for (j = 0; j < conditionsArray.length; j++) {
                const condition = conditionsArray[j];
                const path = condition["$ItemPath"].split(".").join("-");
                const conditionValidation = handleConditionValidation(condition, this.parent[path]);

                if (!conditionValidation) {
                  mandatory = false;
                  break;
                }
              }
            }

            if (!mandatory) {
              return true;
            } else {
              if (value === "" || value === undefined) {
                return false;
              } else if (Array.isArray(value)) {
                if (value.length === 0) {
                  return false;
                } else if (value[0].identifierId !== undefined && value.filter(obj => obj.value !== "").length === 0) {
                  return false;
                } else if (value[0].textId !== undefined && value.filter(obj => obj.value.getCurrentContent().hasText()).length === 0) {
                  return false;
                } else {
                  return true;
                }
              } else if (value._immutable !== undefined) {
                if (!value.getCurrentContent().hasText()) {
                  return false;
                } else {
                  return true;
                }
              } else {
                return true;
              }
            }
          }
        }
      });
    } else if (pathLabelArray[pathLabelArray.length - 1] === "start") {
      let arrayUnit = [...pathArray];
      arrayUnit.pop();
      let pathLabelUnit = [...arrayUnit, "unit"].join("-");
      let pathLabelEnd = [...pathArray, "end"].join("-");
      validationSchema[pathLabel] = Yup.number().typeError("Campo inválido: deve ser um número ou utilize o ponto como separador das decimais").test(pathLabel, "Campo obrigatório", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        let end = this.parent[pathLabelEnd];
        let unit = this.parent[pathLabelUnit];

        if (end === undefined && value === undefined && unit === undefined || end !== undefined && value !== undefined && unit !== undefined) {
          return true;
        } else if (value !== undefined) {
          return true;
        } else if ((end !== undefined || unit !== undefined) && value === undefined) {
          return false;
        }
      }).test(pathLabel + "inferiorigual", "O valor mínimo deve ser inferior ou igual ao valor máximo", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        let endValue = this.parent[pathLabelEnd];

        if (value > endValue) {
          return false;
        }

        return true;
      }).test("section-validation", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        const res = handleRequiredSection(sectionValidation, pathLabel, this.parent, multipleSections);

        if (res === true) {
          return true;
        } else {
          const sectionsError = res;

          if (sectionsError.length > 1) {
            return this.createError({
              message: "Precisa de preencher mais campos nas secções: " + sectionsError.toString().toLocaleLowerCase()
            });
          } else if (sectionsError.length === 1) {
            return this.createError({
              message: "Precisa de preencher mais campos na secção " + sectionsError.toString().toLocaleLowerCase()
            });
          }
        }
      }).test("at-least-one", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        const res = handleRequiredSection(cardinalityObject, pathLabel, this.parent, multipleSections);

        if (res === true) {
          return true;
        } else {
          const sectionsError = res;

          if (sectionsError.length > 1) {
            return this.createError({
              message: "Precisa de preencher mais campos nas secções: " + sectionsError.toString().toLocaleLowerCase()
            });
          } else if (sectionsError.length === 1) {
            return this.createError({
              message: "Precisa de preencher mais campos na secção " + sectionsError.toString().toLocaleLowerCase()
            });
          }
        }
      }).test("rule-mandatory", "Campo obrigatório", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        if (!checkMandatory) {
          return true;
        } else {
          let i;

          for (i = 0; i < item.ruleMandatory.length; i++) {
            const rule = item.ruleMandatory[i];
            let mandatory;

            if (rule["$or"]) {
              mandatory = false;
              let j;
              const conditionsArray = rule["$or"];

              for (j = 0; j < conditionsArray.length; j++) {
                const condition = conditionsArray[j];
                const path = condition["$ItemPath"].split(".").join("-");
                const conditionValidation = handleConditionValidation(condition, this.parent[path]);

                if (conditionValidation) {
                  mandatory = true;
                  break;
                }
              }
            } else if (rule["$and"]) {
              mandatory = true;
              let j;
              const conditionsArray = rule["$and"];

              for (j = 0; j < conditionsArray.length; j++) {
                const condition = conditionsArray[j];
                const path = condition["$ItemPath"].split(".").join("-");
                const conditionValidation = handleConditionValidation(condition, this.parent[path]);

                if (!conditionValidation) {
                  mandatory = false;
                  break;
                }
              }
            }

            if (!mandatory) {
              return true;
            } else {
              if (value === "" || value === undefined) {
                return false;
              } else if (Array.isArray(value)) {
                if (value.length === 0) {
                  return false;
                } else if (value[0].identifierId !== undefined && value.filter(obj => obj.value !== "").length === 0) {
                  return false;
                } else if (value[0].textId !== undefined && value.filter(obj => obj.value.getCurrentContent().hasText()).length === 0) {
                  return false;
                } else {
                  return true;
                }
              } else if (value._immutable !== undefined) {
                if (!value.getCurrentContent().hasText()) {
                  return false;
                } else {
                  return true;
                }
              } else {
                return true;
              }
            }
          }
        }
      });
    } else if (pathLabelArray[pathLabelArray.length - 1] === "unit") {
      let pathLabelStart = [...pathArray, "value", "start"].join("-");
      let pathLabelEnd = [...pathArray, "value", "end"].join("-");
      validationSchema[pathLabel] = Yup.string().test(pathLabel, "Campo obrigatório", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        let end = this.parent[pathLabelEnd];
        let start = this.parent[pathLabelStart];

        if (end === undefined && value === undefined && start === undefined || end !== undefined && value !== undefined && start !== undefined) {
          return true;
        } else if (value !== undefined) {
          return true;
        } else if ((end !== undefined || start !== undefined) && value === undefined) {
          return false;
        }
      }).test("rule-mandatory", "Campo obrigatório", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        if (!checkMandatory) {
          return true;
        } else {
          let i;

          for (i = 0; i < item.ruleMandatory.length; i++) {
            const rule = item.ruleMandatory[i];
            let mandatory;

            if (rule["$or"]) {
              mandatory = false;
              let j;
              const conditionsArray = rule["$or"];

              for (j = 0; j < conditionsArray.length; j++) {
                const condition = conditionsArray[j];
                const path = condition["$ItemPath"].split(".").join("-");
                const conditionValidation = handleConditionValidation(condition, this.parent[path]);

                if (conditionValidation) {
                  mandatory = true;
                  break;
                }
              }
            } else if (rule["$and"]) {
              mandatory = true;
              let j;
              const conditionsArray = rule["$and"];

              for (j = 0; j < conditionsArray.length; j++) {
                const condition = conditionsArray[j];
                const path = condition["$ItemPath"].split(".").join("-");
                const conditionValidation = handleConditionValidation(condition, this.parent[path]);

                if (!conditionValidation) {
                  mandatory = false;
                  break;
                }
              }
            }

            if (!mandatory) {
              return true;
            } else {
              if (value === "" || value === undefined) {
                return false;
              } else if (Array.isArray(value)) {
                if (value.length === 0) {
                  return false;
                } else if (value[0].identifierId !== undefined && value.filter(obj => obj.value !== "").length === 0) {
                  return false;
                } else if (value[0].textId !== undefined && value.filter(obj => obj.value.getCurrentContent().hasText()).length === 0) {
                  return false;
                } else {
                  return true;
                }
              } else if (value._immutable !== undefined) {
                if (!value.getCurrentContent().hasText()) {
                  return false;
                } else {
                  return true;
                }
              } else {
                return true;
              }
            }
          }
        }
      }).test("section-validation", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        const res = handleRequiredSection(sectionValidation, pathLabel, this.parent, multipleSections);

        if (res === true) {
          return true;
        } else {
          const sectionsError = res;

          if (sectionsError.length > 1) {
            return this.createError({
              message: "Precisa de preencher mais campos nas secções: " + sectionsError.toString().toLocaleLowerCase()
            });
          } else if (sectionsError.length === 1) {
            return this.createError({
              message: "Precisa de preencher mais campos na secção " + sectionsError.toString().toLocaleLowerCase()
            });
          }
        }
      }).test("at-least-one", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        const res = handleRequiredSection(cardinalityObject, pathLabel, this.parent, multipleSections);

        if (res === true) {
          return true;
        } else {
          const sectionsError = res;

          if (sectionsError.length > 1) {
            return this.createError({
              message: "Precisa de preencher mais campos nas secções: " + sectionsError.toString().toLocaleLowerCase()
            });
          } else if (sectionsError.length === 1) {
            return this.createError({
              message: "Precisa de preencher mais campos na secção " + sectionsError.toString().toLocaleLowerCase()
            });
          }
        }
      });
    }
  }
};

export { buildQuantityRangeValidation };