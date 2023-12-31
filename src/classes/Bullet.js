import GameObject from "@/classes/GameObject";

class Bullet extends GameObject {
    constructor(xPos, yPos, width, height, color, dy) {
        super(xPos, yPos, width, height, color);

        this.dy = dy;
    }

    update() {
        this.yPos += this.dy;
    }
}

export default Bullet;
