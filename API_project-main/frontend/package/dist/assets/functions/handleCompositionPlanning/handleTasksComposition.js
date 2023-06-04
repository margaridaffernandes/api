const handleTasksComposition = (context, jsonTitle, list) => {
  let value = [];
  let breaked = false;

  if (context.composition.compositionPlanning[context.composition.openCompositionPlanningPath] && context.composition.compositionPlanning[context.composition.openCompositionPlanningPath][jsonTitle] && context.composition.compositionPlanning[context.composition.openCompositionPlanningPath][jsonTitle].indexOf("All") > -1) {
    value = [...list];
    breaked = true;
  } else if (!breaked && context.composition.compositionPlanning[context.composition.openCompositionPlanningPath] && context.composition.compositionPlanning[context.composition.openCompositionPlanningPath][jsonTitle]) {
    value = [...new Set([...context.composition.compositionPlanning[context.composition.openCompositionPlanningPath][jsonTitle], ...list])];
    breaked = true;
  } else {
    value = [...list];
    breaked = true;
  }

  context.composition.handleCompositionPlanning(context.composition.openCompositionPlanningPath, jsonTitle, value);
};

export { handleTasksComposition };