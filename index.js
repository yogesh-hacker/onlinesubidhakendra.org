var c = document.getElementById("form_collapse")
function addLink(){
    $('#form_collapse').collapse('show')
    $('#form_collapse').collapse({
        toggle:"true"
    })
}

function hideit(){
    $('#form_collapse').collapse('hide')
}


const search = document.getElementById("search_bar")



search.addEventListener('keyup', s=>{
    const search_value = search.value;
    const isfocused = document.getElementById('search_bar');
    if (isfocused === document.activeElement){
        document.getElementById("my_search_links").style.display = "block";
    }
    if (search_value === ""){
        document.getElementById("my_search_links").style.display = "none";
    }
    mySearch()
})

function mySearch() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('search_bar');
  filter = input.value.toUpperCase();
  ul = document.getElementById("search_links");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}


/*1ObXEhvpSuwT3cYa5h7wryEMmy9zXvsrM899DB-42iFE*/

const sheetId = '1rrjnQJ6K2JE64qIYIjFEbZPHhfMwxG0ucmMDDXDloq8';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'Sheet1';
const query = encodeURIComponent('Select *')
const url = `${base}&sheet=${sheetName}&tq=${query}`
const data = []
document.addEventListener('DOMContentLoaded', init)
 
const output = document.querySelector('.output')
 
function init() {
    fetch(url)
        .then(res => res.text())
        .then(rep => {
            //Remove additional text and extract only JSON:
            document.getElementById("dom_loader").style.display ="none"
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            const colz = [];
            //Extract column labels
            jsonData.table.cols.forEach((heading) => {
                if (heading.label) {
                    let column = heading.label;
                    colz.push(column);
                }
            })
 
            //extract row data:
            jsonData.table.rows.forEach((rowData) => {
                const row = {};
                colz.forEach((ele, ind) => {
                    row[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
                })
                data.push(row);
            })
            processRows(data);
        })
}
  
function processRows(json) {
    json.forEach((row) => {
        const keys = Object.keys(row);
        let search_links = document.createElement("li");
        let g_links = document.createElement("li");
        let bank_links = document.createElement("li");
        let p_links = document.createElement("li");
        let b_links = document.createElement("li");
        let o_links = document.createElement("li");
        search_links.className = "list-group-item list-group-item-primary"
        g_links.className = "list-group-item list-group-item-primary"
        bank_links.className = "list-group-item list-group-item-primary"
        p_links.className = "list-group-item list-group-item-primary"
        b_links.className = "list-group-item list-group-item-primary"
        o_links.className = "list-group-item list-group-item-primary"
        
        search_links.innerHTML = `<img src='https://s2.googleusercontent.com/s2/favicons?domain=https://`+row.url+`'> </img><a class="user_links" target="_blank" href="https://`+row.url+`">`+row.url_name+`</a>`
        g_links.innerHTML = `<img src='https://s2.googleusercontent.com/s2/favicons?domain=https://`+row.url+`'> </img><a class="user_links" target="_blank" href="https://`+row.url+`">`+row.url_name+`</a>`
        bank_links.innerHTML = `<img src='https://s2.googleusercontent.com/s2/favicons?domain=https://`+row.url+`'> </img><a class="user_links" target="_blank" href="https://`+row.url+`">`+row.url_name+`</a>`
        p_links.innerHTML = `<img src='https://s2.googleusercontent.com/s2/favicons?domain=https://`+row.url+`'> </img><a class="user_links" target="_blank" href="https://`+row.url+`">`+row.url_name+`</a>`
        b_links.innerHTML = `<img src='https://s2.googleusercontent.com/s2/favicons?domain=https://`+row.url+`'> </img><a class="user_links" target="_blank" href="https://`+row.url+`">`+row.url_name+`</a>`
        o_links.innerHTML = `<img src='https://s2.googleusercontent.com/s2/favicons?domain=https://`+row.url+`'> </img><a class="user_links" target="_blank" href="https://`+row.url+`">`+row.url_name+`</a>`
        
        document.getElementById("search_links").appendChild(search_links)
        
        if(row.url_type === "government"){
            document.getElementById('g_links').appendChild(g_links);
        }
        if(row.url_type === "banking"){
            document.getElementById('bank_links').appendChild(bank_links);
        }
        if(row.url_type === "personal"){
            document.getElementById('p_links').appendChild(p_links);
        }
        if(row.url_type === "buisness"){
            document.getElementById('b_links').appendChild(b_links);
        }
        if(row.url_type === "other"){
            document.getElementById('o_links').appendChild(o_links);
        }
    })
}









const scriptURL = 'https://script.google.com/macros/s/AKfycbzbWmvAVd1bMdr-7EhS9MW-m8aqrLs3aJwatqG0s4SeejG4zwg1XkNOGzAA0hA9LSh5/exec'
const form = document.forms['my_links']

form.addEventListener('submit', e => {
    e.preventDefault()
    const select_value = document.getElementById('url_type').value;
    if (select_value === ""){
        alert("Please choose something!");
    }
    else{
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => $("#form_alerts").html("<div class='alert alert-success'>Link details uploaded successfully!"+"<a href='https://docs.google.com/spreadsheets/d/1rrjnQJ6K2JE64qIYIjFEbZPHhfMwxG0ucmMDDXDloq8/edit?usp=drivesdk' traget='_blank'> See Details...</a>"+"</div>"))
        .catch(error => $("#form_alerts").html("<div class='alert alert-danger'>Link details not uploaded</div>"))
    }
})
