import Map from "./map.js";
import { Input } from "./Input.js";
import Player from "./player.js";
// Espera a qye todo cargue.
window.onload = async function () {
    // Se inicializa el motor.
    const ctx = GameEngine.init('mainCanvas');

    const playerImage = new Image();
    playerImage.src = "assets/Warrior_Run.png";

    await playerImage.decode();

    const player = new Player(100, 100, playerImage);

    // Cargamos el mapa (para este casó se exportó de la herramienta Tiled).
    await Map.load('maps/map.json');

    // Funcion que indica que se actualiza en cada ciclo.
    function update(dt) {
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

        

        // Dibujamos al personaje del jugador.
        player.draw(ctx);
    }

    // Se incia el motor, se le pasan las funciones de actualización y dibujado.
    GameEngine.start(update, render);
};