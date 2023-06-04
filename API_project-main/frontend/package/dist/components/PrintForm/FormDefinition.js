import styles from "./Styles";
import * as buildDatatype from "./BuildItemPDF/BuildItemPDF";
import { patientMetadata } from "./FormHeader/PatientMetadata";
import { titleForm } from "./FormHeader/TitleForm";
import { formMetadata } from "./FormHeader/FormMetadata";
import ob from "object-path";
import { handleInReport } from "../../assets/functions/HandleTasks/handleInReport";

const getTableWidths = index => {
  let widths;

  if (index === 1) {
    widths = ["0%", "100%"];
  } else if (index === 2) {
    widths = ["2%", "98%"];
  } else if (index === 3) {
    widths = ["4%", "96%"];
  } else if (index === 4) {
    widths = ["6%", "94%"];
  } else if (index === 5) {
    widths = ["8%", "92%"];
  } else if (index === 6) {
    widths = ["10%", "90%"];
  } else if (index > 6) {
    const infVal = 10 + 2 * (index - 6);
    const supVal = 90 - 2 * (index - 6);
    const infLimit = infVal.toString() + "%";
    const supLimit = supVal.toString() + "%";
    widths = [infLimit, supLimit];
  }

  return widths;
};

const buildSubForm = (jdt, values, pathArray, index, professionalTasks) => {
  let mergedJSON = JSON.parse(JSON.stringify(jdt));
  Object.keys(values).forEach(function (label) {
    const indexRemove = pathArray.length;
    const jdtLabel = label.split(".").slice(indexRemove);
    ob.set(mergedJSON, jdtLabel, values[label]);
    const sectionTitle = jdt.node.text;
    const n = index + 1;
    ob.set(mergedJSON, ["node", "text"], sectionTitle + " (" + n + ")");
  });
  return buildItemSubForm(mergedJSON, pathArray, professionalTasks);
};

const buildSingleItem = (item, pathArray, isAny = false, showLabel = 0, professionalTasks) => {
  let inReport;

  if (!item.TaskInReport) {
    inReport = false;
  } else {
    inReport = handleInReport(item, professionalTasks);
  }

  if (inReport) {
    const section = pathArray.filter(x => x === "items").length - 1;
    const widths = getTableWidths(section);
    return buildDatatype.buildItemPDF(item.dataType, item, widths, isAny, showLabel);
  }
};

const buildSection = (item, pathArray, professionalTasks) => {
  const section = pathArray.filter(x => x === "items").length;
  const widths = getTableWidths(section);
  let sectionStyle = 1;

  if (section > 4) {
    sectionStyle = 4;
  } else {
    sectionStyle = section;
  }

  let subItems = item.items.map((subItem, subItemIndex) => {
    let array = [];
    array.push("items", subItemIndex);
    return buildItem(subItem, pathArray.concat(array), professionalTasks);
  });
  let sectionContainer = {
    table: {
      dontBreakRows: true,
      widths: widths,
      body: [[{
        text: " ",
        border: [false, false, false, false]
      }, {
        text: item.node.text,
        border: [false, false, false, true],
        style: "section" + sectionStyle
      }]]
    },
    layout: {
      hLineWidth: function (i, node) {
        return 0.5;
      },
      vLineWidth: function (i, node) {
        return 0.5;
      },
      hLineColor: function (i, node) {
        return "black";
      },
      vLineColor: function (i, node) {
        return "black";
      }
    }
  };
  return [sectionContainer, subItems];
};

const buildItemSubForm = (item, pathArray, professionalTasks) => {
  if (item.data_type === "Title") {
    let inReport;

    if (!item.TaskInReport) {
      inReport = false;
    } else {
      inReport = handleInReport(item, professionalTasks);
    }

    if (inReport) {
      return buildSection(item, pathArray, professionalTasks);
    }
  } else {
    if (Array.isArray(item)) {
      let writtenFields = 0;
      item.forEach(function (obj) {
        if (obj.dataType === "DV_CODED_TEXT" && obj.value !== null || obj.dataType === "DV_TEXT" && obj.value !== null) {
          writtenFields += 1;
        }
      });
      let showLabel = 0;
      return item.map((itemAny, itemAnyIndex) => {
        if (writtenFields === 0 && itemAnyIndex === 0 || writtenFields !== 0 && itemAny.dataType === "DV_CODED_TEXT" && itemAny.value !== null || writtenFields !== 0 && itemAny.dataType === "DV_TEXT" && itemAny.value !== null) {
          showLabel += 1;
          return buildSingleItem(itemAny, pathArray, true, showLabel, professionalTasks);
        }

        return null;
      });
    } else {
      return buildSingleItem(item, pathArray, false, 0, professionalTasks);
    }
  }
};

const buildItem = (item, pathArray, professionalTasks) => {
  if (item.data_type === "Title") {
    let inReport;

    if (!item.TaskInReport) {
      inReport = false;
    } else {
      inReport = handleInReport(item, professionalTasks);
    }

    if (inReport) {
      if (Array.isArray(item.value)) {
        if (item.value.length > 0) {
          return item.value.map((section, index) => {
            if (section.values) {
              return buildSubForm(item, section.values, pathArray, index, professionalTasks);
            }
            /*eslint array-callback-return: ["error", { allowImplicit: true }]*/


            return; // retorna nada
          });
        }
      }

      return buildSection(item, pathArray, professionalTasks);
    }
  } else {
    if (Array.isArray(item)) {
      let writtenFields = 0;
      item.forEach(function (obj) {
        if (obj.dataType === "DV_CODED_TEXT" && obj.value !== null || obj.dataType === "DV_TEXT" && obj.value !== null) {
          writtenFields += 1;
        }
      });
      let showLabel = 0;
      return item.map((itemAny, itemAnyIndex) => {
        if (writtenFields === 0 && itemAnyIndex === 0 || writtenFields !== 0 && itemAny.dataType === "DV_CODED_TEXT" && itemAny.value !== null || writtenFields !== 0 && itemAny.dataType === "DV_TEXT" && itemAny.value !== null) {
          showLabel += 1;
          return buildSingleItem(itemAny, pathArray, true, showLabel, professionalTasks);
        }

        return null;
      });
    } else {
      return buildSingleItem(item, pathArray, false, 0, professionalTasks);
    }
  }
};

const getFormContent = (template, professionalTasks) => {
  let inReport;

  if (!template.TaskInReport) {
    inReport = false;
  } else {
    inReport = handleInReport(template, professionalTasks);
  }

  if (inReport) {
    let form = template.items.map((attribute, index) => {
      return attribute.map((att, attIndex) => {
        let array = [];
        att.TaskVisible.length > 0 && array.push("items", index, attIndex);
        return att.TaskVisible.length > 0 ? buildItem(att, array, professionalTasks) : null;
      });
    });
    return form;
  }
};

const formDefinition = (template, professionalTasks, patientData, reportData) => {
  let formContent = getFormContent(template, professionalTasks);
  let form = {
    info: {
      title: template.node.text
    },
    pageSize: "A4",
    pageOrientation: "portrait",
    pageMargins: [40, 50, 40, 50],
    content: [titleForm(template), {
      text: " ",
      style: "lineBreak"
    }, patientMetadata(patientData), {
      text: " ",
      style: "lineBreak"
    }, formMetadata(reportData), {
      text: " ",
      style: "lineBreak"
    }, formContent],
    styles: styles,
    pageBreakBefore: function (currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
      return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
    },
    header: function (currentPage, pageCount, pageSize) {
      if (currentPage !== 1) {
        return [{
          text: [patientData.episodio, " - ", patientData.nome, " - ", "Nome Serviço"],
          style: "footer"
        }];
      }
    },
    footer: function (currentPage, pageCount) {
      return [{
        text: "Centro Hospitalar do Porto - Página " + currentPage.toString() + " de " + pageCount,
        style: "footer"
      }];
    }
  };
  return form;
};

export { formDefinition };