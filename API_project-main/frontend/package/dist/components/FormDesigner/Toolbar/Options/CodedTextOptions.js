const codedTextOptions = fieldDatatype => {
  const options = {
    radio: {
      text: "Radio box",
      style: fieldDatatype === "radio" ? "font-bold" : ""
    },
    combo: {
      // default
      text: "Combo box",
      style: fieldDatatype ? fieldDatatype === "combo" ? "font-bold" : "" : "font-bold"
    }
  };
  return options;
};

export { codedTextOptions };