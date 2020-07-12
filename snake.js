const cnv = document.getElementById("snake");
const ctx = cnv.getContext("2d");

//create unit

const box = 32;

//load images 

const ground = new Image();
ground.src = "ground.png"; 

const foodImg = new Image();
foodImg.src = "food.png"; 

// load audio files
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const down = new Audio();
const right = new Audio();
const left = new Audio();

dead.src = "dead.mp3";
eat.src = "eat.mp3";
down.src = "down.mp3";
up.src = "up.mp3";
right.src = "right.mp3";
left.src = "left.mp3";

//create the snake

let snake = [];
snake[0] = { 
	x : 9*box,
	y : 10*box
}
//create food

let food = {
	x : Math.floor(Math.random()*17 + 1)*box,
	y : Math.floor(Math.random()*15 + 3)*box
}

// create score var
let score = 0;

// control the snake
let d;
document.addEventListener("keydown", direction);
function direction(event){

	if( event.keyCode == 37 && d != "RIGHT"){
		left.play();
		d = "LEFT";
	}else if (event.keyCode == 38 && d != "DOWN") {
		up.play();
		d = "UP";
	}else if (event.keyCode == 39 && d != "LEFT") {
		right.play();
		d = "RIGHT";
	}else if (event.keyCode == 40 && d != "UP") {
		down.play();
		d = "DOWN";
	}
}
//touch functions control

function moveup(event){
	if(d != "DOWN"){
		left.play();
		d = "UP";
	}
}
function movedown(event){
	if(d != "UP"){
		left.play();
		d = "DOWN";
	}
}
function moveright(event){
	if(d != "LEFT"){
		left.play();
		d = "RIGHT";
	}
}
function moveleft(event){
	if(d != "RIGHT"){
		left.play();
		d = "LEFT";
	}
}

// check collison function
function collison(head, array){
	for(let i=0; i<array.length; i++){
		if(head.x == array[i].x && head.y == array[i].y){
			return true;
		}
	}
	return false;
}

// draw everything to the canvas

function draw(){

	ctx.drawImage(ground,0,0);

	for(let i=0; i<snake.length; i++)
	{
		ctx.fillStyle = (i==0) ? "yellow":"white";
		ctx.fillRect(snake[i].x, snake[i].y, box, box);

		ctx.strokeStyle = "red";
		ctx.strokeRect(snake[i].x, snake[i].y, box, box);
	}

	ctx.drawImage(foodImg, food.x, food.y);

	// old head positon 
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	

	// which direction 
	if( d == "LEFT") snakeX -= box;
	if( d == "UP") snakeY -= box;
	if( d == "DOWN") snakeY += box;
	if( d == "RIGHT") snakeX += box;

	//if snake eats the food
	if(snakeX == food.x && snakeY == food.y){
		score++;
		eat.play();
		food = {
			x : Math.floor(Math.random()*17 + 1)*box,
			y : Math.floor(Math.random()*15 + 3)*box
		}
	} else {
		// remove the tail
		snake.pop();
	}
	// add new head

	let newHead = {
		x : snakeX,
		y : snakeY
	}

	//game over
	if(snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || 
		collison(newHead,snake)){
		clearInterval(game);
		dead.play();
	}

	
	snake.unshift(newHead);

	ctx.fillStyle = "white";
	ctx.font = "45px Changa one";
	ctx.fillText(score, 2*box, 1.6*box); 
}

// call draw function every 100ms

let game = setInterval(draw,250);
