
// You can write more code here

/* START OF COMPILED CODE */

export default class Main extends Phaser.Scene {

	constructor() {
		super("Main");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// lobby_bg
		const lobby_bg = this.add.image(641, 361, "lobby_bg");
		lobby_bg.scaleX = 0.7737560154262262;
		lobby_bg.scaleY = 0.7737560154262262;

		// card_button
		const card_button = this.add.image(660, 553, "card_button");
		card_button.scaleX = 2.0470160929258334;
		card_button.scaleY = 2.0470160929258334;
		card_button.setInteractive();

		this.events.emit("scene-awake");

		card_button.on('pointerdown', () => {
            this.scene.start("Mydeck");
        });
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
