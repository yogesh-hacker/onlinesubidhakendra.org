var script_url = "https://script.google.com/macros/s/AKfycbw3w7xMP0F57pCufHOXl5GK4OXPKKnGE6P6wAEKafSFR2lO1AIXwnpEZX5tEveSdisG/exec"
var requested_parameter = new URLSearchParams(window.location.search)
var requested_data = "4"

$(document).ready(function() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    console.log(today)
    $("#current_date").append(today)
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


        i_cell.className = "table-primary"
        ii_cell.className = "table-primary"
        iii_cell.className = "table-primary"
        iv_cell.className = "table-primary"

        i_cell.innerHTML = "Serial No";
        ii_cell.innerHTML = "Particulars";
        iii_cell.innerHTML = "Payment Mode";
        iv_cell.innerHTML = "Amount";

        for (var i = 0; i < json.records.length; i++) {
            if (requested_data == json.records[i].serial_no) {
                $("#name").append(json.records[i].name)
                $("#receipt_no").append(json.records[i].serial_no)
                tr = data_table.insertRow(-1);
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = json.records[i].serial_no;
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = json.records[i].package_icon;
                tabCell = tr.insertCell(-1)
                tabCell.innerHTML = json.records[i].package_name
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = json.records[i].package_version;
                tabCell = tr.insertCell(-1)
                tabCell.innerHTML = json.records[i].package_size
            }
        }
    })
})


function Print() {
    $('#receipt_voucher').printThis({
                importCSS: true,
                importStyle: true,//thrown in for extra measure
                loadCSS: "/storage/0403-0201/Jahiruddin Molla/Print/style.css",
                header:''
            });
}