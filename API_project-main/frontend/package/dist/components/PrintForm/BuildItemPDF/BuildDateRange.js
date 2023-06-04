const buildDateRange = (item, widths, isAny, showLabel) => {
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

  let field = {
    table: {
      dontBreakRows: true,
      widths: widths,
      body: [label, [{
        text: " ",
        border: [false, false, false, false]
      }, {
        text: item.value.start === null ? " " : item.value.start.split("-").reverse().join("/") + " até " + item.value.end.split("-").reverse().join("/"),
        border: [true, true, true, true],
        style: "field"
      }]]
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

export { buildDateRange };