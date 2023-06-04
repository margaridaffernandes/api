import React, { useContext, useEffect, useState } from "react";
import CurrentValues from "./CurrentValues/CurrentValues";
import SearchBar from "../../../UI/Filters/SearchBar";
import SearchBarWithTagFilter from "../../../UI/Filters/SearchBarWithTagFilter";
import FilteredList from "../../../UI/FilteredList/FilteredList";
import CombinedContext from "../../../../../contexts/CombinedContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import DropList from "../../../UI/Dropdown/DropList";
import RadioButton from "../../../UI/RadioButton/RadioButton";
import MultipleDropList from "../../../UI/Dropdown/MultipleDropList";
import MultipleDropdown from "../../../UI/Dropdown/MultipleDropdown";
import { handleRemoveItem } from "../../../../../assets/functions/handleCompositionPlanning/handleRemoveItem";
import { handleSelectAll } from "../../../../../assets/functions/handleCompositionPlanning/handleSelectAll";
import axios from "axios";
import styles from "../../../../../styles/custom.module.css";
import CurrentInternalFunctions from "./CurrentValues/CurrentInternalFunctions";
import TextButton from "../../../UI/Button/TextButton";
import { getEnvUrl } from "../../../../../environment/index";

const CompositionPlanningPanel = props => {
  const context = useContext(CombinedContext);
  const [isFetching, setIsFetching] = useState(true);
  const {
    jsonTitle,
    handleClearValue,
    showDropList,
    handleOpenDrop,
    dropKey,
    selectedItem,
    handleSelectItem,
    itemsList,
    badgePrefix,
    hasSearchBar,
    searchBarType,
    searchValue,
    handleChangeSearch,
    handleRemoveFilter,
    concepts,
    tagList,
    handleSelectTag,
    selectedTag,
    dropListID,
    dropListTextID,
    bodyData
  } = props;
  useEffect(() => {
    let url, value, func;

    if (jsonTitle === "Refset") {
      url = `${getEnvUrl('aidarefsets', '4010')}/localRefsets`; // url = "http://172.21.220.49:4010/localRefsets";

      value = context.composition.compositionPlanningRefsets;
      func = context.composition.updateCompositionPlanningRefsets;
    } else if (jsonTitle === "Functions") {
      url = `${getEnvUrl('aidarefsets', '4010')}/localRefsets?type=FUNÇÕES`; // url = "http://172.21.220.49:4010/localRefsets?type=FUNÇÕES";

      value = context.composition.compositionPlanningFunctions;
      func = context.composition.updateCompositionPlanningFunctions;
    } else if (jsonTitle === "InternalFunctions") {
      url = `${getEnvUrl('aidarefsets', '4010')}/refsetConcepts?id=242`; // url = "http://172.21.220.49:4010/refsetConcepts?id=242";

      value = context.composition.compositionPlanningInternalFunctions;
      func = context.composition.updateCompositionPlanningInternalFunctions;
    } else {
      url = `${getEnvUrl('aidarefsets', '4010')}/localRefsets?type=TAREFAS`; // url = "http://172.21.220.49:4010/localRefsets?type=TAREFAS";

      value = context.composition.compositionPlanningTasks;
      func = context.composition.updateCompositionPlanningTasks;
    }

    if (value.length === 0) {
      (async () => {
        axios({
          method: "get",
          url: url,
          headers: {
            Authorization: "Bearer " + context.token
          }
        }).then(response => {
          if (response.data.success === true) {
            func(jsonTitle === "InternalFunctions" ? response.data.concepts : response.data.refsets);
          }

          setIsFetching(false);
        });
      })();
    } else {
      setIsFetching(false);
    }
  }, [jsonTitle, context.token, context.composition]);
  let condition = jsonTitle === "InternalFunctions" ? selectedItem !== null && selectedItem.IFUNCAO === "Preenchimento automático de campos" : concepts !== null;
  let isRM = context.composition.openCompositionPlanningPath.split(".")[0] === "rm";
  let rmPath = isRM ? context.composition.openCompositionPlanningPath.split(".").splice(1).join(".") : "";

  const handleRemoveRMItem = item => {
    let value = context.rmData.rmForm.filter(i => i.itemPath === rmPath)[0][jsonTitle].filter(x => x !== item);
    context.rmData.handleRM(rmPath, jsonTitle, value);
  };

  const handleSelectAllRM = () => {
    if (context.rmData.rmForm.filter(i => i.itemPath === rmPath)[0][jsonTitle].indexOf("All") > -1) {
      context.rmData.handleRM(rmPath, jsonTitle, []);
    } else {
      context.rmData.handleRM(rmPath, jsonTitle, ["All"]);
    }
  };

  return isFetching === true ? /*#__PURE__*/React.createElement("div", {
    className: "flex w-full justify-center items-center flex-col py-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.dataLoaderSelectSearch,
    style: {
      borderTop: "6px solid " + context.theme.themePalette.$300
    }
  })) : itemsList.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col w-full p-4"
  }, jsonTitle === "InternalFunctions" ? /*#__PURE__*/React.createElement(CurrentInternalFunctions, {
    handleRemoveItem: (type, item) => handleRemoveItem(context, jsonTitle, item, type),
    jsonTitle: jsonTitle,
    value: context.composition.compositionPlanning[context.composition.openCompositionPlanningPath][jsonTitle].filter(obj => obj.type !== undefined)
  }) : /*#__PURE__*/React.createElement(CurrentValues, {
    handleRemoveItem: isRM ? item => handleRemoveRMItem(item) : jsonTitle !== "Functions" && jsonTitle !== "Refset" ? item => {
      handleRemoveItem(context, jsonTitle, item);
      handleClearValue();
    } : item => handleRemoveItem(context, jsonTitle, item),
    jsonTitle: jsonTitle,
    value: isRM ? context.rmData.rmForm.filter(i => i.itemPath === rmPath)[0][jsonTitle] : context.composition.compositionPlanning[context.composition.openCompositionPlanningPath][jsonTitle]
  }), (jsonTitle === "TaskVisible" || jsonTitle === "TaskInReport" || jsonTitle === "TaskEditable") && /*#__PURE__*/React.createElement(RadioButton, {
    title: "Associar todas as tarefas",
    id: `composition-planning-selectall-${props.jsonTitle}`,
    handleSelect: () => isRM ? handleSelectAllRM() : handleSelectAll(context, jsonTitle),
    isSelected: isRM ? context.rmData.rmForm.filter(i => i.itemPath === rmPath)[0][jsonTitle].indexOf("All") > -1 : !!(context.composition.compositionPlanning[context.composition.openCompositionPlanningPath] && context.composition.compositionPlanning[context.composition.openCompositionPlanningPath][props.jsonTitle] && context.composition.compositionPlanning[context.composition.openCompositionPlanningPath][props.jsonTitle].indexOf("All") > -1)
  }), jsonTitle !== "Functions" && jsonTitle !== "Refset" && /*#__PURE__*/React.createElement(Dropdown, {
    value: selectedItem !== null ? jsonTitle === "InternalFunctions" ? selectedItem.IFUNCAO : selectedItem.name : null,
    handleClear: () => handleClearValue(),
    handleOpen: () => dropKey === undefined ? handleOpenDrop() : handleOpenDrop("showDrop".concat(dropKey.charAt(0).toUpperCase() + dropKey.slice(1))),
    placeholder: "Selecione uma categoria...",
    isDropSelected: showDropList
  }, showDropList && /*#__PURE__*/React.createElement(DropList, {
    list: itemsList,
    handleChange: obj => handleSelectItem(obj),
    selected: selectedItem,
    id: dropListID,
    idText: dropListTextID
  })), hasSearchBar && (searchBarType === "SearchBar" ? /*#__PURE__*/React.createElement(SearchBar, {
    value: selectedItem,
    searchValue: searchValue,
    handleChangeSearch: value => handleChangeSearch(value),
    handleRemoveFilters: () => handleRemoveFilter()
  }) : /*#__PURE__*/React.createElement(SearchBarWithTagFilter, {
    value: selectedItem,
    searchValue: searchValue,
    handleChangeSearch: value => handleChangeSearch(value),
    tagList: tagList,
    handleSelectTag: handleSelectTag,
    selectedTag: selectedTag,
    handleRemoveFilters: () => handleRemoveFilter()
  })), (jsonTitle === "Refset" || jsonTitle === "Functions") && /*#__PURE__*/React.createElement(FilteredList, {
    list: itemsList,
    badgePrefix: badgePrefix,
    searchValue: searchValue,
    filter: selectedTag,
    tagColors: tagList,
    handleChange: obj => handleSelectItem(obj),
    selected: selectedItem,
    id: "id",
    idText: "name"
  }), bodyData.map((data, index) => condition && /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col w-full",
    key: index
  }, data.title !== undefined && /*#__PURE__*/React.createElement("p", {
    className: "text-gray-700 text-9-5 xl:text-10 xxl:text-11 xxxl:text-xs leading-tight py-1"
  }, data.title), data.type === "dropdown" ? /*#__PURE__*/React.createElement(Dropdown, {
    value: data.value !== null ? data.valueKey !== undefined ? data.value[data.valueKey] : data.value : null,
    handleClear: () => jsonTitle === "Refset" ? data.handleClearValue(data.key) : data.handleClearValue(),
    handleOpen: () => data.handleOpenDrop("showDrop".concat(data.key.charAt(0).toUpperCase() + data.key.slice(1))),
    placeholder: data.placeholder,
    isDropSelected: data.isDropSelected
  }, data.isDropSelected && /*#__PURE__*/React.createElement(DropList, {
    list: data.dropList,
    handleChange: value => data.handleSetValue(value, data.key),
    selected: data.value,
    id: data.dropListID,
    idText: data.dropListTextID
  })) : data.type === "textarea" ? /*#__PURE__*/React.createElement("textarea", {
    className: "resize-none text-10 xxl:text-11 xxxl:text-xs bg-gray-200 border border-gray-200 text-gray-700 px-4 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300",
    style: {
      height: "33.07px",
      paddingTop: "8px"
    },
    placeholder: data.placeholder,
    onChange: value => data.handleSetValue(value, data.key),
    selected: data.value
  }) : data.type === "multiple_dropdown" ? /*#__PURE__*/React.createElement(MultipleDropdown, {
    value: data.value,
    handleClear: () => data.handleClearValue(),
    handleOpen: () => data.handleOpenDrop(),
    placeholder: data.placeholder,
    idText: "task",
    handleChange: (e, value) => data.handleSetValue(e, value),
    showDropdown: data.isDropSelected
  }, data.isDropSelected && /*#__PURE__*/React.createElement(MultipleDropList, {
    list: data.dropList,
    handleChange: (e, value) => data.handleSetValue(e, value),
    selected: data.value,
    id: data.dropListID,
    idText: data.dropListTextID
  })) :
  /*#__PURE__*/
  // Para as dependências das InternalFunctions
  React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-red-500 text-9-5 xl:text-10 xxl:text-11 xxxl:text-xs leading-tight mt-2"
  }, data.text), data.dependencies.map((obj, index) => {
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      className: "flex flex-col w-full mt-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex w-full"
    }, /*#__PURE__*/React.createElement(Dropdown, {
      value: obj.field !== null ? obj.field.name : null,
      handleClear: () => data.handleDependency(obj.id, "field", null),
      handleOpen: () => data.handleOpenDrop(obj.id, "showDropDependencyField"),
      placeholder: "Campo do qual dependende..."
    }, data.showDropDependencyField.filter(x => x.id === obj.id)[0].boolean && /*#__PURE__*/React.createElement(DropList, {
      list: data.formFields,
      handleChange: value => data.handleDependency(obj.id, "field", value),
      selected: obj.field,
      id: "path",
      idText: "name"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "flex w-full mt-2"
    }, /*#__PURE__*/React.createElement(Dropdown, {
      value: obj.columnRef !== null ? obj.columnRef : null,
      handleClear: () => data.handleDependency(obj.id, "columnRef", null),
      handleOpen: () => data.handleOpenDrop(obj.id, "showDropDependencyColumn"),
      placeholder: "Coluna no refset..."
    }, data.showDropDependencyColumn.filter(x => x.id === obj.id)[0].boolean && /*#__PURE__*/React.createElement(DropList, {
      list: data.refsets,
      handleChange: value => data.handleDependency(obj.id, "columnRef", value),
      selected: obj.columnRef
    }))), /*#__PURE__*/React.createElement("div", {
      className: "flex w-full justify-between"
    }, data.dependencies.length > 1 && /*#__PURE__*/React.createElement(TextButton, {
      color: "#f56565",
      hover: "hover:text-red-600",
      handleClick: () => data.removeDependency(obj.id),
      title: "Remover"
    }), index === data.dependencies.length - 1 && /*#__PURE__*/React.createElement(TextButton, {
      color: context.theme.themePalette.$500,
      hover: "hover:text-blue-500",
      handleClick: () => data.addDependency(),
      title: "Adicionar"
    })));
  }))))) : /*#__PURE__*/React.createElement("div", {
    className: "w-full py-4 px-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex w-full items-center m-1 py-1 px-2 rounded-sm text-red-500 bg-gray-100 border"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pr-2"
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    size: "sm",
    icon: faExclamationCircle
  })), /*#__PURE__*/React.createElement("div", {
    className: "text-sm max-w-full flex-initial cursor-default"
  }, "Dados inexistentes")));
};

export default CompositionPlanningPanel;