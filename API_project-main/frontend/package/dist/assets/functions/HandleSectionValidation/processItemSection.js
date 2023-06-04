import { handleItemSection } from "./handleItemSection";

const processItemSection = (pathArray, isAny, sectionNotMandatoryObject) => {
  // Remover os ultimos elementos que foram adicionados no array para ter o path da secção principal do item
  let itemSectionPath;
  let pathArrayCopy = [...pathArray];

  if (isAny) {
    //"items index index"
    pathArrayCopy.pop();
    pathArrayCopy.pop();
    pathArrayCopy.pop();
    itemSectionPath = pathArrayCopy;
  } else {
    //"items index"
    pathArrayCopy.pop();
    pathArrayCopy.pop();
    itemSectionPath = pathArrayCopy;
  }

  const itemSection = handleItemSection(sectionNotMandatoryObject, itemSectionPath);
  return itemSection;
};

export { processItemSection };