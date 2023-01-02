async function getApi() {
    // Storing response
    const response = await (await fetch(`https://api.punkapi.com/v2/beers`)).json();
    // Storing data in form of JSON
    // let data = response.json();
    console.log("data",response);
    showRecord(response);
}

getApi();


// todo: use a variable baseUrl and add the parameters according to it. //done
// todo: rename variables //done
// todo: use a common function to fetch records.
async function getApiFilter(abvLt, abvGt, ibuLt, ibuGt, searchBy) {
    await DeleteRows();
    let url=`https://api.punkapi.com/v2/beers?`;
    if(searchBy){
        url+=`beer_name=${searchBy}&`;
    }
    url+=`abv_gt=${abvLt}&abv_lt=${abvGt}&ibu_lt=${ibuGt}&ibu_gt=${ibuLt}`;
    // todo: can convert in single line.
    const response = await fetch(url);
    let data = await response.json();
    console.log(data);
    showRecord(data);
}
// todo: rename data to rows
function showRecord(data) {
    let tableRow = "";
    // Loop to access all rows
    let tableRef = document.getElementById('table_body')
        .getElementsByTagName('tbody')[0];
    // todo: rename "r" // done
    for (let row of data) {
        tableRow = `<tr> 
                <td>${row.id} </td>
                <td>${row.name}</td>
                <td>${row.tagline}</td> 
                <td>${row.description}</td>          
                <td>${row.abv}</td>          
                <td>${row.ibu}</td>          
            </tr>`;
        tableRef.insertRow().innerHTML = tableRow;
    }
}

async function filterData() {
    // let abv = document.getElementsByName("abv").value;
    let abv = document.querySelector('input[name="abv"]:checked');
    // todo: if (abv)  // done
    // todo: remove hard coded values.
    if (abv) {
        abv = abv.value;
    } else {
        abv = "0-100";
    }
    let abvArray = abv.split("-");
    let ibu = document.querySelector('input[name="ibu"]:checked');
    if (ibu) {
        ibu = ibu.value;
    } else {
        ibu = "0-100";
    }
    let ibuArray = ibu.split("-");
    let searchBy = document.getElementById("search-by-name").value;
    await getApiFilter(abvArray[0], abvArray[1], ibuArray[0], ibuArray[1], searchBy);
}

async function resetFilter() {
    let abv = document.querySelector('input[name="abv"]:checked');
    if (abv) {
        abv.checked = false;
    }
    let ibu = document.querySelector('input[name="ibu"]:checked');
    if (abv){
        ibu.checked = false;
    }
    let searchBy = document.getElementById("search-by-name").value = "";
    await DeleteRows();
    await getApi();
}


/*async function getApi(searchBy) {
    DeleteRows();
    const response = await fetch(`https://api.punkapi.com/v2/beers?beer_name=${searchBy}`);
    let data = await response.json();
    console.log(data);
    show(data);
}

//table row removing function
*/
 async function DeleteRows() {
    let rowCount = table_body.rows.length;
    for (let i = rowCount - 1; i > 0; i--) {
        table_body.deleteRow(i);
    }
}

/*
//sort by


//filter by name
/*
function filterByName() {
    let searchBy = document.getElementById("search-by-name").value;
    getApi(searchBy);
}
*/

