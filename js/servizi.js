
function init() {
    let liorario = document.getElementById("orario");
    let time = getCurrentTime();
    liorario.innerHTML = "<a>" + time + "</a>";
    let aorario = document.querySelector("#orario a");
    aorario.innerHTML = time;
    let btndata = document.querySelector("#btnData");
    loadSelCategory();
    btnselcategory.addEventListener("click", showSelCategory);
    btnsort.addEventListener("click", showSelCategory);
    btnaddservizi.addEventListener("click", addProduct);
    showSelCategory();
    setLoginForm();


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

function logout() {
    sessionStorage.clear();
    window.location.href="index.html";
    //window.history.back(); simula il pulsante indietro 
}

function login() {
    const datijson = creaDatiJsonByForm("flogin");

    fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: datijson
    })
        .then(res => res.json())
        .then(obj => {
            console.log(obj)
            sessionStorage.setItem("nome", obj.firstName);
            sessionStorage.setItem("cognome", obj.lastName);
            sessionStorage.setItem("token", obj.token);
            window.location.href="gestioneprodotti.html";
            
        });

}

function setLoginForm() {
    if (sessionStorage.getItem("token")){
        document.getElementById("lblmsglogin").innerHTML = "Benvenuto "
                + sessionStorage.getItem("nome") 
                + " " 
                + sessionStorage.getItem("cognome");
            document.getElementById("btnlogin").style.display="none";
            document.getElementById("btnlogout").style.display="block";
        } else {
            document.getElementById("lblmsglogin").innerHTML = "Effettua login"
            document.getElementById("btnlogin").style.display="block";
            document.getElementById("btnlogout").style.display="none";
        
        }
}

function creaDatiJsonByForm(mioform) {                  // passo il nome di un form id come testo "fdettagliato"
    const myform = document.getElementById(mioform);    // mioform è "fdettagliato testo"
    const fdata = new FormData(myform);                 // array entries di coppie key value
    const dati = Object.fromEntries(fdata.entries());   // creo oggetto json javascript con input name del forum
    const datijson = JSON.stringify(dati);              // creo testo string con oggetto json '{"title":"nuovo libro","price":"123","brand":"apple"}'
    return datijson
}

function addProduct() {
    //recupero i dati da front

    const datijson = creaDatiJsonByForm("fdettaglio");
    fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: datijson
    })
        .then(res => res.json())
        .then(ris => {
            lblmsg.innerHTML = JSON.stringify(ris);
            console.log(ris);
        });

}

function visDetails(id) {
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

            document.getElementById("title").value = objJson.title;
            document.getElementById("category").value = objJson.category;
            document.getElementById("description").innerHTML = objJson.description;
            document.getElementById("brand").value = objJson.brand;
            document.getElementById("price").value = objJson.price;


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