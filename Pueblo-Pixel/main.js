import Map from "./map.js";
import { Input } from "./Input.js";
import Player from "./player.js";
import Tree from "./tree.js";
import Archer from "./archer.js";

// Espera a qye todo cargue.
window.onload = async function () {
    // Se inicializa el motor.
    const ctx = GameEngine.init('mainCanvas');

    const treeArray = await initializeTrees();
    const archerArray = await initializeArchers();
    const player = await initializePlayer();

    // Cargamos el mapa (para este casó se exportó de la herramienta Tiled).
    await Map.load('maps/map.json');

    // Funcion que indica que se actualiza en cada ciclo.
    function update(dt) {
        treeArray.forEach(tree => {
            tree.update(dt);
        });

        archerArray.forEach(archer => {
            archer.update(dt);
        });

        player.update(dt, Input);
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

        //Dibujamos los árboles.
        treeArray.forEach(tree => {
            tree.draw(ctx);
        });

        archerArray.forEach(archer => {
            archer.draw(ctx);
        });

        // Dibujamos al personaje del jugador.
        player.draw(ctx);


    }

    // Se incia el motor, se le pasan las funciones de actualización y dibujado.
    GameEngine.start(update, render);
};

// Se inicializan el personaje principal.
async function initializePlayer() {
    const idleImage = await loadImage("assets/Warrior_Idle.png");
    const runImage = await loadImage("assets/Warrior_Run.png");
    return new Player(100, 100, 192, 192, idleImage, runImage, 8, 6, 120);
}

// Se inicializan el personaje principal.
async function initializeArchers() {
    const idleImage = await loadImage("assets/Archer_Idle.png");

    var archerArray = [];
    archerArray.push(new Archer(-30, 300, 192, 192, idleImage, 6));

    return archerArray;
}


// Se inicializan todos los arboles del mapa.
async function initializeTrees() {
    const treeImage1 = await loadImage("assets/Tree1.png");
    const treeImage2 = await loadImage("assets/Tree2.png");
    const treeImage3 = await loadImage("assets/Tree3.png");
    const treeImage4 = await loadImage("assets/Tree4.png");

    var treeArray = [];
    treeArray.push(new Tree(640, 10, 192, 256, treeImage1, 6));
    treeArray.push(new Tree(100, 270, 192, 256, treeImage2, 6));
    treeArray.push(new Tree(320, 150, 192, 192, treeImage3, 6));
    treeArray.push(new Tree(800, 350, 192, 192, treeImage3, 6));
    treeArray.push(new Tree(450, -40, 192, 192, treeImage4, 6));

    return treeArray;
}


async function loadImage(path) {
    const img = new Image();
    img.src = path;
    await img.decode();
    return img;
}
