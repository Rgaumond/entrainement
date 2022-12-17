let exercises = JSON.parse(localStorage.getItem("exercises"));
let tempWorkout = JSON.parse(localStorage.getItem("tempWorkout"));
let exerciseAction = localStorage.getItem("exerciseAction");
let currentExercise = {};
let movements = [
  "Pecs",
  "Back",
  "Legs",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Core",
].sort();

jQuery(function () {
  loadHamburger();
  printList(exercises, "Exercises");
});
