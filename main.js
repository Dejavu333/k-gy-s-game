//bridge
var canvas;
canvas = document.getElementById('game')
var ctx;
ctx = canvas.getContext('2d');    //allows drawing to screen  
//the game loop
//3options://requestAnimationFrame//setInterval xtimes per a second//setTimeOut
function drawGame(){
       
    changeSnakePos();
    let result; result = isGameOver();
    if (result === true){return;}
    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();
    gameSpeed();
    
}  



let speed;
speed = 7;
function gameSpeed(){
    setTimeout(drawGame, 1000/ speed);    //ms 
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);    //0,0 top-left position   
}



//variables for a 18x18 bricks
let tileCount = 20;
let tileSize = canvas.width / tileCount -2   //400/20=20 20-2=18
//variables for head position
let headX = 10;    
let headY = 10;
//variables for moving the snake
let xVelocity = 0;
let yVelocity = 0;
//variables for food
let appleX = 5;
let appleY = 5;
//create a class for body
class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
//empty array//we we'll only modify the content of it
let sParts; sParts = [];    
//length of the snake
let tailLength; tailLength = 2;
//score
let score = 0;
//audio
var cheer; cheer = new Audio('cheer.mp3');
var over; over = new Audio('gameOver.mp3');



function drawSnake(){
    ctx.fillStyle = 'orange';    //head
    ctx.fillRect(headX*tileCount, headY*tileCount, tileSize, tileSize);    //x200, y200, 18x18 //so into the center
    
    ctx.fillStyle = 'green';    //parts
    for (i=0;i<sParts.length;i=i+1){
        let prt; prt = sParts[i];
        ctx.fillRect(prt.x*tileCount, prt.y*tileCount, tileSize, tileSize)    //draw the snake parts//x and y from class
    }
    sParts.push(new SnakePart(headX, headY));
    if(sParts.length>tailLength){    //remove the first item so the furthest item 
        sParts.shift();
    }    
}

function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize);
}

function checkAppleCollision(){
    if(appleX === headX && appleY === headY){
        //disappear and new apple y and x position
        appleX = Math.floor(Math.random()*tileCount);  //get a random whole number up to tilecount(20)
        appleY = Math.floor(Math.random()*tileCount);
            tailLength = tailLength + 1;
            score = score + 1;
            cheer.play()
    }
}

function drawScore(){
    ctx.fillStyle = 'white';
    ctx.font = '20px Verdana';
    ctx.fillText('Score' + score, canvas.width-90, 20)
}

function isGameOver(){
    let gameOver = false;
        //if the game hasn't started, we can't get 'Game Over'
        if(yVelocity === 0 && xVelocity ===0){    
            return false;
        }
        //walls
        if(headX < 0){
            gameOver = true;
        }
        else if(headX === tileCount){
            gameOver = true;
        }
        else if(headY < 0){
            gameOver = true;
        }
        else if(headY === tileCount){
            gameOver = true;
        }
            //eats itself
            for (i=0;i<sParts.length;i=i+1){
                let prt = sParts[i];
                if(prt.x === headX && prt.y === headY){
                    gameOver = true;
                    break;
                }
            }
        if(gameOver === true){
            over.play();
            ctx.fillStyle = 'white';
            ctx.font = '60px Verdana';
            ctx.fillText('Game Over', canvas.width/70,canvas.height/2)
        }
    return gameOver;
}



function changeSnakePos(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

document.body.addEventListener('keydown', pressing);
function pressing(event){
    
    if (event.keyCode == 38){    //up
            if (yVelocity == 1){return;}    //so we can't turn around instantly
        yVelocity = -1;
        xVelocity = 0;
    }
    else if (event.keyCode == 40){    //down
            if (yVelocity == -1){return;}
        yVelocity = 1;
        xVelocity = 0;
    }
    else if (event.keyCode == 39){
            if (xVelocity == -1){return;}    //right
        yVelocity = 0;
        xVelocity = 1;
    }
    else if (event.keyCode == 37){
            if (xVelocity == 1){return;}    //left
        yVelocity = 0;
        xVelocity = -1;
    }
}



drawGame();