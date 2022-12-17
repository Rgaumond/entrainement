let currentWorkout = JSON.parse(localStorage.getItem("currentWorkout"));
let exercises = {};
let workoutAction = localStorage.getItem("workoutAction");
//let currentWorkout = {};
// /*****   swap global variable ******/
let swapStartX, swapStartY, swapDist;
let swapLocked = false;
let swampingObj = "";
let swapID = "";
jQuery(function () {
  loadHamburger();
  $(`#input-name`).val(currentWorkout.name);
  exercises = JSON.parse(localStorage.getItem("exercises"));
  workouts = JSON.parse(localStorage.getItem("workouts"));
  loadHandler();
  if (currentWorkout.exercises.length > 0)
    $(".list-li-container").prepend(listLiTemplate(childExercises()));
  childListCTAs();
});

const validateNewWorkout = () => {
  if (currentWorkout.exercises.length === 0) alert("Please add exercises");
  else if (validName()) {
    currentWorkout.name = $(`#input-name`).val();
    if (workoutAction === "add") workoutAdd(currentWorkout);
    else {
      workoutUpdate();
    }
  }
};

const childExercises = () => {
  let exArr = [];
  $.each(currentWorkout.exercises, (index, ex) => {
    exArr.push(
      exercises.find((obj) => {
        return obj._id === ex;
      })
    );
  });
  return exArr;
};

const validName = () => {
  let pass = true;
  f(workouts.length === 0);
  return true;
  if ($(`#input-name`).val() === "") {
    alert("Please enter a name");
    pass = false;
  } else {
    let sameNameObj = workouts.find((obj) => {
      return obj.name.toLowerCase() === $(`#input-name`).val().toLowerCase();
    });
    if (sameNameObj) {
      if (sameNameObj._id != currentWorkout._id) {
        alert("Name exists already");
        pass = false;
      }
    }
  }
  return pass;
};

const deleteChild = (index) => {
  currentWorkout.exercises.splice(index, 1);
  localStorage.setItem("currentWorkout", JSON.stringify(currentWorkout));
  window.location.href = "/views/workout.html";
};
