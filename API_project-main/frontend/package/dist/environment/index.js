export const getEnvUrl = (path, port) => {
  //se for diferente de testes ou localhost significa que está a ser chamado numa app aidasuite, aidaehr, aidadmin, etc. -> chama produção
  if (window.location.pathname?.split('/')[1] !== process.env.REACT_APP_DEV_PATHNAME && window.location.hostname !== process.env.REACT_APP_DEV_DOMAIN) {
    return `${process.env.REACT_APP_INSIDE_API}${path}`;
  } else if (window.location.pathname?.split('/')[1] === process.env.REACT_APP_DEV_PATHNAME) {
    // testes
    return `${process.env.REACT_APP_INSIDE_API_TEST}${path}`;
  } else if (window.location.hostname === process.env.REACT_APP_DEV_DOMAIN) {
    // localhost
    return `${process.env.REACT_APP_INSIDE_API_TEST}${path}`; // dev mode api test 49
  }
};