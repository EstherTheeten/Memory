
let zone_jeu=document.getElementById("zone_jeu");

let form_level=document.getElementById("level_choice");

let choice_size=document.getElementById("choice_grid_size");

let choice_timer_yes=document.getElementById("timer_yes");
let choice_timer_no=document.getElementById("timer_no");

let div_time_cursor=document.getElementById("div_time_cursor");
let time_cursor=document.getElementsById("time_cursor");


form_level.addEventListener("submit", function(event){
    event.preventDefault();
    console.log(choice_size.value);
    let val_choice=choice_size.value;  
    console.log(val_choice);
})




choice_timer_yes.addEventListener("click", function(){
    refresh_time_cursor(true)
})

choice_timer_no.addEventListener("click", function(){
    refresh_time_cursor(false)
})

function refresh_time_cursor(curs_state){
    if(curs_state){
        div_time_cursor.style.display="inline-block";
    }
    else{
        div_time_cursor.style.display="none";
    }
}




console.log(time_cursor)
console.log("bonjour")

time_cursor.addEventListener("input",function(){
    console.log(time_cursor.value);
})

