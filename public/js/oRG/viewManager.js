const listView = () => {
  $(".list-container").css({ display: "block" });
  $(".list-container").show();
};

const modifView = () => {
  $(".list-container").hide();
  $(".modif-container").show();
  $(".modif-subContainer").html("");
};

const setsView = () => {
  $("#series-container").show();
  $(".list-container").hide();
  $(".modif-container").hide();
  $(".numPad").css({ display: "none" });
  if (chronoIsActive) {
    minimizeChrono();
  }
};
