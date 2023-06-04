//função para extrair a componente r, g e b de uma string rgb
const extractRGBA = rgbString => {
  let rgb = rgbString.substring(5, rgbString.length - 1).replace(/ /g, '').split(',');
  return rgb ? {
    r: rgb[0],
    g: rgb[1],
    b: rgb[2],
    a: rgb[3]
  } : null;
};

export { extractRGBA };