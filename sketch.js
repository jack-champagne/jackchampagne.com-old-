var SQUARE_SIZE = 50;
var board = new Array(8);
var mouseDown = false;
var mouseInitX, mouseInitY, mouseInitVal = -1;
var halfMove = 1;

// -1 = empty, 0 = pawn, 1 = knight, 2 = bishop
// 3 = rook, 4 = queen, 5 = king; add 6 for black pieces

function setup() {
  createCanvas(8*SQUARE_SIZE, 8*SQUARE_SIZE);
  ellipseMode(CENTER);
  for(var i = 0; i < 8; i++) {
    board[i] = [-1,-1,-1,-1,-1,-1,-1,-1];
    board[i][1] = 0; // white pawn
    board[i][6] = 6; // black pawn
  }
  // rooks
  board[0][0] = 3;
  board[0][7] = 9;
  board[7][0] = 3;
  board[7][7] = 9;
  // knights
  board[1][0] = 1;
  board[1][7] = 7;
  board[6][0] = 1;
  board[6][7] = 7;
  // bishops
  board[2][0] = 2;
  board[2][7] = 8;
  board[5][0] = 2;
  board[5][7] = 8;
  // queens
  board[3][0] = 4;
  board[3][7] = 10;
  // kings
  board[4][0] = 5;
  board[4][7] = 11;
}

function tick() {
  if(mouseInitVal == -1 && mouseIsPressed && !mouseDown) {
    mouseDown = true;
    mouseInitX = (mouseX-mouseX%SQUARE_SIZE)/SQUARE_SIZE;
    mouseInitY = 7 - (mouseY-mouseY%SQUARE_SIZE)/SQUARE_SIZE;
    mouseInitVal = board[mouseInitX][mouseInitY];
    if(mouseInitVal >= 0 && (halfMove%2 == 1 && mouseInitVal < 6 || halfMove%2 == 0 && mouseInitVal >= 6))
      board[mouseInitX][mouseInitY] = -1;
    else {
      mouseInitVal = -1;
      mouseDown = false;
    }
  }
  if(mouseInitVal >= 0 && !mouseIsPressed) {
    if(0 <= mouseX && mouseX < 8*SQUARE_SIZE && 0 <= mouseY && mouseY < 8*SQUARE_SIZE) {
      if((mouseX-mouseX%SQUARE_SIZE)/SQUARE_SIZE != mouseInitX || 7 - (mouseY-mouseY%SQUARE_SIZE)/SQUARE_SIZE != mouseInitY) {
        board[(mouseX-mouseX%SQUARE_SIZE)/SQUARE_SIZE][7 - (mouseY-mouseY%SQUARE_SIZE)/SQUARE_SIZE] = mouseInitVal;
        halfMove++;
      } else
        board[mouseInitX][mouseInitY] = mouseInitVal;
    } else {
      board[mouseInitX][mouseInitY] = mouseInitVal;
    }
    mouseDown = false;
    mouseInitVal = -1;
  } else if(mouseInitVal >= 0 && mouseIsPressed) {
    colorOf(mouseInitVal);
    ellipse(mouseX, mouseY, 40, 40);
  }
}

function draw() {
  background(255);
  noStroke();
  var row, col;
  for(row = 0; row < 8; row++) {
    for(col = 0; col < 8; col++) {
      if((row+col)%2 == 0) {
        fill(158, 141, 118);
      } else {
        fill(224, 212, 195);
      }
      square(col*SQUARE_SIZE, (7-row)*SQUARE_SIZE, SQUARE_SIZE);
      if(board[col][row] != -1) {
        colorOf(board[col][row]);
        ellipse((col+0.5)*SQUARE_SIZE, (7.5-row)*SQUARE_SIZE,40,40);
        fill(150);
        text(board[col][row], (col+0.5)*SQUARE_SIZE, (7.5-row)*SQUARE_SIZE);
      }
    }
  }
  tick();
}

function colorOf(piece) {
  if(piece >= 0) {
    if(piece < 6) {
      fill(255);
    } else {
      fill(0);
    }
  }
}


