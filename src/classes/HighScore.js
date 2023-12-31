import TextObject from "@/classes/TextObject";

class HighScore extends TextObject {
    value = 0;
    constructor() {
        super(10, 50);
    }

    draw(ctx) {
        super.draw(ctx, this.value);
    }

    update(dValue) {
        this.value += dValue;
    }
}

export default HighScore;
