const printList = (arr, label) => {
  $(".list-li-container").html("");
  $(".list-header").append(listContainerTemplate(label));
  $(".list-li-container").append(listLiTemplate(arr));
  $(".list-li-container").attr("obj_type", label);
  $(".list-container").css({ display: "block" });
  $(".list-container").show();
  //addLiAttr(obj, currentList.filter); Acitve filter
  $(".list-container-title").append(listFilter(label));
  $(".list-container-title").append(
    `<div id='list-filter-icon'>${filterIcon()}</div>`
  );
  listEvent();
};

const printSublist = (arr, type) => {
  $(".list-li-container").append(sublistLiTemplate(arr, type));
  listEvent();
};

const listFilter = (type) => {
  let options;
  switch (type) {
    case "Exercises":
      options = movements;
      options.unshift("All");
      break;
    case "Workouts":
      //options = fetchExerciseMovements();
      options = ["All", "Active", "Inactive"];
      break;
  }
  return buildfilterList(options);
};

const printActiveList = (options, title) => {
  $(".list-container").html("");
  $(".list-container").append(listContainerTemplate(title));
  $(".list-li-container").append(listActiveLiTemplate(options));
  listView();
};

const listChildren = (obj, type) => {
  setList(type);
  printList();
  listEvent(); //in eventHandler
  addLiAttr(obj, currentList.filter);
  $(".list-container-title").append(listFilter(type));
};

const setList = (type) => {
  currentList.type = type;
  // currentList.action =  displayModifPage;
  switch (type) {
    case "exercise":
      currentList.label = "Exercises";
      currentList.filter = "movement";
      currentList.options = exercises;
      currentList.add = () => {
        return newExercise();
      };
      break;
    case "workout":
      currentList.label = "Workouts";
      currentList.filter = "active";
      currentList.options = workouts;
      currentList.add = () => {
        return newWorkout();
      };
      break;
  }
};

const addLiAttr = (ObjArr, targetKey) => {
  $.each(ObjArr, (i, obj) => {
    let filterValue = obj[targetKey];
    if (targetKey === "Active") {
      filterValue = filterValue === 1 ? "Active" : "Inactive";
    }
    $(`#li${obj._id}`).attr("filter", filterValue);
  });
};

const filterList = (value) => {
  $(".list-container li").hide();
  switch ($(".list-li-container").attr("obj_type")) {
    case "Exercises":
      if (value === "All") $(".list-container li").show();
      else $(`.list-container li[filter='${value}']`).show();
      break;
    case "Workouts":
      $(`.list-container li[filter='${value}']`).show();
      break;
  }
  $("#select-filter").hide();
  $("#list-filter-icon").show();
};

const backToList = () => {
  listChildren(current.object, displayModifPage);
};
