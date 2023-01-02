
// todo: use a variable baseUrl and add the parameters according to it. //done
// todo: rename variables //done
// todo: use a common function to fetch records. //done
// todo: rename data to rows //done
function showRecord(rows) {
    let tableRow = "";
    // Loop to access all rows
    let tableRef = document.getElementById('table_body')
        .getElementsByTagName('tbody')[0];
    // todo: rename "r" // done
    for (let row of rows) {
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

async function filterData(){
    let url=`https://api.punkapi.com/v2/beers?`;
    let abv = document.querySelector('input[name="abv"]:checked');
    if(abv){
        abv=abv.value;
        let abvArray = abv.split("-");
        if(abvArray[0]){
            url+=`abv_gt=${abvArray[0]}&`;
        }
        if(abvArray[1]){
            url+=`abv_lt=${abvArray[1]}&`
        }
    }

    // todo: if (abv)  // done
    // todo: remove hard coded values. // done
    let ibu = document.querySelector('input[name="ibu"]:checked');
    if(ibu){
        ibu=ibu.value;
        let ibuArray = ibu.split("-");
        if(ibuArray[0]){
            url+=`ibu_gt=${ibuArray[0]}&`;
        }
        if(ibuArray[1]){
            url+=`ibu_lt=${ibuArray[1]}&`;
        }
    }
    let beerName = document.getElementById("search-by-name").value;
    if(beerName){
        url+=`beer_name=${beerName}&`;
    }
   await DeleteRows();
    const response = await (await fetch(url)).json();
    showRecord(response);
}
filterData();
async function resetFilter() {
    let abv = document.querySelector('input[name="abv"]:checked');
    if (abv) {
        abv.checked = false;
    }
    let ibu = document.querySelector('input[name="ibu"]:checked');
    if (ibu){
        ibu.checked = false;
    }
    let searchBy = document.getElementById("search-by-name").value = "";
    await DeleteRows();
    await filterData();
}


 async function DeleteRows() {
    let rowCount = table_body.rows.length;
    for (let i = rowCount - 1; i > 0; i--) {
        table_body.deleteRow(i);
    }
}


