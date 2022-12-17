const setsViewPrep = () => {
  let title = "<div class='titleIndex0'>" + currentExercise.name + "</div>";
  $(".serie-header").html(
    `<div class='serie-title'>${title}</div><div class='serie-column-header'><div></div><div>LBS</div><div>REPS</div><div></div></div>`
  );
  $("#series").html("");
};
const serieTemplate = (sets, set, index) => {
  return `<div id='serie${index}' class='serie' completed='${
    sets.completed
  }' setIndex='${index}'>
              <div class='serieIndex'>${Number(index) + 1}</div>
              <div class='weight' unit='weight' ><div orgweight=''>${
                set.weight
              }</div></div>
              <div class='reps' unit='reps'><div>${set.reps}</div></div>
              <div class='serieStatus'></div>
          </div>`;
};
