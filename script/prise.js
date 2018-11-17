class Prise {
	constructor (gameSize, position) {
		this.size = {width:20, height:20};
		this.position = position;
		this.gameSize = gameSize;
		this.path = "img/snowflake.svg";
	}
	downPrise(){
		this.position.y +=2;
	}
}