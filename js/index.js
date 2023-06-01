/* MODAL
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
end modal*/
var clickedSquares = new Set();
// set how many moves can be made
const moves = 20
// set grid number of Rows
const totalRows = 85
//set grid number of Columns
const totalColumns = 65

function changeColor(event) {
  const square = event.target;

  // Check if the square has already been clicked
  if (!clickedSquares.has(square)) {
    clickedSquares.add(square); // Add the square to clickedSquares set
  }

  const colors = ['color1', 'color2', 'color3', 'color4', 'color5'];
  const currentColorIndex = square.dataset.colorIndex || 0;
  const nextColorIndex = (parseInt(currentColorIndex) + 1) % colors.length;

  square.className = 'square ' + colors[nextColorIndex];
  square.dataset.colorIndex = nextColorIndex;

  const count = moves - clickedSquares.size;
  document.getElementById('counter').textContent = 'Moves Left: ' + count;

  if (count <= 0) {
    // Perform necessary actions when count reaches max moves
    document.getElementById('counter').textContent = 'Out of Moves';
    disableColorChanges(true);
  }
  console.log(clickedSquares)
}
// once all 20 moves are made this function stops color changes
//function disableColorChanges(disableAddition = true) {
// const squares = document.querySelectorAll('.square');
//  squares.forEach((square) => {
//    if (!clickedSquares.has(square)) {
//      square.removeEventListener('click', changeColor);
//    }
//  });
//}

//creates divs for the grid
function createGrid() {
  const grid = document.getElementById('grid');

  for (let i = 0; i < totalRows * totalColumns; i++) {
    const square = document.createElement('div');
    square.className = 'square';
    square.id = i + 1;
    square.addEventListener('click', changeColor);
    grid.appendChild(square);
  }
  startCountdownTimer();
}
// 5 minute timer countdown
function startCountdownTimer() {
  var countDownDate = new Date().getTime() + (5 * 60 * 1000); // Set countdown to 5 minutes (300 seconds)

  var countdownClock = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";


    if (distance < 0) {
      clearInterval(countdownClock);
      document.getElementById("timer").innerHTML = "Times Up!";
      disableColorChanges();
    }
  }, 1000);
}

// Call the function to create the grid
createGrid();

// changes
const {Client} =require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "postgres",
    database: "canvas"
})


client.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database!');
});



function disableColorChanges(disableAddition = true) {
  const squares = document.querySelectorAll('.square');
  squares.forEach((square) => {
    if (!clickedSquares.has(square)) {
      square.removeEventListener('click', changeColor);
    }
  });

  // Convert clickedSquares set to an array
  const clickedSquaresArray = Array.from(clickedSquares);

  // Prepare the data for insertion into the database
  const data = clickedSquaresArray.map((square) => ({
    squareId: square.id,
    colorIndex: square.dataset.colorIndex,
  }));

  // Insert the data into the database
  const query = 'INSERT INTO canvas (square, color) VALUES ($1, $2)';
data.forEach((item) => {
  client.query(query, [item.squareId, item.colorIndex], (err, result) => {
    if (err) throw err;
    console.log('Data inserted into the database!');
  });
});
}


connection.end((err) => {
  if (err) throw err;
  console.log('Disconnected from the database!');
});






