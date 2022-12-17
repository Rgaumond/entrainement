let showHamburger = () => {
  $(".hamburgerContainer").show();
};

let closeHamburger = () => {
  $(".hamburgerContainer").hide();
};

let loadHamburger = () => {
  var path = window.location.pathname;
  var page = path.split("/").pop();

  $.each(hamburgerLinks, (index, link) => {
    $(".hamburgerContainer").append(
      buildHAmburgerButton(link.label, link.event)
    );
  });
  if (page === "workingOut.html") {
    $.each(exercisePageLinks, (index, link) => {
      $(".hamburgerContainer").append(
        buildHAmburgerButton(link.label, link.event)
      );
    });
  }
  $(".hamburgerContainer").append(buildHAmburgerButton("Home", "goHome"));
  hamburgerCTAs();
};

let hamburgerLinks = [
  { label: "WorkingOut", event: "workingOut" },
  { label: "WorkoutsEdit", event: "editWorkout" },
  { label: "WorkoutsAdd", event: "addWorkout" },
  { label: "ExerciseEdit", event: "editExercise" },
  { label: "ExerciseAdd", event: "addExercise" },
];
let exercisePageLinks = [
  { label: "Timer30", event: "Timer30()" },
  { label: "Timer45", event: "Timer45()" },
  { label: "Timer60", event: "Timer60()" },
];

let buildHAmburgerButton = (label, event) => {
  let ct = `<div class='hamburger-link' event="${event}">${fetchTranslation(
    label
  )}</div>`;
  return ct;
};
