/*
  Función que se ejecuta de forma inmediata al ser definida.
  Todas las variables definidas dntro no pueden ser modificadas desde afuera (util para varias variables 
  con el mismo nombre en diferentes archivos https://developer.mozilla.org/es/docs/Glossary/IIFE).
*/
var GameEngine = (function (GameEngine) {
  let canvas, ctx;
  let lastTime = 0;

  // Se definen funciones utiles que se van a usar en todo el proyecto.
  GameEngine.Utils = {
    /* 
      Función de interpolación que calcula un punto intermedio entre dos valores.
      Nos ayudara para hacer animaciones suaves al hacer una transisión en la posición de un elemento.
      https://rachsmith.com/lerp/
    */
    lerp: function (v0, v1, t) {
      return v0 + (v1 - v0) * t;
    }
  };

  //Se inicializa el motor, el canvas es el "lienzo" sobre el cual se pinta y ctx es el "pincel".
  GameEngine.init = function (canvasId) {
    canvas = document.getElementById(canvasId);
    if (!canvas) {
      throw new Error("Canvas no encontrado");
    }
    ctx = canvas.getContext('2d'); //Se activan herramientas de graficos vectoriales en 2D.
    return ctx;
  };

  /* El loop del escenario (gameloop), updateFn indica que se mueve y el renderFn que se dibuja en cada ciclo.
     https://ablancodev.com/otros/game-loop/
  */
  GameEngine.start = function (updateFn, renderFn) {
    function loop(currentTime) {
      /* Calcular cuánto tiempo pasó desde el último cuadro (Delta Time)
         Busca garantizar que independientemente de la potencia del pc el juego sea consistente.
        https://www.parallelcube.com/es/2017/10/25/por-que-necesitamos-utilizar-delta-time/
      */
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      updateFn(deltaTime); // La lógica.
      renderFn(ctx);       // El dibujo.
      /*
       Indica al navegador que se quiere realizar una animación y solicita el repintado en el siguiente ciclo.
       https://developer.mozilla.org/es/docs/Web/API/Window/requestAnimationFrame
      */
      requestAnimationFrame(loop);
    }
    //Sirve para que al inicio se ejecute el loop.
    requestAnimationFrame(loop);
  };

  return GameEngine;
})(GameEngine || {});