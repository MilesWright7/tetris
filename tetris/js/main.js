let c = {canvas: undefined, ctx: undefined};
let mouse = {x: undefined, y: undefined};
let audio = document.getElementById('myAudio');
// audio src is updated whenever game state changes. so in game.update and in main in key listeners.

window.onload = start


function start(){
	c.canvas = document.getElementById('canvas');
	c.ctx = c.canvas.getContext('2d');
	audio.controls = false;
	c.canvas.width = innerWidth;
	c.canvas.height = innerHeight;
	shifter = Math.floor(innerWidth/64);


	c.ctx.fillStyle = 'black';
	counter = 0;
	game = new Game();
	//ui = new ui;
	selectArray = [];

	for(let i = 1; i < 9; i++){
		selector = new LevelSelect(i, 100*i-5, 219);
		selectArray.push(selector);
	}
	for(let i = 9; i < 17; i++){
		selector = new LevelSelect(i, 100*(i-8)-5, 319);
		selectArray.push(selector);
	}

	window.addEventListener('keydown', function(event){Key.onKeyDown(event);}, false);
	window.addEventListener('keyup', function(event){Key.onKeyUp(event);}, false);
	window.addEventListener('click', function(event){
		if(game.state == 'menu'){
			mouse.x = event.x;
			mouse.y = event.y;
			for(let i = 0; i < selectArray.length; i++){
				if(selectArray[i].selected()){
					game.level = selectArray[i].level;
				}
			}
		}
	});
	
	
	setInterval(function () {
		gameloop()}, 1000/60);
};

function gameloop(){
	if(game.state === 'main'){
		c.ctx.clearRect(0, 0, c.canvas.width, c.canvas.height);
		game.draw();
	}
	else if(game.state === 'menu'){
		game.draw();
		if(Key.isDown(Key.X)){
			game.state = 'main';
			audio.pause();
			audio.src = "audio/tetris-gameboy-game.mp3";

		}
	}
	else if(game.state === 'end'){
		game.draw();
		if(Key.isDown(Key.SPACE)){
			game = new Game();
			game.state = 'menu';

			audio.pause();
			audio.src = "audio/tetris-gameboy-menu.mp3";
		}
	}

//	c.ctx.clearRect(0, 0, c.canvas.width, c.canvas.height);

		//ui.draw;
};

//let loop = function(){
//	return window.requestAnimationFrame       ||
//		   window.webkitRequestAnimationFrame ||
//		   window.mozRequestAnimationFrame    ||
//		   window.oRequestAnimationFrame      ||
//		   window.msRequestAnimationFrame     ||
//		   function(callback){
//		       window.setTimeout(callback, 1000 / 60);
//		   }
//};
/////// INPUT

let Key = {
	_pressed: {},
	ENTER: 13,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	LEFT: 37,
	ONE: 49,
	Z: 90,
	X: 88,
	M: 77,
	SPACE: 32,

	isDown: function(keyCode){
		return this._pressed[keyCode];
	},

	onKeyDown: function(e){
		if(e.keyCode == Key.M){
			if(audio.muted){
				audio.muted = false;
			}
			else{
				audio.muted = true;
			}
		}
		this._pressed[e.keyCode] = true;
		
	},

	onKeyUp: function(e){
		delete this._pressed[e.keyCode];
	}
}
