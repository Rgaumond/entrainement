let exercises = JSON.parse(localStorage.getItem("exercises"));
let workouts = JSON.parse(localStorage.getItem("workouts"));
let tempExercise = JSON.parse(localStorage.getItem("tempExercise"));
let currentExercise = JSON.parse(localStorage.getItem("currentExercise"));
let exerciseAction = localStorage.getItem("exerciseAction");
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
  let name = "";
  if (exerciseAction === "edit") {
    name = tempExercise.name;
  }
  $(".modif-title").append(modifTitle);
  $(".modif-container").append(modifPageComponents(name));
  $(".modif-subContainer").append(exerciseModifPageComponents());
  if (exerciseAction === "edit") {
    loadSelectValues();
  }
  modifPageCTAs();
});

const loadSelectValues = () => {
  $(`#select-movementSelect option[value="${currentExercise.movement}"]`).prop(
    "selected",
    true
  );
  $(`#select-numSeries option[value="${currentExercise.sets.length}"]`).prop(
    "selected",
    true
  );
  $(
    `#select-restInterval option[value="${currentExercise.restInterval}"]`
  ).prop("selected", true);
};

const validateModif = () => {
  resetAlerts();
  let pass = true;
  if ($(`#input-name`).val() === "") {
    alert(fetchTranslation("addNameEmpty"));
    $("label[for='input-name']").css({ color: "red", background: "yellow" });
    pass = false;
  } else {
    if (exercises.length > 0) pass = nameDoNotExist();
    else pass = true;
    if ($("#select-movementSelect").val() === "Choose") {
      alert(fetchTranslation("noMovement"));
      $("label[for='movementSelect']").css({
        color: "red",
        background: "yellow",
      });
      pass = false;
    } else if ($("#select-numSeries").val() === "Choose") {
      alert(fetchTranslation("noNumSeries"));
      $("label[for='numSeries']").css({ color: "red", background: "yellow" });
      pass = false;
    } else if ($("#select-restInterval").val() === "Choose") {
      alert(fetchTranslation("noInterval"));
      $("label[for='restInterval']").css({
        color: "red",
        background: "yellow",
      });
      pass = false;
    }
  }
  return pass;
};

const nameDoNotExist = () => {
  let pass = true;
  let sameNameObj = exercises.find((obj) => {
    return obj.name.toLowerCase() === $(`#input-name`).val().toLowerCase();
  });
  if (sameNameObj && currentExercise._id !== sameNameObj._id) {
    alert(fetchTranslation("nameExist"));
    $("label[for='input-add']").css({ color: "red", background: "yellow" });
    pass = false;
  }
  return pass;
};

const resetAlerts = () => {
  $("label").css({ color: "black", background: "#fff" });
};
