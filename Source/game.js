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
let grille = [];
let init = [];
if(grid_size=="4x4"){
    grid_size=4;
    zone_jeu.style.gridTemplateColumns="repeat(4,1fr)"
    zone_jeu.style.gridTemplateRows="repeat(4,1fr)"
    init = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    for (let i = init.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [init[i], init[j]] = [init[j], init[i]];
    }
    for (let i = 0; i < 5; i++) {
        grille.push(init.slice(i * grid_size, (i + 1) * grid_size));
    }
    var trouves = [];
    var essai1 = 0;
    var essai2 = 0;
}
else{
    grid_size=6;
    zone_jeu.style.gridTemplateColumns="repeat(6,1fr)";
    zone_jeu.style.gridTemplateRows="repeat(6,1fr)";
    init = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
    for (let i = init.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [init[i], init[j]] = [init[j], init[i]];
    }
    for (let i = 0; i < grid_size; i++) {
        grille.push(init.slice(i * grid_size, (i + 1) * grid_size));
    }
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
let verrouille = true;
montrerCartesDepart();


let attenteReset = null; // Stocke le timeout pour retour automatique

function retournercarte(i, j) {
    if (verrouille) return;
    // Si deux cartes sont déjà retournées mais différentes, et on clique ailleurs avant le timeout :
    if (essai1 && essai2 && attenteReset) {
        clearTimeout(attenteReset); // Annule le retour automatique
        // Cache les deux anciennes cartes
        let bouton1 = document.getElementById(`${essai1[0]}x${essai1[1]}`);
        let bouton2 = document.getElementById(`${essai2[0]}x${essai2[1]}`);
        bouton1.querySelector("img").src = "Images mémory/dos.png";
        bouton2.querySelector("img").src = "Images mémory/dos.png";
        essai1 = 0;
        essai2 = 0;
        attenteReset = null; // Réinitialise
    }

    // Empêche de re-cliquer sur une carte déjà trouvée
    if (trouves.includes(grille[i - 1][j - 1])) return;

    let bouton = document.getElementById(`${i}x${j}`);
    let img = bouton.querySelector("img");
    img.src = `Images mémory/${grille[i - 1][j - 1]}.jpg`;

    if (!essai1) {
        essai1 = [i, j];
    } else if (!essai2 && !(i === essai1[0] && j === essai1[1])) {
        essai2 = [i, j];

        if (grille[essai1[0] - 1][essai1[1] - 1] === grille[essai2[0] - 1][essai2[1] - 1]) {
            trouves.push(grille[essai1[0] - 1][essai1[1] - 1]);
            essai1 = 0;
            essai2 = 0;
        } else {
            // Lance le retour automatique dans 2 secondes
            attenteReset = setTimeout(() => {
                let bouton1 = document.getElementById(`${essai1[0]}x${essai1[1]}`);
                let bouton2 = document.getElementById(`${essai2[0]}x${essai2[1]}`);
                bouton1.querySelector("img").src = "Images mémory/dos.png";
                bouton2.querySelector("img").src = "Images mémory/dos.png";
                essai1 = 0;
                essai2 = 0;
                attenteReset = null;
            }, 2000);
        }
    }

    if (trouves.length === (grid_size * grid_size) / 2) {
        window.location.replace("page_victoire.html");
    }
}

function montrerCartesDepart() {
    for (let i = 1; i <= grid_size; i++) {
        for (let j = 1; j <= grid_size; j++) {
            let bouton = document.getElementById(`${i}x${j}`);
            let img = bouton.querySelector("img");
            img.src = `Images mémory/${grille[i - 1][j - 1]}.jpg`;
        }
    }

    // On retourne les cartes après 3s et on déverrouille
    setTimeout(() => {
        for (let i = 1; i <= grid_size; i++) {
            for (let j = 1; j <= grid_size; j++) {
                let bouton = document.getElementById(`${i}x${j}`);
                let img = bouton.querySelector("img");
                img.src = "Images mémory/dos.png";
            }
        }
        verrouille = false; // on autorise les clics
    }, 3000);
}

