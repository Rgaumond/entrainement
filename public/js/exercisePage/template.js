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

const modifPageComponents = (name) => {
  return `<div class='inputArea'>
                  <div class='inputContainer100C'>
                        <label class='form__label' for='input-add'>${fetchTranslation(
                          "clickToEdit"
                        )}</label>
                        <input type='text' class='name-box' id='input-name' value='${name}'  />
                  </div>
            </div>
           <div class='childContainer' ></div>`;
};

const modifTitle = () => {
  $(".modif-title").attr("type", fetchTranslation("Exercise"));
  if (exerciseAction === "edit") {
    $(".modif-title").html("(" + fetchTranslation("editView") + ")");
  } else {
    $(".modif-title").html("(" + fetchTranslation("addView") + ")");
  }
};

const fetchExerciseMovements = () => {
  movements.sort();
  movements.unshift("Choose");
  return movements;
};
