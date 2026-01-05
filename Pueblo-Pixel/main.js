import Map from "./map.js";

// Espera a qye todo cargue.
window.onload = async function () {
    // Se inicializa el motor.
    const ctx = GameEngine.init('mainCanvas');

    // Cargamos el mapa (para este casó se exportó de la herramienta Tiled).
    await Map.load('maps/map.json');

    // Funcion que indica que se actualiza en cada ciclo.
    function update(dt) {

    }

    // Funcion que indica que se dibuja en cada ciclo.
    function render(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Dibujamos el mapa
        Map.render(ctx);
    }

    // Se incia el motor, se le pasan las funciones de actualización y dibujado.
    GameEngine.start(update, render);
};