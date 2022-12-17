const modifPageCTAs = () => {
  $(".modif-save").on("click", function () {
    if (validateModif()) {
      if (exerciseAction === "edit") exerciseUpdate(currentExercise);
      else exerciseAdd(currentExercise);
    }
  });
  $(".modif-delete").on("click", function () {
    let message = "Cancel update?";
    if (exerciseAction === "edit") message = "Delete exercise?";
    if (confirm(message)) {
      if (exerciseAction === "edit") exerciseDelete();
      else {
        localStorage.setItem("workoutAction", "workingOut");
        window.location.href = "exerciseList.html";
      }
    }
  });
};
