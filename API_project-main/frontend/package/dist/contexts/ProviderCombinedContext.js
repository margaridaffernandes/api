import React from "react";
import BackgroundContext from "./BackgroundContext";
import ChangedFieldsContext from "./ChangedFieldsContext";
import CombinedContext from "./CombinedContext";
import ThemeContext from "./ThemeContext";
import TokenContext from "./TokenContext";
import CodigosDependenciaContext from "./CodigosDependenciaContext";
import DatatypesContext from "./DatatypesContext";
import FormOrderContext from "./FormOrderContext";
import HSizesContext from "./HSizesContext";
import FormDataContext from "./FormDataContext";
import FontContext from "./FontContext";
import CompositionPlanningContext from "./CompositionPlanningContext";
import SectionArchetypeContext from "./SectionArchetypeContext";
import { DlmContext } from "./DlmContext";
import FormModeContext from "./FormModeContext";
import ReferenceModelContext from "./ReferenceModelContext";

const ProviderCombinedContext = props => {
  return /*#__PURE__*/React.createElement(FormModeContext.Consumer, null, formMode => /*#__PURE__*/React.createElement(FormDataContext.Consumer, null, formData => /*#__PURE__*/React.createElement(ReferenceModelContext.Consumer, null, rmData => /*#__PURE__*/React.createElement(HSizesContext.Consumer, null, sizes => /*#__PURE__*/React.createElement(DatatypesContext.Consumer, null, datatypes => /*#__PURE__*/React.createElement(FormOrderContext.Consumer, null, order => /*#__PURE__*/React.createElement(CodigosDependenciaContext.Consumer, null, codigos => /*#__PURE__*/React.createElement(DlmContext.Consumer, null, dlm => /*#__PURE__*/React.createElement(TokenContext.Consumer, null, token => /*#__PURE__*/React.createElement(BackgroundContext.Consumer, null, background => /*#__PURE__*/React.createElement(ThemeContext.Consumer, null, theme => /*#__PURE__*/React.createElement(ChangedFieldsContext.Consumer, null, fields => /*#__PURE__*/React.createElement(FontContext.Consumer, null, font => /*#__PURE__*/React.createElement(CompositionPlanningContext.Consumer, null, composition => /*#__PURE__*/React.createElement(SectionArchetypeContext.Consumer, null, sectionArchetype => /*#__PURE__*/React.createElement(CombinedContext.Provider, {
    value: {
      formMode,
      background,
      rmData,
      theme,
      fields,
      dlm,
      token,
      codigos,
      order,
      datatypes,
      sizes,
      formData,
      font,
      composition,
      sectionArchetype
    }
  }, props.children))))))))))))))));
};

export default ProviderCombinedContext;