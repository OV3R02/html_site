if (sessionStorage.getItem("token")){
    console.log("ok");

}
else {
    alert("pagina non autorizzata!!!")
    window.location.href="index.html";
    sessionStorage.clear();
}