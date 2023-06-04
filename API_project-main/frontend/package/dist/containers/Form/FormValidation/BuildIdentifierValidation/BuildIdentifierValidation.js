import * as Yup from "yup";
import { handleIfMandatoryValidation } from "../../../../assets/functions/HandleRules/handleIfMandatoryValidation";
import { handleConditionValidation } from "../../../../assets/functions/HandleRules/handleConditionValidation";
import { handleRules } from "../../../../assets/functions/HandleRules/handleRules";
import { handleRequiredValidation } from "../../../../assets/functions/HandleSectionValidation/handleRequiredValidation";
import { handleRequiredSection } from "../../../../assets/functions/HandleSectionValidation/handleRequiredSection";
import { validatePhoneNumber } from "../../../../assets/functions/ValidatePhoneNumber/validatePhoneNumber"; // ATENÇÃO: CADA NOVA VALIDAÇÃO DEVE VER SE O CAMPO É VISÍVEL!

const buildIdentifierValidation = (item, pathLabel, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections) => {
  const checkMandatory = handleIfMandatoryValidation(item);

  if (item.occurrences.upperOccurrences === 1) {
    if (item.occurrences.lowerOccurrences === 1 && item.occurrences.upperOccurrences === 1) {
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
      }).test("isPhoneNumber", "O contacto está inválido: deve ter 9 dígitos", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        if (item.isPhoneNumber === true) {
          if (value === undefined || value === "") {
            return true;
          } else {
            if (validatePhoneNumber(value) === false) {
              return false;
            }

            return true;
          }
        } else {
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
      });
    } else if (item.occurrences.lowerOccurrences === 0 && item.occurrences.upperOccurrences === 1) {
      validationSchema[pathLabel] = Yup.string().test("section-validation", function (value) {
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
      }).test("isPhoneNumber", "O contacto está inválido: deve ter 9 dígitos", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        if (item.isPhoneNumber === true) {
          if (value === undefined || value === "") {
            return true;
          } else {
            if (validatePhoneNumber(value) === false) {
              return false;
            }

            return true;
          }
        } else {
          return true;
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
  } else {
    if (item.occurrences.lowerOccurrences === 0) {
      if (item.occurrences.upperOccurrences === "*") {
        validationSchema[pathLabel] = Yup.array().test("section-validation", function (value) {
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
      } else {
        validationSchema[pathLabel] = Yup.array().test("max-length", function (value) {
          const isVisible = handleRules(item, this.parent, "visibility");

          if (!isVisible) {
            return true;
          }

          let writtenFields = 0;
          value.forEach(function (obj) {
            if (obj.value !== "") {
              writtenFields += 1;
            }
          });

          if (writtenFields > item.occurrences.upperOccurrences) {
            return this.createError({
              message: "Campo inválido: limite máximo de " + item.occurrences.upperOccurrences + " itens"
            });
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
      }
    } else if (item.occurrences.lowerOccurrences >= 1) {
      if (item.occurrences.upperOccurrences === "*") {
        validationSchema[pathLabel] = Yup.array().test(pathLabel, "Campo obrigatório", function (value) {
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
        }).test("min-length", function (value) {
          const isVisible = handleRules(item, this.parent, "visibility");

          if (!isVisible) {
            return true;
          }

          let writtenFields = 0;
          value.forEach(function (obj) {
            if (obj.value !== "") {
              writtenFields += 1;
            }
          });

          if (writtenFields >= 1) {
            if (writtenFields < item.occurrences.lowerOccurrences) {
              if (item.occurrences.lowerOccurrences === 1) {
                return this.createError({
                  message: "Campo inválido: limite mínimo de " + item.occurrences.lowerOccurrences + " item"
                });
              } else {
                return this.createError({
                  message: "Campo inválido: limite mínimo de " + item.occurrences.lowerOccurrences + " itens"
                });
              }
            }
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
      } else {
        validationSchema[pathLabel] = Yup.array().test(pathLabel, "Campo obrigatório", function (value) {
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
        }).test("min-length", function (value) {
          const isVisible = handleRules(item, this.parent, "visibility");

          if (!isVisible) {
            return true;
          }

          let writtenFields = 0;
          value.forEach(function (obj) {
            if (obj.value !== "") {
              writtenFields += 1;
            }
          });

          if (writtenFields >= 1) {
            if (writtenFields < item.occurrences.lowerOccurrences) {
              if (item.occurrences.lowerOccurrences === 1) {
                return this.createError({
                  message: "Campo inválido: limite mínimo de " + item.occurrences.lowerOccurrences + " item"
                });
              } else {
                return this.createError({
                  message: "Campo inválido: limite mínimo de " + item.occurrences.lowerOccurrences + " itens"
                });
              }
            }
          }

          return true;
        }).test("max-length", function (value) {
          const isVisible = handleRules(item, this.parent, "visibility");

          if (!isVisible) {
            return true;
          }

          let writtenFields = 0;
          value.forEach(function (obj) {
            if (obj.value !== "") {
              writtenFields += 1;
            }
          });

          if (writtenFields >= 1) {
            if (writtenFields > item.occurrences.upperOccurrences) {
              return this.createError({
                message: "Campo inválido: limite máximo de " + item.occurrences.upperOccurrences + " itens"
              });
            }
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
      }
    }
  }
};

export { buildIdentifierValidation };