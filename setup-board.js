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

$('.circle').on('click', function(){
  var colNum = Number($(this).attr('class').slice(11, 12));
  var rowNum = Number($(this).attr('class').slice(16, 17));

  //if a column is not full
  if (boardArr[0][colNum] === '-') {
    var k = colNum;
   function addToBoardArr(){
      if (boardArr[1][colNum] === 'R') boardArr[0][colNum] = 'R';
      if (boardArr[2][colNum] === 'R') boardArr[1][colNum] = 'R';
      if (boardArr[3][colNum] === 'R') boardArr[2][colNum] = 'R';
      if (boardArr[4][colNum] === 'R') boardArr[3][colNum] = 'R';
      if (boardArr[5][colNum] === 'R') boardArr[4][colNum] = 'R';
      if (boardArr[5][colNum] === '-') boardArr[5][colNum] = 'R';
    }
    function nextCircle(){
      setTimeout(function(){
        $('#circle' + k).css('background-color', 'red');
        if (k > 6) {
          $('#circle' + (k - 7)).removeAttr('style');
        }

        k += 7;

        if (k - 7 === 0 && $('#circle' + k).prop('style')[0] === "background-color" ){
          console.log("shit")
          $('#circle' + k-7).css('background-color', 'red');
          addToBoardArr();
        }
        else {
          var nextFilled;
          if (  k < 42  ) {
            if (k + 7 < 42 ) {
              if ($('#circle' + (k + 7)).prop('style')[0] === "background-color" ) {
                nextFilled = true;
                $('#circle' + k).css('background-color', 'red');
                $('#circle' + (k - 7)).removeAttr('style');
                addToBoardArr();
              }
            }
            if (!nextFilled) {
              nextCircle();
            }
          }
          else {
            addToBoardArr();
          }
        }
      }, 250);
    }

    nextCircle();
  }
})
