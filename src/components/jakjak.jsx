if(row - 2 >= 0 && col + 2 < board.length && board[row - 1][col + 1] === 2 && board[row - 2][col + 2] === 0) {
    console.log("checking for another attack");
    exploreMovableCells(board[row-1][col+1], row, col);
  }
  if(row + 2 < board.length && col + 2 < board.length && board[row + 1][col + 1] === 2 && board[row + 2][col + 2] === 0) {
    console.log("checking for another attack");
    exploreMovableCells(board[row-1][col+1], row, col);
  }