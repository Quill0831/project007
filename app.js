const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d"); //canvas 2d繪圖 methods
const unit = 20;
const row = canvas.height / unit;
const column = canvas.weight / unit;

//蛇的身體

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

window.addEventListener("keydown", changeDirection); //鍵盤按下去 執行changeDirection
let d = "Right";
function changeDirection(e) {
  if (e.key == "ArrowRight" && d !== "left") {
    d = "Right";
  } else if (e.key == "ArrowLeft" && d !== "Right") {
    d = "Left";
  } else if (e.key == "ArrowUp" && d !== "Down") {
    d = "Up";
    console.log("move up");
  } else if (e.key == "ArrowDown" && d !== "Up") {
    d = "Down";
  }
}

function draw() {
  //方格內全部塗黑
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height); //fillstyle先決定使用顏色 fillrect決定使用範圍

  //螢幕內畫出蛇
  for (let i = 0; i < snake.length; i++) {
    if (i == 0) {
      ctx.fillStyle = "lightgreen"; //蛇頭顏色
    } else {
      ctx.fillStyle = "lightblue"; //蛇身體顏色
    }
    if (snake[i].x > canvas.width) {
      snake[i].x = 0;
    }
    if (snake[i].x < 0) {
      snake[i].x = canvas.width - unit;
    }
    if (snake[i].y > canvas.height) {
      snake[i].y = 0;
    }
    if (snake[i].y < 0) {
      snake[i].y = canvas.height - unit;
    }
    ctx.strokeStyle = "white"; //外框白色
    ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
  }

  //以d的方向決定蛇的下依禎數要放在哪裡
  let snakeX = snake[0].x; //蛇的初始位置 抓開頭array的xy座標
  let snakeY = snake[0].y;

  //上下左右按鈕的對應動作
  if (d == "Left") {
    snakeX -= unit;
  } else if (d == "Right") {
    snakeX += unit;
  } else if (d == "Up") {
    snakeY -= unit;
  } else if (d == "Down") {
    snakeY += unit;
  }
  // 增加新的蛇身體
  let newhead = {
    x: snakeX,
    y: snakeY,
  };

  snake.pop();
  snake.unshift(newhead);
}

setInterval(draw, 100);

//穿牆功能
