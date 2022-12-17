const handler = () => {
  $(".user")
    .on("click", function (e) {
      $(this).css("background-color", "aqua");
      let user = $(this).attr("user");
      localStorage.setItem("user", user);
      localStorage.setItem("lang", "E");
      fetchExercises();
      //fetchWorkouts();
    })
    .on("touchend", function (e) {
      $(this).css("background-color", "antiquewhite");
    });
};
