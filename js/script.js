function getCurrentTime(){
    let now =  new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    
    if (hour<10) hour="0"+hour
    if (minute<10) minute="0"+minute
    if (second<10) second="0"+second
    

    return hour + ":" + minute + ":" + second;
}

function showNavBar (vis){
    if (vis==0){
        document.querySelector(".navbar").style.display="none";
        document.querySelector(".menu-toggle").style.display="block";
        document.querySelector(".menu-x").style.display="none";
        }
    if (vis==1){
        document.querySelector(".navbar").style.display="block";
        document.querySelector(".menu-toggle").style.display="none";
        document.querySelector(".menu-x").style.display="block";

    }
}
