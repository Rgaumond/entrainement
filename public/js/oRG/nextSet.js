const printNext = () => {
    $(".nextSeriesOuterContainer").html("");
    $.each(current.object.exercises, (index, wrkID) => {
        let ex = exercises.find(obj => { return obj._id === wrkID; })
        if (ex.completed === 0) {
            $(".nextSeriesOuterContainer").append(`<div class='nextWorkoutTitle'>${ex.name}</div>`);
            $.each(ex.sets, (index, set) => {
                if (serie.completed === 0) {
                    $(".nextSeriesOuterContainer").append(`<div class='nextSerieContainer'>
                                                                <div>${serie.Weight} Lbs</div><div>${serie.Reps} Reps</div>
                                                           </div>`);
                }
            });
        }
    });
};

const showNextSeries = () => {
    $(".whatIsNextContainer").show();
};

const closeNextSeries = () => {
    $(".whatIsNextContainer").hide();
};