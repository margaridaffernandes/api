const getDLMConditions = (item, templateRules) => {
  let conditions = [];
  templateRules !== undefined && templateRules.forEach(rule => {
    rule[0].eventFact.forEach(e => {
      if (e === item.itemPath) {
        rule[0].inputVariables.length > 0 && rule[0].inputVariables.forEach(input => {
          let inputPathLabel = `${input.split(".").join("-")}-value`;
          conditions.indexOf(inputPathLabel) === -1 && conditions.push(inputPathLabel);
        });
      }
    });
  });
  return conditions;
};

export { getDLMConditions };