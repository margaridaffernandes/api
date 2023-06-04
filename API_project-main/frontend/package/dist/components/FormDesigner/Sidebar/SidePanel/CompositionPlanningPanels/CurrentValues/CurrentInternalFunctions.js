import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const CurrentInternalFunctions = props => {
  let currentValues = null;

  if (Array.isArray(props.value) && props.value.length > 0) {
    currentValues = /*#__PURE__*/React.createElement("div", {
      style: {
        paddingBottom: "20px"
      },
      className: "flex w-full"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex w-full flex-col"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-gray-700 text-10 xxl:text-11 xxxl:text-xs leading-tight font-bold"
    }, props.jsonTitle), /*#__PURE__*/React.createElement("div", {
      style: {
        paddingTop: "2px"
      },
      className: "flex flex-col w-full flex-wrap"
    }, props.value.map((x, index) => {
      return /*#__PURE__*/React.createElement("div", {
        key: index,
        className: "flex w-full flex-col mt-2"
      }, /*#__PURE__*/React.createElement("p", {
        className: "text-gray-700 text-11 xxxl:text-xs leading-tight break-all"
      }, `${x.type.toString()}:`), x.type === "Preenchimento automático de campos" && Object.keys(x.affectedFields).map(y => {
        return /*#__PURE__*/React.createElement("div", {
          key: y,
          className: "flex w-full flex-row items-center pt-1"
        }, /*#__PURE__*/React.createElement("p", {
          className: "text-gray-700 text-9 xl:text-10 xxl:text-11 xxxl:text-xs leading-tight break-all"
        }, x.affectedFields[y].resColumn !== null ? `Campo a preencher: ${x.affectedFields[y].name} | Refset: ${x.affectedFields[y].refsetName} | Coluna resultado: ${x.affectedFields[y].resColumn} | Dependências: ${x.affectedFields[y].dependencies.map(obj => {
          return `Campo: ${obj.field.name} & Coluna: ${obj.columnRef}`;
        }).toString()}` : `Campo a preencher: ${x.affectedFields[y].name} | Refset: ${x.affectedFields[y].refsetName} | Colunas resultado: ${x.affectedFields[y].codeColumn}, ${x.affectedFields[y].textColumn} | Dependências: ${x.affectedFields[y].dependencies.map(obj => {
          return `Campo: ${obj.field.name} & Coluna: ${obj.columnRef}`;
        }).toString()}`), /*#__PURE__*/React.createElement("div", {
          style: {
            paddingLeft: "5px"
          },
          onClick: () => props.handleRemoveItem(x.type, x.affectedFields[y]),
          className: "flex text-red-500 hover:text-red-600 cursor-pointer"
        }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
          size: "xs",
          icon: faTimes,
          style: {
            width: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1390 ? "10px" : "12px",
            height: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1390 ? "10px" : "12px"
          }
        })));
      }));
    }))));
  }

  return currentValues;
};

export default CurrentInternalFunctions;