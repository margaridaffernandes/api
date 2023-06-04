const checkDecimals = value => {
  const strValue = value.toString();
  let nDecimals;

  if (strValue.indexOf(".") > -1) {
    const index = strValue.indexOf(".");
    nDecimals = strValue.length - index - 1;
  } else {
    nDecimals = 0;
  }

  return nDecimals;
};

export { checkDecimals };