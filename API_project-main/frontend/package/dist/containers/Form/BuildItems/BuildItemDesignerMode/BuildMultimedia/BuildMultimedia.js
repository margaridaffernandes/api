import React, { useContext, useEffect } from "react";
import Multimedia from "../../../../../components/FormDesigner/Datatypes/Multimedia/Multimedia";
import { buildInitialValueEditMode } from "../../../FormInitialValues/BuildInitialValue/BuildInitialValue";
import { firstAnyItem } from "../../../../../assets/functions/FirstAnyItem/FirstAnyItem";
import { mapFileExtension } from "../../../../../assets/functions/HandleMultimediaFiles/mapFileExtension";
import { getItemsList } from "../../../../../assets/data/SidebarData";
import CombinedContext from "../../../../../contexts/CombinedContext";

const BuildMultimediaFormDesigner = (item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder) => {
  const isRM = pathArray[0] === "rm" ? true : false;
  const label = isRM ? item.itemName : item.node === null ? item.text : item.node.text;
  let array = [];
  array.push("value");
  const pathLabel = pathArray.concat(array).join("-");
  buildInitialValueEditMode(item, pathLabel, initialValues);
  const context = useContext(CombinedContext); // Para verificar se existe alguma restrição de extensão do archetypeDesigner

  useEffect(() => {
    if (item.itemsList !== undefined && item.itemsList.length > 0) {
      // vai buscar o mapeamento
      let idInitialExtension = mapFileExtension(item.itemsList, ""); // vai buscar a lista de restrições

      let items = getItemsList(""); // atualiza a restrição para o valor que vem do archetypeDesigner, caso este seja contemplado no mapeamento
      // caso contrário coloca a opção default - Todos os Ficheiros (id=0)

      context.datatypes.handleFileExtensions(pathArray.join("."), Object.values(items).filter(i => idInitialExtension === 9 ? i.id === 0 : i.id === idInitialExtension));
    }
  }, []);
  return /*#__PURE__*/React.createElement(Multimedia, {
    isRM: isRM,
    data: isRM && item,
    isSection: false,
    groupID: item.groupID,
    path: pathArray.join("."),
    handleFormOrder: handleFormOrder,
    order: formOrder ? formOrder[pathArray.join(".")] : null,
    item: item,
    key: itemIndex,
    isAny: isAny,
    showLabel: !isAny || (formOrder ? firstAnyItem(formOrder, pathArray, isAny) : itemIndex === 0),
    value: values[pathLabel],
    onMultimediaChange: setFieldValue,
    label: label,
    pathLabel: pathLabel,
    optional: item.occurrences.lowerOccurrences === 0,
    sectionOccurrence: itemSection[itemSection.length - 1],
    description: isRM ? item.description : item.node === null ? "" : item.node.description
  });
};

export default BuildMultimediaFormDesigner;