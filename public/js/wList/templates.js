const listContainerTemplate = (type) => {
  return `<div class='list-container-title' ><div class='list-title'>${fetchTranslation(
    type
  )}</div></div>`;
};

const listLiTemplate = (objArray) => {
  let ct = "";
  $.each(objArray, (index, obj) => {
    ct += `<li id='li${obj._id}' obj_id='${obj._id}' obj_index='${index}' obj_type="" filter='${obj.active}'><div>${obj.name}</div><div class='li-date'>(${obj.lastUpdate})</div></li>`;
  });
  return ct;
};
const sublistContainerTemplate = (type) => {
  return `<div class='list-container-title' ><div class='list-title'>${fetchTranslation(
    type
  )}</div></div><div class='list-li-container'></div>`;
};

const sublistLiTemplate = (objArray, type) => {
  let ct = "";

  $.each(objArray, (index, obj) => {
    ct += `<li id='li${obj._id}' obj_id='${obj._id}' obj_index='${index}' obj_type='${type}'  ><div>${obj.name}</div></li>`;
  });
  return ct;
};

const buildfilterList = (options) => {
  let ct = `<div id='select-filter'><ul>`;
  $.each(options, (index, op) => {
    let filter = 0;
    if (op === "Inactive") filter = 1;
    ct += `<li onclick="filterList('${filter}')" value='${op}'>${op}</li>`;
  });

  ct += `</ul ></div>`;
  return ct;
};
