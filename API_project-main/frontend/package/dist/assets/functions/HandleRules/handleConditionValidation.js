const handleInOperator = (condition, value) => {
  const array = condition.map(x => {
    return x.toString();
  });
  let isTrue = false;

  if (array.indexOf(value) > -1) {
    isTrue = true;
  }

  return isTrue;
};

const handleNotInOperator = (condition, value) => {
  const array = condition.map(x => {
    return x.toString();
  });
  let isTrue = false;

  if (array.indexOf(value) === -1) {
    isTrue = true;
  }

  return isTrue;
};

const handleBetweenOperator = (condition, value) => {
  let isTrue = false;

  if (value === "") {
    return false;
  }

  if (!isNaN(Number(value)) && !isNaN(Number(condition[0])) && !isNaN(Number(condition[1]))) {
    if (Number(value) > Number(condition[0]) && Number(value) < Number(condition[1])) {
      isTrue = true;
    }
  }

  return isTrue;
};

const handleNotBetweenOperator = (condition, value) => {
  let isTrue = false;

  if (value === "") {
    return false;
  }

  if (!isNaN(Number(value)) && !isNaN(Number(condition[0])) && !isNaN(Number(condition[1]))) {
    if (Number(value) < Number(condition[0]) || Number(value) > Number(condition[1])) {
      isTrue = true;
    }
  }

  return isTrue;
};

const handleGtOperator = (condition, value) => {
  let isTrue = false;

  if (!isNaN(Number(value)) && !isNaN(Number(condition))) {
    if (Number(value) > Number(condition)) {
      isTrue = true;
    }
  }

  return isTrue;
};

const handleGteOperator = (condition, value) => {
  let isTrue = false;

  if (!isNaN(Number(value)) && !isNaN(Number(condition))) {
    if (Number(value) >= Number(condition)) {
      isTrue = true;
    }
  }

  return isTrue;
};

const handleLtOperator = (condition, value) => {
  let isTrue = false;

  if (value === "") {
    return false;
  }

  if (!isNaN(Number(value)) && !isNaN(Number(condition))) {
    if (Number(value) < Number(condition)) {
      isTrue = true;
    }
  }

  return isTrue;
};

const handleLteOperator = (condition, value) => {
  let isTrue = false;

  if (value === "") {
    return false;
  }

  if (!isNaN(Number(value)) && !isNaN(Number(condition))) {
    if (Number(value) <= Number(condition)) {
      isTrue = true;
    }
  }

  return isTrue;
};

const handleNeOperator = (condition, value) => {
  let isTrue = false;

  if (!isNaN(Number(value)) && !isNaN(Number(condition))) {
    if (Number(value) !== Number(condition)) {
      isTrue = true;
    }
  } else if (value !== condition) {
    isTrue = true;
  }

  return isTrue;
};

const handleEqOperator = (condition, value) => {
  let isTrue = false;

  if (!isNaN(Number(value)) && !isNaN(Number(condition))) {
    if (Number(value) === Number(condition)) {
      isTrue = true;
    }
  } else if (value === condition) {
    isTrue = true;
  }

  return isTrue;
};

const handleConditionValidation = (condition, value) => {
  let conditionValidation;

  if (condition["$in"]) {
    conditionValidation = operatorsFunctions["$in"](condition["$in"], value);
  } else if (condition["$gt"]) {
    conditionValidation = operatorsFunctions["$gt"](condition["$gt"], value);
  } else if (condition["$gte"]) {
    conditionValidation = operatorsFunctions["$gte"](condition["$gte"], value);
  } else if (condition["$lt"]) {
    conditionValidation = operatorsFunctions["$lt"](condition["$lt"], value);
  } else if (condition["$lte"]) {
    conditionValidation = operatorsFunctions["$lte"](condition["$lte"], value);
  } else if (condition["$ne"]) {
    conditionValidation = operatorsFunctions["$ne"](condition["$ne"], value);
  } else if (condition["$eq"]) {
    conditionValidation = operatorsFunctions["$eq"](condition["$eq"], value);
  } else if (condition["$notIn"]) {
    conditionValidation = operatorsFunctions["$notIn"](condition["$notIn"], value);
  } else if (condition["$notBetween"]) {
    conditionValidation = operatorsFunctions["$notBetween"](condition["$notBetween"], value);
  } else if (condition["$between"]) {
    conditionValidation = operatorsFunctions["$between"](condition["$between"], value);
  }

  return conditionValidation;
};

const operatorsFunctions = {
  $in: handleInOperator,
  $gt: handleGtOperator,
  $gte: handleGteOperator,
  $lt: handleLtOperator,
  $lte: handleLteOperator,
  $ne: handleNeOperator,
  $eq: handleEqOperator,
  $notIn: handleNotInOperator,
  $between: handleBetweenOperator,
  $notBetween: handleNotBetweenOperator
};
export { handleConditionValidation };