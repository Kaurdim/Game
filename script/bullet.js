class Sowflake {
	constructor(player) {
		this.size = {width:20, height:20};
		this.position = {x:player.position.x + player.size.width/2, y:player.position.y};
		this.path = "img/icicle_0.png";
		
	}

	flySnow(){
		this.position.y -=5;
	}
}