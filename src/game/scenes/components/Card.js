export default class Card extends Phaser.GameObjects.Container {
    constructor(scene, x, y, card) {
        super(scene, x, y);
        
        this.scene = scene;
        this.card = card;
        this.width = 300;
        this.height = 450;
        this.pos_x = -50;
        this.pos_y = -40;

        // 🃏 카드 뒷면 (초기 상태)
        this.cardback = this.scene.add.image(0, 0, "cardback").setScale(1);
        this.cardback.setDisplaySize(this.width, this.height);
        this.add(this.cardback);

        // 🟦 배경 프레임 (앞면, 기본적으로 숨김)
        this.frameBackground = this.scene.add.image(this.pos_x, this.pos_y, "cardframe_1");
        this.frameBackground.setDisplaySize(this.width, this.height);
        this.frameBackground.setVisible(false);
        this.add(this.frameBackground);

        // 🔳 상단 바 (헤더)
        this.topBar = this.scene.add.image(this.pos_x, this.pos_y - 180, "cardtitle_1").setDisplaySize(this.width * 0.9, this.height * 0.15);
        this.topBar.setVisible(false); // ❌ 처음에는 보이지 않음
        this.add(this.topBar);

        // 레벨 배경
        this.level_bg = this.scene.add.image(this.pos_x - this.width * 0.35+2, this.pos_y - 182, "cell").setDisplaySize(50, 50);
        this.level_bg.setVisible(false); // ❌ 처음에는 보이지 않음
        this.add(this.level_bg);

        //  카드 레벨
        this.level = new Phaser.GameObjects.Text(this.scene, this.pos_x - this.width * 0.40, this.pos_y - 200, this.card.level, {
            fontFamily: "Comic Sans MS, Arial, sans-serif", // 👉 개성 있는 폰트
            fontSize: "24px",
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
            align: "center",
        });
        this.level.setVisible(false);
        this.add(this.level);

        //  카드 이름
        this.name = new Phaser.GameObjects.Text(this.scene, this.pos_x - this.width * 0.25, this.pos_y - 200, this.card.name, {
            fontFamily: "Comic Sans MS, Arial, sans-serif", // 👉 개성 있는 폰트
            fontSize: "24px",
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
            align: "left",
        });
        this.name.setVisible(false);
        this.add(this.name);

        // 성장 타입
		this.growthType = this.scene.add.image(this.pos_x + this.width * 0.35 -2, this.pos_y - 182, `dna${this.card.growthType}`).setDisplaySize(40, 40);
        this.growthType.setVisible(false);
        this.add(this.growthType);

        // 📜 카드 콘텐츠 (중앙)
        this.cardContent = this.scene.add.image(this.pos_x, this.pos_y - 3, "cardcontent").setDisplaySize(this.width * 0.85, this.width * 0.85);
        this.cardContent.setVisible(false);
        this.add(this.cardContent);

        // ⭐ 카드 랭크
        this.stars = []; // ⭐ 별 배열 생성
        let starCount = 6; // 최대 별 개수
        let startX = this.pos_x + this.width * 0.35; // 첫 번째 별의 x 좌표
        let startY = this.pos_y - 140; // 별들의 y 좌표
        let gap = -20; // 별 간 간격

        for (let i = 0; i < starCount; i++) {
            const star = this.scene.add.image(startX + gap * i, startY, `star`).setDisplaySize(20, 20);
            star.setVisible(false);
            this.stars.push(star); // 배열에 추가
            this.add(star);
        }

        // 📜 카드 캐릭터 (중앙)
        this.character = this.scene.add.image(this.pos_x, this.pos_y - 5, `card${this.card.card_id}`).setDisplaySize(this.width * 0.8, this.width * 0.8);
        this.character.setVisible(false);
        this.add(this.character);

        // 📜 카드 속성 (중앙)
        this.attrBorder = this.scene.add.image(this.pos_x, this.pos_y - 3, `border${this.card.attribute}`).setDisplaySize(this.width * 0.85, this.width * 0.85);
        this.attrBorder.setVisible(false);
        this.add(this.attrBorder);

        // 종족
        this.tribes = []; 
        startX = this.pos_x + this.width * 0.34; // 첫 번째 별의 x 좌표
        startY = this.pos_y - 110; // 별들의 y 좌표
        gap = -40; // 별 간 간격

        for (let i = 0; i < card.tribes.length; i++) {
            const tribe = this.scene.add.image(startX + gap * i, startY, `tribe${card.tribes[i]}`).setDisplaySize(40, 40);
            tribe.setVisible(false);
            this.tribes.push(tribe);
            this.add(tribe);
        }

        // 🔶 하단 바 (버튼)
        this.bottomBar = this.scene.add.image(this.pos_x, this.pos_y + 170, "cardskill_1").setDisplaySize(this.width * 0.9, 70);
        this.bottomBar.setVisible(false);
        this.add(this.bottomBar);

        // ✨ **홀로그램 쉐이더 적용**
        this.shaderEffect = this.scene.add.shader('holoShader', this.pos_x, this.pos_y, this.width, this.height);
        this.shaderEffect.setAlpha(0.1);
        this.shaderEffect.setVisible(false); // 초기에는 보이지 않게 설정
        this.add(this.shaderEffect);

        this.scene.add.existing(this);

        // 🖱️ 마우스 움직임 감지
        this.scene.input.on('pointermove', (pointer) => {
            let mx = pointer.x / this.scene.sys.game.config.width; // 0~1 값으로 변환
            let my = 1.0 - pointer.y / this.scene.sys.game.config.height; // y축 반전
            this.shaderEffect.setUniform('mouse', [mx, my]); // GLSL 유니폼 값 업데이트
        });
        
        this.updateCardUI();

        this.flipCard();
    }

    setCardData(cardData) {
        if (!cardData) return;

        if(this.card.id === cardData.id) return;

        this.card = cardData; // 카드 데이터 업데이트
        
        // 기존 애니메이션이 진행 중이라면 UI만 업데이트
        if (
            this.scene.tweens.isTweening(this.cardback) || 
            this.scene.tweens.isTweening(this.frameBackground)
        )
            this.updateCardUI();
        else {
            // 기존 카드 뒤집기 → 새 카드 데이터 적용 → 다시 뒤집기
            this.flipBackCard(() => {
                this.updateCardUI();
                this.flipCard();
            });
        }
    }
 
    updateCardUI() {
        if (!this.card) return;

        // 카드 이미지 변경 (새로운 카드 ID 반영)
        this.character.setTexture(`card${this.card.card_id}`);
        this.attrBorder.setTexture(`border${this.card.attribute}`);
        this.growthType.setTexture(`dna${this.card.growthType}`);

        // 종족 태그
        let startX = this.pos_x + this.width * 0.34;
        let startY = this.pos_y - 110;
        let gap = -40;
        this.tribes.map((v) => v.destroy());
        for (let i = 0; i < this.card.tribes.length; i++) {
            const tribe = this.scene.add.image(startX + gap * i, startY, `tribe${this.card.tribes[i]}`).setDisplaySize(40, 40);
            tribe.setVisible(false);
            this.tribes.push(tribe);
            this.add(tribe);
        }

        this.level.setText(this.card.level);
        if(this.card.level < 10) this.level.setOrigin(-0.5, 0);
        else this.level.setOrigin(0, 0);
        
        this.name.setText(this.card.name);
        if (this.name.width > 150) {
            let scaleFactor = 150 / this.name.width;
            this.name.setScale(scaleFactor); // 텍스트 크기 자동 조절
            this.name.setOrigin(0, -scaleFactor * 2);
        } else {
            this.name.setScale(1);
            this.name.setOrigin(0, 0);
        }
    }

    /** 📌 카드 뒤집기 애니메이션 */
    flipCard(callback) {        
        this.cardback.setVisible(true);
        this.cardback.setAlpha(0);
        this.cardback.setDisplaySize(0, 0);
        
        this.cardback.x = -300;
        this.cardback.y = 300;

        this.scene.tweens.add({
            targets: this.cardback,
            x: this.frameBackground.x,
            y: this.frameBackground.y, // 📌 아래에서 위로 올라오기
            alpha: 1, // 서서히 보이게
            displayWidth: this.width, 
            displayHeight: this.height, 
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
                    this.stars.map((v) => v.setVisible(true).setAlpha(0));
                    this.character.setVisible(true).setAlpha(0);
                    this.attrBorder.setVisible(true).setAlpha(0);
                    this.bottomBar.setVisible(true).setAlpha(0);
                    this.tribes.map((v) => v.setVisible(true).setAlpha(0));
                    this.growthType.setVisible(true).setAlpha(0);
                    this.level.setVisible(true).setAlpha(0);
                    this.level_bg.setVisible(true).setAlpha(0);
                    this.name.setVisible(true).setAlpha(0);


                    // ✅ 크기 유지한 채 부드럽게 펼치는 애니메이션 적용
                    this.frameBackground.displayWidth = 0;
                    this.scene.tweens.add({
                        targets: this.frameBackground,
                        displayWidth: this.width, 
                        duration: 100,
                        ease: "Linear",
                        onComplete: () => this.scene.tweens.add({
                            targets: [
                                this.topBar,
                                this.cardContent,
                                ...this.stars.slice(0, this.card.rank),
                                this.character,
                                this.attrBorder,
                                this.bottomBar,
                                this.shaderEffect,
                                ...this.tribes.slice(0, this.tribes.length),
                                this.growthType,
                                this.level,
                                this.level_bg,
                                this.name,
                            ],
                            alpha: 1, // 점점 선명하게 보이도록
                            duration: 100,
                            ease: "Linear",
                            onComplete: () => {
                                this.shaderEffect.setVisible(true);
                                if (callback) callback(); // ✅ flipCard() 실행
                            }
                        })
                    });
                }
            })
        })
    }

    flipBackCard(callback) {
        this.shaderEffect.setVisible(false);

        this.scene.tweens.add({
            targets: [
                this.topBar,
                this.cardContent,
                ...this.stars.slice(0, 5),
                this.character,
                this.attrBorder,
                this.bottomBar,
                ...this.tribes.slice(0, this.tribes.length),
                this.growthType,
                this.level,
                this.level_bg,
                this.name,
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
                        displayWidth: this.width, 
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
                            onComplete: () => {
                                if (callback) callback(); // ✅ flipCard() 실행
                            }
                        })
                    });
                }
            })
        })
    }
}
