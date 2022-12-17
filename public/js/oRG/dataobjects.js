const EX = {
    type: "exercise",
    title: "Exercise",
    masterParent:null,
    list: { "title": "Exercises", "options": ArrayUtilities.sortByName(EXERCISES) },
    filter: "Movement",
    update() {
        if (validateModif("exercise") && nameDoNotExist()) {
            updateClone("exercise");
            if (customerChanged(stringifiedOrgObj, JSON.stringify(clonedModifObj))) {
                if (confirm(fetchTranslation("confirmMods"))) {
                    current.object.list.options.splice(current.object.list.options.findIndex(obj => obj._id === clonedModifObj._id), 1);
                    current.object.list.options.push(clonedModifObj);
                    EX.list.options = ArrayUtilities.sortByName(EXERCISES);
                    EXERCISES.DateChange = currentDate();
                    DB.updateObj(current.object.list.options, current.object.type);
                    printList(current.object.list.options, current.object.list.title, current.object.type);
                    updateWorkoutName(clonedModifObj._id);
                    listEvent();
                    //if (confirm(fetchTranslation("addWorkout") + clonedModifObj.name + "?")) {
                    //    let wrk = newWorkout();
                    //    wrk.Exercises.push(clonedModifObj._id);
                    //    wrk.name = nameWorkout(wrk);
                    //    wrk.NumOfSeries = 1;
                    //    addFilter(wrk);
                    //    wrk.RestInterval = 0;
                    //    WORKOUTS.push(wrk);
                    //    WO.list.options = ArrayUtilities.sortByName(WORKOUTS);
                    //    DB.addWorkout(wrk);
                    //    current.object = WO;
                    //    displayModifPage(wrk._id, false);
                    //}
                    //else {
                    //    printList(current.object.list.options, current.object.list.title, current.object.type);
                    //    listEvent(displayModifPage);
                    //}
                }
            } else
                alert(fetchTranslation("noChange") + current.object.type);
        }
    },
    add(){
        if (validateModif("exercise")) {
            updateClone("exercise");
            current.object.list.options.push(clonedModifObj);
            EX.list.options = ArrayUtilities.sortByName(EXERCISES);
            EXERCISES.DateAdded = currentDate();
            DB.updateObj(current.object.list.options, current.object.type);
            if (confirm(fetchTranslation("addWorkout") + clonedModifObj.name + "?")) {
                let wrk = newWorkout();
                wrk.Exercises.push(clonedModifObj._id);
                wrk.name = nameWorkout(wrk);
                wrk.NumOfSeries = 1;
                addFilter(wrk);
                wrk.RestInterval = 0;
                WORKOUTS.push(wrk);
                WO.list.options = ArrayUtilities.sortByName(WORKOUTS);
                DB.addWorkout(wrk);
                current.object = WO;
                displayModifPage(wrk._id,false);
            }
            else 
                backToList();
        }
    },
    destroy() {
        let inUSe = isAssigned( clonedModifObj._id);
        if (inUSe !== "") {
            alert(fetchTranslation("exerciseInUse") +"\r"+inUSe);
        }
        else if (confirm(fetchTranslation("confirmDel"))) {
            current.object.list.options.splice(current.object.list.options.findIndex(obj => obj._id === clonedModifObj._id), 1);
            DB.updateObj(current.object.list.options, current.object.type);
            backToList();
        }
    } 
};

const WO = {
    type: "workout",
    title: "Workout",
    masterParent: null,
    children:"Exercises",
    list: null,
    filter: "Active",
    update(){
        if (validateModif("workout") && nameDoNotExist()) {
            updateClone("workout");
            updateSeries(clonedModifObj);
            if (customerChanged(stringifiedOrgObj, JSON.stringify(clonedModifObj))) {
                if (confirm(fetchTranslation("confirmMods"))) {
                    current.object.list.options.splice(current.object.list.options.findIndex(obj => obj._id === clonedModifObj._id), 1);
                    current.object.list.options.push(clonedModifObj);
                    WO.list.options = ArrayUtilities.sortByName(WORKOUTS);
                    DB.updateWorkout(clonedModifObj);
                    backToList();
                }
            }
            else
                alert(fetchTranslation("noChange") + current.object.type);
        }
    },
    add() {
        if (validateModif("workout") && nameDoNotExist()) {
            updateClone("workout");
            updateSeries(clonedModifObj);
            addFilter(clonedModifObj);
            current.object.list.options.push(clonedModifObj);
            WO.list.options = ArrayUtilities.sortByName(WORKOUTS);
            DB.addWorkout(clonedModifObj);
            backToList();
        }
    },
    destroy() {
        let inUSe = isAssigned(clonedModifObj._id);
        if (inUSe !== "") {
            alert(fetchTranslation("workoutInUse") + "\r" + inUSe);
        }
        else if (confirm(fetchTranslation("confirmDel"))) {
            current.object.list.options.splice(current.object.list.options.findIndex(obj => obj._id === clonedModifObj._id), 1);
            //to do  type delete
            DB.deleteWorkout(clonedModifObj);
            backToList();
        }
    },
    toIncomplete(){
        $.each(W0.fetchChildrenOfRoutine(SELECTED_ROUTINE), (index, wrk) => {
            wrk.completed = 0;
            $.each(wrk.Series, (index, serie) => {
                serie.completed = 0;
            });
            DB.updateWorkout(wrk);
        });
    },
    fetchWorkoutsForRoutine(routine){
        let workouts = [];
        $.each(routine.Workouts, (index, wrkID) => {
            let current = WORKOUTS.find(obj => { return obj._id === wrkID; });
            workouts.push(current);
        });
        return workouts;
    }    
};

const RO = {
    type: "routine",
    title: "Routine",
    masterParent: null,
    children: "Workouts",
    list: { "title": "Routines", "options": ArrayUtilities.sortByName(ROUTINES) },
    filter: "Active",
    toIncomplete(){
        $.each(RO.fetchRoutinesForCycle(SELECTED_CYCLE), (index, rout) => {
            rout.completed = 0;
        });
        DB.obj(ROUTINES, "routines");
        //WO.toIncomplete();
    },
    fetchRoutinesForCycle(cycle){
        let routines = [];
        $.each(cycle.Routines, (index, routID) => {
            let current = ROUTINES.find(obj => { return obj._id === routID; });
            routines.push(current);
        });
        return routines;
    },
    update() {
        if (validateModif("routine") && nameDoNotExist()) {
            updateClone("routine");
            if (customerChanged(stringifiedOrgObj, JSON.stringify(clonedModifObj))) {
                if (confirm(fetchTranslation("confirmMods"))) {
                    current.object.list.options.splice(current.object.list.options.findIndex(obj => obj._id === clonedModifObj._id), 1);
                    current.object.list.options.push(clonedModifObj);
                    ROUTINES.DateChange = currentDate();
                    DB.updateObj(current.object.list.options, current.object.type);
                    RO.list.options = ArrayUtilities.sortByName(ROUTINES);
                    backToList();
                }
            }
            else
                alert(fetchTranslation("noChange") + current.object.type);
        }
    },
    add() {
        if (validateModif("routine") && nameDoNotExist()) {
            updateClone("routine");
            current.object.list.options.push(clonedModifObj);
            ROUTINES.DateAdded = currentDate();
            DB.updateObj(current.object.list.options, current.object.type);
            RO.list.options = ArrayUtilities.sortByName(ROUTINES);
            backToList();
        }
    },
    destroy() {
        let inUSe = isAssigned(clonedModifObj._id);
        if (inUSe !== "") {
            alert(fetchTranslation("routineInUse") + "\r" + inUSe);
        }
        else if (confirm(fetchTranslation("confirmDel"))) {
            current.object.list.options.splice(current.object.list.options.findIndex(obj => obj._id === clonedModifObj._id), 1);
            //to do  type delete
            DB.updateObj(current.object.list.options, current.object.type);
            backToList();
        }
    }
};

const CY = {
    type: "cycle",
    title: "Cycle",
    masterParent: null,
    children: "Routines",
    list: { "title": "Cycles", "options": ArrayUtilities.sortByName(cycles) },
    filter: "Active",
    update() {
        if (validateModif("cycle") && nameDoNotExist()) {
            updateClone("cycle");
            if (customerChanged(stringifiedOrgObj, JSON.stringify(clonedModifObj))) {
                if (confirm(fetchTranslation("confirmMods"))) {
                    current.object.list.options.splice(current.object.list.options.findIndex(obj => obj._id === clonedModifObj._id), 1);
                    current.object.list.options.push(clonedModifObj);
                    CY.list.options = ArrayUtilities.sortByName(cycles);
                    cycles.DateChange = currentDate();
                    DB.updateObj(current.object.list.options, current.object.type);
                    backToList();
                }
            }
            else
                alert(fetchTranslation("noChange") + current.object.type);
        }
    },
    add() {
        if (validateModif("cycle") && nameDoNotExist()) {
            updateClone("cycle");
            current.object.list.options.push(clonedModifObj);
            CY.list.options = ArrayUtilities.sortByName(cycles);
            cycles.DateAdded = currentDate();
            DB.updateObj(current.object.list.options, current.object.type);
            backToList();
        }
    },
    destroy() {
        let inUSe = isAssigned( clonedModifObj._id);
        if (inUSe !== "") {
            alert(fetchTranslation("cycleInUse") + "\r" + inUSe);
        }
        else if (confirm(fetchTranslation("confirmDel"))) {
            current.object.list.options.splice(current.object.list.options.findIndex(obj => obj._id === clonedModifObj._id), 1);
            //to do  type delete
            DB.updateObj(current.object.list.options, current.object.type);
            backToList();
        }
    },
    toIncomplete() {
        $.each(cycles, (index, cycle) => {
            cycle.completed = 0;
        });
        DB.obj(cycles, "cycles");
        RO.toIncomplete();
    }
};

const assigned = () => {
    if (current.object.masterParent) {
        let parent = current.object.masterParent;
        let targetObjs = [];
        $.each(current.object.list.options, (index, childObj) => {
            $.each(parent.list.options, (index, parentObj) => {
                if (parentObj[parent.children].find(obj => { return obj === childObj._id }))
                    targetObjs.push(wrk);
            });
        });
        return targetObjs;
    }    
};

