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


// var testBoard = [['-','-','-','-','-','R','-'],
//                  ['Y','-','-','-','R','-','-'],
//                  ['Y','-','Y','R','R','R','R'],
//                  ['Y','-','R','Y','-','Y','Y'],
//                  ['Y','-','-','Y','Y','-','Y'],
//                  ['-','-','Y','Y','R','Y','R']];


// console.log(connectFour(testBoard));

