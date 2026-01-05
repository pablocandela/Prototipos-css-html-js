// Escucha que tecla se prersiona y actualiza el estado.
export const Input = {
  left: false,
  right: false,
  up: false,
  down: false
};

window.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") Input.left = true;
  if (e.key === "ArrowRight") Input.right = true;
  if (e.key === "ArrowUp") Input.up = true;
  if (e.key === "ArrowDown") Input.down = true;
});

window.addEventListener("keyup", e => {
  if (e.key === "ArrowLeft") Input.left = false;
  if (e.key === "ArrowRight") Input.right = false;
  if (e.key === "ArrowUp") Input.up = false;
  if (e.key === "ArrowDown") Input.down = false;
});


