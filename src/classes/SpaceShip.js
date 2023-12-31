import GameObject from "@/classes/GameObject";
import Bullet from "@/classes/Bullet";

class SpaceShip extends GameObject {
    bulletWidth = 4;
    bulletHeight = 8;
    bulletColor = '#ff7800';
    bullets = [];

    constructor(xPos, yPos, width, height, color, isPlayer, canvasHeight) {
        super(xPos, yPos, width, height, color);

        this.isPlayer = isPlayer;
        this.canvasHeight = canvasHeight;
    }

    draw(ctx) {
        const shipImg = new Image();
        if (this.isPlayer) {
            shipImg.src = require('@/assets/images/spaceship.png');
        } else {
            shipImg.src = require('@/assets/images/spaceship_2.png');
        }
        ctx.drawImage(shipImg, this.xPos, this.yPos, this.width, this.height);

        this.bullets.forEach((bullet, index) => {
            bullet.draw(ctx);
            bullet.update(0, 0);

            if (bullet.yPos < 0 || bullet.yPos > this.canvasHeight) {
                this.bullets.splice(index, 1);
            }
        })
    }

    shoot(dy) {
        this.bullets.push(new Bullet(
            this.xPos + this.width / 2 - this.bulletWidth / 2,
            this.yPos - this.bulletHeight,
            this.bulletWidth,
            this.bulletHeight,
            this.bulletColor,
            dy
        ));
    }
}

export default SpaceShip;
