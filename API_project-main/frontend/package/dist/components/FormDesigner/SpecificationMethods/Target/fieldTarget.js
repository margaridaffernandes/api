const fieldTarget = {
  // Only perform the action when the item is dropped, not when hovered.
  // Otherwise, multiple errors arise in this case.
  drop(props, monitor) {
    const dragPath = monitor.getItem().path;
    const hoverPath = props.path;
    const dragOrder = monitor.getItem().order;
    const hoverOrder = props.order;
    const dragGroupID = monitor.getItem().groupID;
    const hoverGroupID = props.groupID;
    const isSectionDrag = monitor.getItem().isSection;
    const isSectionHover = props.isSection;
    const showLabelDrag = monitor.getItem().showLabel;
    const showLabelHover = props.showLabel;
    const isAnyDrag = monitor.getItem().isAny;
    const isAnyHover = props.isAny;
    const isRMComponent = monitor.getItem().isRM; // se for um componente RM, após ser arrastado para uma área válida, é preciso:
    // 1. transformar no componente correspondente
    // 2. rearranjar a ordem dos componentes
    // 3. actualizar o formRM com o componente colocado

    if (isRMComponent) {
      const dragPathRM = monitor.getItem().pathRM !== undefined ? monitor.getItem().pathRM : monitor.getItem().data.parentPath;
      const itemPathRM = "rm.".concat(monitor.getItem().data.itemPath); // obter o tamanho do itemPath pai do componente RM (path pai -> path da secção à qual o campo do RM pertence)

      let itemPathLength = dragPathRM === "root" ? "items.0.0".length : dragPathRM.length; // obter o itemPath da secção para a qual o componente está a ser arrastado, extraíndo apenas a parte correspondente ao tamanho do itemPath

      let dropSectionPath = hoverPath.indexOf("rm") > -1 ? props.item.parentPath : hoverPath.substring(0, itemPathLength);
      const componentRM = monitor.getItem().data;

      if (monitor.getItem().handleRM !== undefined) {
        monitor.getItem().handleRM(componentRM, isSectionHover, itemPathRM, hoverPath, dragOrder, hoverOrder, showLabelHover, isAnyHover, dropSectionPath, props.groupID);
        return;
      }
    } // Don't replace items with themselves


    if (dragPath === hoverPath) {
      return;
    } // Don't replace items with different groupIDs


    if (dragGroupID !== hoverGroupID) {
      return;
    } // Don't move an item of an Any field if it is not the first item


    if (showLabelDrag === false) {
      const arrayPathDrag = dragPath.split(".");
      arrayPathDrag.pop(); // Só posso ordenar se o quero trocar pelo um dos seus itens any

      if (hoverPath.indexOf(arrayPathDrag.join(".") + ".") > -1) {
        props.handleFormOrder("anyItens", isSectionDrag, isSectionHover, dragPath, hoverPath, dragOrder, hoverOrder, showLabelDrag, showLabelHover, isAnyDrag, isAnyHover);
        return;
      } else {
        return;
      }
    } // Don't drop your field if it is not the first item of an Any field


    if (showLabelHover === false) {
      const arrayPathHover = hoverPath.split(".");
      arrayPathHover.pop(); // Só posso ordenar se o quero trocar pelo um dos seus itens any

      if (dragPath.indexOf(arrayPathHover.join(".") + ".") > -1) {
        props.handleFormOrder("anyItens", isSectionDrag, isSectionHover, dragPath, hoverPath, dragOrder, hoverOrder, showLabelDrag, showLabelHover, isAnyDrag, isAnyHover);
        return;
      } else {
        return;
      }
    } // Time to actually perform the action


    props.handleFormOrder("general", isSectionDrag, isSectionHover, dragPath, hoverPath, dragOrder, hoverOrder, showLabelDrag, showLabelHover, isAnyDrag, isAnyHover);
  },

  canDrop(props, monitor) {
    const dragPath = monitor.getItem().path;
    const hoverPath = props.path;
    const dragGroupID = monitor.getItem().groupID;
    const hoverGroupID = props.groupID;
    const showLabelDrag = monitor.getItem().showLabel;
    const showLabelHover = props.showLabel;
    const isRMComponent = monitor.getItem().isRM; // se o componente a arrastar for do tipo RM, é preciso ir buscar o path da secção para a qual se está a arrastar o componente
    // e compará-lo com o path do rmJDT

    if (isRMComponent) {
      const dragPathRM = monitor.getItem().pathRM !== undefined ? monitor.getItem().pathRM : monitor.getItem().data.parentPath; // obter o tamanho do itemPath do componente RM (path pai - path da secção à qual o RM pertence)

      let itemPathLength = dragPathRM !== undefined ? dragPathRM.length : monitor.getItem().data.parentPath.length; // obter o itemPath da secção para a qual o componente está a ser arrastado, extraíndo apenas a parte correspondente ao tamanho do itemPath

      let dropSectionPath = hoverPath.indexOf("rm") > -1 ? props.item.parentPath : hoverPath.substring(0, itemPathLength); // se forem items do RM correspondentes à secção principal i.e. quando o dragPathRM é "root"
      // estes apenas podem ser arrastados ao nível das outras subsecções que têm sempre o groupID=2

      if (dragPathRM === "root" && hoverGroupID === 2) {
        return true;
      } // se o path pai do componente RM for igual ao path da secção pai para a qual o componente está a ser arrastado,
      // significa que estão na mesma secção
      else if (dropSectionPath === dragPathRM) {
          return true;
        } // caso contrário, não podem ser arrastados
        else {
            return false;
          }
    } // Don't replace items with themselves


    if (dragPath === hoverPath) {
      return false;
    } // Don't replace items with different groupIDs


    if (dragGroupID !== hoverGroupID) {
      return false;
    } // Don't move an item of an Any field if it is not the first item


    if (showLabelDrag === false) {
      const arrayPathDrag = dragPath.split(".");
      arrayPathDrag.pop();

      if (hoverPath.indexOf(arrayPathDrag.join(".") + ".") > -1) {
        return true;
      } else {
        return false;
      }
    } // Don't drop your field if it is not the first item of an Any field


    if (showLabelHover === false) {
      const arrayPathHover = hoverPath.split(".");
      arrayPathHover.pop();

      if (dragPath.indexOf(arrayPathHover.join(".") + ".") > -1) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }

};
export { fieldTarget };