
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
		const userDecks = this.registry.get("userDecks") || [];
		userDecks.map((v) => this.load.image(`card${v.card_id}`, v.image));
		this.load.image("left_margin", "/assets/left_margin.png");
		this.load.image("right_margin", "/assets/right_margin.png");

		this.load.glsl('holoShader', '/assets/hologram.frag'); 
		this.load.image("background", "/assets/background.png");
		this.load.image("close", "/assets/close.png");
		this.load.image("close_hover", "/assets/close_hover.png");
		this.load.image("simple_bar", "/assets/simple_bar.png");

		// 🔹 카드 구성
		this.load.image("background0", "/assets/background0.png");
		this.load.image("background1", "/assets/background1.png");
		this.load.image("background2", "/assets/background2.png");
		this.load.image("background3", "/assets/background3.png");
		this.load.image("background4", "/assets/background4.png");

		this.load.image("border0", "/assets/border0.png");
		this.load.image("border1", "/assets/border1.png");
		this.load.image("border2", "/assets/border2.png");
		this.load.image("border3", "/assets/border3.png");
		this.load.image("border4", "/assets/border4.png");
		this.load.image("cell", "/assets/cell.png");
		this.load.image("star", "/assets/star.png");
		this.load.image("cardcontent", "/assets/cardcontent.png");
		this.load.image("cardback", "/assets/cardback.png");
		this.load.image("cardframe_1", "/assets/cardframe_1.png");
		this.load.image("cardtitle_1", "/assets/cardtitle_1.png");
		this.load.image("cardskill_1", "/assets/cardskill_1.png");

		this.load.image("tribe1", "/assets/tribe/1.png");
		this.load.image("tribe2", "/assets/tribe/2.png");
		this.load.image("tribe3", "/assets/tribe/3.png");
		this.load.image("tribe4", "/assets/tribe/4.png");
		this.load.image("tribe5", "/assets/tribe/5.png");
		this.load.image("tribe6", "/assets/tribe/6.png");
		this.load.image("tribe7", "/assets/tribe/7.png");
		this.load.image("tribe8", "/assets/tribe/8.png");
		this.load.image("tribe9", "/assets/tribe/9.png");
		this.load.image("tribe10", "/assets/tribe/10.png");
		this.load.image("tribe11", "/assets/tribe/11.png");
		this.load.image("tribe12", "/assets/tribe/12.png");
		this.load.image("tribe13", "/assets/tribe/13.png");
		
		this.load.image("dna1", "/assets/dna/1.png");
		this.load.image("dna2", "/assets/dna/2.png");
		this.load.image("dna3", "/assets/dna/3.png");
		this.load.image("dna4", "/assets/dna/4.png");
		this.load.image("dna5", "/assets/dna/5.png");
		this.load.image("dna6", "/assets/dna/6.png");
		this.load.image("dna7", "/assets/dna/7.png");
		this.load.image("dna8", "/assets/dna/8.png");
		this.load.image("dna9", "/assets/dna/9.png");
		this.load.image("dna10", "/assets/dna/10.png");
		this.load.image("dna11", "/assets/dna/11.png");
		this.load.image("dna12", "/assets/dna/12.png");
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
		this.scene.start("Mydeck");
	}
}
