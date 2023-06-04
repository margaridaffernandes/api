// Estilo dos componentes partilhados entre diferentes ficheiro para os vários modos (editMode, consultMode e designerMode)
const componentsStyle = {
  // Label dos campos usado nos 3 modos
  fieldLabelRoot: "flex flex-row",
  fieldLabelDefault: "break-words block tracking-wide text-gray-600 mb-1",
  // text-xs
  fieldLabelDndisAny: "break-words block tracking-wide text-transparent mb-1",
  // text-xs
  fieldLabelDefaultMandatory: "break-words block tracking-wide ml-1",
  mandatoryAlways: "text-red-500 font-bold",
  // text-sm
  mandatoryOptional: "text-gray-500 font-bold",
  // text-sm
  // UI das sections usado nos 3 modos
  sectionContainerRoot: "duration-300 relative mt-2 mx-1",
  // w-11/12 
  defaultSectionContainerRoot: "duration-300 relative mt-2",
  // w-full
  sectionContainer: "cursor-pointer relative border-2 rounded-sm",
  defaultSectionContainer: "cursor-pointer relative border-b",
  addSectionContainer: "cursor-default relative border-b",
  defaultSectionContainerYPadding: "0.05rem",
  subSectionContainerXPadding: "px-2",
  subSubSectionContainerXPadding: "px-3",
  subSubSubSectionContainerXPadding: "px-4",
  subSubSubSubSectionContainerXPadding: "px-5",
  subSubSubSubSubSectionContainerXPadding: "px-6",
  // Estilo apenas usado no designer mode
  itemContainerRoot: "duration-300 cursor-pointer flex relative flex-col"
}; // !!!! FALTA PARA OS DATATYPES !!!!

export default componentsStyle;