import Sprite from "./sprite.js";

export default class Player {
    constructor(x, y, width, heigth, idleImage, runImage, NframesIdle, NframesRun, speed) {
        // Posición x, y del personaje.
        this.x = x;
        this.y = y;
        this.speed = speed; // Velocidad de movimiento del personaje.
        this.moving = false;
        this.facing = "right"; // Dirección a donde ve el personaje.

        this.runSprite = new Sprite(
            runImage, // La imagen del frame.
            width, // Ancho de cada frame.
            heigth, // Alto de cada frame.
            Array.from({ length: NframesRun }, (_, index) => index),  // Frames de caminar a la derecha [1,2,3,4,5,..,n].
            0.12
        );

        this.idleSprite = new Sprite(
            idleImage, // La imagen del frame.
            width, // Ancho de cada frame.
            heigth, // Alto de cada frame.
            Array.from({ length: NframesIdle }, (_, index) => index),  // Frames de caminar a la derecha [1,2,3,4,5,..,n].
            0.12
        );
    }

    // Actualiza el estado del personaje con el input del usuario.
    update(dt, input) {
        this.moving = false;

        if (input.right) {
            this.x += this.speed * dt / 1000;
            this.facing = "right";
            this.moving = true;
        }

        if (input.left) {
            this.x -= this.speed * dt / 1000;
            this.facing = "left";
            this.moving = true;
        }

        if (input.up) {
            this.y -= this.speed * dt / 1000;
            this.moving = true;
        }

        if (input.down) {
            this.y += this.speed * dt / 1000;
            this.moving = true;
        }

        // Si se detecta un input se actualiza el sprite, en caso contrario se queda estatico (En el frame 0 del sprite).
        if (this.moving) {
            this.runSprite.update(dt);
        } else {
            this.idleSprite.update(dt);
        }
    }

    // Dependiendo del estado decide que animación dibujar.
    draw(ctx) {
        const flip = this.facing === "left";
        if (this.moving) {
            this.runSprite.draw(ctx, this.x, this.y, flip);
        } else {
            this.idleSprite.draw(ctx, this.x, this.y, flip);
        }
    }
}
