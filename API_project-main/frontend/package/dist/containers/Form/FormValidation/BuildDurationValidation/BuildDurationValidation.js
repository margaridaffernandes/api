import * as Yup from "yup";
import { handleIfMandatoryValidation } from "../../../../assets/functions/HandleRules/handleIfMandatoryValidation";
import { handleConditionValidation } from "../../../../assets/functions/HandleRules/handleConditionValidation";
import { handleRules } from "../../../../assets/functions/HandleRules/handleRules";
import { handleRequiredValidation } from "../../../../assets/functions/HandleSectionValidation/handleRequiredValidation";
import { handleRequiredSection } from "../../../../assets/functions/HandleSectionValidation/handleRequiredSection"; // ATENÇÃO: CADA NOVA VALIDAÇÃO DEVE VER SE O CAMPO É VISÍVEL!

const buildDurationValidation = (item, pathLabel, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections) => {
  const checkMandatory = handleIfMandatoryValidation(item);
  let pathLabelArray = pathLabel.split("-");

  if (item.occurrences.lowerOccurrences === 1 && item.occurrences.upperOccurrences === 1) {
    if (pathLabelArray[pathLabelArray.length - 1] === "unit") {
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
    } else if (pathLabelArray[pathLabelArray.length - 1] === "value") {
      if (item.units.range) {
        if (item.units.range.lowerIncluded === "true" && item.units.range.upperIncluded === "false" && !item.units.range.upper && item.units.range.lower) {
          validationSchema[pathLabel] = Yup.number().typeError("Campo inválido: deve ser um número ou utilize o ponto como separador das decimais").test("is-integer", "Campo inválido: deve ser um número inteiro", function (value) {
            const isVisible = handleRules(item, this.parent, "visibility");

            if (!isVisible) {
              return true;
            }

            if (value === undefined || value === "") {
              return true;
            }

            if (!isNaN(Number(value)) && value === parseInt(value, 10)) {
              return true;
            } else {
              return false;
            }
          }).test("min-number", function (value) {
            const isVisible = handleRules(item, this.parent, "visibility");

            if (!isVisible) {
              return true;
            }

            if (value === undefined || value === "") {
              return true;
            }

            if (!isNaN(Number(value)) && value >= item.units.range.lower) {
              return true;
            } else {
              return this.createError({
                message: "Campo inválido: deve ser um número superior ou igual a " + item.units.range.lower
              });
            }
          }).test("required", "Campo obrigatório", function (value) {
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
        } else if (item.units.range.lowerIncluded === "false" && item.units.range.upperIncluded === "true" && item.units.range.upper && !item.units.range.lower) {
          validationSchema[pathLabel] = Yup.number().typeError("Campo inválido: deve ser um número ou utilize o ponto como separador das decimais").test("is-integer", "Campo inválido: deve ser um número inteiro", function (value) {
            const isVisible = handleRules(item, this.parent, "visibility");

            if (!isVisible) {
              return true;
            }

            if (value === undefined || value === "") {
              return true;
            }

            if (!isNaN(Number(value)) && value === parseInt(value, 10)) {
              return true;
            } else {
              return false;
            }
          }).test("max-number", function (value) {
            const isVisible = handleRules(item, this.parent, "visibility");

            if (!isVisible) {
              return true;
            }

            if (value === undefined || value === "") {
              return true;
            }

            if (!isNaN(Number(value)) && value <= item.units.range.upper) {
              return true;
            } else {
              return this.createError({
                message: "Campo inválido: deve ser um número inferior ou igual a " + item.units.range.upper
              });
            }
          }).test("required", "Campo obrigatório", function (value) {
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
        } else if (item.units.range.lowerIncluded === "true" && item.units.range.upperIncluded === "true" && item.units.range.upper && item.units.range.lower) {
          validationSchema[pathLabel] = Yup.number().typeError("Campo inválido: deve ser um número ou utilize o ponto como separador das decimais").test("is-integer", "Campo inválido: deve ser um número inteiro", function (value) {
            const isVisible = handleRules(item, this.parent, "visibility");

            if (!isVisible) {
              return true;
            }

            if (value === undefined || value === "") {
              return true;
            }

            if (!isNaN(Number(value)) && value === parseInt(value, 10)) {
              return true;
            } else {
              return false;
            }
          }).test("max-number", function (value) {
            const isVisible = handleRules(item, this.parent, "visibility");

            if (!isVisible) {
              return true;
            }

            if (value === undefined || value === "") {
              return true;
            }

            if (!isNaN(Number(value)) && value <= item.units.range.upper) {
              return true;
            } else {
              return this.createError({
                message: "Campo inválido: deve ser um número inferior ou igual a " + item.units.range.upper
              });
            }
          }).test("min-number", function (value) {
            const isVisible = handleRules(item, this.parent, "visibility");

            if (!isVisible) {
              return true;
            }

            if (value === undefined || value === "") {
              return true;
            }

            if (!isNaN(Number(value)) && value >= item.units.range.lower) {
              return true;
            } else {
              return this.createError({
                message: "Campo inválido: deve ser um número superior ou igual a " + item.units.range.lower
              });
            }
          }).test("required", "Campo obrigatório", function (value) {
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
        } else if (item.units.range.lowerIncluded === "false" && item.units.range.upperIncluded === "false" && item.units.range.upper && item.units.range.lower) {
          validationSchema[pathLabel] = Yup.number().typeError("Campo inválido: deve ser um número ou utilize o ponto como separador das decimais").test("is-integer", "Campo inválido: deve ser um número inteiro", function (value) {
            const isVisible = handleRules(item, this.parent, "visibility");

            if (!isVisible) {
              return true;
            }

            if (value === undefined || value === "") {
              return true;
            }

            if (!isNaN(Number(value)) && value === parseInt(value, 10)) {
              return true;
            } else {
              return false;
            }
          }).test("less-than", function (value) {
            const isVisible = handleRules(item, this.parent, "visibility");

            if (!isVisible) {
              return true;
            }

            if (value === undefined || value === "") {
              return true;
            }

            if (!isNaN(Number(value)) && value < item.units.range.upper) {
              return true;
            } else {
              return this.createError({
                message: "Campo inválido: deve ser um número inferior a " + item.units.range.upper
              });
            }
          }).test("more-than", function (value) {
            const isVisible = handleRules(item, this.parent, "visibility");

            if (!isVisible) {
              return true;
            }

            if (value === undefined || value === "") {
              return true;
            }

            if (!isNaN(Number(value)) && value > item.units.range.lower) {
              return true;
            } else {
              return this.createError({
                message: "Campo inválido: deve ser um número superior a " + item.units.range.lower
              });
            }
          }).test("required", "Campo obrigatório", function (value) {
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
      } else if (!item.units.range) {
        // não tem range
        validationSchema[pathLabel] = Yup.number().typeError("Campo inválido: deve ser um número ou utilize o ponto como separador das decimais").test("is-integer", "Campo inválido: deve ser um número inteiro", function (value) {
          const isVisible = handleRules(item, this.parent, "visibility");

          if (!isVisible) {
            return true;
          }

          if (value === undefined || value === "") {
            return true;
          }

          if (!isNaN(Number(value)) && value === parseInt(value, 10)) {
            return true;
          } else {
            return false;
          }
        }).test("required", "Campo obrigatório", function (value) {
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
    }
  } else if (item.occurrences.lowerOccurrences === 0 && item.occurrences.upperOccurrences === 1) {
    let pathArray = [...pathLabelArray];
    pathArray.pop();

    if (pathLabelArray[pathLabelArray.length - 1] === "unit") {
      pathArray.push("value");
      let pathLabelDuration = pathArray.join("-");
      validationSchema[pathLabel] = Yup.string().test(pathLabel, "Campo obrigatório", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        let field = this.parent[pathLabelDuration];

        if (field === undefined && value === undefined || field !== undefined && value !== undefined) {
          return true;
        } else if (field !== undefined && value === undefined) {
          return false;
        } else if (field === undefined && value !== undefined) {
          return true;
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
    } else if (pathLabelArray[pathLabelArray.length - 1] === "value") {
      pathArray.push("unit");
      let pathLabelUnit = pathArray.join("-");

      if (item.units.range) {
        if (item.units.range.lowerIncluded === "true" && item.units.range.upperIncluded === "false" && !item.units.range.upper && item.units.range.lower) {
          validationSchema[pathLabel] = Yup.number().typeError("Campo inválido: deve ser um número ou utilize o ponto como separador das decimais").test("is-integer", "Campo inválido: deve ser um número inteiro", function (value) {
            const isVisible = handleRules(item, this.parent, "visibility");

            if (!isVisible) {
              return true;
            }

            if (value === undefined || value === "") {
              return true;
            }

            if (!isNaN(Number(value)) && value === parseInt(value, 10)) {
              return true;
            } else {
              return false;
            }
          }).test("min-number", function (value) {
            const isVisible = handleRules(item, this.parent, "visibility");

            if (!isVisible) {
              return true;
            }

            if (value === undefined || value === "") {
              return true;
            }

            if (!isNaN(Number(value)) && value >= item.units.range.lower) {
              return true;
            } else {
              return this.createError({
                message: "Campo inválido: deve ser um número superior ou igual a " + item.units.range.lower
              });
            }
          }).test(pathLabel, "Campo obrigatório", function (value) {
            const isVisible = handleRules(item, this.parent, "visibility");

            if (!isVisible) {
              return true;
            }

            let field = this.parent[pathLabelUnit];

            if (field === undefined && value === undefined || field !== undefined && value !== undefined) {
              return true;
            } else if (field !== undefined && value === undefined) {
              return false;
            } else if (field === undefined && value !== undefined) {
              return true;
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
        } else if (item.units.range.lowerIncluded === "false" && item.units.range.upperIncluded === "false" && item.units.range.upper && item.units.range.lower) {
          validationSchema[pathLabel] = Yup.number().typeError("Campo inválido: deve ser um número ou utilize o ponto como separador das decimais").test("is-integer", "Campo inválido: deve ser um número inteiro", function (value) {
            const isVisible = handleRules(item, this.parent, "visibility");

            if (!isVisible) {
              return true;
            }

            if (value === undefined || value === "") {
              return true;
            }

            if (!isNaN(Number(value)) && value === parseInt(value, 10)) {
              return true;
            } else {
              return false;
            }
          }).test("less-than", function (value) {
            const isVisible = handleRules(item, this.parent, "visibility");

            if (!isVisible) {
              return true;
            }

            if (value === undefined || value === "") {
              return true;
            }

            if (!isNaN(Number(value)) && value < item.units.range.upper) {
              return true;
            } else {
              return this.createError({
                message: "Campo inválido: deve ser um número inferior a " + item.units.range.upper
              });
            }
          }).test("more-than", function (value) {
            const isVisible = handleRules(item, this.parent, "visibility");

            if (!isVisible) {
              return true;
            }

            if (value === undefined || value === "") {
              return true;
            }

            if (!isNaN(Number(value)) && value > item.units.range.lower) {
              return true;
            } else {
              return this.createError({
                message: "Campo inválido: deve ser um número superior a " + item.units.range.lower
              });
            }
          }).test(pathLabel, "Campo obrigatório", function (value) {
            const isVisible = handleRules(item, this.parent, "visibility");

            if (!isVisible) {
              return true;
            }

            let field = this.parent[pathLabelUnit];

            if (field === undefined && value === undefined || field !== undefined && value !== undefined) {
              return true;
            } else if (field !== undefined && value === undefined) {
              return false;
            } else if (field === undefined && value !== undefined) {
              return true;
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
        } else if (item.units.range.lowerIncluded === "false" && item.units.range.upperIncluded === "true" && item.units.range.upper && !item.units.range.lower) {
          validationSchema[pathLabel] = Yup.number().typeError("Campo inválido: deve ser um número ou utilize o ponto como separador das decimais").test("is-integer", "Campo inválido: deve ser um número inteiro", function (value) {
            const isVisible = handleRules(item, this.parent, "visibility");

            if (!isVisible) {
              return true;
            }

            if (value === undefined || value === "") {
              return true;
            }

            if (!isNaN(Number(value)) && value === parseInt(value, 10)) {
              return true;
            } else {
              return false;
            }
          }).test("max-number", function (value) {
            const isVisible = handleRules(item, this.parent, "visibility");

            if (!isVisible) {
              return true;
            }

            if (value === undefined || value === "") {
              return true;
            }

            if (!isNaN(Number(value)) && value <= item.units.range.upper) {
              return true;
            } else {
              return this.createError({
                message: "Campo inválido: deve ser um número inferior ou igual a " + item.units.range.upper
              });
            }
          }).test(pathLabel, "Campo obrigatório", function (value) {
            const isVisible = handleRules(item, this.parent, "visibility");

            if (!isVisible) {
              return true;
            }

            let field = this.parent[pathLabelUnit];

            if (field === undefined && value === undefined || field !== undefined && value !== undefined) {
              return true;
            } else if (field !== undefined && value === undefined) {
              return false;
            } else if (field === undefined && value !== undefined) {
              return true;
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
        } else if (item.units.range.lowerIncluded === "true" && item.units.range.upperIncluded === "true" && item.units.range.upper && item.units.range.lower) {
          validationSchema[pathLabel] = Yup.number().typeError("Campo inválido: deve ser um número ou utilize o ponto como separador das decimais").test("is-integer", "Campo inválido: deve ser um número inteiro", function (value) {
            const isVisible = handleRules(item, this.parent, "visibility");

            if (!isVisible) {
              return true;
            }

            if (value === undefined || value === "") {
              return true;
            }

            if (!isNaN(Number(value)) && value === parseInt(value, 10)) {
              return true;
            } else {
              return false;
            }
          }).test("max-number", function (value) {
            const isVisible = handleRules(item, this.parent, "visibility");

            if (!isVisible) {
              return true;
            }

            if (value === undefined || value === "") {
              return true;
            }

            if (!isNaN(Number(value)) && value <= item.units.range.upper) {
              return true;
            } else {
              return this.createError({
                message: "Campo inválido: deve ser um número inferior ou igual a " + item.units.range.upper
              });
            }
          }).test("min-number", function (value) {
            const isVisible = handleRules(item, this.parent, "visibility");

            if (!isVisible) {
              return true;
            }

            if (value === undefined || value === "") {
              return true;
            }

            if (!isNaN(Number(value)) && value >= item.units.range.lower) {
              return true;
            } else {
              return this.createError({
                message: "Campo inválido: deve ser um número superior ou igual a " + item.units.range.lower
              });
            }
          }).test(pathLabel, "Campo obrigatório", function (value) {
            const isVisible = handleRules(item, this.parent, "visibility");

            if (!isVisible) {
              return true;
            }

            let field = this.parent[pathLabelUnit];

            if (field === undefined && value === undefined || field !== undefined && value !== undefined) {
              return true;
            } else if (field !== undefined && value === undefined) {
              return false;
            } else if (field === undefined && value !== undefined) {
              return true;
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
        }
      } else if (!item.units.range) {
        //não tem range
        validationSchema[pathLabel] = Yup.number().typeError("Campo inválido: deve ser um número ou utilize o ponto como separador das decimais").test("is-integer", "Campo inválido: deve ser um número inteiro", function (value) {
          const isVisible = handleRules(item, this.parent, "visibility");

          if (!isVisible) {
            return true;
          }

          if (value === undefined || value === "") {
            return true;
          }

          if (!isNaN(Number(value)) && value === parseInt(value, 10)) {
            return true;
          } else {
            return false;
          }
        }).test(pathLabel, "Campo obrigatório", function (value) {
          const isVisible = handleRules(item, this.parent, "visibility");

          if (!isVisible) {
            return true;
          }

          let field = this.parent[pathLabelUnit];

          if (field === undefined && value === undefined || field !== undefined && value !== undefined) {
            return true;
          } else if (field !== undefined && value === undefined) {
            return false;
          } else if (field === undefined && value !== undefined) {
            return true;
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
      }
    }
  }
};

export { buildDurationValidation };