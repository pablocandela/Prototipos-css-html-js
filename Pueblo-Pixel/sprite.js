export default class Sprite {
  constructor(image, frameWidth, frameHeight, frames, speed) {
    this.image = image;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frames = frames;

    this.frame = 0;
    this.time = 0;
    this.speed = speed; // El número de segundos por frame.
  }

  /*
    Actualiza el frame que se va a dibujar tomando en cuenta el delta time y la velocidad con la que se desea
    cambiar de frame.
  */
  update(dt) {
    this.time += dt / 1000;
    //Cuando se excede el tiempo en segundos del frame actual se pasa al siguiente.
    if (this.time >= this.speed) {
      this.frame = (this.frame + 1) % this.frames.length;
      this.time = 0;
    }
  }

  /*
    Función que dibuja los frames del sprite, puede invertir el sprite con la bandera flip.

  */
  draw(ctx, x, y, flip = false) {
    const frameX = this.frames[this.frame] * this.frameWidth;

    ctx.save();

    if (flip) {
      ctx.scale(-1, 1);
      x = -x - this.frameWidth;
    }

    ctx.drawImage(
      this.image,
      frameX, 0,
      this.frameWidth, this.frameHeight,
      x, y,
      this.frameWidth,
      this.frameHeight
    );

    ctx.restore();
  }

}
