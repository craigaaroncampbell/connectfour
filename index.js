var boardArr = [['-','-','-','-','-','-','-'],
                ['-','-','-','-','-','-','-'],
                ['-','-','-','-','-','-','-'],
                ['-','-','-','-','-','-','-'],
                ['-','-','-','-','-','-','-'],
                ['-','-','-','-','-','-','-']];

for (var i = 0; i < 42; i++) {
  var spotId = 'spot' + i;
  var circleID = 'circle' + i;
  var row;
  var col;

  if ( i < 7) row = 0;
  if ( i >= 7 && i < 14) row = 1;
  if ( i >= 14 && i < 21) row = 2;
  if ( i >= 21 && i < 28) row = 3;
  if ( i >= 28 && i < 35) row = 4;
  if ( i >= 35 && i < 42) row = 5;

  col = i - row * 7;


  $('#board').append('<div  id="' + spotId + '" class="spot"><div id="' + circleID + '" class=" circle col' + col + ' row' + row +  '"></div></div>');
}

var color;
var marker;
var clicks = 0;
var gameOver;
// var cannotClick;

$('.circle').on('click', function(){
  if (!gameOver /*&& !cannotClick*/ ) {
    cannotCick = true;
    var colNum = Number($(this).attr('class').slice(11, 12));
    var rowNum = Number($(this).attr('class').slice(16, 17));
    var k = colNum;
    if (boardArr[0][colNum] === '-') {
      clicks++;
      if (clicks % 2 === 0) {
      color = 'red';
      marker = 'R'
      console.log(marker)
    } else {
      color = 'blue'
      marker = 'B'
      console.log(marker)
    }

      function addToBoardArr(){
        if (boardArr[1][colNum] === 'R' || boardArr[1][colNum] === 'B') return boardArr[0][colNum] = marker;
        if (boardArr[2][colNum] === 'R' || boardArr[2][colNum] === 'B') return boardArr[1][colNum] = marker;
        if (boardArr[3][colNum] === 'R' || boardArr[3][colNum] === 'B') return boardArr[2][colNum] = marker;
        if (boardArr[4][colNum] === 'R' || boardArr[4][colNum] === 'B') return boardArr[3][colNum] = marker;
        if (boardArr[5][colNum] === 'R' || boardArr[5][colNum] === 'B') return boardArr[4][colNum] = marker;
        if (boardArr[5][colNum] === '-') return boardArr[5][colNum] = marker;
      }

      function addAndCheck() {
        addToBoardArr();
        if (connectFour(boardArr) === 'B' ) {
          gameOver = true;
          alert("Blue Wins! Refresh the page to play again!");
        }
        if (connectFour(boardArr) === 'R' ){
          gameOver = true;
          alert("Red Wins! Refresh the page to play again!");
        }
        // cannotClick = false; // to prevent clicking too frequently
      }

      function nextCircle(){
        setTimeout(function(){
          $('#circle' + k).css('background-color', color);
          if (k > 6) {
            $('#circle' + (k - 7)).removeAttr('style');
          }

          k += 7;

          if (k - 7 < 7 && $('#circle' + k).prop('style')[0] === "background-color" ){

            $('#circle' + k-7).css('background-color', color);
            addAndCheck();
          }
          else {
            var nextFilled;
            if (  k < 42  ) {
              if (k + 7 < 42 ) {
                if ($('#circle' + (k + 7)).prop('style')[0] === "background-color" ) {
                  nextFilled = true;
                  $('#circle' + k).css('background-color', color);
                  $('#circle' + (k - 7)).removeAttr('style');
                  addAndCheck();
                }
              }
              if (!nextFilled) {
                nextCircle();
              }
            }
            else {
              addAndCheck();
            }
          }
        }, 250);
      }

      nextCircle();
    }
  }
});

function connectFour(board) {
  var emptySpots;
  var winner = '';
  function checkRight(row, spot, index) {
    if (index < 4 && spot != '-' ){
      if (row[index+1] == spot && row[index+2] == spot && row[index+3] == spot ) winner = spot;
    }
  }

  function checkDown(spot, index) {
    if (i < 3  && spot != '-'){
      if (board[i+1][index] == spot && board[i+2][index] == spot && board[i+3][index] == spot) winner = spot;
    }
  }

  function checkDiagonalUpRight(spot, index) {
    if (i > 2 && index < 4 && spot != '-') {
      if (board[i-1][index+1] == spot && board[i-2][index+2] == spot && board[i-3][index+3] == spot) winner = spot;
    }
  }

  function checkDiagonalDownRight(spot, index) {
    if (i <  3 && spot != '-') {
      if (board[i+1][index+1] == spot && board[i+2][index+2] == spot && board[i+3][index+3] == spot ) winner = spot;
    }
  }

  for (var i = 0; i < board.length; i++){
    board[i].forEach(function(spot, index) {
      if (spot === '-') emptySpots = true;
        checkRight(board[i], spot, index);
        checkDown(spot, index);
        checkDiagonalUpRight(spot, index);
        checkDiagonalDownRight(spot, index);
      if (winner) return;
    });
    if (winner) break;
  }

  if (!emptySpots && !winner) return 'draw';
  if (emptySpots && !winner) return 'in progress'; // but do i need to determine if it is IMPOSSIBLE to win given the situation and thus return 'draw'?
  return winner;
}

