let handleSerieMods = () => {
  $(".serie > div[unit]").on("click", function () {
    directSelect(
      Number($(this).parent().attr("setindex")),
      $(this).attr("unit"),
      false
    );
  });
};

$(".numPad__key")
  .on("touchstart", function () {
    $(this).css("background-color", "cyan");
    let event = $(this).attr("event");
    if (event === "workoutList") showNextSeries();
    else if (event === "enter") serieChange($(this));
    else if (event === "closePad") {
      closeNumPad();
    } else updateSerieUnitValue($(this).html());
  })
  .on("touchend", function () {
    let event = $(this).attr("event");
    if (event === "closePad") $(this).css("background-color", "yellow");
    else $(this).css("background-color", "aliceblue");
  });
$(".numPad__closePad").on("click", function () {
  $(this).css("background-color", "cyan");
  closeNumPad();
  $(this).css("background-color", "yellow");
});

let handleCompleted = () => {
  $("#completed-message").on("click", function () {
    window.location.href = "../";
  });
};
