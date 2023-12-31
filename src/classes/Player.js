import SpaceShip from "@/classes/SpaceShip";

class Player extends SpaceShip {
    constructor(xPos, yPos, width, height, color, canvasHeight, canvasWidth) {
        super(xPos, yPos, width, height, color, true, canvasHeight);
        this.canvasWidth = canvasWidth;
    }

    update(dx, dy) {
        super.update(dx, dy);

        if (this.xPos < 0) {
            this.xPos = 0;
        } else if (this.xPos + this.width > this.canvasWidth) {
            this.xPos = this.canvasWidth - this.width;
        }
    }
}

export default Player;
