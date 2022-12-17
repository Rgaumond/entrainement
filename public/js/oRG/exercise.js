const exerciseActions = () => {
  $.each(exercises, (index, ex) => {
    ex.label = "Exercises";
    ex.type = "exercise";
    ex.update = () => {
      if (validateModif("exercise")) exerciseUpdate(current.object);
    };
    ex.add = () => {
      if (validateModif("exercise")) exerciseAdd(current.object);
    };
    ex.delete = () => {
      if (confirm(fetchTranslation("confirmDel"))) {
        removeDeletedExercise();
        exerciseDelete();
      }
    };
    $.each(ex.sets, (index, set) => {
      set.index = index;
    });
  });
};

const fetchExerciseMovements = () => {
  //let movements = [... new Set(EXERCISES.map(data => data.Movement))];
  let movements = [
    "Pecs",
    "Back",
    "Legs",
    "Shoulders",
    "Biceps",
    "Triceps",
    "Core",
  ];
  movements.sort();
  //  movements.unshift("Choose")
  return movements;
};

const updateSets = (ex) => {
  let newSet = [];
  let newSetsCount = $("#select-numSeries").val();
  for (let x = 0; x < newSetsCount; x++) {
    if (ex.sets[x]) newSet.push({ weight: ex.sets[x].weight });
    else newSet.push({ weight: 0 });
  }
  ex.sets = newSet;
};
// $.each(, (index, exID) => {

// }

// let exCount = wrk.Exercises.length;
// let newSeries = [];
// //Creating new series
// let exLoopCount = 0;
// let idCount = 1;
// let newSerieCount = 0;
// $.each(wrk.Exercises, (index, exID) => {
//     let newSerieCount = exLoopCount;
//     for (let x = 0; x < serieCount; x++) {
//         let serie = {};
//         serie._id = idCount;
//         serie.ExerciseID = exID;
//         serie.completed = 0;
//         serie.Reps = 0;
//         serie.Weight = 0;
//         serie.SerieNo = newSerieCount + 1;
//         serie.updated = 0;
//         newSeries.push(serie);
//         newSerieCount += exCount;
//         idCount++;
//     };
//     exLoopCount++;

// function onlyUnique(value, index, self) {
//     return self.indexOf(value) === index;
// }

// const newExercise = () => {
//     let newExercise = {};
//     newExercise.name = "";
//     newExercise._id = Math.max.apply(Math, EXERCISES.map(function (o) { return o._id; })) + 1;
//     newExercise.Movement = "Choose";
//     return newExercise;
// };

// const exercisesInUse = (exID) => {
//     let useIn = "";
//     $.each(WORKOUTS, (index, wrk) => {
//         let isUse = wrk.Exercises.find(obj => { return obj === exID });
//         if (isUse)
//             useIn += "Workout:" + wrk.name + "  ";
//     });
//     return (useIn);
// };
