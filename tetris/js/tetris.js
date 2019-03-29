let c = {canvas: undefined, ctx: undefined};
let mouse = {x: undefined, y: undefined};


window.onload = () => {
	c.canvas = document.getElementById('canvas');
	c.ctx = c.canvas.getContext('2d');
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
		c.ctx.fillStyle = 'cornflowerblue';
		c.ctx.fillRect(0, 0, innerWidth, innerHeight);
		c.ctx.fillStyle = 'black';
		c.ctx.font = '36px serif';
		c.ctx.fillText("Press the arrow keys(<= and =>) to move the pieces side to side.",5,50,innerWidth - 5);
		c.ctx.fillText("Press 'z' to rotate pieces.",5,100);
		c.ctx.fillText("Press 'x' to start game.",5,150);
		c.ctx.fillText("Select starting level:",5, 200);
		for(let selector of selectArray){
			selector.draw();
		}
		c.ctx.fillStyle = 'black';
		c.ctx.fillText("Starting Level:", 10, 450);
		c.ctx.fillStyle = 'yellow';
		c.ctx.fillText(game.level, 250, 450);
		if(Key.isDown(Key.X)){
			game.state = 'main';

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

	isDown: function(keyCode){
		return this._pressed[keyCode];
	},

	onKeyDown: function(e){
		this._pressed[e.keyCode] = true;
	},

	onKeyUp: function(e){
		delete this._pressed[e.keyCode];
	}
}
