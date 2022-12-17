const displayModifPage = () => {
  modifView();
  $(".modif-title").attr("type", fetchTranslation(current.object.label));
  if (current.object._id != 0) {
    $(".modif-title").html("(" + fetchTranslation("editView") + ")");
  } else {
    $(".modif-title").html("(" + fetchTranslation("addView") + ")");
  }
  buildModifComponents(current.object.type);
};

// const displayAddPage = () => {
//     if(current.object._id ===undefined)
//         current.object = currentList.options.find(obj => { return obj._id === listSelectedObject._id});
//     console.log("in"+current.object)
//     modifView();
//     $(".modif-title").attr("type", fetchTranslation(currentList.label));
//     if (objID) {
//         $(".modif-title").html("(" + fetchTranslation("editView") + ")");
//     }
//     else {
//         current.object = newBlankObj(currentList.type);
//         $(".modif-title").html("(" + fetchTranslation("addView") + ")");
//     }
//     buildModifComponents(currentList.type);
// };

const buildModifComponents = (type) => {
  $(".modif-subContainer").html(modifPageComponents());
  let hasChildren = false;
  switch (type) {
    case "exercise":
      $(".inputArea").append(exerciseModifPageComponents());
      $(`#input-name`).val(current.object.name);
      // $(`#input-name`).attr("objid", current.object._id);

      if (current.object.name === "")
        //adding
        $("#select-movementSelect").prepend(
          "<option value='Choose'>Choose</option>"
        );
      $(
        `#select-movementSelect option[value="${current.object.movement}"]`
      ).prop("selected", true);
      $(`#select-numSeries option[value="${current.object.sets.length}"]`).prop(
        "selected",
        true
      );
      $(
        `#select-restInterval option[value="${current.object.restInterval}"]`
      ).prop("selected", true);
      break;
    case "workout":
      currentWorkout = workouts.find((obj) => {
        return obj._id === current.object._id;
      });
      $(`#input-name`).val(current.object.name);
      $(`#input-name`).attr("objid", current.object._id);
      listWorkoutExercises(current.object);
      if (current.object.exercises.length > 0) hasChildren = true;
      addChildrenListCTAs(type);
      break;
  }
  if (hasChildren)
    $(".childContainer").attr("info", fetchTranslation("SwapLeftInfo"));
  modifNav();
};

const addChildrenListCTAs = (type) => {
  $(".childContainer").css({ height: childAreaHeight() + "px" });
  //place add button
  $(".childContainer").append(`<div class='addChild'>${faCirclePlus()}</div>`);
  $(".addChild").attr("type", type);
  var totalHeight = 0;
  $(".childContainer")
    .children()
    .each(function () {
      if (this.className !== "addChild")
        totalHeight = totalHeight + $(this).outerHeight(true);
    });
  if (totalHeight + 50 > childAreaHeight())
    $(".addChild").css({
      position: "fixed",
      top: childAreaHeight() + $(".childContainer").offset().top - 90,
    });
  else $(".addChild").css({ position: "absolute", top: totalHeight });
  childListCTAs();
};

const initReplaceChildExercise = (objID) => {
  let type = current.object.type;
  current.object.exercises.splice(
    clonedModifObj.Exercises.findIndex((obj) => obj._id === objID),
    1
  );
  listChildren(exercises, "exercise");
  $(`#li${objID}`).hide();
};
const modifNav = () => {
  $(".modif-nav").html("");
  $(".modif-nav").append(modifNaveTemplate());
  if (current.object._id === 0) {
    //adding
    $(".modif-delete").remove();
    $(".modif-nav").css({ "grid-template-columns": "50% 50%" });
    $(".modif-save").attr("label", fetchTranslation("add"));
  } else {
    $(".modif-nav").css({ "grid-template-columns": "33% 33% 33%" });
    $(".modif-save").attr("label", fetchTranslation("save"));
  }
  modifPageCTAs();
};

let childAreaHeight = () => {
  return (
    window.outerHeight -
    ($(".modif-title").outerHeight() +
      $(".modif-nav").outerHeight() +
      $(".inputArea").outerHeight())
  );
};

const deleteChild = (objID) => {
  if (confirm(fetchTranslation("delete"))) {
    current.object.exercises.splice(
      current.object.exercises.findIndex((obj) => obj === parseInt(objID)),
      1
    );
    displayModifPage();
  }
};

const listChildrenForUpdate = () => {
  listChildren(exercises, "exercise");
  $(".list-add-button").hide();
  $(".list-goback-button").show();
  $(".list-goback-button").attr("obj_id", current.object._id);
  $(".modif-container").hide();
};

let newBlankObj = (type) => {
  let newObj;
  switch (type) {
    case "exercise":
      newObj = newExercise();
      break;
    case "workout":
      newObj = newWorkout();
      break;
  }
  return newObj;
};
