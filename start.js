const grid = document.querySelector(".grid-container");
const resultDisp=document.getElementById("resultDisplay");
let CurrentShooterIndex = 202;
const width=15;
const aliensRemoved=[];
let invadersId;
let isgoingRight=true;
let direction = 1;
let results = 0;




//225 squares
for(let i=0 ; i<width*width ; i++){
    const square = document.createElement('div');
    square.id = i;
    grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll('.grid-container div'))

console.log(squares);

//array is square brackets 
const alienInvaders=[
    0,1,2,3,4,5,6,7,
    15,16,17,18,19,20,21,22,
    30,31,32,33,34,35,36,37
]

function draw(){
    for(let i=0;i<alienInvaders.length;i++){
        if(!aliensRemoved.includes(i)){ // if it is not included in aliens removed then we add invader class to it 
        squares[alienInvaders[i]].classList.add('invader');
        }
    }
}

squares[CurrentShooterIndex].classList.add('shooter');

function remove(){
    for(let i=0;i<alienInvaders.length ; i++){
        squares[alienInvaders[i]].classList.remove('invader');//mistake at the name of the class which is invader and not invaders 

    }
}

function MoveShooter(e){
    squares[CurrentShooterIndex].classList.remove('shooter');
    switch(e.key){
        case 'ArrowLeft':
            if(CurrentShooterIndex % width!== 0 && results<24 && resultDisp.innerHTML!="GAME OVER !"){
                CurrentShooterIndex -= 1;
            }
            break 
        case 'ArrowRight':
            if((CurrentShooterIndex+1) % width !==0 && results<24 && resultDisp.innerHTML!="GAME OVER !"){
                CurrentShooterIndex+=1;
            } 
            break

            
    }
    squares[CurrentShooterIndex].classList.add('shooter');
}

document.addEventListener('keydown',MoveShooter); // to listen to any key on the keyboard if it is presses



function moveInvaders(){

    const LeftEdge = alienInvaders[0] % width ===0 ;
    const RightEdge =alienInvaders[alienInvaders.length - 1]%width === width -1 ;
    remove();
    if(RightEdge && isgoingRight){
        for(let i =0 ; i< alienInvaders.length ; i++){  // move the other way right from right to left and go down one 

            alienInvaders[i] += width+1;
            direction =-1;
            isgoingRight=false; 

        }

    }
    for(let i = 0 ; i< alienInvaders.length ; i++){
        alienInvaders[i] +=direction;
    }
    if(LeftEdge && !isgoingRight){
        for(let i=0;i<alienInvaders.length ; i++){

            alienInvaders[i]+=width+1;
            direction = 1;
            isgoingRight = true;
        }
    }


    draw();
    if(squares[CurrentShooterIndex].classList.contains("invader")){
        resultDisp.innerHTML = 'GAME OVER !';
        clearInterval(invadersId);
    } 
  
   
    if(aliensRemoved.length === alienInvaders.length || results>=24 || resultDisp.innerHTML ==="GAME OVER !" ){
        resultDisp.innerHTML = 'YOU WIN !';
        clearInterval(invadersId);
    }
}


invadersId=setInterval(moveInvaders,400);//every 600 ms we move the invaders

function shoot(e){
    
    let lazerId ;
    let CurrentLazerIndex = CurrentShooterIndex;

    function moveLazer(){
        if (lazerId < width && resultDisp.innerHTML!="GAME OVER !"){
            clearInterval(lazerId);
        }
        
        squares[CurrentLazerIndex].classList.remove('lazer');
        CurrentLazerIndex -= width;
        
        squares[CurrentLazerIndex].classList.add('lazer');
        if (squares[CurrentLazerIndex].classList.contains('invader')){
            squares[CurrentLazerIndex].classList.remove('lazer');
            squares[CurrentLazerIndex].classList.remove('invader');
            squares[CurrentLazerIndex].classList.add('boom');

            setTimeout(() => squares[CurrentLazerIndex].classList.remove('boom'),300);
            clearInterval(lazerId);

            const AlienRemoved= alienInvaders.indexOf(CurrentLazerIndex);
            aliensRemoved.push(AlienRemoved);
            results++;
            resultDisp.innerHTML = results;
        }   
    }

    if(e.key === 'ArrowUp' && results <24 && resultDisp.innerHTML!="GAME OVER !"){ // stops if result is greater than 24
        lazerId = setInterval(moveLazer,100); // we use lazerId so we can gert the first element only and not all the elements in the row 

    }

}

document.addEventListener('keydown',shoot);



// the problems which i have noticed 
// 1. when the game is over then i shouldnt be able to shoot ("GAME OVER TIME ") which i am still able to shoot and it removes the balls on top 
// 2. the blocks start from 1 and not 0 chewck on that 


// const level1Button = document.getElementById('level1');
// const level2Button = document.getElementById('level2');
// const level3Button = document.getElementById('level3');

// level1Button.addEventListener('click', leveleasy);
// level2Button.addEventListener('click', levelmedium);
// level3Button.addEventListener('click', levelhard);

function leveleasy(){
    if (resultDisp.innerHTML !== 'GAME OVER !') {
        invadersId=setInterval(moveInvaders,600);

    }
}

function levelmedium(){
    if (resultDisp.innerHTML !== 'GAME OVER !') {
        invadersId=setInterval(moveInvaders,500);

    }
}

function levelhard(){
    if (resultDisp.innerHTML !== 'GAME OVER !') {
        invadersId=setInterval(moveInvaders,400);

    }
}