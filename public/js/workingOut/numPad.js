let showNumPad = () => {
  $(".numPad").css({ display: "grid" });
  let info = `Serie: ${parseInt(currentSerieIndex) + 1} of ${parseInt(
    currentExercise.sets.length
  )}`;

  $(`.numPad__header`).html(info);
};

let closeNumPad = () => {
  $(".numPad").css({ display: "none" });
  defocusSelectedSerie();
};

let hideNumPad = () => {
  $(".numPad").css({ display: "none" });
};
