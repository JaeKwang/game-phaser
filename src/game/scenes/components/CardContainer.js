import CardThumbnail from "./CardThumbnail.js"; // 🌟 빛나는 카드 가져오기

export default class CardContainer extends Phaser.GameObjects.Container {
    constructor(scene, x, y, cardSpacing = 120) {
        super(scene, x, y);

        this.cards = [];
        
        this.scene = scene;
        this.cardSpacing = cardSpacing;
        this.scrollSpeed = 0;
        this.isDragging = false;
        this.startX = 0;
        this.sortDescending = false; // 🔄 정렬 방식 (기본값: 오름차순)

        this.loadUserDecks();

        this.scene.input.on("pointerdown", (pointer) => {
            this.isDragging = true;
            this.startX = pointer.x;
            this.scrollSpeed = 0;
        });

        this.scene.input.on("pointermove", (pointer) => {
            if (this.isDragging) {
                let deltaX = pointer.x - this.startX;
                this.startX = pointer.x;
                this.x += deltaX;
                this.scrollSpeed = deltaX;
            }
        });

        this.scene.input.on("pointerup", () => {
            this.isDragging = false;
        });

        this.scene.events.on("update", this.updateScroll, this);
        this.scene.add.existing(this);
    }

    /** 📌 정렬 변경 및 카드 재정렬 */
    toggleSortOrder() {
        this.sortDescending = !this.sortDescending; // 🔄 오름차순 ↔ 내림차순 토글
        this.loadUserDecks(); // 카드 재정렬
    }

    /** 📌 유저 덱 로드 및 카드 정렬 */
    loadUserDecks() {
        const userDecks = this.scene.registry.get("userDecks") || [];

        // 🔥 정렬 방식 결정 (내림차순이면 b - a, 오름차순이면 a - b)
        this.userDecks = userDecks.sort((a, b) => {
            let sortFactor = this.sortDescending ? -1 : 1;

            if (b.rank !== a.rank) return (b.rank - a.rank) * sortFactor;  // 1️⃣ 등급 정렬
            if (b.level !== a.level) return (b.level - a.level) * sortFactor; // 2️⃣ 레벨 정렬
            if (b.attribute !== a.attribute) return a.attribute - b.attribute;
            if (b.card_id !== a.card_id) return a.card_id - b.card_id;
        });

        this.totalCards = this.userDecks.length;
        this.createCards(); // 카드 재생성
    }

    /** 📌 카드 생성 */
    createCards() {
        // 기존 카드 삭제
        this.cards.forEach(card => card.destroy());

        // 새 카드 추가
        for (let i = 0; i < this.totalCards; i++) {
            let x = i * this.cardSpacing;
            let card = new CardThumbnail(this.scene, x, 0, this.userDecks[i]);

            card.setInteractive(); // 🔹 카드 클릭 가능하게 설정
            card.on("pointerup", () => this.selectCard(card, this.userDecks[i])); // 클릭 이벤트
            this.cards.push(card);
            this.add(card);

            if(i == 0) this.selectCard(card, this.userDecks[i]);
        }

        this.x = this.cardSpacing / 2;
    }

    /** 📌 카드 선택 시 하이라이트 & 데이터 전달 */
    selectCard(card, cardData) {
        if(this.scrollSpeed != 0) return;

        // 이전 선택된 카드 하이라이트 제거
        if (this.selectedCard) {
            this.selectedCard.clearHighlight();
        }

        // ✅ 새 카드 선택 시 테두리 강조
        card.highlightBorder(0xffff00, 5); // 노란색 테두리 추가
        this.selectedCard = card;

        // 부모 씬에 카드 데이터 전달
        this.scene.events.emit("mydeck-selected", cardData);
    }

    /** 📌 스크롤 처리 */
    updateScroll() {
        if (!this.isDragging) {
            this.scrollSpeed *= 0.95;
            if (Math.abs(this.scrollSpeed) < 0.5) {
                this.scrollSpeed = 0;
            }
            this.x += this.scrollSpeed;
        }
        this.limitScroll();
    }

    /** 📌 스크롤 제한 */
    limitScroll() {
        let minX = - (this.totalCards) * (this.cardSpacing / 2);
        let maxX = this.cardSpacing / 2;

        if (this.x < minX) {
            this.x = minX;
            this.scrollSpeed = 0;
        }
        if (this.x > maxX) {
            this.x = maxX;
            this.scrollSpeed = 0;
        }
    }
}
