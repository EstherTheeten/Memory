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

//Affichage de la grille
let zone_jeu=document.getElementById("zone_jeu");
if(grid_size=="4x4"){
    grid_size=4;
    zone_jeu.style.gridTemplateColumns="repeat(4,1fr)"
    zone_jeu.style.gridTemplateRows="repeat(4,1fr)"
    var grille = [[1,2,1,3],[2,4,5,6],[4,6,7,8],[3,5,8,7]];
}
else{
    grid_size=6;
    zone_jeu.style.gridTemplateColumns="repeat(6,1fr)";
    zone_jeu.style.gridTemplateRows="repeat(6,1fr)";
}

//Ajout des boutons

for(let i=1;i<=grid_size;i++){
    for(let j=1;j<=grid_size;j++){
        let bouton=document.createElement("button");
        bouton.setAttribute("id",`${i}x${j}`);
        let img = document.createElement("img");
        img.src = "Images mémory/dos.jpg"; //image de base
        img.alt = "Carte ${i}x${j}";
        img.style.width = "80px"; 
        img.style.height = "80px";
        bouton.appendChild(img);

        bouton.addEventListener("click", () => {
            img.src = `Images mémory/${grille[i-1][j-1]}.jpg`;
        });
        bouton.style.gridRow=`${i}/${i+1}`;
        bouton.style.gridColumn=`${j}/${j+1}`;
        zone_jeu.appendChild(bouton);
    }
}
