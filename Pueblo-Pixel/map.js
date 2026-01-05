import { renderLayer } from "./TileRenderer.js";

const Map = {
  data: null,
  tilesets: [],

  // Cargamos el archivo json con el vector del mapa.
  async load(url) {
    const map = await fetch(url);
    this.data = await map.json();

    /* 
      Cargamos cada tileset del json y lo guardamos en un arreglo sustituyendo el campo imagen, el cual de origen es una ruta 
      y ahora en su lugar una imagen de javascript.
    */
    this.tilesets = this.data.tilesets.map(tileset => {
      const img = new Image();
      img.src = tileset.image;
      return {
        ...tileset,
        image: img
      };
    });
  },

  // Función que dibuja el mapa en el canvas.
  render(ctx) {
    // Recorre todos los layer y verifica solo los que son visibles para dibujar.
    this.data.layers.forEach(layer => {
      if (layer.type === "tilelayer" && layer.visible) {
        renderLayer(ctx, layer, this);
      }
    });
  }
};

export default Map;
