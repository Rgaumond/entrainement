const validateModif = (type) => {
    resetAlerts();
    let pass = true;
    if ($(`#input-name`).val() === "") {
        if (type === "workout")
            alert(fetchTranslation('noWorkoutExercises'));
        else
            alert(fetchTranslation('addNameEmpty'));
        $("label[for='input-name']").css({ "color": "red", "background": "yellow" });
        pass = false;
    }
    else {
        pass = nameDoNotExist();
            if (type === "exercise") {
                if ($("#select-movementSelect").val() === "Choose") {
                    alert(fetchTranslation('noMovement'));
                    $("label[for='movementSelect']").css({ "color": "red", "background": "yellow" });
                    pass = false;
                }
                else if ($("#select-numSeries").val() === "Choose") {
                    alert(fetchTranslation('noNumSeries'));
                    $("label[for='numSeries']").css({ "color": "red", "background": "yellow" });
                    pass = false;
                }
                else if ($("#select-restInterval").val() === "Choose") {
                    alert(fetchTranslation('noInterval'));
                    $("label[for='restInterval']").css({ "color": "red", "background": "yellow" });
                    pass = false;
                }
            }
            else if (type === "workout") {
                if (current.object.exercises.length === 0) {
                    alert(fetchTranslation('noWorkoutExercises'));
                    $("label[for='restInterval']").css({ "color": "red", "background": "yellow" });
                    pass = false;
                }
            }
    }    
    return pass;
};

const nameDoNotExist = () => {
    let pass = true;
    let sameNameObj = currentList.options.find(obj => { return obj.name.toLowerCase() === $(`#input-name`).val().toLowerCase() });
    if (sameNameObj && current.object._id !== sameNameObj._id) {
        if (current.object.type === "workout")
            alert(fetchTranslation('workoutExist'));           
        else 
            alert(fetchTranslation('nameExist'));
        $("label[for='input-add']").css({ "color": "red", "background": "yellow" });
        pass = false;        
    }
    return pass;
};

const resetAlerts = () => {
    $("label").css({ "color": "black", "background": "#fff" });
};
