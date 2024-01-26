 let cards =[];
 let firstcard,secondcard;
 let score = 0;
 let lockboard = false;
 const cardscontainer = document.getElementById("cards-grid");
document.getElementById("score").textContent = score;
 fetch ("./data/cards.json")
 .then((res => res.json()))
 .then ((data)=>{
    cards = [...data,...data];
    shuffelcard ()
    generatecards();

    
console.log(cards);
})
function generatecards() {
for (let card of cards) {
const cardElement =document.createElement("div");
cardElement.classList.add("card");
cardElement.setAttribute ("data-name", card.name);
cardElement.innerHTML=`
<div class="front">
    <img class="front-image" src=${card.image}>
</div>
<div class="back">
    </div>
`
;
cardscontainer.appendChild(cardElement);
cardElement.addEventListener("click", flipcard);
cardElement.addEventListener("touchstart", flipcard)
}
}
function shuffelcard (){
let currentindex = cards.length
let randomindex ;
let temporaryvalue;
while(currentindex !==0){
    randomindex=Math.floor(Math.random() * currentindex);
    currentindex -=1;
    temporaryvalue = cards [currentindex];
cards [currentindex]= cards [randomindex];
cards [randomindex] = temporaryvalue;
}    
}


function flipcard(){
if(lockboard === true) return;
if(this === firstcard) return;
this.classList.add("flipped")
if(!firstcard){
    firstcard = this;
    return;
    
}
    secondcard = this;
    lockboard=true;
    checkforMatch();
}
function checkforMatch(){
    if (firstcard.dataset.name === secondcard.dataset.name){
        disablecard();
    }
    else{
        unflipcards();
    }
}
function disablecard(){
    firstcard.removeEventListener("click",flipcard)
    firstcard.removeEventListener("touchstart",flipcard)
    secondcard.removeEventListener("click",flipcard)
    secondcard.removeEventListener("touchstart",flipcard)
    score++;
    document.getElementById("score").textContent = score;
    if (score === 9) {
        startConfetti();
    }
    unlockboard();
}
function unlockboard(){
    firstcard = null;
    secondcard = null;
    lockboard = false;
}
function unflipcards(){
    setTimeout(() => {
        firstcard.classList.remove("flipped");
        secondcard.classList.remove("flipped");
        unlockboard();
    },500);
}
function restart(){
    window.location.reload();
}