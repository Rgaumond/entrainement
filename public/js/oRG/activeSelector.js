let active_owrkout;

const activeCycle = () => {
  let activeCycles = cycles.filter((obj) => {
    return obj.active === 1;
  });
  if (activeCycles) {
    ACTIVE_CYCLE = activeCycles.filter((obj) => {
      return obj.completed === 0;
    })[0];
    if (ACTIVE_CYCLE) return ACTIVE_CYCLE;
    else CY.toIncomplete();
  } else alert("No Active Cycle");
};

const activeRoutine = () => {
  active_owrkout = RO.fetchRoutinesForCycle(ACTIVE_CYCLE).filter((obj) => {
    return obj.completed === 0;
  })[0];
  if (active_owrkout) return active_owrkout;
  else {
    cycleCompleted(
      cycles.find((obj) => {
        return obj._id === ACTIVE_CYCLE._id;
      })
    );
    activeWorkout();
  }
};

const activeWorkout = () => {
  ACTIVE_CYCLE = activeCycle();
  active_owrkout = activeRoutine();
  active_owrkout = WO.fetchWorkoutsForRoutine(active_owrkout).filter((obj) => {
    return obj.completed === 0;
  })[0];
  if (active_owrkout) {
    if (
      active_owrkout.Series.filter((obj) => {
        return obj.completed === 0;
      }).length === 0
    ) {
      workoutCompleted(
        WORKOUTS.find((obj) => {
          return obj._id === active_owrkout._id;
        })._id
      );
      activeWorkout();
    } else getActiveSerie(active_owrkout);
  }
};

const setCurrentWorkoutFromActive = () => {
  SELECTED_WORKOUT = active_owrkout;
  SELECTED_CYCLE = ACTIVE_CYCLE;
  SELECTED_ROUTINE = active_owrkout;
};

const listActiveWorkout = () => {
  SELECTED_ROUTINE = active_owrkout;
  let options = [];
  let workouts = SELECTED_ROUTINE.Workouts;
  $.each(workouts, (i, wrkID) => {
    let wrk = WORKOUTS.find((obj) => {
      return obj._id === wrkID;
    });
    let obj = {};
    obj._id = wrk._id;
    obj.name = wrk.name;
    obj.completed = wrk.completed;
    options.push(obj);
  });
  printActiveList(options, "activeWorkout");
  childWorkoutListEvent();
};

const getActiveSerie = () => {
  $.each(ArrayUtilities.sortSeries(active_owrkout.Series), (index, serie) => {
    if (serie.completed === 0) {
      ACTIVE_SERIE = serie;
      return false;
    }
  });
};

const loadActiveWorkout = () => {
  activeWorkout();
  SELECTED_WORKOUT = active_owrkout;
  SELECTED_CYCLE = ACTIVE_CYCLE;
  SELECTED_ROUTINE = active_owrkout;
  printExerciseSets();
};
