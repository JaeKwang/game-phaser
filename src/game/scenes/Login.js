
// You can write more code here

/* START OF COMPILED CODE */

export default class Login extends Phaser.Scene {
	
	constructor() {
		super("Login");
	}

	/** @returns {void} */
	editorCreate() {
		this.backgroundMusic = this.sound.add('login_bgm', {
            loop: true,  // 음악이 계속 반복되도록 설정
            volume: 0.1  // 볼륨 조절 (0.0 ~ 1.0)
        });

        // 음악 재생
        this.backgroundMusic.play();

		// login_bg
		const login_bg = this.add.image(639, 362, "login_bg");
		login_bg.scaleX = 0.36752881916878155;
		login_bg.scaleY = 0.36752881916878155;
		login_bg.setInteractive();

		// bestwallet
		const bestwallet = this.add.image(640, 530, "bestwallet");
		bestwallet.scaleX = 0.7606962621056914;
		bestwallet.scaleY = 0.7606962621056914;
		bestwallet.setInteractive();

		// blofin
		const blofin = this.add.image(640, 420, "blofin");
		blofin.scaleX = 0.7606962621056914;
		blofin.scaleY = 0.7606962621056914;
		blofin.setInteractive();

		// coinbase
		const coinbase = this.add.image(640, 200, "coinbase");
		coinbase.scaleX = 0.7606962621056914;
		coinbase.scaleY = 0.7606962621056914;
		coinbase.setInteractive();

		// gestlogin
		const gestlogin = this.add.image(640, 640, "gestlogin");
		gestlogin.scaleX = 0.7606962621056914;
		gestlogin.scaleY = 0.7606962621056914;
		gestlogin.setInteractive();

		// margex
		const margex = this.add.image(640, 310, "margex");
		margex.scaleX = 0.7606962621056914;
		margex.scaleY = 0.7606962621056914;
		margex.setInteractive();

		// metamask
		const metamask = this.add.image(640, 90, "metamask");
		metamask.scaleX = 0.7606962621056914;
		metamask.scaleY = 0.7606962621056914;
		metamask.setInteractive();

		this.events.emit("scene-awake");

		// 마우스 오버
		bestwallet.on('pointerover', () => bestwallet.setScale(0.8));
		bestwallet.on('pointerout', () => bestwallet.setScale(0.7606962621056914));
		blofin.on('pointerover', () => blofin.setScale(0.8));
		blofin.on('pointerout', () => blofin.setScale(0.7606962621056914));
		coinbase.on('pointerover', () => coinbase.setScale(0.8));
		coinbase.on('pointerout', () => coinbase.setScale(0.7606962621056914));
		gestlogin.on('pointerover', () => gestlogin.setScale(0.8));
		gestlogin.on('pointerout', () => gestlogin.setScale(0.7606962621056914));
		margex.on('pointerover', () => margex.setScale(0.8));
		margex.on('pointerout', () => margex.setScale(0.7606962621056914));
		metamask.on('pointerover', () => metamask.setScale(0.8));
		metamask.on('pointerout', () => metamask.setScale(0.7606962621056914));
		
		
		gestlogin.on('pointerdown', () => {
            this.startGuestLogin();
        });

	}

	create() {
		this.editorCreate();
	}

	startGuestLogin() {
        console.log("Guest Login 진행 중...");
        // 🔹 로그인 처리 로직 추가 (예: API 요청, 씬 전환 등)
        this.scene.start("Loading"); // 로그인 후 MainMenu 씬으로 이동 (예제)
    }
}

