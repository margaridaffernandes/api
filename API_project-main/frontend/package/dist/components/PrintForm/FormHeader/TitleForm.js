const titleForm = template => {
  let title = {
    table: {
      dontBreakRows: true,
      widths: ["100%"],
      body: [[{
        text: template.node.text,
        border: [false, false, false, false],
        style: "titleForm"
      }]]
    }
  };
  return title;
};

export { titleForm };