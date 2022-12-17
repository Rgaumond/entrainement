const listEvent = () => {
  $(".list-container li")
    .on("click", function (e) {
      $(this).css("background-color", "aqua");
      let objID = parseInt($(this).attr("obj_id"));
      let objIndex = parseInt($(this).attr("obj_index"));
      let objtype = $(this).attr("obj_type");
      if (objtype === "exercise") loadTraining(objID);
      else showChildExercises(objID);
    })
    .on("touchend", function (e) {
      $(this).css("background-color", "antiquewhite");
    });
};

const loadTraining = (objID) => {
  localStorage.setItem("exerciseAction", "workingOut");
  let currentExercise = exercises.find((obj) => {
    return obj._id === objID;
  });
  localStorage.setItem("currentExercise", JSON.stringify(currentExercise));
  window.location.href = "workingOut.html";
};

const showChildExercises = (objID) => {
  currentWorkout = workouts.find((obj) => {
    return obj._id === objID;
  });
  localStorage.setItem("currentWorkout", JSON.stringify(currentWorkout));
  if (workoutAction === "workingOut") {
    loadExercises();
  } else if (workoutAction === "edit") {
    createBackupObj("workout");
    window.location.href = "workout.html";
  }
};
