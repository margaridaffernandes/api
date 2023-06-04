import * as Yup from "yup";
import { handleIfMandatoryValidation } from "../../../../assets/functions/HandleRules/handleIfMandatoryValidation";
import { handleConditionValidation } from "../../../../assets/functions/HandleRules/handleConditionValidation";
import { handleRules } from "../../../../assets/functions/HandleRules/handleRules";
import { handleRequiredValidation } from "../../../../assets/functions/HandleSectionValidation/handleRequiredValidation";
import { handleRequiredSection } from "../../../../assets/functions/HandleSectionValidation/handleRequiredSection"; // ATENÇÃO: CADA NOVA VALIDAÇÃO DEVE VER SE O CAMPO É VISÍVEL!

const buildDateTimeRangeValidation = (item, pathLabel, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections) => {
  const checkMandatory = handleIfMandatoryValidation(item);
  let pathLabelArray = pathLabel.split("-");
  let pathArray = [...pathLabelArray];
  pathArray.pop();
  pathArray.pop();

  if (item.occurrences.lowerOccurrences === 1 && item.occurrences.upperOccurrences === 1) {
    if (pathLabelArray[pathLabelArray.length - 1] === "start" && pathLabelArray[pathLabelArray.length - 2] === "date") {
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
    } else if (pathLabelArray[pathLabelArray.length - 1] === "end" && pathLabelArray[pathLabelArray.length - 2] === "date") {
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
    } else if (pathLabelArray[pathLabelArray.length - 1] === "start" && pathLabelArray[pathLabelArray.length - 2] === "time") {
      let pathTimeEnd = [...pathArray, "time", "end"];
      let pathDateEnd = [...pathArray, "date", "end"];
      let pathDateStart = [...pathArray, "date", "start"];
      let pathLabelTimeEnd = pathTimeEnd.join("-");
      let pathLabelDateEnd = pathDateEnd.join("-");
      let pathLabelDateStart = pathDateStart.join("-");
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
      }).test(pathLabel + "inferiorigual", "A hora inicial deve ser inferior ou igual à hora final", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        let endDate = this.parent[pathLabelDateEnd];
        let startDate = this.parent[pathLabelDateStart];
        let endTime;
        let startTime;

        if (endDate !== undefined && startDate !== undefined && endDate === startDate) {
          if (this.parent[pathLabelTimeEnd] !== undefined) {
            endTime = new Date(endDate.split("-")[0], endDate.split("-")[1], endDate.split("-")[2], this.parent[pathLabelTimeEnd].split(":")[0], this.parent[pathLabelTimeEnd].split(":")[1]);
          } else {
            endTime = new Date(endDate.split("-")[0], endDate.split("-")[1], endDate.split("-")[2]);
          }

          if (value !== undefined) {
            startTime = new Date(startDate.split("-")[0], startDate.split("-")[1], startDate.split("-")[2], value.split(":")[0], value.split(":")[1]);
          } else {
            startTime = new Date(startDate.split("-")[0], startDate.split("-")[1], startDate.split("-")[2]);
          }

          if (endTime < startTime) {
            return false;
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
    } else if (pathLabelArray[pathLabelArray.length - 1] === "end" && pathLabelArray[pathLabelArray.length - 2] === "time") {
      let pathTimeStart = [...pathArray, "time", "start"];
      let pathDateEnd = [...pathArray, "date", "end"];
      let pathDateStart = [...pathArray, "date", "start"];
      let pathLabelTimeStart = pathTimeStart.join("-");
      let pathLabelDateEnd = pathDateEnd.join("-");
      let pathLabelDateStart = pathDateStart.join("-");
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
      }).test(pathLabel + "superiorigual", "A hora final deve ser superior ou igual à hora inicial", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        let endDate = this.parent[pathLabelDateEnd];
        let startDate = this.parent[pathLabelDateStart];
        let endTime;
        let startTime;

        if (endDate !== undefined && startDate !== undefined && endDate === startDate) {
          if (value !== undefined) {
            endTime = new Date(endDate.split("-")[0], endDate.split("-")[1], endDate.split("-")[2], value.split(":")[0], value.split(":")[1]);
          } else {
            endTime = new Date(endDate.split("-")[0], endDate.split("-")[1], endDate.split("-")[2]);
          }

          if (this.parent[pathLabelTimeStart] !== undefined) {
            startTime = new Date(startDate.split("-")[0], startDate.split("-")[1], startDate.split("-")[2], this.parent[pathLabelTimeStart].split(":")[0], this.parent[pathLabelTimeStart].split(":")[1]);
          } else {
            startTime = new Date(startDate.split("-")[0], startDate.split("-")[1], startDate.split("-")[2]);
          }

          if (endTime < startTime) {
            return false;
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
  } else if (item.occurrences.lowerOccurrences === 0 && item.occurrences.upperOccurrences === 1) {
    if (pathLabelArray[pathLabelArray.length - 1] === "start" && pathLabelArray[pathLabelArray.length - 2] === "date") {
      let pathTimeEnd = [...pathArray, "time", "end"];
      let pathDateEnd = [...pathArray, "date", "end"];
      let pathTimeStart = [...pathArray, "time", "start"];
      let pathLabelTimeEnd = pathTimeEnd.join("-");
      let pathLabelDateEnd = pathDateEnd.join("-");
      let pathLabelTimeStart = pathTimeStart.join("-");
      validationSchema[pathLabel] = Yup.string().test(pathLabel, "Campo obrigatório", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        let endDate = this.parent[pathLabelDateEnd];
        let endTime = this.parent[pathLabelTimeEnd];
        let startTime = this.parent[pathLabelTimeStart];

        if ((endTime !== undefined || startTime !== undefined || endDate !== undefined) && value === undefined) {
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
    } else if (pathLabelArray[pathLabelArray.length - 1] === "end" && pathLabelArray[pathLabelArray.length - 2] === "date") {
      let pathTimeEnd = [...pathArray, "time", "end"];
      let pathDateStart = [...pathArray, "date", "start"];
      let pathTimeStart = [...pathArray, "time", "start"];
      let pathLabelTimeEnd = pathTimeEnd.join("-");
      let pathLabelDateStart = pathDateStart.join("-");
      let pathLabelTimeStart = pathTimeStart.join("-");
      validationSchema[pathLabel] = Yup.string().test(pathLabel + "superiorigual", "Campo obrigatório", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        let startDate = this.parent[pathLabelDateStart];
        let endTime = this.parent[pathLabelTimeEnd];
        let startTime = this.parent[pathLabelTimeStart];

        if ((endTime !== undefined || startTime !== undefined || startDate !== undefined) && value === undefined) {
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
    } else if (pathLabelArray[pathLabelArray.length - 1] === "start" && pathLabelArray[pathLabelArray.length - 2] === "time") {
      let pathTimeEnd = [...pathArray, "time", "end"];
      let pathDateEnd = [...pathArray, "date", "end"];
      let pathDateStart = [...pathArray, "date", "start"];
      let pathLabelTimeEnd = pathTimeEnd.join("-");
      let pathLabelDateEnd = pathDateEnd.join("-");
      let pathLabelDateStart = pathDateStart.join("-");
      validationSchema[pathLabel] = Yup.string().test(pathLabel + "inferiorigual", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        let endDate = this.parent[pathLabelDateEnd];
        let startDate = this.parent[pathLabelDateStart];
        let endTime;
        let startTime;

        if (endDate !== undefined && startDate !== undefined && endDate === startDate) {
          if (this.parent[pathLabelTimeEnd] !== undefined) {
            endTime = new Date(endDate.split("-")[0], endDate.split("-")[1], endDate.split("-")[2], this.parent[pathLabelTimeEnd].split(":")[0], this.parent[pathLabelTimeEnd].split(":")[1]);
          } else {
            endTime = new Date(endDate.split("-")[0], endDate.split("-")[1], endDate.split("-")[2]);
          }

          if (value !== undefined) {
            startTime = new Date(startDate.split("-")[0], startDate.split("-")[1], startDate.split("-")[2], value.split(":")[0], value.split(":")[1]);
          } else {
            startTime = new Date(startDate.split("-")[0], startDate.split("-")[1], startDate.split("-")[2]);
          }

          if (endTime < startTime) {
            return this.createError({
              message: "A hora inicial deve ser inferior ou igual à hora final"
            });
          } else if (isNaN(startTime.getTime())) {
            return this.createError({
              message: "Campo obrigatório"
            });
          } else if (!isNaN(endTime.getTime()) && isNaN(startTime.getTime())) {
            return this.createError({
              message: "Campo obrigatório"
            });
          }

          return true;
        } else {
          if (this.parent[pathLabelTimeEnd] !== undefined) {
            endTime = new Date(2000, 1, 1, this.parent[pathLabelTimeEnd].split(":")[0], this.parent[pathLabelTimeEnd].split(":")[1]);
          } else {
            endTime = new Date(2000, 1, 1);
          }

          if (value !== undefined) {
            startTime = new Date(2000, 1, 1, value.split(":")[0], value.split(":")[1]);
          } else {
            startTime = new Date(2000, 1, 1);
          }

          if (!isNaN(endTime.getTime()) && isNaN(startTime.getTime())) {
            return this.createError({
              message: "Campo obrigatório"
            });
          } else if ((startDate !== undefined || endDate !== undefined || !isNaN(endTime.getTime())) && isNaN(startTime.getTime())) {
            return this.createError({
              message: "Campo obrigatório"
            });
          }

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
    } else if (pathLabelArray[pathLabelArray.length - 1] === "end" && pathLabelArray[pathLabelArray.length - 2] === "time") {
      let pathTimeStart = [...pathArray, "time", "start"];
      let pathDateEnd = [...pathArray, "date", "end"];
      let pathDateStart = [...pathArray, "date", "start"];
      let pathLabelTimeStart = pathTimeStart.join("-");
      let pathLabelDateEnd = pathDateEnd.join("-");
      let pathLabelDateStart = pathDateStart.join("-");
      validationSchema[pathLabel] = Yup.string().test(pathLabel + "superiorigual", function (value) {
        const isVisible = handleRules(item, this.parent, "visibility");

        if (!isVisible) {
          return true;
        }

        let endDate = this.parent[pathLabelDateEnd];
        let startDate = this.parent[pathLabelDateStart];
        let endTime;
        let startTime;

        if (endDate !== undefined && startDate !== undefined && endDate === startDate) {
          if (value !== undefined) {
            endTime = new Date(endDate.split("-")[0], endDate.split("-")[1], endDate.split("-")[2], value.split(":")[0], value.split(":")[1]);
          } else {
            endTime = new Date(endDate.split("-")[0], endDate.split("-")[1], endDate.split("-")[2]);
          }

          if (this.parent[pathLabelTimeStart] !== undefined) {
            startTime = new Date(startDate.split("-")[0], startDate.split("-")[1], startDate.split("-")[2], this.parent[pathLabelTimeStart].split(":")[0], this.parent[pathLabelTimeStart].split(":")[1]);
          } else {
            startTime = new Date(startDate.split("-")[0], startDate.split("-")[1], startDate.split("-")[2]);
          }

          if (endTime < startTime) {
            return this.createError({
              message: "A hora final deve ser superior ou igual à hora inicial"
            });
          } else if (isNaN(endTime.getTime())) {
            return this.createError({
              message: "Campo obrigatório"
            });
          } else if (isNaN(endTime.getTime()) && !isNaN(startTime.getTime())) {
            return this.createError({
              message: "Campo obrigatório"
            });
          }

          return true;
        } else {
          if (value !== undefined) {
            endTime = new Date(2000, 1, 1, value.split(":")[0], value.split(":")[1]);
          } else {
            endTime = new Date(2000, 1, 1);
          }

          if (this.parent[pathLabelTimeStart] !== undefined) {
            startTime = new Date(2000, 1, 1, this.parent[pathLabelTimeStart].split(":")[0], this.parent[pathLabelTimeStart].split(":")[1]);
          } else {
            startTime = new Date(2000, 1, 1);
          }

          if (isNaN(endTime.getTime()) && !isNaN(startTime.getTime())) {
            return this.createError({
              message: "Campo obrigatório"
            });
          } else if ((startDate !== undefined || endDate !== undefined || !isNaN(startTime.getTime())) && isNaN(endTime.getTime())) {
            return this.createError({
              message: "Campo obrigatório"
            });
          }

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
};

export { buildDateTimeRangeValidation };