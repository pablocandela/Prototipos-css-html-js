import Map from "./map.js";
import { Input } from "./Input.js";
import Player from "./player.js";
import Tree from "./tree.js";

// Espera a qye todo cargue.
window.onload = async function () {
    // Se inicializa el motor.
    const ctx = GameEngine.init('mainCanvas');

    const playerImage = new Image();
    playerImage.src = "assets/Warrior_Run.png";
    await playerImage.decode();
    const player = new Player(100, 100, 192, 192, playerImage, 6, 120);

    const treeArray = await initializeTrees();

    // Cargamos el mapa (para este casó se exportó de la herramienta Tiled).
    await Map.load('maps/map.json');

    // Funcion que indica que se actualiza en cada ciclo.
    function update(dt) {
        player.update(dt, Input);
        treeArray.forEach(tree => {
            tree.update(dt);
        });
    }

    // Funcion que indica que se dibuja en cada ciclo.
    function render(ctx) {
        // Se limpia el canvas.
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.restore();

        // Dibujamos el mapa.
        Map.render(ctx);

        // Dibujamos al personaje del jugador.
        player.draw(ctx);

        //Dibujamos los árboles.
        treeArray.forEach(tree => {
            tree.draw(ctx);
        });

    }

    // Se incia el motor, se le pasan las funciones de actualización y dibujado.
    GameEngine.start(update, render);
};


// Se inicializan todos los arboles del mapa.
async function initializeTrees() {
    const treeImage1 = new Image();
    treeImage1.src = "assets/Tree1.png";
    await treeImage1.decode();
    const treeImage2 = new Image();
    treeImage2.src = "assets/Tree2.png";
    await treeImage2.decode();
    const treeImage3 = new Image();
    treeImage3.src = "assets/Tree3.png";
    await treeImage3.decode();
    const treeImage4 = new Image();
    treeImage4.src = "assets/Tree4.png";
    await treeImage4.decode();

    var treeArray = [];
    treeArray.push(new Tree(640, 10, 192, 256, treeImage1, 6));
    treeArray.push(new Tree(100, 270, 192, 256, treeImage2, 6));
    treeArray.push(new Tree(320, 150, 192, 192, treeImage3, 6));
    treeArray.push(new Tree(800, 350, 192, 192, treeImage3, 6));
    treeArray.push(new Tree(450, -40, 192, 192, treeImage4, 6));

    return treeArray;
}   