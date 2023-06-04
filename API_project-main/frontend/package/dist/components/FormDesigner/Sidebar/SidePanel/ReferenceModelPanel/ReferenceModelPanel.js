import React, { useContext, useEffect, useState } from "react";
import SidePanel from "../SidePanel";
import CombinedContext from "../../../../../contexts/CombinedContext";
import DraggableItemsList from "../../../UI/DraggableItems/DraggableItemsList";
import Accordion from "../../../UI/Accordion/Accordion";
import Dropdown from "../../../UI/DropdownWithoutContainer/Dropdown";
import DraggableItem from "../../../UI/DraggableItems/DraggableItem";
import axios from "axios";
import { getEnvUrl } from "../../../../../environment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const ReferenceModelPanel = props => {
  const context = useContext(CombinedContext);
  const [rmComponents, setRmComponents] = useState([]);
  const [currentItemPath, setCurrentItemPath] = useState("");
  useEffect(() => {
    //VER SE O PATH ACTUAL ESTÁ ASSOCIADO A UM COMPONENTE DO REFERENCE MODEL
    if (context.rmData.rmJDT !== null) {
      let type = [];

      for (const i of Object.keys(context.rmData.rmJDT)) {
        if (context.composition.openCompositionPlanningPath === i) {
          type.push(context.rmData.rmJDT[i].rm_type);
        } else if (i === "" && context.composition.openCompositionPlanningPath === "root") {
          type.push(context.rmData.rmJDT[i].rm_type);
        }
      }

      (async () => {
        axios({
          method: "post",
          url: `${getEnvUrl('aidaforms', '4011')}/getRM`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + context.token
          },
          data: {
            rm_type: type
          }
        }).then(res => {
          if (res.data.success === true) {
            setRmComponents(res.data.data);
            setCurrentItemPath(context.composition.openCompositionPlanningPath);
          }
        });
      })();
    }
  }, [context.composition.openCompositionPlanningPath]);
  let accordionData = [];
  let accordionData2 = [];
  let accordionData3 = [];
  let dataList;
  let contentData;
  let content;
  content = /*#__PURE__*/React.createElement("div", {
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

  if (rmComponents !== undefined) {
    rmComponents.forEach(item => {
      if (item.data !== null) {
        item.data.forEach(it => {
          if (it.items) {
            //tem items do 2º nível - significa que pode ter draggableItems ou mais níveis de hierarquia
            dataList = it.items;
            it.items.forEach(i => {
              //tem items do 3º nível
              if (i.items) {
                accordionData3.push({
                  title: i.itemName,
                  content: /*#__PURE__*/React.createElement(DraggableItemsList, {
                    data: i.items,
                    path: currentItemPath
                  })
                }); // se tem items significa que não pode ser um draggableItem então tem que ser um nested accordion

                contentData = /*#__PURE__*/React.createElement(Dropdown, {
                  dropData: accordionData3
                }); // o item tem que ser removido da lista de draggableItems

                dataList = dataList.filter(el => el !== i);
              }
            });
            accordionData2.push({
              title: it.itemName,
              content: contentData ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DraggableItemsList, {
                data: dataList,
                path: currentItemPath
              }), contentData) : /*#__PURE__*/React.createElement(DraggableItemsList, {
                data: dataList,
                path: currentItemPath
              })
            });
          } //não tem items do 2º nível - significa que é um draggableItem
          else {
              accordionData2.push({
                title: it.itemName,
                content: /*#__PURE__*/React.createElement(DraggableItem, {
                  handleRM: context.rmData.handleAddRM,
                  data: it,
                  isRM: true,
                  path: it.itemPath,
                  pathRM: currentItemPath
                })
              });
            }
        });
        accordionData.push({
          title: item.rm_type,
          content: /*#__PURE__*/React.createElement(Dropdown, {
            dropData: accordionData2
          })
        });
        accordionData2 = [];
        content = /*#__PURE__*/React.createElement(Accordion, {
          accordionData: accordionData
        });
      }
    });
  }

  return /*#__PURE__*/React.createElement(SidePanel, {
    title: "Componentes do Reference Model",
    content: content,
    isSidePanelOpen: props.isSidePanelOpen,
    collapseSidePanel: () => props.collapseSidePanel(),
    onCancelChanges: () => this.handleCancelChanges(),
    onClosed: () => this.handleConfirmChanges()
  });
};

export default ReferenceModelPanel;