function get_current_button() {
    var current_option = $("#button_values option:selected")
    var action_button = $("#action_button")

    if (current_option.text() === "Delete") {
        action_button.attr("class", "btn btn-danger")
    } else if (current_option.text() === "Update") {
        action_button.attr("class", "btn btn-warning")
    } else {
        action_button.attr("class", "btn btn-primary")
    }
    action_button.val(current_option.text())
    action_button.attr("onclick", current_option.val())
    action_button.removeAttr("disabled")
}

var script_url = "https://script.google.com/macros/s/AKfycbw3w7xMP0F57pCufHOXl5GK4OXPKKnGE6P6wAEKafSFR2lO1AIXwnpEZX5tEveSdisG/exec"


function insert_value() {
    $("#result_container").css("left",
        "-500vh");
    $("#loader").css("top",
        "5px");
    var serial_no = $("#serial_no").val();
    var upload_date = $("#upload_date").val();
    var particular = $("#particular").val();
    var name = $("#name").val().trim();
    var payment_categorie = $("#payment_categories").val()
    var receipt_amount = $("#receipt_amount").val();
    var payment_amount = $("#payment_amount").val()
    var remark = $("#remark").val()

    var url = script_url + "?callback=ctrlq&serial_no=" + serial_no + "&upload_date=" + upload_date + "&particular=" + particular + "&name=" + name + "&payment_categorie=" + payment_categorie + "&receipt_amount=" + receipt_amount + "&payment_amount=" + payment_amount + "&remark=" + remark + "&action=insert";
    var request = jQuery.ajax({
        crossDomain: true,
        url: url,
        method: "GET",
        dataType: "jsonp"
    });
    update_serial_no()
}




function delete_value() {
    $("#result_container").css("left",
        "-500vh");
    $("#loader").css("top",
        "5px");
    var serial_no = $("#serial_no").val();
    var upload_date = $("#upload_date").val();
    var particular = $("#particular").val();
    var name = $("#name").val().trim();
    var payment_categorie = $("#payment_categories").val()
    var receipt_amount = $("#receipt_amount").val();
    var payment_amount = $("#payment_amount").val()
    var remark = $("#remark").val()

    var url = script_url + "?callback=ctrlq&serial_no=" + serial_no + "&upload_date=" + upload_date + "&particular=" + particular + "&name=" + name + "&payment_categorie=" + payment_categorie + "&receipt_amount=" + receipt_amount + "&payment_amount=" + payment_amount + "&remark=" + remark + "&action=delete";
    var request = jQuery.ajax({
        crossDomain: true,
        url: url,
        method: "GET",
        dataType: "jsonp"
    });

    update_serial_no()
}

function ctrlq(e) {
    var result_class = document.getElementById("result");
    var close_class = document.getElementById("close")
    document.getElementById("result").innerHTML = e.result;
    $("#result_container").css("left",
        "0px");
    $("#loader").css("top",
        "-100px");
    var exists = "Data already uploaded!"
    var not_exists = "Data uploaded successfully!"
    var success = "p-3 m-2 list-group-item list-group-item-success rounded"
    var warning = "p-3 m-2 list-group-item list-group-item-warning rounded"

    if (e.result === exists) {
        result_class.className = warning;
        close_class.className = warning;
    }
    if (e.result === not_exists) {
        result_class.className = success;
        close_class.className = success;
    }
}



$(document).ready(function() {
    var upload_date = $("#upload_date");
    var serial_no = $("#serial_no");
    serial_no.val("1")
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    console.log(today)
    upload_date.val(today)

    var serial_no = $("#serial_no");
    var url = script_url + "?action=read";
    $('#search_button').removeAttr('disabled')
    var check_point = 1
    serial_no.val("1")
    $.getJSON(url, function (json) {
        var old_serial_no = []
        for (var i = 0; i < json.records.length; i++) {
            old_serial_no.push(json.records[i].serial_no)
        }
        var current_serial_no = JSON.parse(old_serial_no.slice(-1))+1
        serial_no.val(current_serial_no)
    })
})


function read_value() {
    $("#result_container").css("left",
        "-500vh");
    $("#loader").css("top",
        "5px");
    var url = script_url + "?action=read";
    $.getJSON(url, function (json) {
        var data_table = document.createElement("table");
        data_table.className = "table table-bordered"
        var data_table_head = data_table.createTHead();

        var row = data_table_head.insertRow(0);
        var i_cell = row.insertCell(0);
        var ii_cell = row.insertCell(1);
        var iii_cell = row.insertCell(2);
        var iv_cell = row.insertCell(3);
        var v_cell = row.insertCell(4);
        var vi_cell = row.insertCell(5);
        var vii_cell = row.insertCell(6);
        var viii_cell = row.insertCell(7);


        i_cell.className = "table-primary"
        ii_cell.className = "table-primary"
        iii_cell.className = "table-primary"
        iv_cell.className = "table-primary"
        v_cell.className = "table-primary"
        vi_cell.className = "table-primary"
        vii_cell.className = "table-primary"
        viii_cell.className = "table-primary"

        i_cell.innerHTML = "Serial No";
        ii_cell.innerHTML = "Date";
        iii_cell.innerHTML = "Particular";
        iv_cell.innerHTML = "Name";
        v_cell.innerHTML = "Payment Categorie";
        vi_cell.innerHTML = "Receipt Amount";
        vii_cell.innerHTML = "Payment Amount";
        viii_cell.innerHTML = "Remark";



        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < json.records.length; i++) {
            tr = data_table.insertRow(-1);
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].serial_no;
            tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].upload_date
            tabCell = tr.insertCell(-1)
            tabCell.innerHTML = json.records[i].particular;
            tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].name;
            tabCell = tr.insertCell(-1)
            tabCell.innerHTML = json.records[i].payment_categorie;
            tabCell = tr.insertCell(-1);
            tabCell.innerHTML = "₹"+json.records[i].receipt_amount+".00";
            tabCell = tr.insertCell(-1)
            tabCell.innerHTML = "₹"+json.records[i].payment_amount+".00";
            tabCell = tr.insertCell(-1)
            tabCell.innerHTML = json.records[i].remark;
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("show_database");
        divContainer.innerHTML = "";
        divContainer.appendChild(data_table);
        $("#result_container").css("left", "0px");
        $("#loader").css("top", "-100px");
        document.getElementById("result").innerHTML = "Database printed successfully!"
    });
}


function print_last() {
    $("#loader").css("top",
        "5px");
    var url = script_url + "?action=read";
    $.getJSON(url,function (json) {
            var last_data = json.records.slice(-1).pop()
            window.open("../Print/index.html?serial_no=" + last_data.serial_no)
        });
    $("#loader").css("top",
        "-100px");
}

function update_serial_no() {
    var serial_no = $("#serial_no")
    var url = script_url + "?action=read"
    var check_point = 1
    $.getJSON(url,
        function (json) {
            var old_serial_no = []
            for (var i = 0; i < json.records.length; i++) {
                old_serial_no.push(json.records[i].serial_no)
            }
            var current_serial_no = JSON.parse(old_serial_no.slice(-1))+1
            serial_no.val(current_serial_no)
        })
}


var container = $(".container")
$("#specific_data").click(function(e) {
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        $("#specific_data").css("display", "none")
    }
});


$("#print_specific").click(function() {
    $("#specific_data").css("display", "block")
})

var temp = 1
function print_value() {
    var serial_no = $("#print_data").val()
    if (serial_no === "") {
        alert("Please enter a correct serial number!");
        temp = 0;
    }
    if (serial_no === "0") {
        alert("Serial number should be more than 0");
        temp = 0
    }
    if (temp == 1) {
        window.open("../Print/index.html?serial_no=" + serial_no);
    }
}

/*-----------------*/

var final_text;
function capitalize(input) {
    var words = input.split(' ');
    var CapitalizedWords = [];
    words.forEach(element => {
        CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));
    });
    final_text = CapitalizedWords.join(' ')
}

$("#name").keyup(function() {
    capitalize($("#name").val())
    $("#name").val(final_text)
})

$("#particular").keyup(function() {
    capitalize($("#particular").val())
    $("#particular").val(final_text)
})

$("#remark").keyup(function() {
    $("#remark").val($("#remark").val().toUpperCase())
})

$("#setcookie").click(function() {
    $.cookie('LoggedIn', 'false', {
        expires: 1, path: '/'
    });
})

$("#show_pass").click(function() {
    var input_type = $("#password").attr("type");
    if (input_type === "password") {
        $("#password").attr("type", "text")
    } else {
        $("#password").attr("type", "password")
    }
})


setInterval(function() {
    console.clear()
    $(document).ready(function() {
        var LoggedIn = $.cookie("LoggedIn");
        if (LoggedIn !== "true") {
            $("#login_pop_up").css("display", "block")
        }
    })
}, 1);


$("#verify").click(function() {
    var password = $("#password").val()
    if (password === "jahir1234") {
        $.cookie('LoggedIn', 'true', {
            expires: 1, path: '/'
        });
        $("#login_pop_up").css("display", "none")

    }
    if (password !== "jahir1234") {
        $("#error").html("Wrong password!")
        $("#error").effect("shake")
    }
})