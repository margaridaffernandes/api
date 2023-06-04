function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import SidePanel from "../../SidePanel";
import CombinedContext from "../../../../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../../../../contexts/ProviderCombinedContext";
import axios from "axios";
import tagColors from "../../../../../../assets/colors/TagColors";
import CompositionPlanningPanel from "../CompositionPlanningPanel";
import { getEnvUrl } from "../../../../../../environment/index";

class RefsetComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      filterSelected: "All",
      //filtro seleccionado -> tipos de refsets -> por default mostra todos
      searchValue: "",
      //valor de pesquisa
      refsetSelected: null,
      //refset seleccionado
      concepts: [],
      // Lista de conceitos de um refset
      columnCode: null,
      // Refset => coluna code
      columnText: null,
      // Refset => coluna text
      showDropColumnCode: false,
      // Show coluna code
      showDropColumnText: false,
      // Show coluna text
      data: []
    });

    _defineProperty(this, "handleSelectFilter", e => {
      if (this.state.filterSelected !== e) {
        this.setState({
          filterSelected: e
        });
      } else {
        this.setState({
          filterSelected: "All"
        });
      }
    });

    _defineProperty(this, "handleChangeSearch", value => {
      this.setState({
        searchValue: value
      });
    });

    _defineProperty(this, "handleRemoveFilter", () => {
      this.setState({
        filterSelected: "All",
        concepts: [],
        refsetSelected: null,
        searchValue: "",
        columnCode: null,
        columnText: null
      });
    });

    _defineProperty(this, "handleReftsetSelected", obj => {
      this.setState(prevState => ({ ...prevState,
        columnCode: null,
        columnText: null,
        concepts: null,
        refsetSelected: prevState.refsetSelected !== null && prevState.refsetSelected.id === obj.id ? null : obj
      }), () => {
        this.handleFetchConcepts();
      });
    });

    _defineProperty(this, "handleFetchConcepts", () => {
      if (this.state.refsetSelected !== null) {
        let concepts = this.context.composition.compositionPlanningRefsets.filter(item => item.id === this.state.refsetSelected.id);
        this.setState({
          concepts: concepts[0].concept_keys,
          data: [{
            id: 1,
            title: "Coluna do identificador único",
            placeholder: "Selecione uma coluna...",
            type: "dropdown",
            key: "columnCode"
          }, {
            id: 2,
            title: "Coluna da designação",
            placeholder: "Selecione uma coluna...",
            type: "dropdown",
            key: "columnText"
          }]
        }); // axios({
        //     method: "get",
        //     url: `${getEnvUrl('aidarefsets','4010')}/refsetConcepts?id=${this.state.refsetSelected.id}`,
        //     // url: `http://172.21.220.49:4010/refsetConcepts?id=${this.state.refsetSelected.id}`,
        //     headers: {Authorization: "Bearer " + this.context.token},
        // })
        //     .then((response) => {
        //         if (response.data.success === true) {
        //             this.setState({
        //                 concepts: response.data.concepts
        //             });
        //
        //             if (response.data.concepts !== null && response.data.concepts.length > 0) {
        //                 this.setState({
        //                     data: [
        //                         {
        //                             id: 1,
        //                             title: "Coluna do identificador único",
        //                             placeholder: "Selecione uma coluna...",
        //                             type: "dropdown",
        //                             key: "columnCode",
        //                         },
        //                         {
        //                             id: 2,
        //                             title: "Coluna da designação",
        //                             placeholder: "Selecione uma coluna...",
        //                             type: "dropdown",
        //                             key: "columnText",
        //                         }
        //                     ]
        //                 })
        //             }
        //         } else {
        //             this.setState({
        //                 concepts: []
        //             });
        //         }
        //     })
        //     .catch((error) => {
        //         this.setState({
        //             concepts: []
        //         });
        //     });
      }
    });

    _defineProperty(this, "handleOpenDropList", key => {
      this.setState(prevState => ({ ...prevState,
        [key]: !prevState[key]
      }));
    });

    _defineProperty(this, "handleClearConceptSelected", key => {
      this.setState({
        [key]: null,
        showDropColumnCode: false,
        showDropColumnText: false
      });
    });

    _defineProperty(this, "handleConceptSelected", (value, key = null) => {
      this.setState(prevState => ({ ...prevState,
        [key]: prevState[key] !== null && prevState[key] === value ? null : value,
        showDropColumnCode: false,
        showDropColumnText: false
      }));
    });

    _defineProperty(this, "handleConceptInsert", (value, key = null) => {
      this.setState({
        [key]: value.target.value
      });
    });

    _defineProperty(this, "handleRefsetComposition", type => {
      let value = type === "dynamic" ? [`${getEnvUrl('aidarefsets', '4010')}/refsetConcepts?id=${this.state.refsetSelected.id}`] : [`${getEnvUrl('aidarefsets', '4010')}/refsetConcepts?id=${this.state.refsetSelected.id}&code=${this.state.columnCode}&text=${this.state.columnText}`]; // const value = [`http://172.21.220.49:4010/refsetConcepts?id=${this.state.refsetSelected.id}&code=${this.state.columnCode}&text=${this.state.columnText}`];

      this.context.composition.handleCompositionPlanning(this.context.composition.openCompositionPlanningPath, "Refset", value);
      this.setState({
        refsetSelected: null,
        concepts: [],
        columnCode: null,
        columnText: null,
        showDropColumnCode: false,
        showDropColumnText: false
      });
    });

    _defineProperty(this, "handleCancelChanges", () => {
      this.props.onCancel(); // ver se ao carregar no botão de cancelar, queremos que o item fique deseleccionado -> descomentar linha de baixo
      //await this.context.composition.handleOpenCompositionPlanning(this.context.composition.openCompositionPlanningPath);
    });

    _defineProperty(this, "handleConfirmChanges", () => {
      if (this.state.concepts !== null && this.state.concepts.length > 0) {
        this.state.columnText !== null && this.state.columnCode !== null && this.handleRefsetComposition();
      } else {
        this.handleRefsetComposition("dynamic");
      }
    });
  }

  render() {
    // console.log('EIIII', this.state.refsetSelected !== null && this.context.composition.compositionPlanningRefsets.filter((item) => item.id === this.state.refsetSelected.id))
    let list = this.context.composition.compositionPlanningRefsets;
    let refsetTypes = [...new Set(list.map(item => item["type"]))].filter(e => e !== null && e);
    let refsetTypesNColors = refsetTypes.map((r, i) => {
      return {
        type: r,
        color: tagColors[i]
      };
    });
    let content;
    let arr1 = this.state.concepts !== null && this.state.concepts.length > 0 ? [{
      id: 1,
      value: this.state.columnCode,
      dropList: this.state.refsetSelected.concept_keys,
      isDropSelected: this.state.showDropColumnCode,
      handleOpenDrop: this.handleOpenDropList,
      handleSetValue: this.handleConceptSelected,
      handleClearValue: this.handleClearConceptSelected
    }, {
      id: 2,
      value: this.state.columnText,
      dropList: this.state.refsetSelected.concept_keys,
      isDropSelected: this.state.showDropColumnText,
      handleOpenDrop: this.handleOpenDropList,
      handleSetValue: this.handleConceptSelected,
      handleClearValue: this.handleClearConceptSelected
    }] : [{
      id: 1,
      value: this.state.columnCode,
      handleSetValue: this.handleConceptInsert
    }, {
      id: 2,
      value: this.state.columnText,
      handleSetValue: this.handleConceptInsert
    }];
    let bodyData = this.state.data.length !== 0 ? this.state.data.map(x => Object.assign(x, arr1.find(y => y.id === x.id))) : [];
    content = this.context.composition.openCompositionPlanning && /*#__PURE__*/React.createElement(CompositionPlanningPanel, {
      jsonTitle: "Refset",
      selectedItem: this.state.refsetSelected,
      handleSelectItem: this.handleReftsetSelected,
      itemsList: list,
      badgePrefix: "R",
      hasSearchBar: true,
      searchBarType: "SearchBarWithTagFilter",
      searchValue: this.state.searchValue,
      handleChangeSearch: this.handleChangeSearch,
      handleRemoveFilter: this.handleRemoveFilter,
      tagList: refsetTypesNColors,
      handleSelectTag: this.handleSelectFilter,
      selectedTag: this.state.filterSelected,
      concepts: this.state.refsetSelected !== null ? this.state.refsetSelected.concept_keys : null,
      bodyData: bodyData
    });
    return /*#__PURE__*/React.createElement(SidePanel, {
      title: "Associar Refset",
      content: content,
      isSidePanelOpen: this.props.isSidePanelOpen,
      collapseSidePanel: () => this.props.collapseSidePanel(),
      onCancelChanges: () => this.handleCancelChanges(),
      onClosed: () => this.handleConfirmChanges()
    });
  }

}

_defineProperty(RefsetComponent, "contextType", CombinedContext);

const RefsetSettingsPanel = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(RefsetComponent, props));
};

export default RefsetSettingsPanel;