const horizontalSizes = fieldSize => {
  const sizes = {
    "100": {
      // default
      text: "Espaço inteiro",
      width: "100%",
      style: fieldSize ? fieldSize === "100%" ? "font-bold" : "" : "font-bold"
    },
    "75": {
      text: "3/4",
      width: "75%",
      style: fieldSize === "75%" ? "font-bold" : ""
    },
    "50": {
      text: "1/2",
      width: "50%",
      style: fieldSize === "50%" ? "font-bold" : ""
    },
    "25": {
      text: "1/4",
      width: "25%",
      style: fieldSize === "25%" ? "font-bold" : ""
    },
    "33": {
      text: "1/3",
      width: "33.333333%",
      style: fieldSize === "33.333333%" ? "font-bold" : ""
    },
    "66": {
      text: "2/3",
      width: "66.666667%",
      style: fieldSize === "66.666667%" ? "font-bold" : ""
    }
  };
  return sizes;
};

export { horizontalSizes };