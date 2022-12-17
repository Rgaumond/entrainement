let lang = localStorage.getItem("lang");
let terms = {
  Workouts: { E: "Workouts", F: "Entrainements" },
  WorkingOut: { E: "Let's Go", F: "On y va" },
  WorkoutsEdit: { E: "Edit workout", F: "Modifier entrainement" },
  WorkoutsAdd: { E: "Add workout", F: "Ajouter entrainement" },
  ExerciseEdit: { E: "Edit exercise", F: "Modifier exercise" },
  ExerciseAdd: { E: "Add exercise", F: "Ajouter exercise" },
  NextSerie: { E: "Fetch active serie", F: "Série active" },
  CurrentWorkout: { E: "Active workout", F: "Entrain. actif" },
  Home: { E: "Home", F: "Index" },
  Exercises: { E: "Exercises", F: "Exercises" },
  Workout: { E: "Workout", F: "Entrainement" },
  Exercise: { E: "Exercise", F: "Exercise" },
  Chrono30: { E: "30 seconds", F: "30 secondes" },
  Chrono45: { E: "45 seconds", F: "45 secondes" },
  editView: { E: "Edit view", F: "Mode édition" },
  addView: { E: "Add item view", F: "Mode addition" },
  clickToEdit: { E: "Click to edit", F: "Cliquer pour modifier" },
  exType: { E: "Muscle group", F: "Groupe musculaire" },
  bkToList: { E: "Back to list", F: "Retour à la liste" },
  save: { E: "Save modifications", F: "Sauvegarde" },
  delete: { E: "Delete", F: "Supprimer" },
  add: { E: "Add", F: "Ajouter" },
  noChange: {
    E: "You did not modify -click 'Back to list' to exit or modify your ",
    F: "Aucune modification - cliquer 'Retour à la liste' ou modifier votre ",
  },
  confirmMods: {
    E: "Do you want to save your changes?",
    F: "Voulez-vous sauvegarder vos changements?",
  },
  confirmDel: { E: "Do you want to delete this?", F: "Voulez-vous supprimer?" },
  addNameEmpty: { E: "A name is required!", F: "Un nom est requis!" },
  noMovement: {
    E: "A muscle group is required!",
    F: "Un groupe musculaire est requis!",
  },
  nameExist: { E: "This name already exist!", F: "Ce nom est déjà utilisé!" },
  workoutExist: {
    E: "This workout already exist!",
    F: "Cet entrainement existe déjà!",
  },
  addWorkout: {
    E: "Do you want to create a workout for ",
    F: "Voulez-vous créer un entrainement pour ",
  },
  numSeries: { E: "Number of series", F: "Nombre de séries" },
  interval: { E: "Interval in seconds", F: "Intervalle en secondes" },
  noNumSeries: {
    E: "A number of series is required!",
    F: "Un nombre de séries est requis!",
  },
  noInterval: { E: "An interval is required!", F: "L'intervalle est requise!" },
  noWorkoutExercises: {
    E: "You must add exercises!",
    F: "Vous devez ajouter un exercise!",
  },
  activeWorkout: { E: "Current active workout", F: "Entrainement courant" },
  newWeight: { E: "New weight", F: "Nouveau poid" },
  Close: { E: "Close", F: "Fermer" },
  Next: { E: "Next", F: "Prochain" },
  SwapLeftInfo: { E: "<------ More actions", F: "<------ Plus d'actions" },
  Timer30: { E: "30 sec. chrono", F: "30 sec. chrono" },
  Timer45: { E: "45 sec. chrono", F: "45 sec. chrono" },
  Timer60: { E: "60 sec. chrono", F: "60 sec. chrono" },
};

let fetchTranslation = (term) => {
  if (lang === "E") return terms[term].E;
  else return terms[term].F;
};
