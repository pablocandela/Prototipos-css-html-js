import Sprite from "./Sprite.js";

export default class Tree {
    constructor(x, y, width, heigth, image, Nframes) {
        // Posición x, y del árbol.
        this.x = x;
        this.y = y;

        this.sprite = new Sprite(
            image, // La imagen del frame.
            width, // Ancho de cada frame.
            heigth, // Alto de cada frame.
            Array.from({ length: Nframes }, (_, index) => index), // Frames de animación del arbol [0,1,2,3,..,n].
           GameEngine.Utils.getRandomDecimalInRange(0.12, 0.25)
        );
    }

    // Actualiza el estado del personaje con el input del usuario.
    update(dt) {
        this.sprite.update(dt);
    }

    draw(ctx) {
        this.sprite.draw(ctx, this.x, this.y, false);
    }
}
