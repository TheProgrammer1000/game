let canvas = document.getElementById('gameField');

let XpositionOnCircle = document.getElementById('x-pos');
let YpositionOnCircle = document.getElementById('y-pos');

let coinElement = document.getElementById('coin');

let ctx = canvas.getContext('2d');

userPlayer = {
  x_pos: 200,
  y_pos: 400,
  width: 20,
  height: 20,
  speed: 2,
  gravity: 5
};

userPlayer.x_pos_to_right_most = userPlayer.x_pos + userPlayer.width;
userPlayer.x_pos_to_left_most = userPlayer.x_pos;

userPlayer.y_pos_to_upper_most = userPlayer.y_pos - userPlayer.height;
userPlayer.y_pos_to_lower_most = userPlayer.y_pos + userPlayer.height;

console.log(userPlayer.x_pos_to_left_most);

coin = {
  x_pos: 600,
  y_pos: 400,

  width: 10,
  height: 10
};

coin.x_pos_to_right_most = coin.x_pos + coin.width;
coin.x_pos_to_left_most = coin.x_pos;

coin.y_pos_to_upper_most = coin.y_pos;
coin.y_pos_to_lower_most = coin.y_pos + coin.height;

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let userPlayer_xpos_toRightMost = userPlayer.x_pos + userPlayer.width;
let userPlayer_xpos_toLeftMost = userPlayer.x_pos;

let userPlayer_ypos_toUpperMost = userPlayer.y_pos - userPlayer.height;
let userPlayer_ypos_toLowerMost = userPlayer.y_pos + userPlayer.height;

console.log(canvasWidth);
console.log(canvasHeight);

// userplayer
ctx.beginPath();
ctx.fillStyle = 'black';
ctx.fillRect(
  userPlayer.x_pos,
  userPlayer.y_pos,
  userPlayer.width,
  userPlayer.height
);
ctx.stroke();

// coin
ctx.beginPath();
ctx.fillStyle = 'green';
ctx.fillRect(coin.x_pos, coin.y_pos, coin.width, coin.height);
ctx.stroke();

// update
document.addEventListener('keydown', (e) => {
  // clear canvas screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  detectionColide(userPlayer.x_pos, userPlayer.y_pos);

  // making the user move left, right, up and down
  if (e.keyCode === 37) {
    // X
    // arrow left

    userPlayer.x_pos -= userPlayer.speed;

    // Calculate the current pos of rectangle most to up, down, left and right!

    userPlayer.x_pos_to_left_most = userPlayer.x_pos;
    userPlayer.x_pos_to_right_most = userPlayer.x_pos + userPlayer.width;
  } else if (e.keyCode === 38) {
    // arrow up

    userPlayer.y_pos -= userPlayer.speed;
    userPlayer.y_pos_to_upper_most = userPlayer.y_pos;
    userPlayer.y_pos_to_lower_most = userPlayer.y_pos + userPlayer.height;
  } else if (e.keyCode === 39) {
    // X
    // arrow right

    // can't from right!!!

    userPlayer.x_pos += userPlayer.speed;
    //userPlayer.x_pos = userPlayer.x_pos;

    userPlayer.x_pos_to_right_most = userPlayer.x_pos + userPlayer.width;
    userPlayer.x_pos_to_left_most = userPlayer.x_pos;

    // change both the leftmost and rightmost of the userPlayer
  } else if (e.keyCode === 40) {
    // X
    // arrow down

    userPlayer.y_pos += userPlayer.speed;

    userPlayer.y_pos_to_lower_most = userPlayer.y_pos + userPlayer.height;
    userPlayer.y_pos_to_upper_most = userPlayer.y_pos;
  }

  //console.log(`${e.key}`);
});

function draw() {
  XpositionOnCircle.innerText = `X_most to the right of the Rec: ${userPlayer.x_pos_to_right_most}\n X_most to the left of the Rec: ${userPlayer.x_pos_to_left_most}\n\n`;
  YpositionOnCircle.innerText = `Y_most to the upper of the Rec: ${userPlayer.y_pos_to_upper_most}\n Y_most to the lowest of the Rec: ${userPlayer.y_pos_to_lower_most}\n\n`;

  coinElement.innerText = `X_most to the right of the coin: ${coin.x_pos_to_right_most}\n X_most to the left of the coin: ${coin.x_pos_to_left_most}\n\n Y_most to the upper of the coin: ${coin.y_pos_to_upper_most}\n Y_most to the lowest of the coin: ${coin.y_pos_to_lower_most}\n\n`;

  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.fillRect(
    userPlayer.x_pos,
    userPlayer.y_pos,
    userPlayer.width,
    userPlayer.height
  );
  ctx.stroke();

  // coin
  ctx.beginPath();
  ctx.fillStyle = 'green';
  ctx.fillRect(coin.x_pos, coin.y_pos, coin.width, coin.height);
  ctx.stroke();
}

// fungerar!
function detectionColide() {
  if(   userPlayer.x_pos_to_right_most >= coin.x_pos_to_left_most &&
        userPlayer.y_pos_to_upper_most <= coin.y_pos_to_lower_most &&  
        userPlayer.y_pos_to_lower_most >= coin.y_pos_to_upper_most &&
        userPlayer.x_pos_to_left_most <= coin.x_pos_to_right_most
    ) {
    //userPlayer.y_pos = userPlayer.y_pos
      console.log("Stanna");
  }
  /*
  else if(userPlayer.x_pos_to_left_most <= coin.x_pos_to_right_most && userPlayer.y_pos_to_upper_most <= coin.y_pos_to_lower_most && userPlayer.y_pos_to_lower_most >= coin.y_pos_to_upper_most) {
    console.log("STANNA!");
  }
  */
}


function loop() {
  draw();
  detectionColide();
  window.requestAnimationFrame(loop);
}

loop();
