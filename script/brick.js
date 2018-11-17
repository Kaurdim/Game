class Brick {
	constructor(gameSize, position) {
		this.size = {width:30, height:30};
		this.position = position;
		this.gameSize = gameSize;
		this.path =  "img/Christmas_Tree.svg";
		this.prise = Math.round(Math.random()) ? 0 : 1;

	}

	// path() {
	// 	let p = Math.floor(Math.random() * (4 - 1 + 1)) + 1;

	// 	if (p === 1) {
	// 		 return  "img/Present1.png";
			
	// 	}
	// 	if (p === 2) {
	// 		return  "img/Present2.png";
	// 	}
	// 	if (p === 3) {
	// 		return  "img/Present3.png";
	// 	}
	// 	if (p === 4) {
	// 		return  "img/Present4.png";
	// 	}


	// }
	// update() {
	// 	// this.position.x += this.velocity.x;
	// 	// this.position.y += this.velocity.y;
	// }
}
