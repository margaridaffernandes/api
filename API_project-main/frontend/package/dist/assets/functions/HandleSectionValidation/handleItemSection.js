const handleItemSection = (sectionNotMandatoryObject, itemSectionPath) => {
  const sectionPath = itemSectionPath.join("-");
  let itemSection = [];

  for (let i = 0; i < Object.keys(sectionNotMandatoryObject).length; i++) {
    if (Object.keys(sectionNotMandatoryObject)[i] === sectionPath) {
      itemSection.push(...sectionNotMandatoryObject[sectionPath]);
      break;
    }
  }

  return itemSection;
};

export { handleItemSection };