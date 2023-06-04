import { orderObjectByValue } from "../Order/orderObjectByValue"; // Esta função lida com o seguinte caso particular: mover itens dentro de um campo do any

const handleOrderAnyItens = (dragPath, dragOrder, hoverOrder, formOrder) => {
  const immutableObj = orderObjectByValue(formOrder); // To guarantee the paths are by ascendent order while doing forEach

  let objOrder = { ...immutableObj
  };

  if (dragOrder > hoverOrder) {
    // Move up section
    let query = dragPath.split(".");
    query.pop();
    objOrder[dragPath] = hoverOrder;
    Object.keys(immutableObj).forEach(path => {
      if (path.indexOf(query.join(".") + ".") > -1 && path !== dragPath) {
        if (immutableObj[path] >= hoverOrder && immutableObj[path] < dragOrder) {
          objOrder[path] = immutableObj[path] + 1;
        }
      }
    });
  } else if (dragOrder < hoverOrder) {
    // Move down
    let query = dragPath.split(".");
    query.pop();
    objOrder[dragPath] = hoverOrder;
    Object.keys(immutableObj).forEach(path => {
      if (path.indexOf(query.join(".") + ".") > -1 && path !== dragPath) {
        if (immutableObj[path] <= hoverOrder && immutableObj[path] > dragOrder) {
          objOrder[path] = immutableObj[path] - 1;
        }
      }
    });
  }

  return objOrder;
};

export { handleOrderAnyItens };