
/* 
  Hace el mapeo de a que tileset pertenece un gid (tile) del arreglo. Se usa el firstgid que viene del json
  para saber a que tileset pertence, reccoriendo el array de atras hacia adelante.
*/
export function getTilesetForGid(gid, tilesets) {
  for (let i = tilesets.length - 1; i >= 0; i--) {
    if (gid >= tilesets[i].firstgid) {
      return tilesets[i];
    }
  }
  return null;
}

export function renderLayer(ctx, layer, map) {
  // Verifica de que tamaño son los tiles del mapa.
  const tileSize = map.data.tilewidth;
  layer.data.forEach((gid, index) => {
    // En caso de que el gid sea 0 o no se haya mapeado con un tileset no retorna nada.
    if (gid === 0) return;
    const tileset = getTilesetForGid(gid, map.tilesets);
    if (!tileset) return;
    
    const localId = gid - tileset.firstgid;
    const cols = tileset.columns;

    // Obtenemos el pixel exacto donde empieza el tile dentro del tileset (recordar que un tileset representa una imagen). 
    // "sx" representa la columna del tileset y "sy" las fila.
    const sx = (localId % cols) * tileSize;
    const sy = Math.floor(localId / cols) * tileSize;

    // Se calcula la posición en el mapa donde se va a dibujar el tile.
    const x = (index % layer.width) * tileSize;
    const y = Math.floor(index / layer.width) * tileSize;

    // Se hace el dibujo final (https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D/drawImage).
    ctx.drawImage(
      tileset.image,
      sx, sy, tileSize, tileSize,
      x, y, tileSize, tileSize
    );
  });
}
