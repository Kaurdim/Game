
	class Game {
		constructor (canvasId) {
			this.canvas = document.getElementById(canvasId);
			this.screen = this.canvas.getContext("2d");
			this.gameSize = {
				x: this.canvas.width,
				y: this.canvas.height
			};
			this.player = new Player(this.gameSize);
			this.kayboarder = new Keyboarder();
			this.bg = new Image();
			this.bg.src = "img/futur-back.png";
			this.ball = new Ball(this.gameSize);
			this.dx = Math.round(Math.random()) ? -4 : 4; 
			this.dy = -4;
			this.score = 0;
			this.bullet = 0;

			this.bricks = [];
			this.snowflakes = [];
			this.prises = [];
			this.count = 0;
			this.xSprite = 20; 
			let x = 200
			let y = 100 

			for(let i = 0; i < 60; i++) {

				if (this.bricks.length === 20) {
					y+=30;
					x = 200
				}
				if (this.bricks.length === 40) {
					y+=30;
					x = 200
				}

				this.bricks.push( new Brick(this.gameSize, {x:x, y:y}));
				// this.bricks.path();
				x +=30;
			}


		}
		canvasControl(){
			//События клавиатуры
			this.kayboarder.start();

			if(this.kayboarder.isDown(this.kayboarder.keys.left) && this.player.position.x > 0) {
				this.player.position.x -=8;
			}

			if(this.kayboarder.isDown(this.kayboarder.keys.right) && this.player.position.x < this.gameSize.x-this.player.size.width) {
				this.player.position.x +=8;	
			}

			if (this.kayboarder.isDown(this.kayboarder.keys.space)) {
				location.reload(); 
				// this.tick();
			}
		}
		GameInit () {
			this.canvasControl();
			// console.log(this.ball.position);
			

			if (this.kayboarder.keyFire(this.kayboarder.keys.keyW)) {
				console.log("снежинка");
				if(this.bullet > 0) {
					this.snowflakes.push(new Sowflake(this.player));
					this.bullet --;
				}
			}

			if(this.ball.position.x > this.gameSize.x - this.ball.size.width || 
				this.ball.position.x < 1) {
				this.dx = -this.dx;
			}

			if(this.ball.position.y + this.ball.size.width < this.ball.size.width) {
				this.dy = -this.dy;
			}

			if (this.ball.position.y + this.ball.size.width > this.player.position.y && this.ball.position.x + this.ball.size.width/2 > this.player.position.x-10 
					&& this.ball.position.x + this.ball.size.width/2 < this.player.position.x + this.player.size.width + 10) {
					this.dy = -this.dy;
				// (Math.random() * (1 - 0)) + 0 ? this.dx+=1: this.dx-=1
				}
			
			if (this.ball.position.y + this.ball.size.width/2 > this.player.position.y && 
				this.ball.position.y + this.ball.size.width/2 < this.player.position.y + this.player.size.height) {
				if(this.ball.position.x + this.ball.size.width > this.player.position.x 
					&& this.ball.position.x < this.player.position.x + this.player.size.width) {
					this.dx = -this.dx;
				// (Math.random() * (1 - 0)) + 0 ? this.dx+=1: this.dx-=1
				}
			}

				//столкновение шара и ёлки вертикальное
			for(let i = 0; i < this.bricks.length; i++ ) {

				if (this.ball.position.y > this.bricks[i].position.y &&
					this.ball.position.y < this.bricks[i].position.y  + this.bricks[i].size.width ||
					this.ball.position.y + this.ball.size.width >  this.bricks[i].position.y &&
					this.ball.position.y + this.ball.size.width <  this.bricks[i].position.y  + this.bricks[i].size.width) {

						if(this.ball.position.x + this.ball.size.width/2 > this.bricks[i].position.x &&
							this.ball.position.x + this.ball.size.width/2 < this.bricks[i].position.x + this.bricks[i].size.width){
							this.dy = -this.dy;
							if(this.bricks[i].prise === 1) {
								this.prises.push(new Prise(this.gameSize, this.bricks[i].position));
								console.log(this.prises);

							}
							console.log(this.bricks[i].prise);

							this.bricks.splice(i, 1);

							this.score++;
							console.log("попал!");
						}
					}
				}
				//столкновение шара и ёлки горизонтальное
			for(let i = 0; i < this.bricks.length; i++ ) {

				if (this.ball.position.x > this.bricks[i].position.x &&
					this.ball.position.x < this.bricks[i].position.x + this.bricks[i].size.width ||
					this.ball.position.x + this.ball.size.width >  this.bricks[i].position.x &&
					this.ball.position.x + this.ball.size.width <  this.bricks[i].position.x  + this.bricks[i].size.width) {

						if(this.ball.position.y + this.ball.size.width/2 > this.bricks[i].position.y &&
							this.ball.position.y + this.ball.size.width/2 < this.bricks[i].position.y + this.bricks[i].size.width){
							this.dx = -this.dx;

							if(this.bricks[i].prise === 1) {
								this.prises.push(new Prise(this.gameSize, this.bricks[i].position));
								console.log("новый приз");
							}
							// console.log(this.bricks[i].prise);
							this.bricks.splice(i, 1);
							// console.log("попал в бок!");
							this.score++;
						}
					}
				}	
				//столкновение выстред и ёлки
			for(let i = 0; i < this.bricks.length; i++) {
				for(let g = 0; g < this.snowflakes.length; g++) {
					if(this.snowflakes[g].position.x + this.snowflakes[g].size.width/2 > this.bricks[i].position.x &&
						this.snowflakes[g].position.x + this.snowflakes[g].size.width/2 < this.bricks[i].position.x + this.bricks[i].size.width) {

						if(this.snowflakes[g].position.y < this.bricks[i].position.y) {
							console.log(this.bricks[i])
							this.snowflakes.splice(g, 1);
							this.bricks.splice(i, 1);							
						}
					}
				}
			}
			// полет выстрела
			for(let i = 0; i < this.snowflakes.length; i++){
				this.snowflakes[i].flySnow();

				if(this.snowflakes[i].position.y < 0) {
					this.snowflakes.splice(i, 1);
				}	
			}

			//Поиск призов
			this.searchPrise();

			this.ball.position.x +=this.dx;
			this.ball.position.y +=this.dy;
		}


			

		draw (screen, gameSize) {
			this.clearCanvas(this.screen); //Стирание всего
			this.screen.drawImage(this.bg, -60, 0,); //Отрисовка фона
			this.drawImageGame(this.ball); //Отрисовка мячика
			this.drawImageGame(this.player); //Отрисовка облака

			//Отрисовка значка елок и призов
			this.drawImageGame(new Prise(this.screen, {x:10,y:10})); 
			this.drawImageGame(new Brick(this.screen, {x:this.gameSize.x-80,y:10}));

			//Отрисовка выстрелов
			// if(this.count > 1) {
				for(let i = 0; i < this.snowflakes.length; i++) {
					// this.count = 0;
					this.drawImageSprite(this.snowflakes[i]);
				// }
			}
			//Отрисовка ёлок
			for(let i = 0; i < this.bricks.length; i++) {
				this.drawImageGame(this.bricks[i]);
				// this.drawCoord(this.bricks[i].position);
			} 

			//Отрисовка снежинок
			for(let i = 0; i < this.prises.length; i++) {
				this.drawImageGame(this.prises[i]);
			}
			//Условие проигрыша
			if (this.ball.position.y > this.gameSize.y ) {
				// Надпись коне игры
				this.printText("60px Arial", "#fff", "GAME OVER", this.gameSize.x/3, this.gameSize.y/2);
				// Надпись количество очков
				this.printText("40px Arial", "#fff", `Набранно очков: ${this.score}`, this.gameSize.x/3+10, this.gameSize.y/3*1.8);
				// Надпись чтобы сыграть снова
				this.printText("40px Arial", "#fff", "Чтобы сыграть снова нажмите пробел", this.gameSize.x/6, this.gameSize.y/3*2);

				this.dx = 0; //Остановка мячика
				this.dy = 0;
				return; 

			}

			this.printText("30px Arial", "#333",this.score, this.gameSize.x - 40, 40); //Отображение количества очков

			this.printText("30px Arial", "#333", this.bullet, 50, 30); //Отображение кличества выстрелов

			//Условие победы
			if(this.bricks.length === 0) {
				// Надпись вы победили
				this.printText("60px Arial", "#fff", "Ура, вы победили!", this.gameSize.x/3, this.gameSize.y/1.8);
				// Надпись количесвто очков
				this.printText("40px Arial", "#fff", `Набранно очков: ${this.score}`, this.gameSize.x/3+15, this.gameSize.y/3*1.7);
				// Надпись чтобы сыграть снова
				this.printText("40px Arial", "#fff", "Чтобы сыграть снова нажмите пробел", this.gameSize.x/6, this.gameSize.y/3*2);


				this.dx = 0; //Остановка мячика
				this.dy = 0;
				return; 
			}
		
		}

		drawImageGame (picture) {
			let img = new Image ();
			img.src = picture.path;
			this.screen.drawImage(img, picture.position.x, picture.position.y, picture.size.width, picture.size.height);
		}
		drawImageSprite (picture) { 
			let img = new Image ();
			img.src = picture.path;
			
			this.xSprite  = (this.xSprite  === 468? this.xSprite  = 20: this.xSprite  += 64);
			this.screen.drawImage(img, this.xSprite , 144, 20, 45, picture.position.x, picture.position.y, 20, 45);
		}
		printText(font, color, text, x, y) {
			this.screen.font = font; 
			this.screen.fillStyle = color;
			this.screen.strokeStyle = color;
			this.screen.fillText(text, x, y);
			this.screen.strokeText(text, x, y);
		}

		clearCanvas(screen) {
			screen.clearRect(0, 0, this.gameSize.x, this.gameSize.y);
		}

		tick() {
			this.GameInit();
			this.draw(this.screen, this.gameSize);
			// this.count++;
			requestAnimationFrame(this.tick.bind(this));
		}

		searchPrise() {
				//Поиск призов
				for(let i = 0; i < this.prises.length; i++) {
					this.prises[i].downPrise();
					if(this.prises[i].position.x + this.prises[i].size.width > this.player.position.x &&
						this.prises[i].position.x + this.prises[i].size.width < this.player.position.x + this.player.size.width) {
						if(this.prises[i].position.y > this.player.position.y && this.prises[i].position.y < this.player.position.y + this.player.size.height) {
							this.prises.splice(i, 1);
							console.log(this.prises);
							this.bullet +=1;

						}
					}
					// if(this.prises[i].position.y > this.gameSize.x) {
					// 	this.prises.splice(i, 1);
					// } 
				}

		}
		showMenu() {

			this.screen.drawImage(this.bg, -60, 0);

			
			this.canvas.addEventListener("click",this.tick.bind(this));
		}


		
		// gameover() {
		// 	this.screen.font = "60px Arial";
		// 	this.screen.fillStyle = "#fff";
		// 	this.screen.strokeStyle = "#fff";
		// 	this.screen.fillText("GAME OVER", this.gameSize.x/3, this.gameSize.y/2);
		// 	this.screen.strokeText("GAME OVER", this.gameSize.x/3, this.gameSize.y/2);

		// }
		// gameWin() {
		// 	this.screen.font = "60px Arial";
		// 	this.screen.fillStyle = "#f24343";
		// 	this.screen.strokeStyle = "d63939";
		// 	this.screen.fillText("Ура, вы победили!", this.gameSize.x/3, this.gameSize.y/2);
		// 	this.screen.strokeText("Ура, вы победили!", this.gameSize.x/3, this.gameSize.y/2);

		// }
		// showScore(score) {
		// 	this.screen.font = "40px Arial";
		// 	this.screen.fillStyle = "#f24343";
		// 	this.screen.strokeStyle = "d63939";
		// 	this.screen.fillText(`Набранно очков: ${score}`, this.gameSize.x/3+15, this.gameSize.y/3*1.7);
		// 	this.screen.strokeText(`Набранно очков: ${score}`, this.gameSize.x/3+15, this.gameSize.y/3*1.7);

		// }

		// showMessage() {
		// 	this.screen.font = "40px Arial";
		// 	this.screen.fillStyle = "#f24343";
		// 	this.screen.strokeStyle = "d63939";
		// 	this.screen.fillText(`Чтобы сыграть снова нажмите пробел`, this.gameSize.x/6, this.gameSize.y/3*2);
		// 	this.screen.strokeText(`Чтобы сыграть снова нажмите пробел`, this.gameSize.x/6, this.gameSize.y/3*2);

		// }
		// drawCoord(coord) {
		// 	this.screen.font = "10px Arial";
		// 	this.screen.fillStyle = "#333";
		// 	this.screen.strokeStyle = "#333";
		// 	this.screen.fillText(`${coord.x}   ${coord.y}`, coord.x+20, coord.y);
		// 	this.screen.strokeText(`${coord.x}   ${coord.y}`, coord.x+20, coord.y);

		// }
		// drawScore(score) {
		// 	this.screen.font = "30px Arial";
		// 	this.screen.fillStyle = "#333";
		// 	this.screen.strokeStyle = "#333";
		// 	this.screen.fillText( score, this.gameSize.x - 40, 40);
		// 	this.screen.strokeText( score, this.gameSize.x - 40, 40);

		// }

		// drawBullet(score) {
		// 	this.screen.font = "30px Arial";
		// 	this.screen.fillStyle = "#333";
		// 	this.screen.strokeStyle = "#333";
		// 	this.screen.fillText( score, 50, 30);
		// 	this.screen.strokeText( score,  50, 30);

		// }
	}



