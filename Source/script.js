
let zone_jeu=document.getElementById("zone_jeu");

let form_level=document.getElementById("level_choice");
let choice_size=document.getElementById("choice_grid_size");
let choice_timer_yes=document.getElementById("timer_yes");
let choice_timer_no=document.getElementById("timer_no");


form_level.addEventListener("submit", function(event){
    event.preventDefault();
    console.log("formulaire envoyé");
})



/*
for(i=0;i<36;i++){
    zone_jeu.innerHTML+=`<button id="carte",${i}"></button>`;
}*/
