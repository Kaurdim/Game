class Player {
	constructor (gameSize) {
		this.path = "img/snow_bar.png";
		this.gameSize = gameSize;
		this.size = {width:150, height: 30};
		this.position = {x: gameSize.x/2-this.size.width/2, y:gameSize.y-this.size.height};
		
	}
	
}