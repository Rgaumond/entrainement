let lang;
jQuery(function () {
  cleanStorage();
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
