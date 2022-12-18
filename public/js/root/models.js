const createNewObj = (objToCLone) => {
  if (objToCLone === "workout") newWorkout();
  else newExercise();
};

const newExercise = () => {
  let obj = {
    _id: 0,
    name: "",
    lastUpdate: "",
    movement: "",
    active: 0,
    restInterval: 0,
    sets: [],
    label: "Exercise",
    type: "exercise",
    update() {
      if (validateModif("exercise")) exerciseUpdate(current.object);
    },
    add() {
      if (validateModif("exercise")) exerciseAdd(current.object);
    },
  };
  localStorage.setItem("currentExercise", JSON.stringify(obj));
};
const newWorkout = () => {
  let obj = {
    _id: 0,
    name: "",
    active: 0,
    completed: 0,
    lastUpdate: "",
    completedDate: "",
    exercises: [],
    label: "Workout",
    type: "workout",
    update() {
      if (validateModif("exercise")) workoutUpdate(current.object);
    },
    add() {
      if (validateModif("exercise")) workoutAdd(current.object);
    },
  };
  localStorage.setItem("currentWorkout", JSON.stringify(obj));
};

const createBackupObj = (type) => {
  if (type === "workout")
    localStorage.setItem("tempWorkout", JSON.stringify(currentWorkout));
  else localStorage.setItem("tempExercise", JSON.stringify(currentExercise));
};

const updateWorkoutsArray = () => {
  let target = workouts.find((obj) => {
    return obj._id === currentWorkout._id;
  });
  target.name = currentWorkout.name;
  target.active = currentWorkout.active;
  target.completed = currentWorkout.completed;
  target.lastUpdate = currentWorkout.lastUpdate;
  target.completedDate = currentWorkout.completedDate;
  target.exercises = currentWorkout.exercises;
  localStorage.setItem("workouts", JSON.stringify(workouts));
};

const updateExercisesArray = () => {
  let target = exercises.find((obj) => {
    return obj._id === currentExercise._id;
  });
  target.name = currentExercise.name;
  target.active = currentExercise.active;
  target.movement = currentExercise.movement;
  target.lastUpdate = currentExercise.lastUpdate;
  target.restInterval = currentExercise.restInterval;
  target.sets = currentExercise.sets;
  localStorage.setItem("exercises", JSON.stringify(exercises));
};

const workoutEnhance = () => {
  $.each(workouts, (index, wk) => {
    wk.type = "workout";
    wk.label = "Workouts";
    wk.update = () => {
      if (validateModif("workout")) workoutUpdate(backToWorkoutList);
    };
    wk.add = () => {
      if (validateModif("workout")) workoutAdd();
    };
    wk.delete = () => {
      if (confirm(fetchTranslation("confirmDel"))) {
        workoutDelete();
      }
    };
    $.each(wk.exercises, (index, exercise) => {
      exercise.index = index;
    });
    wk.temp = "";
  });
};

const deleteDeadExerciseFromWorkouts = (exID) => {
  $.each(workouts, (index, wk) => {
    $.each(wk.exercises, (ind, ex) => {
      if (ex === exID) wk.exercises.splice(ind, 1);
    });
  });
  localStorage.setItem("workouts", JSON.stringify(workouts));
};
