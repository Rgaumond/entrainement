const listEvent = () => {
  $(".list-container li")
    .on("click", function (e) {
      $(this).css("background-color", "aqua");
      let objID = parseInt($(this).attr("obj_id"));
      current.action(objID);
    })
    .on("touchend", function (e) {
      $(this).css("background-color", "antiquewhite");
    });
  $(".list-add-button").on("click", function () {
    current.object = currentList.add();
    displayModifPage();
  });
  $(".list-goback-button").on("click", function () {
    let objID = parseInt($(this).attr("obj_id"));
    displayModifPage(objID);
  });
};

$(".numPad__key")
  .on("touchstart", function () {
    $(this).css("background-color", "cyan");
    let event = $(this).attr("event");
    if (event === "workoutList") showNextSeries();
    else if (event === "enter") serieChange();
    else if (event === "closePad") {
      closeNumPad();
    } else updateSerieUnitValue($(this).html());
  })
  .on("touchend", function () {
    let event = $(this).attr("event");
    if (event === "closePad") $(this).css("background-color", "yellow");
    else $(this).css("background-color", "aliceblue");
  });
$(".numPad__closePad").on("click", function () {
  $(this).css("background-color", "cyan");
  closeNumPad();
  $(this).css("background-color", "yellow");
});

$(".completed").on("touchend", function () {
  window.location.reload(true);
});

let handleSerieMods = () => {
  $(".serie > div[unit]").on("click", function () {
    directSelect(
      Number($(this).parent().attr("setIndex")),
      $(this).attr("unit")
    );
  });
};

const childListCTAs = () => {
  let objID;
  let orgObjIndex;
  $(".childli")
    .on("touchstart", function (e) {
      objID = $(this).attr("id");
      orgObjIndex = parseInt($(this).attr("obj_index"));
      if (
        !swapLocked ||
        objID !== swapID ||
        $(`#${objID} .childLiAction`).width() === 0
      ) {
        $(".childLiAction").css({ width: 0 });
        swapLocked = false;
      }
      let touchobj = e.changedTouches[0];
      swapDist = 0;
      swapStartX = touchobj.pageX;
      swapStartY = touchobj.pageY;
      //  e.preventDefault();
    })
    .on("touchmove", function (e) {
      let touchobj = e.changedTouches[0];
      if (
        touchobj.pageX < swapStartX &&
        Math.abs(touchobj.pageY - swapStartY) <= 100 &&
        !swapLocked
      ) {
        let newWidth = Math.abs(swapStartX - touchobj.pageX);
        $(`#${objID} .childLiAction`).css({ width: newWidth + "px" });
        if (newWidth > 100) {
          // e.preventDefault();
          swapLocked = true;
          swapID = objID;
          $(`#${objID} .childLiAction`).css({ width: "300px" });
          //  $(`#${objID} .childLiAction`).css({ "width": newWidth + "px" });
        }
      }
    })
    .on("touchend", function (e) {
      $(this).css("background-color", "antiquewhite");
    });
  $(".childlireplace").on("click", function () {
    current.object.temp = $(this).attr("obj_index"); //putting the id to replace in container
    current.action = (id) => {
      replaceChildExercise(id);
      displayModifPage();
    };
    listChildrenForUpdate();
  });
  if (workingOut) {
    $(".childli").on("click", function (e) {
      objID = parseInt($(this).attr("obj_id"));
      orgObjIndex = parseInt($(this).attr("obj_index"));
      printExerciseSets(objID, orgObjIndex);
    });
  } else {
    $(".childlidelete").on("click", function () {
      objID = parseInt($(this).attr("obj_id"));
      deleteChild(objID);
    });
    $(".childliactionsClose").on("click", function (e) {
      $(".childLiAction").css({ width: 0 });
      swapLocked = false;
      swapID = "";
      e.preventDefault();
    });
    $(".addChild").on("click", function () {
      current.action = (id) => {
        addWorkoutExercise(id);
        displayModifPage();
      };
      listChildrenForUpdate();
    });
  }
};

const modifPageCTAs = () => {
  $(".modif-save").on("click", function () {
    if (current.object._id === 0)
      //New object
      current.object.add();
    else current.object.update();
  });

  $(".modif-close").on("click", function () {
    if (current.object.type === "exercise") fetchExercises(backToExerciseList);
    else fetchWorkouts(backToWorkoutList);
  });

  $(".modif-delete").on("click", function () {
    current.object.delete();
  });
};

const hamburgerCTAs = () => {
  $(".hamburger-link").on("click", function (e) {
    workingOut = false;
    $(this).css("background-color", "aqua");
    let event = $(this).attr("event");
    current.action = (id) => {
      current.object = current.masterArray.find((obj) => {
        return obj._id === id;
      });
      displayModifPage();
    };
    switch (event) {
      // case "current":
      //     SELECTED_SERIE = null;
      //     loadActiveWorkout();
      //     break;
      // case "currentWorkout":
      //     listActiveWorkout();
      //     break;
      case "modifList(WOA)":
        workingOut = true;
        current.masterArray = workouts;
        listChildren(workouts, "workout");
        break;
      case "modifList(EX)":
        current.masterArray = exercises;
        listChildren(exercises, "exercise");
        break;
      case "modifList(WO)":
        workingOut = false;
        current.masterArray = workouts;
        listChildren(workouts, "workout");
        break;
      case "Timer30()":
        chronoStart(30);
        break;
      case "Timer45()":
        chronoStart(45);
        break;
      case "Timer60()":
        chronoStart(60);
        break;
    }
    e.preventDefault();
    $(this).css("background-color", "#FFF");
    closeHamburger();
  });
};

// const childWorkoutListEvent = () => {
//     $(".list-container li").on('click', function (e) {
//         $(this).css("background-color", "aqua");
//         $(this).css("background-color", "antiquewhite");
//         let objID = $(this).attr('obj_id');
//         SELECTED_WORKOUT = WORKOUTS.find(obj => { return obj._id === parseInt($(this).attr('obj_id')) });
//         SELECTED_SERIE = null;
//         printWokoutSeries();
//     })
// };
