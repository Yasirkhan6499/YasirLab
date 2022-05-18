const menu_icon = document.querySelector(".menu__icon");
const menu = document.querySelector(".main-menu");
const icon = menu_icon.children[0];

let isMenuIconClicked = false;

//--- if its pc screen then remove the "menu-moblie" class
// from the menu, so that it appears on the right place
window.addEventListener("resize",()=>{
    if(window.innerWidth >= 1000){
    menu.classList.remove("menu-mobile");

    icon.classList.add("fa-bars");
    icon.classList.remove("fa-times");
    isMenuIconClicked=false;
    }
});

showMenu(); //if menu icon clicked then show the menu and change the icon

function showMenu(){
    menu_icon.addEventListener("click",()=>{
        isMenuIconClicked =!isMenuIconClicked;

        if(isMenuIconClicked && window.innerWidth<=1000){
        menu.classList.add("menu-mobile");
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
        
        }
        else{
        menu.classList.remove("menu-mobile");
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
        }
    });
}

