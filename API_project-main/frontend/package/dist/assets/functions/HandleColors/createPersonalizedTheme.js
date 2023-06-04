//função para criar uma paleta de cores consoante a cor definida pelo utilizador no ColorPicker
const createPersonalizedPalette = color => {
  const personalizedPalette = {
    $600: `rgba(${color.r - 18}, ${color.g - 27}, ${color.b - 53}, ${color.a})`,
    $500: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
    $400: `rgba(${color.r + 39}, ${color.g + 28}, ${color.b + 16}, ${color.a})`,
    $300: `rgba(${color.r + 55}, ${color.g + 40}, ${color.b + 25}, ${color.a})`,
    $200: `rgba(${color.r + 80}, ${color.g + 56}, ${color.b + 45}, ${color.a})`,
    $100: `rgba(${color.r + 112}, ${color.g + 73}, ${color.b + 55}, ${color.a})`
  };
  return personalizedPalette;
};

export { createPersonalizedPalette };