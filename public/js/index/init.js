let lang;
jQuery(function () {
  handler();
  cleanStorage();
});

const cleanStorage = () => {
  localStorage.clear();
  localStorage.setItem("workoutAction", "workingOut");
  //fetchExercises();
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
