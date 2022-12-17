const processor = {
    data: null,
    form_name: null,
    callback: null,
    splashscreen: false,
    call: function (form_name, url, callback) {
        processor.form_name = form_name;
        processor.callback = callback;
        var dataString = "";
        var count = 0;
        $.each($('#' + form_name).serializeArray(), function (i, field) {
            if (count > 0)
                dataString += "&";
            dataString += field.name + "=" + field.value;            
            count++;
        });
        dataString += "&athlete=" + ATHLETE;
        $.ajax({
            dataType: 'json', type: "post",
            url: url + ".aspx",
            data: dataString,
            success: function (data) {
                processor.data = data;
                if (callback !== undefined)
                    processor.postProcessing();
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    },
    postProcessing: function () {
        var data = processor.data;
        let callback = processor.callback;
        if (callback !== undefined)
            callback(data);
    }
};

const DB = {
    updateObj: function (obj, objType) {
        $("#execute").val("update");
        obj.Updated = currentDate();
        $("#obj").val(cleanJSON(obj));
        $("#objType").val(objType);
        processor.call("Frm", "postManager");
    },
    updateWorkout: function (workout) {
        if (customerChanged(baseWorkout, JSON.stringify(workout))) {
            workout.Updated = currentDate();
            $("#execute").val("updateWorkout");
            $("#obj").val(cleanJSON(workout));
            $("#id").val(workout._id);
            processor.call("Frm", "postManager");
            baseWorkout = JSON.stringify(workout);
        }                    
    },
    addWorkout: function (workout) {
            $("#execute").val("addWorkout");
            $("#obj").val(cleanJSON(workout));
            $("#id").val(workout._id);
            processor.call("Frm", "postManager");
    },
    deleteWorkout: function (workout) {
        $("#execute").val("deleteWorkout");
        $("#obj").val(cleanJSON(workout));
        $("#id").val(workout._id);
        processor.call("Frm", "postManager");
    }
};

function customerChanged(original, toSave) {
    let result = true;
    if (original === toSave)
        result = false;
    return result;
}

function cleanJSON(obj) {
    let unclean = JSON.stringify(obj);
    let cleaned = encodeURIComponent(unclean);
    return cleaned;
}