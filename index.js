(async function getApi() {
    // Storing response
    const response = await fetch(`https://api.punkapi.com/v2/beers`);
    // Storing data in form of JSON
    let data = await response.json();
    console.log(data);
    show(data);
})()

async function getApiFilter(filterBy, min, max) {
    DeleteRows();
    let gt = filterBy + "_gt";
    let lt = filterBy + "_lt";
    min = parseInt(min);
    max = parseInt(max);
    const response = await fetch(`https://api.punkapi.com/v2/beers?${gt}=${min}&${lt}=${max}`);
    let data = await response.json();
    console.log(data);
    show(data);
}
async function getApi(searchBy) {
    DeleteRows();
    const response = await fetch(`https://api.punkapi.com/v2/beers?beer_name=${searchBy}`);
    let data = await response.json();
    console.log(data);
    show(data);
}
//table row removing function
function DeleteRows() {
    var rowCount = table_body.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        table_body.deleteRow(i);
    }
}

//sort by
function filterData() {
    let filerBy = document.getElementById("filter-by").value;
    let min = document.getElementById("min").value;
    let max = document.getElementById("max").value;
    getApiFilter(filerBy, min, max);
}
//filter by name
function filterByName(){
    let searchBy = document.getElementById("search-by-name").value;
    getApi(searchBy);
}
function show(data) {
    let tab = "";
    // Loop to access all rows
    let tableRef = document.getElementById('table_body')
        .getElementsByTagName('tbody')[0];
    for (let r of data) {
        tab = `<tr> 
                <td>${r.id} </td>
                <td>${r.name}</td>
                <td>${r.tagline}</td> 
                <td>${r.description}</td>          
                <td>${r.abv}</td>          
                <td>${r.ibu}</td>          
            </tr>`;
        tableRef.insertRow().innerHTML = tab;
    }
}

