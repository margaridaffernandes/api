const buildDLMRules = (item, templateRules) => {
  let DLMRules = [];
  templateRules !== undefined && templateRules.forEach(rule => {
    rule[0].eventFact.forEach(e => {
      if (e === item) {
        DLMRules.push(rule[0].ruleID);
      }
    });
  });
  return DLMRules;
};

export { buildDLMRules };