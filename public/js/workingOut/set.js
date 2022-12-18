const initializeSets = () => {
  let sets = currentExercise.sets;
  $.each(sets, (index, set) => {
    if (!set.lastUpdate) set.completed = false;
    else if (set.lastUpdate != currentDay()) set.completed = false;
    else if (set.lastUpdate === currentDay()) set.completed = true;
    set.index = index;
  });
  localStorage.setItem("currentExercise", JSON.stringify(currentExercise));
  printExerciseSets(0, false);
};

const printExerciseSets = (index, chrono) => {
  setsViewPrep();
  printSets();
  handleSerieMods();
  let sets = currentExercise.sets;
  directSelect(index, "reps", chrono);
  // $.each(sets, (index, set) => {
  //   if (!set.completed) {
  //     directSelect(index, "reps", false);
  //     return false;
  //   }
  // });
};

const printSets = (id) => {
  let sets = currentExercise.sets;
  $.each(sets, (index, set) => {
    $("#series").append(serieTemplate(sets, set, index));
  });
  styleSeries();
};

const styleSeries = () => {
  $.each($("#series").children(), (index, el) => {
    if (index % 2) {
      $(el).css({ color: "#000", background: "#ebeaea" });
      $(el).attr("serieIndex", index);
    }
    $(el).attr("serieIndex", index);
    if (currentExercise.sets[index].completed)
      $(el).find(".serieStatus").html(faCheckCircle());
  });
  //Start witht the first index
  if (!selectedSet) selectedSet = currentExercise.sets[0];
  styleSelectedSerie(selectedSet.index);
};

const directSelect = (selectedSerieIndex, unit, maxChrono) => {
  currentSerieUnit = unit;
  currentSerieIndex = Number(selectedSerieIndex);
  selectedSet = currentExercise.sets[currentSerieIndex];
  selectedSet.index = currentSerieIndex;
  unitCaptureInitiated = false;
  styleSelectedSerie(currentSerieIndex);
  defocusUnits();
  focusSelectedSerie(showNumPad);
  focusSelectedUnit();
  if (chronoIsActive) {
    if (!maxChrono) minimizeChrono();
    else hideNumPad();
  }
};

const styleSelectedSerie = (index) => {
  if (!index) index = 0;
  $(`.serieStatus`, `#serie` + index).html(faArrowCircle());
  $(`#serie` + index).addClass("serie-value-selected");
};

const defocusUnits = () => {
  $(`.weight`, `#serie${selectedSet.index}`)
    .removeClass("serie-targetted-unit")
    .children()
    .css({ opacity: 1 });
  $(`.reps`, `#serie${selectedSet.index}`)
    .removeClass("serie-targetted-unit")
    .children()
    .css({ opacity: 1 });
};

const focusSelectedSerie = (callback) => {
  $.each(currentExercise.sets, (index, set) => {
    $(`#serie${index}`).hide();
  });
  $(`#serie${currentSerieIndex}`).css({ background: "#fff" }).show();
  //styleNewweight();
  if (callback) callback();
};

const focusSelectedUnit = () => {
  $(`.${currentSerieUnit}`, `#serie${selectedSet.index}`).addClass(
    "serie-targetted-unit"
  );
  $(`.${currentSerieUnit}`, `#serie${selectedSet.index}`)
    .children()
    .css({ opacity: 0.5 });
};

const updateSerieUnitValue = (value) => {
  let newValue = $(`.serie-targetted-unit>DIV`).html() + value;
  if (!unitCaptureInitiated) {
    unitCaptureInitiated = true;
    newValue = value;
  }
  let maxChar = 3;
  if (currentSerieUnit === "reps") maxChar = 2;

  if (newValue.length <= maxChar) {
    $(`.serie-targetted-unit>DIV`).html(newValue);
    $(`.serie-targetted-unit>DIV`).css({ opacity: 1 });
    selectedSet[currentSerieUnit] = newValue;
    silentExerciseUpdate();
  }
};

const serieChange = (el) => {
  weigthTransfer();
  chronoStart(currentExercise.restInterval);
  if (currentExercise.sets[currentSerieIndex + 1]) fetchNextSerie();
  else fetchNextExercise();
};

const fetchNextSerie = () => {
  currentSerieIndex += 1;
  printExerciseSets(currentSerieIndex, `reps`, true);
};

const resetSeries = (wrk) => {
  $.each(wrk.Series, (index, serie) => {
    serie.completed = 0;
  });
};

const defocusSelectedSerie = () => {
  $.each(currentExercise.sets, (index, set) => {
    $(`#serie${index}`).show();
    $(`#serie${index}`).removeClass("serie-value-selected");
    $(`.serieStatus`, `#serie` + index).html("");
  });
  defocusUnits();
  hideNumPad();
  minimizeChrono();
  styleSeries();
};

const fetchNextExercise = () => {
  let nextIndex;
  $.each(currentWorkout.exercises, (index, ex) => {
    if (currentExercise._id === ex) nextIndex = index + 1;
  });
  if (currentWorkout.exercises[nextIndex]) {
    currentExercise = exercises.find((obj) => {
      return obj._id === currentWorkout.exercises[nextIndex];
    });
    console.log(currentExercise);
    localStorage.setItem("currentExercise", JSON.stringify(currentExercise));
    printExerciseSets();
  } else {
    $("#workout-completed").css("display", "flex");
    handleCompleted();
  }
};
const weigthTransfer = () => {
  $.each(currentExercise.sets, (ind, set) => {
    if (ind > Number(currentSerieIndex)) {
      set.weight = selectedSet["weight"];
    }
  });
  silentExerciseUpdate();
};
