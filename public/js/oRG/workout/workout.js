const workoutEnhance = () => {
  $.each(workouts, (index, wk) => {
    wk.type = "workout";
    wk.label = "Workouts";
    wk.update = () => {
      if (validateModif("workout")) workoutUpdate(backToWorkoutList);
    };
    wk.add = () => {
      if (validateModif("workout")) workoutAdd();
    };
    wk.delete = () => {
      if (confirm(fetchTranslation("confirmDel"))) {
        workoutDelete();
      }
    };
    $.each(wk.exercises, (index, exercise) => {
      exercise.index = index;
    });
    wk.temp = "";
  });
};

const listWorkouts = () => {
  // workoutEnhance(workouts);
  // current.action = (id)=>{
  //     current.object =  current.masterArray.find(obj =>{return obj._id === id});
  //     displayModifPage();
  // };
  // current.masterArray = workouts;
  listChildren(workouts, "workout");
};

const removeDeletedExercise = () => {
  let count = 0;
  $.each(workouts, (index, ws) => {
    $.each(ws.exercises, (index2, ex) => {
      let currentEx = ws.exercises[index2];
      if (currentEx === current.object._id) {
        ws.exercises.splice(index2, 1);
        workoutExerciseUpdate(ws);
        count++;
      }
    });
  });
};

const listWorkoutExercises = (wrk) => {
  $.each(wrk.exercises, (index, exID) => {
    let ex = exercises.find((obj) => {
      return obj._id === parseInt(exID);
    });
    $(".childContainer").append(childList(ex, index));
  });
};

const addWorkoutExercise = (exID) => {
  current.object.exercises.push(parseInt(exID));
  displayModifPage(current.object._id, true);
};

const nameWorkout = (wrk) => {
  let newName = "";
  let exerciseCount = 0;
  $.each(wrk.exercises, (i, exID) => {
    if (exerciseCount > 0) newName += "/";
    newName += exercises.find((obj) => {
      return obj._id === parseInt(exID);
    }).name;
    exerciseCount++;
  });
  return newName;
};

const replaceChildExercise = (newID) => {
  current.object.exercises.splice(current.object.temp, 1, newID);
  displayModifPage();
};

//     workoutCompleted(SELECTED_WORKOUT._id);
//     let nextWrkID;
//     nextWrkID = SELECTED_ROUTINE.Workouts[SELECTED_ROUTINE.Workouts.indexOf(SELECTED_WORKOUT._id) + 1];
//     if (nextWrkID) {
//         if (restInterval>0)
//             chronoStart(restInterval);
//         selectWorkout(nextWrkID);
//     }
// };

// const selectWorkout = (wrkID) => {
//     SELECTED_WORKOUT = WORKOUTS.find(obj => { return obj._id === wrkID; });
//     SELECTED_SERIE = null;
//     printWokoutSeries();
// };

// const resetWorkout = (wrk) => {
//     wrk.completed = 0;
//     $.each(wrk.Series, (index, serie) => {
//         serie.completed = 0;
//     });
//     DB.updateWorkout(wrk);
// };

// const workoutCompleted = (workoutID) => {
//     let workout = WORKOUTS.find(obj => { return obj._id === workoutID});
//     workout.completed = 1;
//     workout.completedDate = currentDate();
//     resetSeries(workout);
//     DB.updateWorkout(workout);
// };

// const newWorkout = () => {
//     let newWorkout = {};
//     newWorkout.Exercises = [];
//     newWorkout.name = fetchTranslation("autoDefine");
//     newWorkout._id = Math.max.apply(Math, WORKOUTS.map(function (o) { return o._id; })) + 1;
//     newWorkout.active = 0;
//     newWorkout.completed = 0;
//     newWorkout.NumOfSeries = "Choose";
//     newWorkout.RestInterval = "Choose";
//     newWorkout.Series = [];
//     return newWorkout;
// };

// };

// const updateSeries = (wrk) => {
//     let serieCount = wrk.NumOfSeries;
//     let exCount = wrk.Exercises.length;
//     let newSeries = [];
//     //Creating new series
//     let exLoopCount = 0;
//     let idCount = 1;
//     let newSerieCount = 0;
//     $.each(wrk.Exercises, (index, exID) => {
//         let newSerieCount = exLoopCount;
//         for (let x = 0; x < serieCount; x++) {
//             let serie = {};
//             serie._id = idCount;
//             serie.ExerciseID = exID;
//             serie.completed = 0;
//             serie.Reps = 0;
//             serie.Weight = 0;
//             serie.SerieNo = newSerieCount + 1;
//             serie.updated = 0;
//             newSeries.push(serie);
//             newSerieCount += exCount;
//             idCount++;
//         };
//         exLoopCount++;
//     });

//     //delete absolete series and copying values
//     $.each(wrk.Series, (index, ser) => {
//         if (wrk.Exercises.indexOf(ser.ExerciseID)>-1) {
//             //copie values
//             let serieToUpdate = newSeries.find(obj => { return obj.ExerciseID === ser.ExerciseID && obj.updated === 0 });
//             if (serieToUpdate) {
//                 serieToUpdate.Reps = ser.Reps;
//                 serieToUpdate.Weight = ser.Weight;
//                 delete serieToUpdate.updated;
//             }
//         }
//     });
//     wrk.Series=[];
//     //adding new series
//     $.each(newSeries, (index, ser) => {
//         wrk.Series.push(ser);
//     });
// }

// const addFilter = (wrk) => {
//     wrk.Filter = [];
//     $.each(wrk.Exercises, (index, ex) => {
//         wrk.Filter.push(EXERCISES.find(obj => { return obj._id === ex }).Movement);
//     });
// };

// const updateWorkoutName = (exID) => {
//     $.each(WORKOUTS, (index, wrk) => {
//         let isUse = wrk.Exercises.find(obj => { return obj === exID });
//         if (isUse) {
//             let originalName = wrk.name;
//             wrk.name = nameWorkout(wrk);
//             addFilter(wrk);
//             DB.updateWorkout(wrk);
//         }
//     });
// };
