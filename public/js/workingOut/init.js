let currentExercise = JSON.parse(localStorage.getItem("currentExercise"));
let currentWorkout = JSON.parse(localStorage.getItem("currentWorkout"));
let exerciseAction = localStorage.getItem("exerciseAction");
let exercises = JSON.parse(localStorage.getItem("exercises"));
let workouts = JSON.parse(localStorage.getItem("workouts"));
let selectedSet = null;

jQuery(function () {
  loadHamburger();
  if (exerciseAction === "workingOut") {
    initializeSets();
  }
});
