/* FETCH */
const fetchWorkouts = (callback) => {
  fetch("../workouts/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: localStorage.getItem("user") }),
  })
    .then((res) => res.json())
    .then((data) => {
      workouts = ArrayUtilities.sortByName(data.workouts);
      workoutEnhance(workouts);
      localStorage.setItem("workouts", JSON.stringify(workouts));
      window.location.href = "/views/workoutList.html";
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

/* UPDATING */
const workoutExerciseUpdate = (workout) => {
  prepareWorkoutForProcessing();
  fetch("/workouts/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(workout),
  }).then((res) => {});
};

/* UPDATING */
const workoutUpdate = () => {
  prepareWorkoutForProcessing();
  let obj = currentWorkout;
  fetch("/workouts/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  }).then((res) => {
    updateWorkoutsArray();
    localStorage.setItem("workoutAction", "edit");
    window.location.href = "workoutList.html";
  });
};

/* ADDING */
const workoutAdd = (wk) => {
  prepareWorkoutForProcessing();
  fetch("/workouts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(wk),
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("workoutAction", "edit");
      window.location.href = "workoutList.html";
    });
};

const prepareWorkoutForProcessing = () => {
  currentWorkout.lastUpdate = currentDate();
  currentWorkout.user = localStorage.getItem("user");
  workoutClean();
  currentWorkout.name = $("#input-name").val();
};

/* DELETING */
const workoutDelete = () => {
  let obj = currentWorkout;
  fetch("/workouts/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ obj }),
  }).then((res) => {
    localStorage.setItem("workoutAction", "workingOut");
    window.location.href = "workoutList.html";
  });
};

const workoutClean = () => {
  $.each(workouts, (index, wk) => {
    delete wk.type;
    delete wk.label;
    delete wk.update;
    delete wk.add;
    delete wk.delete;
    delete wk.temp;
  });
};

/* FILTERING */
// const filterCustomers = () =>{
//     customerList();
//     applyfilter();
// }

/* ADDING */
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

/* LISTING*/
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
