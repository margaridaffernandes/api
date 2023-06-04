const getWidth = percentWidth => {
  const width = percentWidth.split("%")[0];
  const realWidth = Number(width) / 100 * 91.67;
  return realWidth + "%";
};

export { getWidth };