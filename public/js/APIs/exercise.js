/* FETCH */
const fetchExercises = (callback) => {
  fetch("../exercises/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: localStorage.getItem("user") }),
  })
    .then((res) => res.json())
    .then((data) => {
      exercises = ArrayUtilities.sortByName(data.exercises);
      localStorage.setItem("exercises", JSON.stringify(exercises));
      if (callback) callback();
      fetchWorkouts();
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

// /* UPDATING */
const exerciseUpdate = (ex) => {
  prepareExerciseForProcessing();
  fetch("../exercises/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ex),
  }).then((res) => {
    updateExercisesArray();
    localStorage.setItem("currentExercise", JSON.stringify(ex));
    window.location.href = "exerciseList.html";
  });
};

const silentExerciseUpdate = () => {
  exerciseClean();
  currentExercise.sets[currentSerieIndex].completed = true;
  currentExercise.sets[currentSerieIndex].lastUpdate = Date.now();
  fetch("../exercises/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(currentExercise),
  }).then((res) => {
    localStorage.setItem("currentExercise", JSON.stringify(currentExercise));
    updateExercisesArray();
    currentWorkout.lastUpdate = currentDate();
    workoutExerciseUpdate(currentWorkout);
  });
};
/* ADDING */
const exerciseAdd = (ex) => {
  prepareExerciseForProcessing();
  fetch("../exercises/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ex),
  })
    .then((res) => res.json())
    .then((data) => {
      exercises.push(data.newExercise);
      localStorage.setItem("exercises", JSON.stringify(exercises));
      window.location.href = "exerciseList.html";
    });
};

// /* DELETING */
const exerciseDelete = () => {
  let obj = currentExercise;
  fetch("../exercises/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ obj }),
  }).then((res) => {
    localStorage.setItem("exerciseAction", "edit");
    $.each(exercises, (index, ex) => {
      if (ex._id === currentExercise._id) {
        exercises.splice(index, 1);
        return false;
      }
    });
    localStorage.setItem("exercises", JSON.stringify(exercises));
    deleteDeadExerciseFromWorkouts(obj._id);
    window.location.href = "exerciseList.html";
  });
};

const prepareExerciseForProcessing = () => {
  exerciseClean();
  currentExercise.lastUpdate = currentDate();
  currentExercise.user = localStorage.getItem("user");
  updateSets(currentExercise);
  currentExercise.restInterval = $("#select-restInterval").val();
  currentExercise.name = $("#input-name").val();

  currentExercise.movement = $("#select-movementSelect").val();
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

const exerciseClean = () => {
  $.each(exercises, (index, ex) => {
    delete ex.type;
    delete ex.label;
    delete ex.update;
    delete ex.add;
    delete ex.delete;
    delete ex.index;
    ex.user = localStorage.getItem("user");
  });
};

// /* FILTERING */
// const filterCustomers = () =>{
//     customerList();
//     applyfilter();
// }

// /* ADDING */
// const customerAdd = (customerName,accountM,IAMType) => {
//     let tempObj = createCustomerObject(customerName,accountM,IAMType);
//     fetch('/customers/add',{
//         method:"POST",
//         headers: {"Content-Type":"application/json"}
//         ,body: JSON.stringify(tempObj)
//     }).then(res => res.json()).then(data =>{
//        window.location.href = "customerView.html?id="+data.newID;
//     });
// };

// const requestCustomerView = (customerID) => {
//         fetch('/customers/view/'+customerID,{
//         method:"POST",
//         headers: {"Content-Type":"application/json"}
//         ,body: JSON.stringify({id:customerID})
//     }).then(res => res.json()).then(data => {
//         viewInitResponseHandler(data);
//     });
// };

// const viewCustomerInfo = () => {
//     fetch('/customers/view',{
//         method:"POST",
//         headers: {"Content-Type":"application/json"}
//     }).then(res => res.json()).then(data => {
//         window.location.href = "customerView.html";
//     });
// };

// /* LISTING*/
// const customerListFilter = (query) =>{
//     fetch('./customers/find',{
//         method:"POST",
//         headers: {"Content-Type":"application/json"},
//         body: JSON.stringify(query)
//     }).then(res => res.json()).then(data => {
//         listingInitReponseHandler(data.customers);
//     });
// };

// const customerSimpleUpdate = (cust) => {
//     fetch('/customers/update',{
//         method:"POST",
//         headers: {"Content-Type":"application/json"}
//         ,body: JSON.stringify(cust)
//     }).then(res =>  {
//     });
// };
