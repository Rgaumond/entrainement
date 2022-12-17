/********************************  LIST  ***************************************** */
const listContainerTemplate = (type) => {
  return `<div class='list-container-title' ><div class='list-title'>${fetchTranslation(
    type
  )}</div></div><div class='list-li-container'></div>`;
};

const listActiveLiTemplate = (objArray) => {
  let ct = "";
  $.each(objArray, (index, obj) => {
    ct += `<li id='li${obj._id}' obj_id='${obj._id}' obj_index='${index}' obj_type="" class='completed${obj.completed}'>${obj.name}</li>`;
  });
  return ct;
};

/********************************  MODIF PAGE  ***************************************** */

const exerciseModifPageComponents = () => {
  return `<div class='inputContainer100C'>
                ${buildSelect(
                  "movementSelect",
                  fetchExerciseMovements(),
                  fetchTranslation("exType"),
                  ""
                )}
            </div>
            <div class='inputContainer100R'>
              <div class='inputSubContainer'>
                    ${buildSelect(
                      "numSeries",
                      ["Choose", 1, 2, 3, 4, 5, 6, 7, 8],
                      fetchTranslation("numSeries")
                    )}
              </div>
              <div class='inputSubContainer'>
                    ${buildSelect(
                      "restInterval",
                      ["Choose", 0, 30, 60, 90, 120, 150, 180],
                      fetchTranslation("interval")
                    )}
              </div>
              </div>`;
};

const modifPageComponents = () => {
  return `<div class='inputArea'>
                  <div class='inputContainer100C'>
                        <label class='form__label' for='input-add'>${fetchTranslation(
                          "clickToEdit"
                        )}</label>
                        <input type='text' class='name-box' id='input-name' value=''  />
                  </div>
            </div>
           <div class='childContainer' ></div>`;
};

const modifNaveTemplate = () => {
  return `<div class="modif-close" label='${fetchTranslation("bkToList")}'}>
              ${faReturnToList()}
          </div>
          <div class="modif-delete" label='${fetchTranslation("delete")}'>
              ${faDeleteModif()}
          </div>
          <div class="modif-save" >
              ${faSave()}
          </div>`;
};

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

const childList = (obj, index) => {
  let ct = `<li id='li${index}' class='childli' obj_id='${obj._id}' obj_index='${index}' >${obj.name}`;
  if (!workingOut) {
    ct += `<div id='childliactions${obj._id}' class='childLiAction'>
        <div class='childlidelete' obj_id='${
          obj._id
        }'  obj_index='${index}'>${faDeleteModif()}</div>
        <div class='childlireplace' obj_id='${
          obj._id
        }'  obj_index='${index}'>${faReplace()}</div>        
        <div class='childliactionsClose' obj_id='${
          obj._id
        }'  obj_index='${index}'>${faGoRight()}</div>
        </div>`;
  }
  ct += ` </li >`;
  return ct;
};
