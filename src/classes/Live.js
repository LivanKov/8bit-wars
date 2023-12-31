class Live {
    lives = 3;
    defaultLives = 3;

    constructor(canvasWidth) {
        this.canvasWidth = canvasWidth;
    }

    draw(ctx) {
        const usedLives = this.defaultLives - this.lives;
        for (let i = 1; i <= this.lives; i++) {
            const liveImage = new Image();
            liveImage.src = require('@/assets/images/heart_full.png');
            ctx.drawImage(liveImage, this.canvasWidth - (i * 50), 10, 50, 50);
        }

        for (let i = 1; i <= usedLives; i++) {
            const usedLiveImage = new Image();
            usedLiveImage.src = require('@/assets/images/heart_empty.png');
            ctx.drawImage(usedLiveImage, (i + this.lives) * 50, 10, 50, 50);
        }
    }

    update() {
        this.lives--;
    }
}

export default Live;
