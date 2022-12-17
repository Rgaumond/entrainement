const hamburgerCTAs = () => {
  $(".hamburger-link").on("click", function (e) {
    $(this).css("background-color", "aqua");
    let event = $(this).attr("event");
    switch (event) {
      case "workingOut":
        localStorage.setItem("workoutAction", "workingOut");
        window.location.href = "workoutList.html";
        break;
      case "editWorkout":
        localStorage.setItem("workoutAction", "edit");
        //createBackupObj("workout");
        window.location.href = "/views/workoutList.html";
        break;
      case "addWorkout":
        localStorage.setItem("workoutAction", "add");
        createNewObj("workout");
        window.location.href = "/views/workout.html";
        break;
      case "editExercise":
        localStorage.setItem("exerciseAction", "edit");
        //createBackupObj("exercise");
        window.location.href = "/views/exerciseList.html";
        break;
      case "addExercise":
        localStorage.setItem("exerciseAction", "add");
        createNewObj("exercise");
        window.location.href = "/views/exercise.html";
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
      case "goHome":
        window.location.href = "../";
        break;
    }
    e.preventDefault();
    $(this).css("background-color", "#FFF");
    closeHamburger();
  });
};
