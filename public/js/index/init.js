let lang;
jQuery(function () {
  cleanStorage();
  //updateIndex();
});

const cleanStorage = () => {
  localStorage.clear();
  localStorage.setItem("workoutAction", "workingOut");
  handler();
  $(".user")
    .on("click", function (e) {
      $(this).css("background-color", "aqua");
      let user = $(this).attr("user");
      localStorage.setItem("user", user);
      localStorage.setItem("lang", "E");
    })
    .on("touchend", function (e) {
      $(this).css("background-color", "antiquewhite");
    });
};

const updateIndex = () => {
  fetchExercises2();
};

const subUpdate = () => {
  $.each(workouts, (index, wk) => {
    $.each(wk.exercises, (ind, ex) => {
      let current = exercises.find((obj) => {
        return obj._id === ex;
      });
      current.index = ind;
      console.log(current.index);
      silentExerciseUpdate2(current);
    });
  });
  console.log(exercises);
};

const fetchExercises2 = (callback) => {
  fetch("../exercises/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  })
    .then((res) => res.json())
    .then((data) => {
      exercises = ArrayUtilities.sortByName(data.exercises);
      $.each(exercises, (index, ex) => {
        ex.user = "richard";
        silentExerciseUpdate2(ex);
      });
      console.log(exercises);
      //fetchWorkouts2();
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
};
const fetchWorkouts2 = (callback) => {
  fetch("../workouts/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: "richard" }),
  })
    .then((res) => res.json())
    .then((data) => {
      workouts = ArrayUtilities.sortByName(data.workouts);
      subUpdate();
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

const silentExerciseUpdate2 = (ex) => {
  exerciseClean();
  fetch("../exercises/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ex),
  }).then((res) => {});
};
