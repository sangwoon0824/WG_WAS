const weather = ["sun","rain","cloud","thunder","snow"];

document.getElementById("balloon-1").src = "_img/about/balloon/balloon_" + weather[Math.floor(Math.random() * 5)] + ".png";
document.getElementById("balloon-2").src = "_img/about/balloon/balloon_" + weather[Math.floor(Math.random() * 5)] + ".png";
document.getElementById("balloon-3").src = "_img/about/balloon/balloon_" + weather[Math.floor(Math.random() * 5)] + ".png";
document.getElementById("balloon-4").src = "_img/about/balloon/balloon_" + weather[Math.floor(Math.random() * 5)] + ".png";
document.getElementById("balloon-5").src = "_img/about/balloon/balloon_" + weather[Math.floor(Math.random() * 5)] + ".png";

window.addEventListener("resize",function(){
    if(window.outerWidth <= 890){
        document.getElementById("balloon-1").style.display = "none";
        document.getElementById("balloon-2").style.display = "none";
        document.getElementById("balloon-3").style.display = "none";
        document.getElementById("balloon-4").style.display = "none";
        document.getElementById("balloon-5").style.display = "none";
    }
    else{
        document.getElementById("balloon-1").style.display = "inline";
        document.getElementById("balloon-2").style.display = "inline";
        document.getElementById("balloon-3").style.display = "inline";
        document.getElementById("balloon-4").style.display = "inline";
        document.getElementById("balloon-5").style.display = "inline";
    }
});