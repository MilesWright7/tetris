(function(){
	function LevelSelect(level, x, y){
		this.level = level;
		this.ulx = x;
		this.uly = y;
		this.sizex = 42;
		this.sizey = 36;
		this.color = 'red';
	}
	LevelSelect.prototype = {
		draw: function(){
			c.ctx.fillStyle = this.color;
			c.ctx.fillRect(this.ulx, this.uly, this.sizex, this.sizey);
			c.ctx.fillStyle = 'black';
			c.ctx.fillText(this.level, this.ulx + 5, this.uly +31);

		},
		selected: function(){
			if(((this.ulx <= mouse.x)&&(mouse.x <= this.ulx+this.sizex)) && ((this.uly <= mouse.y)&&(mouse.y <= this.uly+this.sizey))){
				return true;
			}
			return false;
		}

	} 
	window.LevelSelect = LevelSelect;
})();