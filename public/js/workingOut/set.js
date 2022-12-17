//let SERIES = [];

const initializeSets = () => {
  let sets = currentExercise.sets;
  $.each(sets, (index, set) => {
    if (!set.lastUpdate) set.completed = false;
    else if (set.lastUpdate === Date.now()) set.completed = true;
  });
  localStorage.setItem("currentExercise", JSON.stringify(currentExercise));
};

const printExerciseSets = () => {
  //currentExercise.index = index;
  setsViewPrep();
  printSets();
  handleSerieMods();
  let sets = currentExercise.sets;
  $.each(sets, (index, set) => {
    if (!set.completed) {
      directSelect(index, "weight", false);
      return false;
    }
  });

  // printNext();
  //activeWorkout();
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
    // currentSet = current.object.exercises.find(obj => { return obj._id === parseInt($(el).attr("serieid")) });
    // if ($(el).attr("completed") === '1') {
    //     if (currentSet.Progressed && currentSerie.Progressed===1)
    //         $(el).children(".serieStatus").html(faGrinStar());
    //     else
    //         $(el).children(".serieStatus").html(faCheckCircle());
    // }
    // if (parseInt($(el).attr("serieid")) === SELECTED_SERIE._id) {
    //     $(el).children(".serieStatus").html(faArrowCircle());
    //     styleSelectedSerie();
    // }
  });
  //Start witht the first index
  if (!selectedSet) selectedSet = currentExercise.sets[0];
  styleSelectedSerie(selectedSet.index);
};

const directSelect = (selectedSerieIndex, unit, maxChrono) => {
  currentSerieUnit = unit;
  currentSerieIndex = Number(selectedSerieIndex);
  selectedSet = currentExercise.sets[currentSerieIndex];
  unitCaptureInitiated = false;
  styleSelectedSerie(currentSerieIndex);
  // printExerciseSets();
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

const serieChange = () => {
  silentExerciseUpdate();
  chronoStart(currentExercise.restInterval);
  if (currentExercise.sets[currentSerieIndex + 1]) fetchNextSerie();
  else fetchNextExercise();
};

const fetchNextSerie = () => {
  currentSerieIndex += 1;
  directSelect(currentSerieIndex, `weight`, true);
};

const resetSeries = (wrk) => {
  $.each(wrk.Series, (index, serie) => {
    serie.completed = 0;
  });
};

const fetchNextExercise = () => {
  let nextIndex = Number(currentExercise.index) + 1;
  if (currentWorkout.exercises[nextIndex]) {
    currentExercise = exercises.find((obj) => {
      return obj._id === currentWorkout.exercises[nextIndex];
    });
    currentExercise.index = nextIndex;
    localStorage.setItem("currentExercise", JSON.stringify(currentExercise));
    printExerciseSets();
  } else {
    $("#workout-completed").css("display", "flex");
    handleCompleted();
  }
};

const defocusSelectedSerie = () => {
  // let seriesToShow = SELECTED_WORKOUT.Series.filter((obj) => {
  //   return obj._id !== SELECTED_SERIE._id;
  // });
  // $.each(seriesToShow, (index, serie) => {
  //   $(`#serie${serie._id}`).show();
  // });
  // $(`.${currentSerieUnit}`, `#serie${SELECTED_SERIE._id}`).removeClass(
  //   "serie-targetted-unit"
  // );
  //  $(`.${currentSerieUnit}`, `#serie${SELECTED_SERIE._id}`).children().css({"opacity":0.5});
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

// const styleNewweight = () => {
//   let hasNewweight = newTargetweight.find((obj) => {
//     return obj.exerciseID === SELECTED_SERIE.ExerciseID;
//   });
//   if (hasNewweight && SELECTED_SERIE.weight !== hasNewweight.newweight) {
//     $(`.weight > DIV`, `#serie${SELECTED_SERIE._id}`).attr(
//       "orgweight",
//       fetchTranslation("newweight")
//     );
//     $(`.weight > DIV`, `#serie${SELECTED_SERIE._id}`).html(
//       hasNewweight.newweight
//     );
//   }
// };

// const updateSelectedSerie = () => {
//   progress();
//   SELECTED_SERIE.reps = Number(
//     $(`#serie${SELECTED_SERIE._id} > [unit=reps] > DIV`).html()
//   );
//   SELECTED_SERIE.weight = Number(
//     $(`#serie${SELECTED_SERIE._id} > [unit=weight] > DIV`).html()
//   );
//   SELECTED_SERIE.completed = 1;
//   SELECTED_SERIE.completedDate = currentDate();
//   DB.updateWorkout(
//     WORKOUTS.find((obj) => {
//       return obj._id === SELECTED_WORKOUT._id;
//     })
//   );
/*
    $(`#serie${SELECTED_SERIE._id} > .serieStatus`).html(faCheckCircle());
    destyleSelectedSerie();*/
// };

// const progress = () => {
//   SELECTED_SERIE.Progressed = 0;
//   let newreps = Number(
//     $(`#serie${SELECTED_SERIE._id} > [unit=reps] > DIV`).html()
//   );
//   let newweight = Number(
//     $(`#serie${SELECTED_SERIE._id} > [unit=weight] > DIV`).html()
//   );
//   if (SELECTED_SERIE.reps < newreps && newweight >= SELECTED_SERIE.weight)
//     SELECTED_SERIE.Progressed = 1;
//   if (newweight > SELECTED_SERIE.weight) SELECTED_SERIE.Progressed = 1;
//   else if (newweight < SELECTED_SERIE.weight) SELECTED_SERIE.Progressed = 2;
//   if (SELECTED_SERIE.Progressed === 1 && ATHLETE !== "QB") {
//     let targetMessages = bravoMessageRox;
//     let targetLength = bravoMessageRox.length;
//     if (ATHLETE === "Jo") {
//       targetMessages = bravoMessageJoanne;
//       targetLength = bravoMessageJoanne.length;
//     }
//     $("#congrats").css({ display: "grid" });
//     $("#congrats-message").html(
//       "BRAVO!!!<br/><br/>" +
//         targetMessages[randomIntFromInterval(0, targetLength - 1)]
//     );
//     $("#congrats-image").css({
//       "background-image": `url('images/${
//         bravoGIF[randomIntFromInterval(0, bravoGIF.length - 1)]
//       }.gif')`,
//     });
//     $(".congrats-button_text").html(fetchTranslation("Close"));
//   }

//if (SELECTED_SERIE.Progressed)
//    chronoIsProgress = true;
//else
//    chronoIsProgress = false;

//   captureNewweight(newweight);
// };

// const captureNewweight = (newweight) => {
//   if (
//     newTargetweight.find((obj) => {
//       return obj.exerciseID === SELECTED_SERIE.ExerciseID;
//     })
//   )
//     newTargetweight.find((obj) => {
//       return obj.exerciseID === SELECTED_SERIE.ExerciseID;
//     }).newweight = newweight;
//   else
//     newTargetweight.push({
//       exerciseID: SELECTED_SERIE.ExerciseID,
//       newweight: newweight,
//     });
// };

// const resetTitles = () => {
//   $(".titleIndex1").css({ display: "block" });
//   $(".titleIndex0").css({ display: "block" });
// };
