const textOptions = fieldDatatype => {
  const options = {
    textarea: {
      text: "Área de texto",
      style: fieldDatatype === "textarea" ? "font-bold" : ""
    },
    editor: {
      text: "Editor de texto",
      style: fieldDatatype === "editor" ? "font-bold" : ""
    },
    input: {
      // default
      text: "Input simples",
      style: fieldDatatype ? fieldDatatype === "input" ? "font-bold" : "" : "font-bold"
    }
  };
  return options;
};

export { textOptions };