(function(){
	function Game(){
		this.state = 'menu';
		this.gridSize = 24;
		this.rows = 20;
		this.cols = 10;
		this.rowWidths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		this.colHeights = [0,0,0,0,0,0,0,0,0,0];
		this.falling = new Shape();
		this.falling.establish();
		this.next = new Shape();
		this.next.establish();
		this.board = [];
		this.boardColor = new Image();
		this.boardColor.src = 'images/brownblock.png';
		this.walls = [];
		this.wallColor = new Image();
		this.wallColor.src = 'images/blackblock.png';
		this.upcoming = [[11,0], [12,0], [13,0], [14,0], [15,0], [16,0], [16,1], [16,2], [16,3], [16,4], [16,5], [16,6], [15,6], [14,6], [13,6], [12,6], [11,6]];
		this.upcomingColor = new Image();
		this.upcomingColor.src = 'images/blackline.png';
		this.moving = false;
		this.mvctr = 0;
		this.fallrate = 16;
		this.rotatectr = 0;
		this.linesCleared = 0;
		this.level = 1;
		this.score = 0;
		this.clearThese = [];



	}

	Game.prototype = {
		draw: function(){
			if(this.state === 'main'){
				this.update();
				//c.ctx.fillStyle = 'black';
				for(let point of this.walls){
				//	c.ctx.fillRect(this.gridSize*(point[0]+shifter), this.gridSize*point[1], this.gridSize-1, this.gridSize-1);				
				c.ctx.drawImage(this.wallColor, this.gridSize*(point[0]+shifter), this.gridSize*point[1]);
				}
				c.ctx.fillStyle = 'black';
				c.ctx.font = '30px serif';
				c.ctx.fillText("Next Block:", this.gridSize*(11+shifter), this.gridSize*1.5);
				c.ctx.fillText("Lines Cleared:", this.gridSize*(12+shifter), this.gridSize*13);
				c.ctx.fillText(this.linesCleared, this.gridSize*(13+shifter), this.gridSize*14);
				c.ctx.fillText("Level:", this.gridSize*(12+shifter), this.gridSize*10.5);
				c.ctx.fillText(this.level, this.gridSize*(13+shifter), this.gridSize*11.5);
				c.ctx.fillText("Score:", this.gridSize*(12+shifter), this.gridSize*15.5);
				c.ctx.fillText(this.score, this.gridSize*(13+shifter), this.gridSize*16.5);
				//c.ctx.fillStyle = 'brown';
				for(let point of this.upcoming){
					//c.ctx.fillRect(this.gridSize*(point[0]+shifter), this.gridSize*(point[1]+2), this.gridSize-1, this.gridSize-1);
					if((point[1] == 0 || point[1] == 6) && !(point[0] == 16)){
						c.ctx.drawImage(this.upcomingColor, 0,0,24,24,this.gridSize*(point[0]+shifter), this.gridSize*(point[1]+2),24,24);
					}
					else if(point[0] == 16 && point[1] != 0){
						c.ctx.drawImage(this.upcomingColor, 24,0,24,24,this.gridSize*(point[0]+shifter), this.gridSize*(point[1]+2),24,24);
					}
				}
				// c.ctx.fillStyle = 'brown';
				for(let point of this.board){
					// c.ctx.fillRect(this.gridSize*(point[0]+shifter), this.gridSize*point[1], this.gridSize-1, this.gridSize-1);
					c.ctx.drawImage(this.boardColor, this.gridSize*(point[0]+shifter), this.gridSize*point[1]);
					}	

				//c.ctx.fillStyle = this.falling.color;
				for(let point of this.falling.structure){
					//c.ctx.fillRect(this.gridSize*(point[0]+shifter), this.gridSize*point[1], this.gridSize-1, this.gridSize-1);					
					c.ctx.drawImage(this.falling.color, this.gridSize*(point[0]+shifter), this.gridSize*point[1]);
				}
				//c.ctx.fillStyle = this.next.color;
				for(let point of this.next.structure){
					//c.ctx.fillRect(this.gridSize*(point[0]+shifter+9), this.gridSize*(point[1]+6), this.gridSize-1, this.gridSize-1);					
					c.ctx.drawImage(this.next.color, this.gridSize*(point[0]+shifter+9), this.gridSize*(point[1]+6));
				}
			}
			if(this.state === 'end'){
				game = new Game();
				game.state = 'menu';
			}
			if(this.state == 'menu'){
				this.updateLevel();
			}
		},

		update: function(){
			if(this.walls.length < 10){
				this.makeWalls();
			}
			for(let point of this.board){
				if(point[1] == 0){
					this.endGame();
				}
			}
			///keystuff ask Dylan///
			if(Key.isDown(Key.RIGHT)){
				if(!this.moving){
					this.mvctr = 0;
					this.moving = true;
				}
				if(this.canmoveside('R') && ((this.mvctr % 6) == 0)){	
					this.falling.moveright();
					this.moving = true;
				}
				this.mvctr++;
			}
			else if(Key.isDown(Key.LEFT)){
				if(!this.moving){
					this.mvctr = 0;
					this.moving = true;
				}
				if(this.canmoveside('L') && ((this.mvctr % 6) == 0)){
					this.falling.moveleft();
					this.moving = true;
				}
				this.mvctr++;
			}
//			else if(Key.isDown(Key.DOWN) && (counter % 4 == 0)){
//				this.falling.movedown();
//				if(this.shouldstop()){
//					this.place();
//				}
//			}
			else{
				this.moving = false;
			}
			if(Key.isDown(Key.Z)){
				if((this.rotatectr % 20) == 0){
					if(this.canrotate()){
						this.falling.rotate();
					}
				}

				this.rotatectr++;
			}
			else{
				this.rotatectr = 0;
			}
			if(this.shouldstop() && (counter% this.fallrate == 0)){
				this.place();
			}
			else if(counter% this.fallrate == 0){
				this.falling.movedown();
			}
			for(let i = 0; i < this.rowWidths.length; i++){
				if(this.rowWidths[i] == this.cols){
					this.clearThese.push(i);
				}
			}
			if(this.clearThese.length == 0){
			}
			else{
				this.clearRow(this.clearThese);
			}
			counter++;
			this.updateLevel();

		},

		clearRow: function(rows){
			console.log(rows.length);
			if(rows.length == 1){
				this.score += 50*this.level;
			}
			else if(rows.length == 2){
				this.score += 150*this.level;
			}
			else if(rows.length == 3){
				this.score += 300*this.level;
			}
			else if(rows.length == 4){
				this.score += 1000*this.level;
			}
			for(let n of rows){
				this.rowWidths.splice(n,1);
				for(let i = 0; i < this.board.length; i++){
					if(this.board[i][1] == n){
						this.board.splice(i, 1);
						i--;
					}
				}
				for(let i = 0; i < this.board.length; i++){
					if(this.board[i][1] < n){
						this.board[i][1]++;
					}
				}
				for(let i = this.rowWidths.length; i > 0; i--){
					this.rowWidths[i] = this.rowWidths[i-1];
				}
				this.linesCleared++;
			}
			this.clearThese = [];
		},
		makeWalls: function(){
			for(let i = -1; i < this.rows + 1; i++){
				this.walls.push([-1, i]);
				this.walls.push([10, i]);
			}
			for(let i = -1; i < 11; i++){
				this.walls.push([i, this.rows + 1]);
			}
		},
		shouldstop: function(){
			for(let point of this.falling.structure){
				let x = point[1]+1;
				for(let another of this.board){
					if((point[0] == another[0]) && 
						(x == another[1])){
						return true;
					}
				}
				if(x == 21){
					return true;
				}
			}
			return false;
		},
		canmoveside: function(side){
			let shift = -1;			
			if(side == 'R'){
				shift = 1;
			}
			for(let point of this.falling.structure){
				let x = point[0] + shift;
				for(let another of this.board){
					if((x == another[0]) &&
						(point[1] == another[1])){
						return false;
					}
				}
				if((x == -1) || (x == 10)){
					return false;
				}
			}
			return true;
		},
		canrotate: function(){
			if(this.falling.letter == 'I'){
				return this.canIrotate();
			}
			else if(this.falling.letter == 'S'){
				return this.canSrotate();
			}
			else if(this.falling.letter == 'Z'){
				return this.canZrotate();
			}
			else if(this.falling.letter == 'T'){
				return this.canTrotate();
			}
			else if(this.falling.letter == 'L'){
				return this.canLrotate();
			}
			else if(this.falling.letter == 'J'){
				return this.canJrotate();
			}
		},
		canIrotate: function(){
			if(this.falling.rotateCtr % 2 == 0){
				let p1 = [this.falling.structure[2][0], this.falling.structure[2][1] + 1];
				let p2 = [this.falling.structure[2][0], this.falling.structure[2][1] - 1];
				let p3 = [this.falling.structure[2][0], this.falling.structure[2][1] - 2];
				for(let point of this.board){
					if(point[0] == p1[0] && point[1] == p1[1]){
						return false;
					}
					else if(point[0] == p2[0] && point[1] == p2[1]){
						return false;
					}
					else if(point[0] == p3[0] && point[1] == p3[1]){
						return false;
					}
				}
				if(p1[0] == -1 || p1[0] == 10){
					return false;
				}
				else if(p2[0] == -1 || p2[0] == 10){
					return false;
				}
				else if(p3[0] == -1 || p3[0] == 10){
					return false;
				}
				if(p1[1] == 21){
					return false;
				}
				else if(p2[1] == 21){
					return false;
				}
				else if(p3[1] == 21){
					return false;
				}
			}
			else{
				let p1 = [this.falling.structure[2][0] - 2, this.falling.structure[2][1]];
				let p2 = [this.falling.structure[2][0] - 1, this.falling.structure[2][1]];
				let p3 = [this.falling.structure[2][0] + 1, this.falling.structure[2][1]];
				for(let point of this.board){
					if(point[0] == p1[0] && point[1] == p1[1]){
						return false;
					}
					else if(point[0] == p2[0] && point[1] == p2[1]){
						return false;
					}
					else if(point[0] == p3[0] && point[1] == p3[1]){
						return false;
					}
				}
				if(p1[0] == -1 || p1[0] == 10){
					return false;
				}
				else if(p2[0] == -1 || p2[0] == 10){
					return false;
				}
				else if(p3[0] == -1 || p3[0] == 10){
					return false;
				}
				if(p1[1] == 21){
					return false;
				}
				else if(p2[1] == 21){
					return false;
				}
				else if(p3[1] == 21){
					return false;
				}
				
			}
			return true;
		},
		canSrotate: function(){
			if(this.falling.rotateCtr % 2 == 0){
				let p1 = [this.falling.structure[0][0] - 1, this.falling.structure[0][1] + 2];
				let p2 = [this.falling.structure[3][0] - 1, this.falling.structure[3][1]];
				for(let point of this.board){
					if(point[0] == p1[0] && point[1] == p1[1]){
						return false;
					}
					else if(point[0] == p2[0] && point[1] == p2[1]){
						return false;
					}
				}
				if(p1[0] == -1 || p1[0] == 10){
					return false;
				}
				else if(p2[0] == -1 || p2[0] == 10){
					return false;
				}
				if(p1[1] == 21){
					return false;
				}
				else if(p2[1] == 21){
					return false;
				}
			}
			else{
				let p1 = [this.falling.structure[0][0] + 1, this.falling.structure[0][1] - 2];
				let p2 = [this.falling.structure[3][0] + 1, this.falling.structure[3][1]];
				for(let point of this.board){
					if(point[0] == p1[0] && point[1] == p1[1]){
						return false;
					}
					else if(point[0] == p2[0] && point[1] == p2[1]){
						return false;
					}
				}
				if(p1[0] == -1 || p1[0] == 10){
					return false;
				}
				else if(p2[0] == -1 || p2[0] == 10){
					return false;
				}
				if(p1[1] == 21){
					return false;
				}
				else if(p2[1] == 21){
					return false;
				}
				
			}
			return true;
		},
		canZrotate: function(){
			if(this.falling.rotateCtr % 2 == 0){
				let p1 = [this.falling.structure[1][0] + 1, this.falling.structure[1][1]];
				let p2 = [this.falling.structure[2][0] + 1, this.falling.structure[2][1] - 2];
				for(let point of this.board){
					if(point[0] == p1[0] && point[1] == p1[1]){
						return false;
					}
					else if(point[0] == p2[0] && point[1] == p2[1]){
						return false;
					}
				}
				if(p1[0] == -1 || p1[0] == 10){
					return false;
				}
				else if(p2[0] == -1 || p2[0] == 10){
					return false;
				}
				if(p1[1] == 21){
					return false;
				}
				else if(p2[1] == 21){
					return false;
				}
			}
			else{
				let p1 = [this.falling.structure[1][0] - 1, this.falling.structure[1][1]];
				let p2 = [this.falling.structure[2][0] - 1, this.falling.structure[2][1] - 2];
				for(let point of this.board){
					if(point[0] == p1[0] && point[1] == p1[1]){
						return false;
					}
					else if(point[0] == p2[0] && point[1] == p2[1]){
						return false;
					}
				}
				if(p1[0] == -1 || p1[0] == 10){
					return false;
				}
				else if(p2[0] == -1 || p2[0] == 10){
					return false;
				}
				if(p1[1] == 21){
					return false;
				}
				else if(p2[1] == 21){
					return false;
				}
				
			}
			return true;
		},
		canJrotate: function(){
			if(this.falling.rotateCtr % 4 == 0){
				let p1 = [this.falling.structure[0][0] - 2, this.falling.structure[0][1] + 2];
				let p2 = [this.falling.structure[1][0] - 2, this.falling.structure[1][1]];
				for(let point of this.board){
					if(point[0] == p1[0] && point[1] == p1[1]){
						return false;
					}
					else if(point[0] == p2[0] && point[1] == p2[1]){
						return false;
					}
				}
				if(p1[0] == -1 || p1[0] == 10){
					return false;
				}
				else if(p2[0] == -1 || p2[0] == 10){
					return false;
				}
				if(p1[1] == 21){
					return false;
				}
				else if(p2[1] == 21){
					return false;
				}

			}
			else if(this.falling.rotateCtr % 4 == 1){
				let p1 = [this.falling.structure[2][0] - 2, this.falling.structure[2][1] - 2];
				let p2 = [this.falling.structure[3][1], this.falling.structure[3][1] - 2];
				for(let point of this.board){
					if(point[0] == p1[0] && point[1] == p1[1]){
						return false;
					}
					else if(point[0] == p2[0] && point[1] == p2[1]){
						return false;
					}
				}
				if(p1[0] == -1 || p1[0] == 10){
					return false;
				}
				else if(p2[0] == -1 || p2[0] == 10){
					return false;
				}
				if(p1[1] == 21){
					return false;
				}
				else if(p2[1] == 21){
					return false;
				}
			}
			else if(this.falling.rotateCtr % 4 == 2){
				let p1 = [this.falling.structure[0][0] + 2, this.falling.structure[0][1] - 2];
				let p2 = [this.falling.structure[1][0] + 2, this.falling.structure[1][1]];
				for(let point of this.board){
					if(point[0] == p1[0] && point[1] == p1[1]){
						return false;
					}
					else if(point[0] == p2[0] && point[1] == p2[1]){
						return false;
					}
				}
				if(p1[0] == -1 || p1[0] == 10){
					return false;
				}
				else if(p2[0] == -1 || p2[0] == 10){
					return false;
				}
				if(p1[1] == 21){
					return false;
				}
				else if(p2[1] == 21){
					return false;
				}
			}
			else{
				let p1 = [this.falling.structure[2][0] + 2, this.falling.structure[2][1] + 2];
				let p2 = [this.falling.structure[3][0], this.falling.structure[3][1] + 2];
				for(let point of this.board){
					if(point[0] == p1[0] && point[1] == p1[1]){
						return false;
					}
					else if(point[0] == p2[0] && point[1] == p2[1]){
						return false;
					}
				}
				if(p1[0] == -1 || p1[0] == 10){
					return false;
				}
				else if(p2[0] == -1 || p2[0] == 10){
					return false;
				}
				if(p1[1] == 21){
					return false;
				}
				else if(p2[1] == 21){
					return false;
				}
			}
			return true;
		},
		canLrotate: function(){
			if(this.falling.rotateCtr % 4 == 0){
				let p1 = [this.falling.structure[2][0] + 2, this.falling.structure[2][1] - 2];
				let p2 = [this.falling.structure[3][0], this.falling.structure[3][1] - 2];
				for(let point of this.board){
					if(point[0] == p1[0] && point[1] == p1[1]){
						return false;
					}
					else if(point[0] == p2[0] && point[1] == p2[1]){
						return false;
					}
				}
				if(p1[0] == -1 || p1[0] == 10){
					return false;
				}
				else if(p2[0] == -1 || p2[0] == 10){
					return false;
				}
				if(p1[1] == 21){
					return false;
				}
				else if(p2[1] == 21){
					return false;
				}
			}
			else if(this.falling.rotateCtr % 4 == 1){
				let p1 = [this.falling.structure[0][0] + 2, this.falling.structure[0][1] + 2];
				let p2 = [this.falling.structure[1][0] + 2, this.falling.structure[1][1]];
				for(let point of this.board){
					if(point[0] == p1[0] && point[1] == p1[1]){
						return false;
					}
					else if(point[0] == p2[0] && point[1] == p2[1]){
						return false;
					}
				}
				if(p1[0] == -1 || p1[0] == 10){
					return false;
				}
				else if(p2[0] == -1 || p2[0] == 10){
					return false;
				}
				if(p1[1] == 21){
					return false;
				}
				else if(p2[1] == 21){
					return false;
				}
			}
			else if(this.falling.rotateCtr % 4 == 2){
				let p1 = [this.falling.structure[2][0] - 2, this.falling.structure[2][1] + 2];
				let p2 = [this.falling.structure[3][0], this.falling.structure[3][1] + 2];
				for(let point of this.board){
					if(point[0] == p1[0] && point[1] == p1[1]){
						return false;
					}
					else if(point[0] == p2[0] && point[1] == p2[1]){
						return false;
					}
				}
				if(p1[0] == -1 || p1[0] == 10){
					return false;
				}
				else if(p2[0] == -1 || p2[0] == 10){
					return false;
				}
				if(p1[1] == 21){
					return false;
				}
				else if(p2[1] == 21){
					return false;
				}
			}
			else{
				let p1 = [this.falling.structure[0][0] - 2, this.falling.structure[0][1] - 2];
				let p2 = [this.falling.structure[1][0] - 2, this.falling.structure[1][1]];
				for(let point of this.board){
					if(point[0] == p1[0] && point[1] == p1[1]){
						return false;
					}
					else if(point[0] == p2[0] && point[1] == p2[1]){
						return false;
					}
				}
				if(p1[0] == -1 || p1[0] == 10){
					return false;
				}
				else if(p2[0] == -1 || p2[0] == 10){
					return false;
				}
				if(p1[1] == 21){
					return false;
				}
				else if(p2[1] == 21){
					return false;
				}
			}
			return true;
		},
		canTrotate: function(){
			if(this.falling.rotateCtr % 4 == 0){
				let p1 = [this.falling.structure[2][0] - 1, this.falling.structure[2][1] - 1];
				let p2 = [this.falling.structure[3][0] - 2, this.falling.structure[3][1] - 2];
				for(let point of this.board){
					if(point[0] == p1[0] && point[1] == p1[1]){
						return false;
					}
					else if(point[0] == p2[0] && point[1] == p2[1]){
						return false;
					}
				}
				if(p1[0] == -1 || p1[0] == 10){
					return false;
				}
				else if(p2[0] == -1 || p2[0] == 10){
					return false;
				}
				if(p1[1] == 21){
					return false;
				}
				else if(p2[1] == 21){
					return false;
				}
			}
			else if(this.falling.rotateCtr % 4 == 1){
				let p1 = [this.falling.structure[0][0] + 2, this.falling.structure[0][1] - 2];
				let p2 = [this.falling.structure[2][0] + 1, this.falling.structure[2][1] - 1];
				for(let point of this.board){
					if(point[0] == p1[0] && point[1] == p1[1]){
						return false;
					}
					else if(point[0] == p2[0] && point[1] == p2[1]){
						return false;
					}
				}
				if(p1[0] == -1 || p1[0] == 10){
					return false;
				}
				else if(p2[0] == -1 || p2[0] == 10){
					return false;
				}
				if(p1[1] == 21){
					return false;
				}
				else if(p2[1] == 21){
					return false;
				}
			}
			else if(this.falling.rotateCtr % 4 == 2){
				let p1 = [this.falling.structure[2][0] + 1, this.falling.structure[2][1] + 1];
				let p2 = [this.falling.structure[3][0] + 2, this.falling.structure[3][1] + 2];
				for(let point of this.board){
					if(point[0] == p1[0] && point[1] == p1[1]){
						return false;
					}
					else if(point[0] == p2[0] && point[1] == p2[1]){
						return false;
					}
				}
				if(p1[0] == -1 || p1[0] == 10){
					return false;
				}
				else if(p2[0] == -1 || p2[0] == 10){
					return false;
				}
				if(p1[1] == 21){
					return false;
				}
				else if(p2[1] == 21){
					return false;
				}
			}
			else{
				let p1 = [this.falling.structure[0][0] - 2, this.falling.structure[0][1] + 2];
				let p2 = [this.falling.structure[2][0] - 1, this.falling.structure[2][1] + 1];
				for(let point of this.board){
					if(point[0] == p1[0] && point[1] == p1[1]){
						return false;
					}
					else if(point[0] == p2[0] && point[1] == p2[1]){
						return false;
					}
				}
				if(p1[0] == -1 || p1[0] == 10){
					return false;
				}
				else if(p2[0] == -1 || p2[0] == 10){
					return false;
				}
				if(p1[1] == 21){
					return false;
				}
				else if(p2[1] == 21){
					return false;
				}	
			}
			return true;
		},
		checkCollision: function(){       //learn how to make function 
			for(let point of this.board){ //with variable number of args and use in rotate functions.
					if(point[0] == p1[0] && point[1] == p1[1]){
						return false;
					}
					else if(point[0] == p2[0] && point[1] == p2[1]){
						return false;
					}
				}
				if(p1[0] == -1 || p1[0] == 10){
					return false;
				}
				else if(p2[0] == -1 || p2[0] == 10){
					return false;
				}
				if(p1[1] == 21){
					return false;
				}
				else if(p2[1] == 21){
					return false;
				}
		},
		place: function(){
			for(let point of this.falling.structure){
				this.board.push(point);
				this.colHeights[point[0]]++;
				this.rowWidths[point[1]]++;
			}
			this.falling = this.next;
			this.next = new Shape();
			this.next.establish();
		},
		updateLevel: function(a, b){
			if(this.level > Math.floor(this.linesCleared/10)){
				// ignore
			}
			else{
				this.level = Math.floor(this.linesCleared/10);
			}
			if(this.level == 1){
				this.fallrate = 16;
			}
			else if(this.level == 2){
				this.fallrate = 15;
			}
			else if(this.level == 3){
				this.fallrate = 14;
			}
			else if(this.level == 4){
				this.fallrate = 13;
			}
			else if(this.level == 5){
				this.fallrate = 12;
			}
			else if(this.level == 6){
				this.fallrate = 11;
			}
			else if(this.level == 7){
				this.fallrate = 10;
			}
			else if(this.level == 8){
				this.fallrate = 9;
			}
			else if(this.level == 9){
				this.fallrate =8;
			}
			else if(this.level == 10){
				this.fallrate =7;
			}
			else if(this.level == 11){
				this.fallrate = 6;
			}
			else if(this.level == 12){
				this.fallrate = 5;
			}
			else if(this.level == 13){
				this.fallrate = 4;
			}
			else if(this.level == 14){
				this.fallrate = 3;
			}
			else if(this.level == 15){
				this.fallrate = 2;
			}
			else if(this.level == 16){
				this.fallrate = 1;
			}
		},
		endGame: function(){
			this.state = 'end';

		}
	}

	window.Game = Game;
})();