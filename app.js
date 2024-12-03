const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d"); //canvas 2d繪圖 methods
const unit = 20;
const row = canvas.height / unit;
const column = canvas.weight / unit;

let snake = [];

snake[0] = {
  x: 80,
  y: 0,
};
snake[1] = {
  x: 60,
  y: 0,
};
snake[2] = {
  x: 40,
  y: 0,
};
snake[3] = {
  x: 20,
  y: 0,
};

for (let i = 0; i < snake.length; i++) {
  if (i == 0) {
    ctx.fillStyle = "lightgreen";
  } else {
    ctx.fillStyle = "lightblue";
  }

  ctx.strokeStyle = "white"; //外框白色
  ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
  ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
}
