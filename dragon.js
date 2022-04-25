let position_x = screen.width;
let position_y = 0;
let canvas;
let context;
let timer;
let speed = 2;
let offset = 200;
let up = 0;
let dragon_x = 100;
let hills = [];
let l = 1;
let block;

directions = {
  37: "left",
  38: "up",
  39: "right",
  40: "down",
};

let dragonImage = new Image();
dragonImage.src = "images/dragon1.png";

window.onload = function () {
  canvas = document.getElementById("dragon");
  canvas.width = screen.width;
  if (canvas && canvas.getContext) {
    context = canvas.getContext("2d");
    start();
  }
};
function createHills() {
  hills.length = 0;
  l = Math.floor(Math.random() * 4) + 1;
  for (let i = 0; i < l; i++) {
    hills.push([
      Math.floor(Math.random() * 800),
      Math.floor(Math.random() * 80),
      Math.floor(Math.random() * 90),
    ]);
  }
  console.log(hills);
}

function animateDragon(speed) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawDragon(dragon_x, offset);
  drawGrass();
  // drawHill(position_x + 300, 80, 50);
  // drawHill(position_x + 550, 60, 80);
  // drawHill(position_x + 800, 50, 20);
  for (let i = 0; i < hills.length; i++) {
    drawHill(position_x + hills[i][0], hills[i][1], hills[i][2]);
  }
  if (position_x + 880 > 0) {
    position_x -= speed;
  } else {
    createHills();
    position_x = canvas.width;
    speed++;
  }
}

function start() {
  stop();
  timer = setInterval(animateDragon, 20, 4);
  createHills();
}

function stop() {
  clearInterval(timer);
}

function drawDragon(x, y) {
  context.drawImage(dragonImage, x, y - dragonImage.height + up);
}

function drawGrass() {
  context.beginPath();
  context.strokeStyle = "green";
  context.lineWidth = 1;
  context.moveTo(0, offset);
  context.lineTo(canvas.width, offset);
  context.stroke();
}

function drawHill(x, w, h) {
  checkCollision(dragon_x, x, w);
  context.beginPath();
  context.strokeStyle = "brown";
  context.lineWidth = 1;
  context.moveTo(x, offset);
  context.lineTo(x + w / 12, offset - h / 2.5);
  context.lineTo(x + w / 4, offset - h / 1.2);
  context.lineTo(x + w / 2, offset - h);
  context.lineTo(x + (w * 3) / 4, offset - h / 1.2);
  context.lineTo(x + (w * 11) / 12, offset - h / 2.5);
  context.lineTo(x + w, offset);
  context.stroke();
}

function checkCollision(dragon_x, hill_x, hill_w) {
  if (dragon_x > hill_x && dragon_x < hill_x + hill_w && up == 0) {
    alert("Collision!");
    stop();
  }
}

// Задаем обработчик события keydown
addEventListener("keydown", function (event) {
  direction = directions[event.keyCode];
  if (direction == "up") {
    up = -80;
    setTimeout(function () {
      up = 0;
    }, 900);
  }
});
