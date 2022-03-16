document.addEventListener("scroll",function() {
    let scrollvalue = document.documentElement.scrollTop;
    const html_nav = document.querySelector("nav");
    const background_value = document.querySelector(".background");

    let pc_top_value = (scrollvalue * (-1)) * 1.35 + "px";
    const storytext = document.querySelector(".description");
    const storytext_offsettop = storytext.offsetTop;

    if(window.innerWidth >= window.innerHeight){
        background_value.style.top = pc_top_value;
    }

    if(scrollvalue < storytext_offsettop){
        html_nav.style.position = "absolute";
        html_nav.style.backgroundColor = "transparent";
        html_nav.style.animation = "none";
    }
    else{
        html_nav.style.position = "fixed";
        html_nav.style.backgroundColor = "#ffb8c2";
        html_nav.style.color = "#000";
        html_nav.style.animation = "animation-navigation 0.3s";
    }
});


