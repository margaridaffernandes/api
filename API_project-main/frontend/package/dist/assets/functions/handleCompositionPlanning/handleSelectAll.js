const handleSelectAll = (context, jsonTitle) => {
  if (context.composition.compositionPlanning[context.composition.openCompositionPlanningPath] && context.composition.compositionPlanning[context.composition.openCompositionPlanningPath][jsonTitle] && context.composition.compositionPlanning[context.composition.openCompositionPlanningPath][jsonTitle].indexOf("All") > -1) {
    context.composition.handleCompositionPlanning(context.composition.openCompositionPlanningPath, jsonTitle, []);
  } else {
    context.composition.handleCompositionPlanning(context.composition.openCompositionPlanningPath, jsonTitle, ["All"]);
  }
};

export { handleSelectAll };