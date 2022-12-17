const listLiTemplate = (objArray) => {
  let ct = "";
  $.each(objArray, (index, obj) => {
    ct += `<li id='li${obj._id}' obj_id='${obj._id}' obj_index='${index}' filter='${obj.movement}' ><div>${obj.name}</div></li>`;
  });
  return ct;
};

/********************************  LIST  ***************************************** */
const listContainerTemplate = (type) => {
  return `<div class='list-container-title' ><div class='list-title'>${fetchTranslation(
    type
  )}</div></div><div class='list-li-container'></div>`;
};

// const sublistContainerTemplate = (type) => {
//   return `<div class='list-container-title' ><div class='list-title'>${fetchTranslation(
//     type
//   )}</div></div><div class='list-li-container'></div>`;
// };

// const sublistLiTemplate = (objArray) => {
//   let ct = "";
//   $.each(objArray, (index, obj) => {
//     ct += `<li id='li${obj._id}' obj_id='${obj._id}' obj_index='${index}' ><div>${obj.name}</div></li>`;
//   });
//   return ct;
// };
