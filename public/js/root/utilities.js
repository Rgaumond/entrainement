const ArrayUtilities = {
    findItemById(arrObj, id) {
        theItem = null;
        $.each(arrObj, (index, value) => {
            if (value._id === parseInt(id)) {
                theItem = value;
                theItem.arrIndex = index;
                return;
            }
        });
        return theItem;
    },
    findItemIndexById(arrObj, id) {
        theItem = null;
        $.each(arrObj, (index, value) => {
            if (value.id === parseInt(id)) {
                theItem = index;
                return;
            }
        });
        return theItem;
    },
    findObjByProp(arrObj, prop, value) {
        /**
         * 
         * @param {array} arrObj The array to parse
         * @param {string} prop The property name
         * @param {string} value The value to ind          
         */
        theObj = null;
        $.each(arrObj, (index, obj) => {
            if (obj[prop] === value) {
                theObj = obj;
                return;
            }
        });
        return theObj;
    },
    sortByName(objs) {
        return objs.sort((a, b) => (a.name.toLowerCase().localeCompare(b.name.toLowerCase()) === 1) ? 1 : (b.name.toLowerCase().localeCompare(a.name.toLowerCase()) === 1) ? -1 : 0);
    },
    sortSeries(objs) {
        return objs.sort((a, b) => (a.SerieNo > b.SerieNo) ? 1 : (a.SerieNo < b.SerieNo)  ? -1 : 0);
    },
    fetchNextID(arrObj, id) {
        let selectNext = false;
        let nextId;
        $.each(arrObj, (index, value) => {
            if (selectNext) {
                nextId = value._id;
                selectNext = false;
            }
            if (value._id === id)
                selectNext = true;
        });
        return nextId;
    },
    fetchLast(objArr) {
        return objArr[objArr.length - 1];
    },
    fetchNext(arr, current) {
        return arr[arr.indexOf(current) + 1];
    },
    fetchIndexByName(arrObj, name) {
        let seletedIndex = null;
        $.each(arrObj, (index, value) => {
            if (value.name.toLowerCase() === name.toLowerCase()) {
                seletedIndex = index;
                return false;
            }
        });
        return seletedIndex;
    }
};

function truncateText(name) {
    if (name.indexOf("@") > -1)
        return name.substr(0, name.indexOf("@"));
    else
        return name;
}



function currentDate() {
    var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL",
        "AUG", "SEP", "OCT", "NOV", "DEC"];
    let currentDate = new Date();
    let cDay = currentDate.getDate();
    let cMonth = months[currentDate.getMonth()];
    let cYear = currentDate.getFullYear();
    return cDay + "-" + cMonth + "-" + cYear;
}



/**
 * 
 * @param {string} id the id of the select element
 * @param {Array} options the list of options
 * @param {string} label the label value
 * @param {string} onchange the callback in string format with parameters
 */
const buildSelect = (id, options, label, onchange) => {
    let onChangeCTA = "";
    if (onchange !== null)
        onChangeCTA = "onchange=" + onchange;
    let ct = "";
    if (label!=="") 
        ct += `<label class='form__label' for= '${id}' > ${label}</label>`
    ct +=`<select id='select-${id}' ${onChangeCTA}>`;
    $.each(options, (y, opt) => {
        ct += `<p><option value='${opt}'>&nbsp;${opt}</option></p>`;
    });
    ct += "</select>";
    return ct;
};

/**
 * 
 * @param {string} id the id of the input element
 * @param {string} label the label value
 * @param {string} value the value of the input
 * @param {string} onchange the callback in string format with parameters
 * @return {string} the select element in string
 */
const buildInput = (id, value, label, onchange) => {
    if (onchange !== null)
        onChangeCTA = "onchange=" + onchange;
    let ct = `<div class='inputContainer'><label class='form__label' for='${id}'>${label}</label>
     <input type='text' id='input-${id}'  propname='${id}' propType='input' ${onChangeCTA} value='${value}' autocomplete='off'/></div>`;
    return ct;
};

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}