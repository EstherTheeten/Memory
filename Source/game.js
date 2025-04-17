//Récupération des données du formulaire
let parametres=new URLSearchParams(window.location.search);

let params_objet={};
parametres.forEach((value,key)=>{
    params_objet[key]=value;
});

let grid_size=params_objet.grid_size;

let timer_choice;
if(params_objet.timer_choice==="yes"){
    timer_choice=true;
}
else{
    timer_choice=false;
}
let timer_val=params_objet.time;

console.log(grid_size);





//Gestion du temps
let div_timer=document.getElementById("div_timer");
let div_timer_text=document.getElementById("div_timer_text");
let progress_bar_comp=document.getElementById("progress_bar_comp");
if(timer_choice){

    div_timer_text.innerHTML=`Time Left : ${timer_val}:00`;
    console.log(timer_choice);
    seconds=timer_val*60;

    progress_bar_comp.style.animation=`anim_progress_bar ${seconds}s linear`;

    function refresh_counter(){
        seconds-=1;
        minutes=Math.floor(seconds/60);
        if(seconds%60<10){
            div_timer_text.innerHTML=`Time left : ${minutes}:0${seconds%60}`;
        }
        else{
            div_timer_text.innerHTML=`Time left : ${minutes}:${seconds%60}`;
        }

        if(seconds===0){
            window.location.replace("page_defaite.html");
        }
    }
    setInterval(refresh_counter,1000);

}
else{
    div_timer.style.display="none";
}





//Affichage de la grille
let zone_jeu=document.getElementById("zone_jeu");
if(grid_size=="4x4"){
    grid_size=4;
    zone_jeu.style.gridTemplateColumns="repeat(4,1fr)"
    zone_jeu.style.gridTemplateRows="repeat(4,1fr)"
    var grille = [[1,2,1,3],[2,4,5,6],[4,6,7,8],[3,5,8,7]];
    var trouves = [];
    var essai1 = 0;
    var essai2 = 0;
}
else{
    grid_size=6;
    zone_jeu.style.gridTemplateColumns="repeat(6,1fr)";
    zone_jeu.style.gridTemplateRows="repeat(6,1fr)";
    var grille = [[1,2,1,3,2,4],[9,10,11,12,5,6],[12,10,4,6,7,8],[11,9,3,5,8,7],[13,14,15,14,17,18],[17,16,15,13,16,18]];
    var trouves = [];
    var essai1 = 0;
    var essai2 = 0;
}

//Ajout des boutons

for(let i=1;i<=grid_size;i++){
    for(let j=1;j<=grid_size;j++){
        let bouton=document.createElement("button");
        bouton.setAttribute("id",`${i}x${j}`);
        let img = document.createElement("img");
        img.setAttribute("class","game_image");
        img.src = "Images mémory/dos.png"; //image de base
        img.alt = "Carte ${i}x${j}";
        img.style.width = "95%"; 
        img.style.height = "95%";
        bouton.appendChild(img);

        bouton.addEventListener("click", () => {
            retournercarte(i,j);
            
        });
        bouton.style.gridRow=`${i}/${i+1}`;
        bouton.style.gridColumn=`${j}/${j+1}`;
        bouton.style.padding="0px";
        zone_jeu.appendChild(bouton);
    }
}

function retournercarte(i,j){
    let bouton = document.getElementById(`${i}x${j}`);
    let img = bouton.querySelector("img");
    img.src = `Images mémory/${grille[i-1][j-1]}.jpg`;
    if(essai1 == 0){
        essai1 = [i,j];
    }else if(essai2 == 0){
        essai2 = [i,j];
        if(grille[essai1[0]-1][essai1[1]-1] == grille[essai2[0]-1][essai2[1]-1]){
            trouves.push(grille[essai1[0]-1][essai1[1]-1]);
        }
    }else{
        if(!(grille[essai1[0]-1][essai1[1]-1] == grille[essai2[0]-1][essai2[1]-1])){
        let bouton1 = document.getElementById(`${essai1[0]}x${essai1[1]}`);
        let bouton2 = document.getElementById(`${essai2[0]}x${essai2[1]}`);
        let img1= bouton1.querySelector("img");
        let img2= bouton2.querySelector("img");
        img1.src = `Images mémory/dos.png`;            
        img2.src = `Images mémory/dos.png`;
        }
        essai1 = [i,j];
        essai2 = 0;
        
    }
    
    if(trouves.length === (grid_size*grid_size)/2){
        window.location.replace("page_victoire.html");
    }
}



