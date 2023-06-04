const handleRemoveItem = (context, jsonTitle, item, type) => {
  let value = [];

  if (jsonTitle === "InternalFunctions") {
    if (type === "Preenchimento automático de campos") {
      let currentValue = context.composition.compositionPlanning[context.composition.openCompositionPlanningPath][jsonTitle].filter(obj => obj.type === type)[0];
      let newDependentFields = Object.keys(currentValue.affectedFields).filter(x => x !== item.path).map(y => {
        return currentValue.affectedFields[y];
      });

      if (newDependentFields.length > 0) {
        let newObj = {};
        newDependentFields.forEach(y => {
          newObj[y.path] = { ...y
          };
        });
        currentValue.affectedFields = { ...newObj
        };
        value = [...context.composition.compositionPlanning[context.composition.openCompositionPlanningPath][jsonTitle].filter(obj => obj.type !== type), currentValue];
      } else {
        value = [...context.composition.compositionPlanning[context.composition.openCompositionPlanningPath][jsonTitle].filter(obj => obj.type !== type)];
      }
    }
  } else {
    value = context.composition.compositionPlanning[context.composition.openCompositionPlanningPath][jsonTitle].filter(x => x !== item);
  }

  context.composition.handleCompositionPlanning(context.composition.openCompositionPlanningPath, jsonTitle, value);
};

export { handleRemoveItem };