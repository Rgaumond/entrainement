let listType = "";
const listContainerTemplate = (type) => {
  listType = type;
  let title = "";
  if (type === "Workouts") {
    if (workoutAction === "workingOut") title = "WorkingOut";
    else title = "WorkoutsEdit";
  } else title = "ExerciseEdit";

  return `<div class='list-container-title' ><div class='list-title'>${fetchTranslation(
    title
  )}</div></div>`;
};

const listLiTemplate = (objArray) => {
  let ct = "";
  $.each(objArray, (index, obj) => {
    let filterValue = "";
    if (listType === "Workouts") filterValue = obj.active;
    else filterValue = obj.movement;
    ct += `<li id='li${obj._id}' obj_id='${obj._id}' obj_index='${index}' filter='${filterValue}'><div>${obj.name}</div><div class='li-date'>(${obj.lastUpdate})</div></li>`;
  });
  return ct;
};

const buildfilterList = (options) => {
  let ct = `<div id='select-filter'><ul>`;
  $.each(options, (index, op) => {
    ct += `<li onclick="filterList('${op}')" value='${op}'>${op}</li>`;
  });
  ct += `</ul ></div>`;
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
