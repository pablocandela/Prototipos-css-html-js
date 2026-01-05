import Sprite from "./Sprite.js";

export default class Player {
    constructor(x, y, width, heigth, image, Nframes, speed) {
        // Posición x, y del personaje.
        this.x = x;
        this.y = y;
        this.speed = speed; // Velocidad de movimiento del personaje.

        this.facing = "right"; // Dirección a donde ve el personaje.

        this.sprite = new Sprite(
            image, // La imagen del frame.
            width, // Ancho de cada frame.
            heigth, // Alto de cada frame.
            Array.from({ length: Nframes }, (_, index) => index),  // Frames de caminar a la derecha [1,2,3,4,5,..,n].
            0.12
        );
    }

    // Actualiza el estado del personaje con el input del usuario.
    update(dt, input) {
        let moving = false;

        if (input.right) {
            this.x += this.speed * dt / 1000;
            this.facing = "right";
            moving = true;
        }

        if (input.left) {
            this.x -= this.speed * dt / 1000;
            this.facing = "left";
            moving = true;
        }

        if (input.up) {
            this.y -= this.speed * dt / 1000;
            this.facing = this.facing == "left" ? "left" : "rigth";
            moving = true;
        }

        if (input.down) {
            this.y += this.speed * dt / 1000;
            this.facing = this.facing == "left" ? "left" : "rigth";
            moving = true;
        }

        // Si se detecta un input se actualiza el sprite, en caso contrario se queda estatico (En el frame 0 del sprite).
        if (moving) {
            this.sprite.update(dt);
        } else {
            this.sprite.frame = 0;
        }
    }

    draw(ctx) {
        const flip = this.facing === "left";
        this.sprite.draw(ctx, this.x, this.y, flip);
    }
}
