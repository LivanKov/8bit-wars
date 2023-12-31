class GameObject {
    constructor(xPos, yPos, width, height, color) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    }

    update(dx, dy) {
        this.xPos += dx;
        this.yPos += dy;
    }

    collidesWith(gameObject) {
        return (
            this.xPos < gameObject.xPos + gameObject.width &&
            this.xPos + this.width > gameObject.xPos &&
            this.yPos < gameObject.yPos + gameObject.height &&
            this.yPos + this.height > gameObject.yPos
        )
    }
}

export default GameObject;
