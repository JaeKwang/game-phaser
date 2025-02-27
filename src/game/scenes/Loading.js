
// You can write more code here

/* START OF COMPILED CODE */

export default class Loading extends Phaser.Scene {

	constructor() {
		super("Loading");
	}

	preload() {
		const login_bg = this.add.image(639, 362, "login_bg");
		login_bg.scaleX = 0.36752881916878155;
		login_bg.scaleY = 0.36752881916878155;

		// 🔹 로딩 진행률 바 UI 생성
		this.createLoadingBar();

		// 🔹 진행률 이벤트 등록
		this.load.on("progress", this.updateProgressBar, this);
		this.load.on("complete", this.onLoadComplete, this);

		// 🔹 메인 화면
		this.load.image("lobby_bg", "/assets/lobby_bg.png");
		this.load.audio("lobby_bgm", "/assets/audio/lobby_bgm.mp3");
		this.load.image("battle_button", "/assets/battle_button.png");
		this.load.image("card_button", "/assets/card_button.png");

		// 🔹 카드 덱 화면
		this.load.image("left_margin", "/assets/left_margin.png");
		this.load.image("right_margin", "/assets/right_margin.png")
	}

	/** @returns {void} */
	editorCreate() {
		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	createLoadingBar() {
		const screenWidth = this.scale.width;
		const screenHeight = this.scale.height;

		this.progressBox = this.add.graphics();
		this.progressBox.fillStyle(0x222222, 0.8);
		this.progressBox.fillRect(screenWidth / 4 - 10, screenHeight / 2 - 10, screenWidth / 2 + 20, 40);

		this.progressBar = this.add.graphics();
	}

  	updateProgressBar(value) {
		const screenWidth = this.scale.width;
		const screenHeight = this.scale.height;

		this.progressBar.clear();
		this.progressBar.fillStyle(0xffffff, 1);
		this.progressBar.fillRect(screenWidth / 4, screenHeight / 2, (screenWidth / 2) * value, 20);
	}

	onLoadComplete() {
		this.sound.removeAll();
		this.scene.start("Main");
	}
}
