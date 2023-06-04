import ob from "object-path";
let template = {};
let fields = [];

const buildSection = (item, pathArray) => {
  item.items.map((subItem, subItemIndex) => {
    let array = [];
    array.push("items", subItemIndex);
    return buildItem(subItem, pathArray.concat(array));
  });
};

const buildItem = (item, pathArray) => {
  if (item.data_type === "Title") {
    return buildSection(item, pathArray);
  } else {
    if (Array.isArray(item)) {
      item.forEach((itemAny, itemAnyIndex) => {
        const pathSection = [...pathArray];
        pathSection.pop();
        pathSection.pop();
        const section = ob.get(template, pathSection);
        const sectionName = section.node ? section.node.text : "";
        let array = [];
        array.push(itemAnyIndex);
        const newPath = pathArray.concat(array);
        const path = newPath.join(".");
        fields.push({
          path: path,
          name: itemAny.node ? `${sectionName} - ${itemAny.node.text}` : "",
          datatype: itemAny.dataType,
          upperOccurrences: itemAny.occurrences.upperOccurrences
        });
      });
    } else {
      const pathSection = [...pathArray];
      pathSection.pop();
      pathSection.pop();
      const section = ob.get(template, pathSection);
      const sectionName = section.node ? section.node.text : "";
      const path = pathArray.join(".");
      fields.push({
        path: path,
        name: item.node ? `${sectionName} - ${item.node.text}` : "",
        datatype: item.dataType,
        upperOccurrences: item.occurrences.upperOccurrences
      });
    }
  }
};

const getFormFields = async temp => {
  template = await { ...temp
  };
  fields = [];
  template.items.map((attribute, index) => {
    return attribute.map((att, attIndex) => {
      let array = [];
      array.push("items", index, attIndex);
      return buildItem(att, array);
    });
  });
  return fields;
};

export { getFormFields };