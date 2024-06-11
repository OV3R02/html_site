document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    initgest();
});

function initgest() {
    btnaddservizi.addEventListener("click", addProduct);
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
