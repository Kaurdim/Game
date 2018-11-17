class Menu {
	constructor (canvasId) {
		this.canvas = document.getElementById(canvasId);
		this.screen = this.canvas.getContext("2d");
		this.bg = new Image();
		this.bg.src = "img/5ABE.gif";
		this.speedCount = 0;
		// this.letters = Array(256).join(1).split(''); 
		this.game = new Game("screen");
		// this.mouseX = null;
		// this.mouseY = null;
	}

	showMenu() {
		// this.chePos();
		let self = this;
		this.bg.onload = function () { 
		self.screen.drawImage(self.bg, 200, 0);
		}
		this.canvas.addEventListener("click",this.startGame.bind(this));
		
	}

	drawMatrix() {
		this.screen.fillStyle = 'rgba(0,0,0,.05)'; //Тут цвет фона

		this.screen.fillRect(0,0,this.width,this.height);
		  this.screen.fillStyle = '#0F0'; //Тут цвет букв 
		  let self = this;
		  this.letters.map(function(y_pos, index){ 

		  let text = String.fromCharCode(65+Math.random()*33); 
		  let x_pos = index * 10; 
			// console.log(text);
		  
		  self.screen.fillText(text, x_pos, y_pos); 

		  self.letters[index] = (y_pos > 758 + Math.random() * 1e4) ? 0 : y_pos + 10; 
		  }); 

	}
	startGame(){
		if(this.speedCount < 3) {
			console.log("Скорость увеличина!");
			this.speedCount++;
			this.game.tick();
		}
		// setInterval(this.drawMatrix.bind(this), 33);

	}
} 