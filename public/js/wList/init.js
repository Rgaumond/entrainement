let workoutAction = localStorage.getItem("workoutAction");
let exercises = JSON.parse(localStorage.getItem("exercises"));
let workouts = JSON.parse(localStorage.getItem("workouts"));
let currentWorkout;
jQuery(function () {
  //localStorage.setItem("workoutAction", "workingOut");
  loadHamburger();
  loadWorkoutList();
});

const loadWorkoutList = () => {
  workouts = ArrayUtilities.sortByPropName(workouts, "lastUpdate");
  printList(workouts, "Workouts");
};

const loadExercises = () => {
  if (currentWorkout.exercises.length === 0)
    $(".list-li-container").append("No exercises");
  else {
    $.each($("li"), (ind, el) => {
      $(el).hide();
    });
    $("#li" + currentWorkout._id).show();
    let parent = $("#li" + currentWorkout._id).parent();
    let exArr = [];
    $.each(currentWorkout.exercises, (index, exID) => {
      let ex = exercises.find((obj) => {
        return obj._id === exID;
      });
      if (ex) {
        exArr.push(ex);
      } else {
        currentWorkout.exercises.splice(index, 1);
      }
    });
    printSublist(exArr, "exercise");
  }
};

// const applyLanguage = () => {
//   $(".modif-close").attr("label", fetchTranslation("bkToList"));
//   $(".modif-save").attr("label", fetchTranslation("save"));
//   $(".modif-delete").attr("label", fetchTranslation("delete"));
//   $(".modif-save").attr("label", fetchTranslation("add"));
//   $(".numPad__closePad").html(fetchTranslation("Close").toUpperCase());
// };

// const addWorkoutType = () => {
//   $.each(WORKOUTS, (index, wk) => {
//     wk.Filter = [];
//     $.each(wk.Exercises, (index, ex) => {
//       wk.Filter.push(
//         EXERCISES.find((obj) => {
//           return obj._id === ex;
//         }).Movement
//       );
//     });
//     $("#execute").val("updateWorkout");
//     $("#obj").val(cleanJSON(wk));
//     $("#id").val(wk._id);
//     processor.call("Frm", "postManager");
//   });
// };
