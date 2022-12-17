const loadHandler = () => {
  modifPageCTAs();
  childListCTAs();
};

const modifPageCTAs = () => {
  $(".modif-save").on("click", function () {
    validateNewWorkout();
  });
  $(".modif-delete").on("click", function () {
    let message = "Cancel update?";
    if (workoutAction === "edit") message = "Delete workout?";
    if (confirm(message)) {
      if (workoutAction === "edit") workoutDelete();
      else {
        localStorage.setItem("workoutAction", "workingOut");
        window.location.href = "workoutList.html";
      }
    }
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
    localStorage.setItem("exerciseAction", "replaceChild");
    localStorage.setItem("childIndex", $(this).attr("obj_index"));
    window.location.href = "/views/exerciseList.html";
  });
  $(".childlidelete").on("click", function () {
    objIndex = parseInt($(this).attr("obj_index"));
    deleteChild(objIndex);
  });
  $(".childliactionsClose").on("click", function (e) {
    $(".childLiAction").css({ width: 0 });
    swapLocked = false;
    swapID = "";
    e.preventDefault();
  });
  $(".addChild").on("click", function () {
    currentWorkout.name = $(`#input-name`).val();
    localStorage.setItem("currentWorkout", JSON.stringify(currentWorkout));
    localStorage.setItem("exerciseAction", "addChild");
    window.location.href = "/views/exerciseList.html";
  });
};
