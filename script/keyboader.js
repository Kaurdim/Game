class Keyboarder {
	constructor() {
		this.keyState = {};
		this.keys = {
			left: 65,
			right: 68,
			space: 32,
			keyW: 119
		};
		this.keyP = null;
	}
	start() {
		document.body.addEventListener("keydown",
			this.keyDown.bind(this));
		document.body.addEventListener("keyup",
			this.keyUp.bind(this));

		document.body.addEventListener("keypress",
			this.keyPress.bind(this));
	}


	keyDown (evt) {
		// console.log(evt);
		this.keyState[evt.keyCode] = true;
	}

	keyUp(evt) {
		// console.log(evt);
		this.keyState[evt.keyCode] = false;
	}
	keyPress(evt) {
		// console.log(evt.keyCode);
		// console.log(this.keyP);
		this.keyP = evt.keyCode ;
	}
	isDown(keyCode) {
		return this.keyState[keyCode] === true;
	}

	keyFire(keyCode) {
		if(this.keyP === keyCode) {
			this.keyP=0;
			return true
		}

	}
}