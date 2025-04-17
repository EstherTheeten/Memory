let zone_result_time=document.getElementById("zone_result_time");

const urlParams = new URLSearchParams(window.location.search);

let seconds=urlParams.get("seconds");
let total_seconds=urlParams.get("total_seconds");
let timer_choice=urlParams.get("timer_choice");

let time_spent=total_seconds-seconds;

if(timer_choice == "true"){
    zone_result_time.innerHTML=`Your time : ${Math.floor(time_spent/60)}:${time_spent%60}`;
}
