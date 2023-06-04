import { orderObjectByValue } from "../Order/orderObjectByValue"; // Tendo em conta que temos: items únicos, items Any (mesmo field com mais do que um datatype) e sections (tem vários items)

const handleOrder = (isSection, isSectionHover, dragPath, hoverPath, dragOrder, hoverOrder, showLabelDrag, showLabelHover, isAnyDrag, isAnyHover, formOrder) => {
  const immutableObj = orderObjectByValue(formOrder); // To guarantee the paths are by ascendent order while doing forEach

  let objOrder = { ...immutableObj
  };

  if (isSection) {
    // Drag is a section
    if (isSectionHover) {
      // Drag and drop are both sections
      let countSubItemsHover = 0;
      let countSubItemsDrag = 0;
      Object.keys(immutableObj).forEach(path => {
        if (path.indexOf(dragPath + ".") > -1 && path !== dragPath) {
          countSubItemsDrag += 1;
        } else if (path.indexOf(hoverPath + ".") > -1 && path !== hoverPath) {
          countSubItemsHover += 1;
        }
      });

      if (dragOrder > hoverOrder) {
        // Move up section
        objOrder[dragPath] = hoverOrder;
        let i = 0;
        let j = 0;
        let k = 0;
        Object.keys(immutableObj).forEach(path => {
          // Items are subitems of the drag section
          if (immutableObj[path] > dragOrder && immutableObj[path] <= dragOrder + countSubItemsDrag) {
            i += 1;
            objOrder[path] = hoverOrder + i;
          } // Items are subitems of the hover section 
          else if (immutableObj[path] >= hoverOrder && immutableObj[path] <= hoverOrder + countSubItemsHover) {
              j += 1;
              objOrder[path] = hoverOrder + countSubItemsDrag + j;
            } // Items are not subitems of either sections
            else if (immutableObj[path] > hoverOrder + countSubItemsHover && immutableObj[path] < dragOrder) {
                k += 1;
                objOrder[path] = hoverOrder + countSubItemsDrag + 1 + countSubItemsHover + k;
              }
        });
      } else if (dragOrder < hoverOrder) {
        // Move down section
        let newDragOrder = countSubItemsHover + hoverOrder - countSubItemsDrag;
        objOrder[dragPath] = newDragOrder;
        let i = 0;
        let j = 0;
        let k = 0;
        Object.keys(immutableObj).forEach(path => {
          // Items are subitems of the drag section
          if (immutableObj[path] > dragOrder && immutableObj[path] <= dragOrder + countSubItemsDrag) {
            i += 1;
            objOrder[path] = newDragOrder + i;
          } // Items are subitems of the hover section 
          else if (immutableObj[path] >= hoverOrder && immutableObj[path] <= hoverOrder + countSubItemsHover) {
              j += 1; // dragOrder - 1 + ((hoverOrder - (dragOrder + countSubItemsDrag)) - 1) + j 

              objOrder[path] = hoverOrder - countSubItemsDrag - 2 + j;
            } // Items are not subitems of either sections
            else if (immutableObj[path] < hoverOrder && immutableObj[path] > dragOrder + countSubItemsDrag) {
                k += 1;
                objOrder[path] = dragOrder - 1 + k;
              }
        });
      }
    } else if (!isSectionHover && isAnyHover === false) {
      // Drag is a section and drop is a item 
      let countSubItems = 0;
      Object.keys(immutableObj).forEach(path => {
        if (path.indexOf(dragPath + ".") > -1 && path !== dragPath) {
          countSubItems += 1;
        }
      });

      if (dragOrder > hoverOrder) {
        // Move up section
        objOrder[dragPath] = hoverOrder;
        let i = 0;
        Object.keys(immutableObj).forEach(path => {
          // Items are not subitems of the section
          if (immutableObj[path] < dragOrder && immutableObj[path] >= hoverOrder) {
            objOrder[path] = immutableObj[path] + (countSubItems + 1);
          } // Items are subitems of the section
          else if (immutableObj[path] > dragOrder && immutableObj[path] <= dragOrder + countSubItems) {
              i += 1;
              objOrder[path] = hoverOrder + i;
            }
        });
      } else if (dragOrder < hoverOrder) {
        // Move down section
        let newDragOrder = hoverOrder - countSubItems;
        objOrder[dragPath] = newDragOrder;
        let i = 0;
        Object.keys(immutableObj).forEach(path => {
          // Items are not subitems of the section
          if (immutableObj[path] > dragOrder + countSubItems && immutableObj[path] <= hoverOrder) {
            objOrder[path] = immutableObj[path] - (countSubItems + 1);
          } // Items are subitems of the section
          else if (immutableObj[path] > dragOrder && immutableObj[path] <= dragOrder + countSubItems) {
              i += 1;
              objOrder[path] = newDragOrder + i;
            }
        });
      }
    } else if (isAnyHover === true && showLabelHover === true) {
      // Drag is a section and drop is an Any item
      if (dragOrder > hoverOrder) {
        // Move up section
        let countSubItemsDrag = 0; // Doesn't include the title

        Object.keys(immutableObj).forEach(path => {
          if (path.indexOf(dragPath + ".") > -1 && path !== dragPath) {
            countSubItemsDrag += 1;
          }
        });
        objOrder[dragPath] = hoverOrder;
        let i = 0;
        Object.keys(immutableObj).forEach(path => {
          if (immutableObj[path] > dragOrder && immutableObj[path] <= dragOrder + countSubItemsDrag) {
            i += 1;
            objOrder[path] = hoverOrder + i;
          } else if (immutableObj[path] < dragOrder && immutableObj[path] >= hoverOrder) {
            objOrder[path] = immutableObj[path] + (countSubItemsDrag + 1);
          }
        });
      } else if (dragOrder < hoverOrder) {
        // Move down section
        let countSubItemsDrag = 0; // Doesn't include the title

        let anyItemsHover = []; // Includes the first item

        let countAnyItemsHover = 0; // Includes the first item

        Object.keys(immutableObj).forEach(path => {
          let query = hoverPath.split('.');
          query.pop();

          if (path.indexOf(query.join('.') + ".") > -1) {
            anyItemsHover.push(path);
            countAnyItemsHover += 1;
          }

          if (path.indexOf(dragPath + ".") > -1 && path !== dragPath) {
            countSubItemsDrag += 1;
          }
        });
        let newDragOrder = hoverOrder - countSubItemsDrag + countAnyItemsHover - 1;
        objOrder[dragPath] = newDragOrder;
        let i = 0;
        let j = 0;
        let k = 0;
        Object.keys(immutableObj).forEach(path => {
          if (immutableObj[path] > dragOrder && immutableObj[path] <= dragOrder + countSubItemsDrag) {
            i += 1;
            objOrder[path] = newDragOrder + i;
          } else if (anyItemsHover.indexOf(path) > -1) {
            j += 1;
            objOrder[path] = hoverOrder - countSubItemsDrag - 2 + j;
          } else if (immutableObj[path] > dragOrder + countSubItemsDrag && immutableObj[path] < hoverOrder) {
            k += 1;
            objOrder[path] = dragOrder - 1 + k;
          }
        });
      }
    }
  } else if (!isSection) {
    // Drag is not a section
    // It means the client is dragging a RM component
    // Falta considerar e testar com items Any
    // Falta considerar o caso em que o Drop é uma secção
    if (dragOrder === undefined) {
      objOrder[dragPath] = hoverOrder;
      Object.keys(immutableObj).forEach(path => {
        if (immutableObj[path] >= hoverOrder) {
          objOrder[path] = immutableObj[path] + 1; //move item up
        }
      });
    } // Move up item
    else if (dragOrder > hoverOrder) {
        if (isAnyDrag === true && showLabelDrag === true) {
          // Drag is an Any item => Drop can be anything
          let anyItems = []; // Doesn't include first item

          let countAnyItems = 0; // Doesn't include first item
          // verificar se há um anyItem

          Object.keys(immutableObj).forEach(path => {
            let query = dragPath.split('.');
            query.pop(); // comparar se no order existe algum path que contenha o caminho anterior - significa que é um anyItem

            if (path.indexOf(query.join('.') + ".") > -1 && path !== dragPath) {
              anyItems.push(path);
              countAnyItems += 1;
            }
          });
          objOrder[dragPath] = hoverOrder;
          let i = 0;
          Object.keys(immutableObj).forEach(path => {
            // se for o AnyItem, o valor do order - objOrder - fica o hoverOrder + o nº de anyItems encontrados até àquele path
            if (anyItems.indexOf(path) > -1) {
              i += 1;
              objOrder[path] = hoverOrder + i;
            } // se não for AnyItem, o valor do order - objOrder - fica o valor que tinha + o nº de anyItems + 1
            else if (immutableObj[path] >= hoverOrder && immutableObj[path] < dragOrder) {
                objOrder[path] = immutableObj[path] + countAnyItems + 1;
              }
          });
        } else {
          // Drag is a normal item (not Any item) => Drop can be anything
          objOrder[dragPath] = hoverOrder;
          Object.keys(immutableObj).forEach(path => {
            if (immutableObj[path] >= hoverOrder && immutableObj[path] < dragOrder) {
              objOrder[path] = immutableObj[path] + 1;
            }
          });
        }
      } // Move down item
      else if (dragOrder < hoverOrder) {
          if (isAnyDrag === true && showLabelDrag === true) {
            // Drag is an Any item
            if (!isSectionHover && isAnyHover === true && showLabelHover === true) {
              // Drop is an Any item
              let anyItemsDrag = []; // Doesn't include the first item

              let countAnyItemsDrag = 0; // Doesn't include the first item

              let anyItemsHover = []; // Includes the first item

              let countAnyItemsHover = 0; // Includes the first item

              Object.keys(immutableObj).forEach(path => {
                let queryDrag = dragPath.split('.');
                queryDrag.pop();
                let queryHover = hoverPath.split('.');
                queryHover.pop();

                if (path.indexOf(queryDrag.join('.') + ".") > -1 && path !== dragPath) {
                  anyItemsDrag.push(path);
                  countAnyItemsDrag += 1;
                }

                if (path.indexOf(queryHover.join('.') + ".") > -1) {
                  anyItemsHover.push(path);
                  countAnyItemsHover += 1;
                }
              });
              let newDragOrder = countAnyItemsHover + hoverOrder - countAnyItemsDrag - 1;
              objOrder[dragPath] = newDragOrder;
              let i = 0;
              let j = 0;
              let k = 0;
              Object.keys(immutableObj).forEach(path => {
                if (anyItemsDrag.indexOf(path) > -1) {
                  i += 1;
                  objOrder[path] = newDragOrder + i;
                } else if (anyItemsHover.indexOf(path) > -1) {
                  j += 1;
                  objOrder[path] = hoverOrder - countAnyItemsDrag - 2 + j;
                } else if (immutableObj[path] < hoverOrder && immutableObj[path] > dragOrder + countAnyItemsDrag) {
                  k += 1;
                  objOrder[path] = dragOrder - 1 + k;
                }
              });
            } else if (isSectionHover) {
              // Drop is a section
              let anyItemsDrag = []; // Doesn't include first item

              let countAnyItemsDrag = 0; // Doesn't include first item

              let subItemsHover = []; // Doesn't include section title

              let countSubItemsHover = 0; // Doesn't include section title

              Object.keys(immutableObj).forEach(path => {
                let queryDrag = dragPath.split('.');
                queryDrag.pop();

                if (path.indexOf(queryDrag.join('.') + ".") > -1 && path !== dragPath) {
                  anyItemsDrag.push(path);
                  countAnyItemsDrag += 1;
                }

                if (path.indexOf(hoverPath + ".") > -1 && path !== hoverPath) {
                  subItemsHover.push(path);
                  countSubItemsHover += 1;
                }
              });
              let newDragOrder = countSubItemsHover + 1 + hoverOrder - countAnyItemsDrag - 1;
              objOrder[dragPath] = newDragOrder;
              let i = 0;
              let j = 0;
              let k = 0;
              Object.keys(immutableObj).forEach(path => {
                if (anyItemsDrag.indexOf(path) > -1) {
                  i += 1;
                  objOrder[path] = newDragOrder + i;
                } else if (immutableObj[path] < hoverOrder && immutableObj[path] > dragOrder + countAnyItemsDrag) {
                  k += 1;
                  objOrder[path] = dragOrder - 1 + k;
                } else if (immutableObj[path] >= hoverOrder && immutableObj[path] <= hoverOrder + countSubItemsHover) {
                  j += 1;
                  objOrder[path] = hoverOrder - countAnyItemsDrag - 2 + j;
                }
              });
            } else if (!isSectionHover && isAnyHover === false) {
              // Drop is not a section => normal item
              let anyItems = [];
              let countAnyItems = 0;
              Object.keys(immutableObj).forEach(path => {
                let query = dragPath.split('.');
                query.pop();

                if (path.indexOf(query.join('.') + ".") > -1 && path !== dragPath) {
                  anyItems.push(path);
                  countAnyItems += 1;
                }
              });
              let newDragOrder = hoverOrder - countAnyItems;
              objOrder[dragPath] = newDragOrder;
              let i = 0;
              let j = 0;
              Object.keys(immutableObj).forEach(path => {
                if (anyItems.indexOf(path) > -1) {
                  i += 1;
                  objOrder[path] = newDragOrder + i;
                } else if (immutableObj[path] <= hoverOrder && immutableObj[path] > dragOrder + countAnyItems) {
                  j += 1;
                  objOrder[path] = dragOrder + j - 1;
                }
              });
            }
          } else {
            // Drag is a normal item (not Any item or a section)
            if (!isSectionHover && isAnyHover === true && showLabelHover === true) {
              // Drop is an Any item
              let anyItemsHover = []; // Includes the first item

              let countAnyItemsHover = 0; // Includes the first item

              Object.keys(immutableObj).forEach(path => {
                let query = hoverPath.split('.');
                query.pop();

                if (path.indexOf(query.join('.') + ".") > -1) {
                  anyItemsHover.push(path);
                  countAnyItemsHover += 1;
                }
              });
              let newDragOrder = countAnyItemsHover + hoverOrder - 1;
              objOrder[dragPath] = newDragOrder;
              let i = 0;
              let j = 0;
              Object.keys(immutableObj).forEach(path => {
                if (immutableObj[path] > dragOrder && immutableObj[path] < hoverOrder) {
                  i += 1;
                  objOrder[path] = dragOrder - 1 + i;
                } else if (anyItemsHover.indexOf(path) > -1) {
                  j += 1;
                  objOrder[path] = hoverOrder - 2 + j;
                }
              });
            } else if (!isSectionHover && isAnyHover === false) {
              // Drop is not a section => is a normal item
              objOrder[dragPath] = hoverOrder;
              Object.keys(immutableObj).forEach(path => {
                if (immutableObj[path] <= hoverOrder && immutableObj[path] > dragOrder) {
                  objOrder[path] = immutableObj[path] - 1;
                }
              });
            } else if (isSectionHover) {
              // Drop is a section
              let subItemsHover = []; // Doesn't include the section title

              let countSubItemsHover = 0; // Doesn't include the section title
              // ir buscar todos os subItems da secção onde está a ser feito o drop

              Object.keys(immutableObj).forEach(path => {
                if (path.indexOf(hoverPath + ".") > -1 && path !== hoverPath) {
                  subItemsHover.push(path);
                  countSubItemsHover += 1;
                }
              });
              let newDragOrder = countSubItemsHover + hoverOrder;
              objOrder[dragPath] = newDragOrder;
              let i = 0;
              let j = 0;
              Object.keys(immutableObj).forEach(path => {
                if (subItemsHover.indexOf(path) > -1) {
                  i += 1;
                  objOrder[path] = hoverOrder - 2 + i;
                } else if (immutableObj[path] < hoverOrder && immutableObj[path] > dragOrder) {
                  j += 1;
                  objOrder[path] = dragOrder - 1 + j;
                }
              });
            }
          }
        }
  }

  return objOrder;
};

export { handleOrder };