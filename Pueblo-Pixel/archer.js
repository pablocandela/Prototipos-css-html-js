import Sprite from "./Sprite.js";

export default class Archer {
    constructor(x, y, width, heigth, idleImage, NframesIdle) {
        // Posición x, y del arquero.
        this.x = x;
        this.y = y;
        this.facing = "left"; // Dirección a donde ve el arquero.
        this.timeSleep = 0;

        this.idleSprite = new Sprite(
            idleImage, // La imagen del frame.
            width, // Ancho de cada frame.
            heigth, // Alto de cada frame.
            Array.from({ length: NframesIdle }, (_, index) => index),  // Frames de caminar a la derecha [1,2,3,4,5,..,n].
            GameEngine.Utils.getRandomDecimalInRange(0.12, 0.25)
        );
    }

    // Actualiza el estado del personaje con el input del usuario.
    update(dt) {
        this.timeSleep = this.timeSleep + dt / 1000;
        if (this.timeSleep > 3) {
            this.facing = GameEngine.Utils.getRandomDecimalInRange(0.0, 1.0) > 0.5 ? "right" : "left";
            this.timeSleep = 0;
        }
        this.idleSprite.update(dt);
    }

    // Dependiendo del estado decide que animación dibujar.
    draw(ctx) {
        const flip = this.facing === "left";
        this.idleSprite.draw(ctx, this.x, this.y, flip);
    }
}
