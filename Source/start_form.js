
let zone_jeu=document.getElementById("zone_jeu");

let form_level=document.getElementById("level_choice");
let choice_size=document.getElementById("choice_grid_size");
let choice_timer_yes=document.getElementById("timer_yes");
let choice_timer_no=document.getElementById("timer_no");
let div_time_cursor=document.getElementById("div_time_cursor");


form_level.addEventListener("submit", function(event){
    event.preventDefault();
    console.log("formulaire envoyé");

    let val_choice=choice_size.value;  
})




choice_timer_yes.addEventListener("click", function(){
    refresh_time_cursor(true)
})

choice_timer_no.addEventListener("click", function(){
    refresh_time_cursor(false)
})

function refresh_time_cursor(curs_state){
    if(curs_state){
        div_time_cursor.innerHTML=`<label for="game_length">Length (seconds):<br> 60</label>
                                   <input type="range" id="time_cursor" name="time" min="60" max="600">600`
    }
    else{
        div_time_cursor.innerHTML=``;
    }
}

let time_cursor=document.getElementsById("time_cursor");
time_cursor.addEventListener("input",function(){
    console.log(time_cursor.value);
})

