
function init() {
    let liorario = document.getElementById("orario");
    let time = getCurrentTime();
    liorario.innerHTML = "<a>" + time + "</a>";
    let aorario = document.querySelector("#orario a");
    aorario.innerHTML = time;
    let btndata = document.querySelector("#btnData");

    /*btndata.addEventListener("click",  ()=>   {
        let data= new Date();
        let txdata=data.getUTCDate();
        alert(txdata);
     });
     */
    loadSelCategory();

    btnselcategory.addEventListener("click", showSelCategory);
    btnsort.addEventListener("click", showSelCategory);

    showSelCategory();

}

function showOra() {
    let time = getCurrentTime();
    alert(time);
}


function showData() {
    let data = new Date();
    let txdata = data.getFullYear() + "-" + data.getMonth() + "-" + data.getDay();
    alert(txdata);
}

/* Show category functions */

function showSelCategory() {

    let selCat = document.querySelector("#selcategory");
    let url = "https://dummyjson.com/products/category/" + selCat.value;
    if (selCat.value == '')
        url = "https://dummyjson.com/products/"
    fetchProducts(url);

}

function loadSelCategory() {

    let url = "https://dummyjson.com/products/categories";

    fetch(url)
        .then((resp) => {
            return resp.json()
        })
        .then((arrJson) => {
            let ris = "<option value=''>All categories</option>";
            for (let cat of arrJson) {
                let opt = `<option value='${cat["slug"]}'>${cat["name"]}</option>`;
                ris += opt;
            }
            let outputtag = document.querySelector("#selcategory");
            outputtag.innerHTML = ris;

        });
}

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    init();
});


function fetchProducts(url) {

    let selord = document.getElementById("selsort").value;
    let fc = document.getElementById("fchoice");
    let direction = fc.elements.dir.value;

    let querstring = `?&sortBy=${selord}&order=${direction}`;
    url += querstring;
    fetch(url, {})
        .then((resp) => {
            return resp.json()
        }
        )
        .then((json) => {
            let objJson = json;
            let prodotti = objJson["products"];
            let ris = "";
            for (pr of prodotti) {
                let riga = creaTRSerivio(pr);
                ris += riga;
            }
            let outputtag = document.querySelector("#tservizi tbody");
            outputtag.innerHTML = ris;

        });
}

function visDetails(id){
    let url = `https://dummyjson.com/products/${id}`;
    fetch(url, {})
        .then((resp) => {
            return resp.json()
        }
        )
        .then((json) => {
            let objJson = json;
            let ris = "";
            for (const key in objJson) {
                let riga = key + ": " + objJson[key];
                ris += riga + "<br>";
            }

            document.getElementById("title").value=objJson.title;
            document.getElementById("category").value=objJson.category;
            document.getElementById("description").innerHTML=objJson.description;
            document.getElementById("brand").value=objJson.brand;
            document.getElementById("price").value=objJson.price;
            

        });
}

function creaTRSerivio(prodotto) {

    let htmltr = "<tr class='rigapr'>";
    //let anchor = `<a href="https://dummyjson.com/products/${prodotto.id}">${prodotto.title}</a>`;

    let anchor = `<a href="javascript:visDetails(${prodotto.id})">${prodotto.title}</a>`;

    htmltr += "<td>" + anchor + "</td>";
    htmltr += "<td>" + prodotto["category"] + "</td>";
    htmltr += "<td class='desc' width='50%'>" + prodotto["description"] + "</td>";
    htmltr += "<td>" + prodotto["brand"] + "</td>";
    htmltr += "<td>" + prodotto["price"] + " €</td>";

    //htmltr += `<a href="javascript:visDetails(${prodotto.id})"><td><img class="thumb"S src="${prodotto.images}"></td></a>`
    htmltr += "<td><img class='thumb' src='" + prodotto["images"][0] + "'></td>";

    
    htmltr += "</tr>"
    return htmltr;

}