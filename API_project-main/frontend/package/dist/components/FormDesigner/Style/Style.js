const style = (planningOpened, isDragging, isOver, canDrop, isItem, isAny = false, showLabel = true, orderObj = {}, path = "", draggedItem = {}) => {
  let style;

  if (isAny === true) {
    const arrayPath = path.split(".");
    const anyArray = [];
    arrayPath.pop();
    Object.keys(orderObj).forEach(p => {
      if (p.indexOf(arrayPath.join(".") + ".") > -1) {
        anyArray.push(p);
      }
    });
    const isAnyMemberDragged = draggedItem !== null ? anyArray.indexOf(draggedItem.path) > -1 ? true : false : false;
    style = {
      opacity: isAnyMemberDragged ? 0.5 : 1,
      borderWidth: planningOpened === true ? "0.9px" : "0.5px",
      borderStyle: planningOpened === true ? "dashed" : "dotted",
      marginTop: "0.1rem",
      // !showLabel ? "" : "0.25rem",
      padding: "6px",
      boxShadow: isOver && !isDragging ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)" : "",
      borderColor: isOver && !isDragging && canDrop ? "#d1f8dd" : isOver && !isDragging && !canDrop ? "#fedfdf" : "#e2e8f0",
      backgroundColor: isOver && !isDragging && canDrop ? "#e3fbea" : isOver && !isDragging && !canDrop ? "#ffebeb" : "transparent"
    };
  } else {
    style = {
      opacity: isDragging ? 0.5 : 1,
      borderWidth: isOver && !isDragging ? "0.5px" : planningOpened === true ? "0.9px" : isItem ? "0.5px" : "0px",
      borderStyle: isOver && !isDragging ? "dotted" : planningOpened === true ? "dashed" : isItem ? "dotted" : "",
      boxShadow: isOver && !isDragging ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)" : "",
      marginTop: "0.4rem",
      padding: "6px",
      borderColor: isOver && !isDragging && canDrop ? "#d1f8dd" : isOver && !isDragging && !canDrop ? "#fedfdf" : isItem ? "#e2e8f0" : "transparent",
      backgroundColor: isOver && !isDragging && canDrop ? "#e3fbea" : isOver && !isDragging && !canDrop ? "#ffebeb" : "transparent"
    };
  }

  return style;
};

export { style };