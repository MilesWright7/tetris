let S = [[4, -2], [4, -1], [5, -1], [5, 0]];

let Z = [[4, -1], [4, 0], [5, -2], [5, -1]];

let O = [[4, -1], [4, 0], [5, -1], [5, 0]];

let L = [[4, -2], [4, -1], [4, 0], [5, 0]];

let J = [[5, -2], [5, -1], [5, 0], [4, 0]];

let I = [[3, 0], [4, 0], [5, 0], [6, 0]];

let T = [[4, 0], [5, -1], [5, 0], [6, 0]];


(function(){
	function Shape(){
		this.shapeArray = ['I', 'L', 'J', 'T', 'S', 'Z', 'O'];
		this.colorArray = ['images/blueblock.png', 'images/redblock.png', 'images/purpleblock.png', 'images/cyanblock.png', 'images/greenblock.png', 'images/orangeblock.png', 'images/yellowblock.png'];

		this.number = Math.floor(Math.random()*this.shapeArray.length);
		this.baseStructure = [];
		this.letter = this.shapeArray[this.number];
		this.structure = [];
		this.color = new Image();
		this.rotateCtr = 0;
		this.canRotate = true;
		
		
	}

	Shape.prototype = {
		establish: function(){
			tmp = [];
			if(this.letter == 'O'){
				this.baseStructure = O;
			}
			else if(this.letter == 'S'){
				this.baseStructure = S;
			}
			else if(this.letter == 'Z'){
				this.baseStructure = Z;
			}
			else if(this.letter == 'J'){
				this.baseStructure = J;
			}
			else if(this.letter == 'L'){
				this.baseStructure = L;
			}
			else if(this.letter == 'T'){
				this.baseStructure = T;
			}
			else if(this.letter = 'I'){
				this.baseStructure = I;
			}
			for(let i = 0; i < this.baseStructure.length; i++){
				tmp[i] = this.baseStructure[i].slice();
			}
			this.structure = tmp;
			this.color.src = this.colorArray[this.number];
		},
		movedown: function(){
			for(let i = 0; i < 4; i++){
				this.structure[i][1] ++;
			}
		},
		moveright: function(){
			for(let i = 0; i < 4; i++){
				this.structure[i][0] ++;
			}
		},
		moveleft: function(){
			for(let i = 0; i < 4; i++){
				this.structure[i][0] --;
			}
		},
		moveup: function(){
			for(let i = 0; i < 4; i++){
				this.structure[i][1] --;
			}
		},
		rotate: function(){
			/// O doesnt rotate; I, S, Z have 2; J, L, T have 4
			if(this.letter == 'S'){
				if(this.rotateCtr % 2 == 0){
					this.structure[0][0] -= 1;
					this.structure[0][1] += 2;
					this.structure[3][0] -= 1;
				}
				else{
					this.structure[0][0] += 1;
					this.structure[0][1] -= 2;
					this.structure[3][0] += 1;
				}

			}
			else if(this.letter == 'Z'){
				if(this.rotateCtr % 2 == 0){
					this.structure[1][0] += 1;
					this.structure[2][0] += 1;
					this.structure[2][1] += 2;
				}
				else{
					this.structure[1][0] -= 1;
					this.structure[2][0] -= 1;
					this.structure[2][1] -= 2;
				}

			}
			else if(this.letter == 'I'){
				if(this.rotateCtr % 2 == 0){
					this.structure[0][0] += 2;
					this.structure[0][1] -= 2;
					this.structure[1][0] += 1;
					this.structure[1][1] -= 1;
					this.structure[3][0] -= 1;
					this.structure[3][1] += 1;
				}
				else{
					this.structure[0][0] -= 2;
					this.structure[0][1] += 2;
					this.structure[1][0] -= 1;
					this.structure[1][1] += 1;
					this.structure[3][0] += 1;
					this.structure[3][1] -= 1;
				}
			}
			else if(this.letter == 'T'){
				if(this.rotateCtr % 4 == 0){
					this.structure[2][0] -= 1;
					this.structure[2][1] -= 1;
					this.structure[3][0] -= 2;
					this.structure[3][1] -= 2;
				}
				else if(this.rotateCtr % 4 == 1){
					this.structure[2][0] += 1;
					this.structure[2][1] -= 1;
					this.structure[0][0] += 2;
					this.structure[0][1] -= 2;
				}
				else if(this.rotateCtr % 4 == 2){
					this.structure[2][0] += 1;
					this.structure[2][1] += 1;
					this.structure[3][0] += 2;
					this.structure[3][1] += 2;
				}
				else{
					this.structure[2][0] -= 1;
					this.structure[2][1] += 1;
					this.structure[0][0] -= 2;
					this.structure[0][1] += 2;

				}
			}
			else if(this.letter == 'J'){
				if(this.rotateCtr % 4 == 0){
					this.structure[0][0] -= 2;
					this.structure[0][1] += 2;
					this.structure[1][0] -= 2;
				}
				else if(this.rotateCtr % 4 == 1){
					this.structure[2][0] -= 2;
					this.structure[2][1] -= 2;
					this.structure[3][1] -= 2;
				}
				else if(this.rotateCtr % 4 == 2){
					this.structure[0][0] += 2;
					this.structure[0][1] -= 2;
					this.structure[1][0] += 2;
				}
				else{
					this.structure[2][0] += 2;
					this.structure[2][1] += 2;
					this.structure[3][1] += 2;
				}
			}
			else if(this.letter == 'L'){
				if(this.rotateCtr % 4 == 0){
					this.structure[2][0] += 2;
					this.structure[2][1] -= 2;
					this.structure[3][1] -= 2;
				}
				else if(this.rotateCtr % 4 == 1){
					this.structure[0][0] += 2;
					this.structure[0][1] += 2;
					this.structure[1][0] += 2;
				}
				else if(this.rotateCtr % 4 == 2){
					this.structure[2][0] -= 2;
					this.structure[2][1] += 2;
					this.structure[3][1] += 2;
				}
				else{
					this.structure[0][0] -= 2;
					this.structure[0][1] -= 2;
					this.structure[1][0] -= 2;
				}
			}
			this.rotateCtr ++;
		}
	}
		window.Shape = Shape;
})();

