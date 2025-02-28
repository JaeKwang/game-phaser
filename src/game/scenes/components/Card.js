export default class Card extends Phaser.GameObjects.Container {
    constructor(scene, x, y, card) {
        super(scene, x, y);
        
        this.scene = scene;
        this.card = card;

        // 🃏 카드 뒷면 (초기 상태)
        this.cardback = this.scene.add.image(0, 0, "cardback").setScale(1);
        this.cardback.setDisplaySize(300, 450);
        this.add(this.cardback);

        // 🟦 배경 프레임 (앞면, 기본적으로 숨김)
        this.frameBackground = this.scene.add.image(0, 0, "cardframe_1");
        this.frameBackground.setDisplaySize(300, 450);
        this.frameBackground.setVisible(false);
        this.add(this.frameBackground);

        // 🔳 상단 바 (헤더)
        this.topBar = this.scene.add.image(0, -78, "cardtitle_1").setDisplaySize(120, 25);
        this.topBar.setVisible(false); // ❌ 처음에는 보이지 않음
        this.add(this.topBar);

        // 📜 카드 콘텐츠 (중앙)
        this.cardContent = this.scene.add.image(0, 3, "cardcontent").setDisplaySize(115, 115);
        this.cardContent.setVisible(false);
        this.add(this.cardContent);

        // ⭐ 카드 랭크
        this.star = this.scene.add.image(0, -60, `star`).setDisplaySize(120, 12);
        this.star.setVisible(false);
        this.add(this.star);

        // 📜 카드 캐릭터 (중앙)
        this.character = this.scene.add.image(0, 3, `card${this.card.card_id}`).setDisplaySize(110, 110);
        this.character.setVisible(false);
        this.add(this.character);

        // 📜 카드 속성 (중앙)
        this.attrBorder = this.scene.add.image(0, 3, `border${this.card.attribute}`).setDisplaySize(115, 115);
        this.attrBorder.setVisible(false);
        this.add(this.attrBorder);

        // 🔶 하단 바 (버튼)
        this.bottomBar = this.scene.add.image(0, 77, "cardskill_1").setDisplaySize(120, 30);
        this.bottomBar.setVisible(false);
        this.add(this.bottomBar);

        this.scene.add.existing(this);

        // 📌 카드 클릭 시 뒤집기 이벤트 추가
        this.flipCard();
    }

    /** 📌 카드 뒤집기 애니메이션 */
    flipCard() {
        let originalWidth = this.cardback.displayWidth;
        let originalHeight = this.cardback.displayHeight;
        
        this.cardback.setAlpha(0);
        this.cardback.setDisplaySize(0, 0);
        
        this.cardback.x = -300
        this.cardback.y = 300

        this.scene.tweens.add({
            targets: this.cardback,
            x: 0,
            y: 0, // 📌 아래에서 위로 올라오기
            alpha: 1, // 서서히 보이게
            displayWidth: originalWidth, 
            displayHeight: originalHeight, 
            duration: 300, // 이동 속도
            ease: "Power2",
            onComplete: () => this.scene.tweens.add({
                targets: this.cardback,
                scaleX: 0, // 가로 크기를 줄여서 회전하는 느낌
                duration: 100,
                ease: "Linear",
                onComplete: () => {
                    // 🌟 카드 앞면 표시 & 뒷면 숨기기
                    this.cardback.setVisible(false);
                    this.frameBackground.setVisible(true);
                    this.topBar.setVisible(true).setAlpha(0);
                    this.cardContent.setVisible(true).setAlpha(0);
                    this.star.setVisible(true).setAlpha(0);
                    this.character.setVisible(true).setAlpha(0);
                    this.attrBorder.setVisible(true).setAlpha(0);
                    this.bottomBar.setVisible(true).setAlpha(0);

                    // ✅ 크기 유지한 채 부드럽게 펼치는 애니메이션 적용
                    this.frameBackground.displayWidth = 0;
                    this.scene.tweens.add({
                        targets: this.frameBackground,
                        displayWidth: originalWidth, 
                        duration: 100,
                        ease: "Linear",
                        onComplete: () => this.scene.tweens.add({
                            targets: [
                                this.topBar,
                                this.cardContent,
                                this.star,
                                this.character,
                                this.attrBorder,
                                this.bottomBar
                            ],
                            alpha: 1, // 점점 선명하게 보이도록
                            duration: 100,
                            ease: "Linear",
                            onComplete: () => this.flipBackCard()
                        })
                    });
                }
            })
        })
    }

    flipBackCard() {
        let originalWidth = this.frameBackground.displayWidth;

        this.scene.tweens.add({
            targets: [
                this.topBar,
                this.cardContent,
                this.star,
                this.character,
                this.attrBorder,
                this.bottomBar
            ],
            alpha: 0, // 점점 선명하게 보이도록
            duration: 100,
            ease: "Linear",
            onComplete: () => this.scene.tweens.add({
                targets: this.frameBackground,
                scaleX: 0, // 가로 크기를 줄여서 회전하는 느낌
                duration: 100,
                ease: "Linear",
                onComplete: () => {
                    // 🌟 카드 앞면 표시 & 뒷면 숨기기
                    this.cardback.setVisible(true);
                    this.frameBackground.setVisible(false);

                    // ✅ 크기 유지한 채 부드럽게 펼치는 애니메이션 적용
                    this.cardback.displayWidth = 0;
                    this.scene.tweens.add({
                        targets: this.cardback,
                        displayWidth: originalWidth, 
                        duration: 100,
                        ease: "Linear",
                        onComplete: () => this.scene.tweens.add({
                            targets: this.cardback,
                            x: -300,
                            y: 300,
                            alpha: 1, // 서서히 보이게
                            displayWidth: 0, 
                            displayHeight: 0, 
                            duration: 300, // 이동 속도
                            ease: "Power2",
                        })
                    });
                }
            })
        })

    }

}
