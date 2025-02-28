export default class CardThumbnail extends Phaser.GameObjects.Container {
    constructor(scene, x, y, card) {
        super(scene, x, y);

        this.scene = scene;
        this.card = card;

        // 📜 카드 콘텐츠 (중앙)
        this.cardContent = this.scene.add.image(0, 3, `background${this.card.attribute}`);
        this.cardContent.setDisplaySize(115, 115);
        this.add(this.cardContent);

        // 📜 카드 캐릭터 (중앙)
        this.attrBorder = this.scene.add.image(0, 3, `card${this.card.card_id}`);
        this.attrBorder.setDisplaySize(110, 110);
        this.add(this.attrBorder);

        // ⭐ 카드 랭크
        for(var i = 0; i < this.card.rank; i++) {
            const star = this.scene.add.image(-40 + i*10, -40, `star`);
            star.setDisplaySize(20, 20);
            this.add(star);
        }

        // 🔥 쌈뽕한 텍스트 추가
        const text = new Phaser.GameObjects.Text(this.scene, 45, 40, this.card.level, {
            fontFamily: "Comic Sans MS, Arial, sans-serif", // 👉 개성 있는 폰트
            fontSize: "30px",
            color: "#ffffff", // 👉 강렬한 레드 컬러
            stroke: "#000000", // 👉 검은색 외곽선
            strokeThickness: 4, // 👉 외곽선 두께
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: "#000000",
                blur: 5,
                stroke: true,
                fill: true,
            },
            align: "right",
        });

        // 🌈 텍스트 그라데이션 적용
        const gradient = text.context.createLinearGradient(0, 0, 0, text.height);
        gradient.addColorStop(0, "#ffffff");
        gradient.addColorStop(1, "#555555");

        text.setFill(gradient); // 적용!

        // 🌟 텍스트 중앙 정렬 및 크기 조정
        text.setOrigin(1, 0.5);
        text.setScale(0.8); // 크기를 조금 줄임

        // 🌟 텍스트를 Container에 추가
        this.add(text);

        // 🔥 빛나는 효과 (Tween)
        this.scene.tweens.add({
            targets: this.bottomBar,
            alpha: { from: 0.8, to: 1 },
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut",
        });

        // 🌟 테두리용 Graphics 추가 (기본적으로 투명)
        this.border = this.scene.add.graphics();
        this.add(this.border);

        this.scene.add.existing(this);

        // 🌟 상호작용 가능하게 설정
        this.setSize(this.cardContent.displayWidth, this.cardContent.displayHeight);
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.cardContent.displayWidth, this.cardContent.displayHeight), Phaser.Geom.Rectangle.Contains);
    }

     /** 📌 카드 선택 시 테두리 강조 */
    highlightBorder(color = 0xffff00, thickness = 5) {
        this.border.clear(); // 기존 테두리 제거
        this.border.lineStyle(thickness, color, 1); // 테두리 색상 및 두께 설정
        this.border.strokeRect(-this.cardContent.displayWidth / 2, -this.cardContent.displayHeight / 2, this.cardContent.displayWidth, this.cardContent.displayHeight);
    }

    /** 📌 카드 선택 해제 시 테두리 제거 */
    clearHighlight() {
        this.border.clear();
    }
}
