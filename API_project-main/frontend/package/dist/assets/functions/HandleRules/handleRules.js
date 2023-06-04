import { handleConditionValidation } from "./handleConditionValidation"; // quando aparecer uma condição verdadeira, parar o ciclo e mandar isTrue = true

const handleOrOperator = (conditionsArray, values) => {
  let i;
  let isTrue = false;

  for (i = 0; i < conditionsArray.length; i++) {
    const condition = conditionsArray[i];
    const path = condition["$ItemPath"].split(".").join("-");
    const value = values[path];
    const conditionValidation = handleConditionValidation(condition, value);

    if (conditionValidation) {
      isTrue = true;
      break;
    }
  }

  return isTrue;
}; // quando aparecer uma condição false, parar o ciclo e mandar isTrue = false


const handleAndOperator = (conditionsArray, values) => {
  let i;
  let isTrue = true;

  for (i = 0; i < conditionsArray.length; i++) {
    const condition = conditionsArray[i];
    const path = condition["$ItemPath"].split(".").join("-");
    const value = values[path];
    const conditionValidation = handleConditionValidation(condition, value);

    if (!conditionValidation) {
      isTrue = false;
      break;
    }
  }

  return isTrue;
};

const handleRuleValidation = (rule, values) => {
  let isTrue;

  if (rule["$or"]) {
    isTrue = handleOrOperator(rule["$or"], values);
  } else if (rule["$and"]) {
    isTrue = handleAndOperator(rule["$and"], values);
  }

  return isTrue;
};

const handleRules = (item, values, ruleType) => {
  let isTrue;

  if (ruleType === "visibility") {
    if (Array.isArray(item.ruleVisibility)) {
      if (item.ruleVisibility.length !== 0) {
        let i;
        let breakOccurred = false;

        for (i = 0; i < item.ruleVisibility.length; i++) {
          const rule = item.ruleVisibility[i];
          let visibility = handleRuleValidation(rule, values);

          if (!visibility) {
            // se uma das regras falhar, então acaba o ciclo e o item não pode estar visível
            breakOccurred = true;
            break;
          }
        }

        if (breakOccurred) {
          isTrue = false;
        } else {
          isTrue = true;
        }
      } else {
        isTrue = true;
      }
    } else {
      isTrue = true;
    }
  } else if (ruleType === "mandatory") {
    if (Array.isArray(item.ruleMandatory)) {
      if (item.ruleMandatory.length !== 0) {
        let i;
        let breakOccurred = false;

        for (i = 0; i < item.ruleMandatory.length; i++) {
          const rule = item.ruleMandatory[i];
          let mandatory = handleRuleValidation(rule, values);

          if (!mandatory) {
            // se uma das regras falhar, então acaba o ciclo e o item não é obrigatório
            breakOccurred = true;
            break;
          }
        }

        if (breakOccurred) {
          isTrue = false;
        } else {
          isTrue = true;
        }
      } else {
        isTrue = false;
      }
    } else {
      isTrue = false;
    }
  }

  return isTrue;
};

export { handleRules };