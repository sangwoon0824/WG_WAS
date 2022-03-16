const navigator_logo = document.querySelector(".logo");
const navigator_story = document.getElementsByClassName("nav_story")[0];
const mobile_nav_story = document.getElementsByClassName("nav_story")[1];
const navigator_roadmap = document.getElementsByClassName("nav_roadmap")[0];
const mobile_nav_roadmap = document.getElementsByClassName("nav_roadmap")[1];
//const navigator_team = document.getElementById('nav_team');
const navigator_faq = document.getElementsByClassName("nav_faq")[0];
const mobile_nav_faq = document.getElementsByClassName("nav_faq")[1];
const navigator_links = document.querySelector(".nav_links");
const footer_logo = document.querySelector("#links-logo");

const $html = $("html");
const speed = 600;

let toggle = 0;
const mobile_menu = document.querySelector('#nav-mobile');
const mobile_menu_box = document.querySelector('#mobile-menu');

function slideanimation(){
    if(toggle == 0){
        mobile_menu_box.style.display = "block";
        toggle = 1;
    }
    else if(toggle == 1){
        mobile_menu_box.style.display = "none";
        toggle = 0;
    }
}

mobile_menu.addEventListener('click', slideanimation);

$html.animate({ scrollTop: 0 }, 100); //맨 위로 자동으로 이동하는 애니메이션

navigator_logo.addEventListener("click", function(){
  $html.animate({ scrollTop: $("#about").offset().top }, speed);
});

navigator_story.addEventListener("click", function(){
  $html.animate({ scrollTop: $("#story").offset().top }, speed);
});

mobile_nav_story.addEventListener("click", function(){
  $html.animate({ scrollTop: $("#story").offset().top }, speed);
  mobile_menu_box.style.display = "none";
  toggle = 0;
});

navigator_roadmap.addEventListener("click", function(){
  $html.animate({ scrollTop: $("#connection").offset().top }, speed);
});

mobile_nav_roadmap.addEventListener("click", function(){
  $html.animate({ scrollTop: $("#connection").offset().top }, speed);
  mobile_menu_box.style.display = "none";
  toggle = 0;
});

/*navigator_team.addEventListener("click", function(){
  $html.animate({ scrollTop: $("#teammates").offset().top }, 600);
});*/

navigator_faq.addEventListener("click", function(){
  $html.animate({ scrollTop: $("#faq").offset().top }, speed);
});

mobile_nav_faq.addEventListener("click", function(){
  $html.animate({ scrollTop: $("#faq").offset().top }, speed);
  mobile_menu_box.style.display = "none";
  toggle = 0;
});

navigator_links.addEventListener("click", function(){
  $html.animate({ scrollTop: $("footer").offset().top }, speed);
});

footer_logo.addEventListener("click", function(){
  $html.animate({ scrollTop: $("#about").offset().top }, speed);
});

// 모바일 메뉴
