const buildMultimedia = (item, widths, isAny, showLabel) => {
  let label;

  if (!isAny || isAny && showLabel === 1) {
    label = [{
      text: " ",
      border: [false, false, false, false]
    }, {
      text: item.node === null ? item.text : item.node.text,
      border: [false, false, false, false],
      style: "label"
    }];
  } else {
    label = [{
      text: " ",
      border: [false, false, false, false]
    }, {
      text: " ",
      border: [false, false, false, false],
      style: "label"
    }];
  }

  let files = item.value === null ? "" : item.value.filter(obj => obj.type === "image/jpeg" || obj.type === "image/png");

  if (Array.isArray(files)) {
    if (files.length === 0) {
      return;
    }
  } else {
    return;
  }

  let images = files.map(obj => {
    return [{
      text: " ",
      border: [false, false, false, false]
    }, {
      image: obj.fileData,
      width: 180,
      height: 180,
      style: "image"
    }];
  });
  let field = {
    table: {
      dontBreakRows: true,
      widths: widths,
      body: [label, ...images]
    },
    layout: {
      hLineWidth: function (i, node) {
        return 0.5;
      },
      vLineWidth: function (i, node) {
        return 0.5;
      },
      hLineColor: function (i, node) {
        return "black";
      },
      vLineColor: function (i, node) {
        return "black";
      }
    }
  };
  return field;
};

export { buildMultimedia };