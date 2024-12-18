const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d"); //canvas 2d繪圖 methods
const unit = 20;
const row = canvas.height / unit; //320/20 =16
const column = canvas.width / unit; //320/20 =16

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
//蛋的本體

// let egg = [];
//蛋的位置 1.隨機出現 2. 範圍限制在框框內 3. 不可以跟目前蛇的位置重疊
//如果蛋被吃掉(蛇的頭位置跟蛋重疊) 蛋重新出現一次
// let randomLocation1 = Math.floor(Math.random() * 17); //0~16
// let randomLocation2 = Math.floor(Math.random() * 17); //0~16
// let randomLocationUnitX = randomLocation1 * 20;
// let randomLocationUnitY = randomLocation2 * 20;
// for (let i = 0; i < snake.length; i++) {
//   if (randomLocationUnitX == snake[i].x) {
//   }
// }
// egg[0] = {
//   x: randomLocationUnitX,
//   y: randomLocationUnitY,
// };

class Fruit {
  constructor() {
    this.x = Math.floor(Math.random() * column) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }

  drawFruit() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, unit, unit);
  }

  pickALocation() {
    //果實重生 不可以跟蛇的身體重疊
    //生成新的果實位置
    let new_x;
    let new_y;
    let overlapping = false;
    //如果跟蛇的身體重複 overlapping變成true
    //下面的do迴圈就會再跑一次 直到不重複
    function checkOverlap() {
      for (let i = 0; i < snake.length; i++) {
        if (new_x == snake[i].x && new_y == snake[i].y) {
          overlapping = true;
          return;
        } else {
          overlapping = false;
        }
      }
    }
    //do while loop:先執行1次 如果while後面的夸號內是true 就在執行一次
    do {
      new_x = Math.floor(Math.random() * column) * unit;
      new_y = Math.floor(Math.random() * row) * unit;
      checkOverlap();
    } while (overlapping);

    this.x = new_x;
    this.y = new_y;
    console.log("果實重生");
  }
}

let myFruit = new Fruit();
window.addEventListener("keydown", changeDirection); //鍵盤按下去 執行changeDirection
//控制方向
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

window.removeEventListener("keydown", changeDirection);

function draw() {
  //方格內全部塗黑
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //fillstyle先決定使用顏色 fillrect決定使用範圍

  //咬到自己遊戲結束
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(myGame);
      alert("GG");
      return;
    }
  }
  //螢幕內畫出蛇!
  myFruit.drawFruit();

  for (let i = 0; i < snake.length; i++) {
    if (i == 0) {
      ctx.fillStyle = "lightgreen"; //蛇頭顏色
    } else {
      ctx.fillStyle = "lightblue"; //蛇身體顏色
    }
    if (snake[i].x >= canvas.width) {
      snake[i].x = 0;
    }
    if (snake[i].x < 0) {
      snake[i].x = canvas.width - unit;
    }
    if (snake[i].y >= canvas.height) {
      snake[i].y = 0;
    }
    if (snake[i].y < 0) {
      snake[i].y = canvas.height - unit;
    }
    ctx.strokeStyle = "white"; //外框白色
    ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);

    //畫出蛋

    // for (let j = 0; j < egg.length; j++) {
    //   ctx.fillStyle = "red";
    //   ctx.fillRect(egg[j].x, egg[j].y, unit, unit);
    // }
  }

  //蛇吃到自己會死 1.snake[0].x ==

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
  //確認有沒有吃到果實 有吃到就變長

  if (snake[0].x == myFruit.x && snake[0].y == myFruit.y) {
    myFruit.pickALocation();
  } else {
    snake.pop();
  }

  snake.unshift(newhead);
  window.addEventListener("keydown", changeDirection);
}

let myGame = setInterval(draw, 100);
