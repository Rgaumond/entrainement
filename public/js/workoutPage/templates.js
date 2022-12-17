// const listLiTemplate = (objArray) => {
//   let ct = "";
//   $.each(objArray, (index, obj) => {
//     ct += `<li id='li${obj._id}' obj_id='${obj._id}' obj_index='${index}' ><div>${obj.name}</div></li>`;
//   });
//   return ct;
// };

const listLiTemplate = (objArray) => {
  let ct = "";
  $.each(objArray, (index, obj) => {
    ct += `<li id='li${index}' class='childli' obj_id='${obj._id}' obj_index='${index}' >${obj.name}`;

    ct += `<div id='childliactions${obj._id}' class='childLiAction'>
        <div class='childlidelete' obj_id='${
          obj._id
        }'  obj_index='${index}'>${faDeleteModif()}</div>
        <div class='childlireplace' obj_id='${
          obj._id
        }'  obj_index='${index}'>${faReplace()}</div>        
        <div class='childliactionsClose' obj_id='${
          obj._id
        }'  obj_index='${index}'>${faGoRight()}</div>
        </div>`;

    ct += ` </li >`;
  });
  return ct;
};
const sublistLiTemplate = (objArray, type) => {
  let ct = "";
  $.each(objArray, (index, obj) => {
    ct += `<li id='li${index}' class='childli' obj_id='${obj._id}' obj_index='${index}' >${obj.name}`;

    ct += `<div id='childliactions${obj._id}' class='childLiAction'>
        <div class='childlidelete' obj_id='${
          obj._id
        }'  obj_index='${index}'>${faDeleteModif()}</div>
        <div class='childlireplace' obj_id='${
          obj._id
        }'  obj_index='${index}'>${faReplace()}</div>        
        <div class='childliactionsClose' obj_id='${
          obj._id
        }'  obj_index='${index}'>${faGoRight()}</div>
        </div>`;

    ct += ` </li >`;
  });
  return ct;
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
