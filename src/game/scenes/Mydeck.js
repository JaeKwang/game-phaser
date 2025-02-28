import CardContainer from "./components/CardContainer.js";
import Card from "./components/Card.js";

export default class Mydeck extends Phaser.Scene {

	constructor() {
		super("Mydeck");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// background
		const background = this.add.image(640, 362, "background");
		background.scaleX = 1.7378593953254595;
		background.scaleY = 1.7378593953254595;

		// simple_bar
		const simple_bar = this.add.image(640, 41, "simple_bar");
		simple_bar.scaleX = 1.7176920955532815;
		simple_bar.scaleY = 1.7176920955532815;

		// close_hover
		const close_hover = this.add.image(1232, 33, "close_hover");
		close_hover.scaleX = 0.75;
		close_hover.scaleY = 0.75;
		close_hover.setInteractive();
		close_hover.setVisible(false);

		// close
		const close = this.add.image(1232, 33, "close");
		close.scaleX = 0.75;
		close.scaleY = 0.75;
		close.setInteractive();

		this.events.emit("scene-awake");

		close.on("pointerover", () => {
			close.setVisible(false);
			close_hover.setVisible(true);
		});
		close_hover.on("pointerout", () => {
			close_hover.setVisible(false);
			close.setVisible(true);
		});
		
		
		close_hover.on('pointerdown', () => {
            this.scene.start("Main");
        });
	}
	create() {
		this.events.on("mydeck-selected", (cardData) => {
			this.selectCard = cardData;
		});

		this.editorCreate();
        
        // 🎴 카드 스크롤 리스트
        this.cardScroll = new CardContainer(this, this.cameras.main.width / 2, this.cameras.main.height - 100);
		
		// sort button
		const close1 = this.add.image(this.cameras.main.width -50, this.cameras.main.height - 100, "close");
		close1.setInteractive();
		close1.on('pointerdown', () => this.cardScroll.toggleSortOrder());

		// 🎴 카드 추가
		this.card = new Card(this, this.cameras.main.width / 4, this.cameras.main.height / 2, this.selectCard);
    }
}
