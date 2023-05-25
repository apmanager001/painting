// MODAL
const openModalBtn = document.getElementById("openModal");
const modal = document.getElementById("myModal");
const closeModalBtn = document.getElementsByClassName("close")[0];

const usernameForm = document.getElementById("usernameForm");

openModalBtn.addEventListener("click", function() {
  modal.style.display = "block";
});

closeModalBtn.addEventListener("click", function() {
  modal.style.display = "none";
});

usernameForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  console.log("Username submitted:", username);
  modal.style.display = "none";
});
//end modal
function changeColor(event) {
  const square = event.target;
  const colors = ['color1', 'color2', 'color3', 'color4', 'color5'];
  const currentColorIndex = square.dataset.colorIndex || 0;
  const nextColorIndex = (parseInt(currentColorIndex) + 1) % colors.length;

  square.className = 'square ' + colors[nextColorIndex];
  square.dataset.colorIndex = nextColorIndex;
}

function createGrid() {
  const grid = document.getElementById('grid');

  for (let i = 0; i < 185 * 75; i++) {
    const square = document.createElement('div');
    square.className = 'square';
    square.id = i + 1;
    square.addEventListener('click', changeColor);
    grid.appendChild(square);
  }
}

// Call the function to create the grid
createGrid();