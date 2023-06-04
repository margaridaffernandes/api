const handleCompositionPlanning = (e, context, path, datatype) => {
  context.composition.handleOpenCompositionPlanning(path, datatype);
  e.stopPropagation();
};

export { handleCompositionPlanning };