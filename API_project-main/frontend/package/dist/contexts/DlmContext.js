import React, { useCallback, useMemo, useState } from "react";
export const DlmContext = /*#__PURE__*/React.createContext(null);
export default function DlmContextProvider({
  children
}) {
  const [isDlmFinished, setIsDlmFinished] = useState(true);
  const updateIsDlmFinished = useCallback(status => {
    setIsDlmFinished(status);
  }, []);
  const store = useMemo(() => ({
    isDlmFinished,
    updateIsDlmFinished
  }), [isDlmFinished, updateIsDlmFinished]);
  return /*#__PURE__*/React.createElement(DlmContext.Provider, {
    value: store
  }, children);
} // descomentar quando fizer a conversão do formEditMode para Hooks
// remover o export do DlmContext e removê-lo do ficheiro ProviderCombinedContext
// depois basta chamar const { updateIsDlmFinished } = useDlmContext();
// e já posso adicionar às dependências do UseEffect sem criar ciclo infinito
// export const useDlmContext = () => {
//     const context = useContext(DlmContext);
//     return context;
// };