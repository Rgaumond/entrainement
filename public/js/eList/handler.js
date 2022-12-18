const listEvent = () => {
  $("#list-filter-icon").on("click", function (e) {
    $(this).hide();
    $("#select-filter").show();
  });
  $(".list-container li")
    .on("click", function (e) {
      $(this).css("background-color", "aqua");
      let objID = parseInt($(this).attr("obj_id"));
      if (exerciseAction === "addChild" || exerciseAction === "replaceChild") {
        currentWorkout = JSON.parse(localStorage.getItem("currentWorkout"));
        if (exerciseAction === "addChild") {
          currentWorkout.exercises.push(objID);
        } else {
          currentWorkout.exercises[localStorage.getItem("childIndex")] = objID;
          localStorage.getItem("childIndex");
        }
        localStorage.setItem("currentWorkout", JSON.stringify(currentWorkout));
        window.location.href = "/views/workout.html";
      } else {
        currentExercise = exercises.find((obj) => {
          return obj._id === objID;
        });
        createBackupObj("exercise");
        localStorage.setItem(
          "currentExercise",
          JSON.stringify(currentExercise)
        );
        window.location.href = "/views/exercise.html";
      }
    })
    .on("touchend", function (e) {
      $(this).css("background-color", "antiquewhite");
    });
  $("#list-filter-icon").on("click", function (e) {
    $(this).hide();
  });
};
