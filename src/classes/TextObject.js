class TextObject {
    constructor(xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
    }

    draw(ctx, value) {
        ctx.font = '48px PressStart';
        ctx.fillText(value, this.xPos, this.yPos);
    }
}

export default TextObject;
