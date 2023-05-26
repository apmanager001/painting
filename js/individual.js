
function changeColor(event) {
  const square = event.target;

  const colors = ['color1', 'color2', 'color3', 'color4', 'color5'];
  const currentColorIndex = square.dataset.colorIndex || 0;
  const nextColorIndex = (parseInt(currentColorIndex) + 1) % colors.length;

  square.className = 'square ' + colors[nextColorIndex];
  square.dataset.colorIndex = nextColorIndex;

  console.log(clickedSquares)
}
//creates divs for the grid
function createGrid() {
  const grid = document.getElementById('grid');

  for (let i = 0; i < 135 * 60; i++) {
    const square = document.createElement('div');
    square.className = 'square';
    square.id = i + 1;
    square.addEventListener('click', changeColor);
    grid.appendChild(square);
  }
}

// Call the function to create the grid
createGrid();
