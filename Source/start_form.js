
let zone_jeu=document.getElementById("zone_jeu");

let form_level=document.getElementById("level_choice");

let choice_size=document.getElementById("choice_grid_size");

let choice_timer_yes=document.getElementById("timer_yes");
let choice_timer_no=document.getElementById("timer_no");

let div_time_cursor=document.getElementById("div_time_cursor");
let time_cursor=document.getElementById("time_cursor");

let error_message=document.querySelector(".error_message");

form_level.addEventListener("submit", function(event){
    event.preventDefault();
    
    let res=choice_size.value;

    if(res==="none"){
        error_message.style.display="inline-block";
    }
    else{
        error_message.style.display="none";
    }

    if(choice_timer_yes.checked){
        res+=" "+time_cursor.value;
    }
    else{
        res+=" "+"no_timer";
    }
    console.log(res)
    
})


function refresh_time_cursor(curs_state){
    if(curs_state){
        div_time_cursor.style.display="inline-block";
    }
    else{
        div_time_cursor.style.display="none";
    }
}

choice_timer_yes.addEventListener("click", function(){
    refresh_time_cursor(true)
})
choice_timer_no.addEventListener("click", function(){
    refresh_time_cursor(false)
})





let zone_tps=document.getElementById("zone_tps");

time_cursor.addEventListener("input",function(){
    //console.log(time_cursor.value);
    zone_tps.innerHTML=`Length (minutes): ${time_cursor.value}<br>`
})

