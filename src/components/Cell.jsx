/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect, useRef, useState } from "react";
import Black from "../asset/Black";
import White from "../asset/White";
import Highlight from "../asset/Highlight";
import Conquer from "../asset/Conquer";
import WhiteKing from "../asset/WhiteKing";
import BlackKing from "../asset/BlackKing";

const Cell = (props) => {
  const {
    item,
    rowIndex,
    colIndex,
    setBoard,
    board,
    tempArr,
    selectedCell,
    setSelectedCell,
    setIsThinking,
    setWin,
    setDefeat,
    setTie,
    setDoubleJump,
    doubleJump
  } = props;

  const currentPlayer = useRef("Player 1");

  const [exploredCells, setExploredCells] = useState(false);
  const [move, setMove] = useState(true);
  const [moved, setMoved] = useState(false);
  const [doubleJumpCell, setDoubleJumpCell] = useState({});

  const checkMovablePiece = () => {
    let movablePieces = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === 2) {
          if (i - 1 >= 0 && j - 1 >= 0 && board[i - 1][j - 1] === 0) {
            movablePieces.push({ row: i, col: j, item: 2 });
          }
          if (i + 1 < board.length && j - 1 >= 0 && board[i + 1][j - 1] === 0) {
            movablePieces.push({ row: i, col: j, item: 2 });
          }
          if (
            i + 2 < board.length &&
            j - 2 >= 0 &&
            board[i + 2][j - 2] === 0 &&
            board[i + 1][j - 1] === 1
          ) {
            movablePieces.push({ row: i, col: j, item: 2 });
          }
          if (
            i - 2 >= 0 &&
            j - 2 >= 0 &&
            board[i - 2][j - 2] === 0 &&
            board[i - 1][j - 1] === 1
          ) {
            movablePieces.push({ row: i, col: j, item: 2 });
          }
        }
        if (board[i][j] === 6) {
          if (i - 1 >= 0 && j - 1 >= 0 && board[i - 1][j - 1] === 0) {
            movablePieces.push({ row: i, col: j, item: 6 });
          }
          if (i + 1 < board.length && j - 1 >= 0 && board[i + 1][j - 1] === 0) {
            movablePieces.push({ row: i, col: j, item: 6 });
          }
          if (
            i + 1 < board.length &&
            j + 1 < board.length &&
            board[i + 1][j + 1] === 0
          ) {
            movablePieces.push({ row: i, col: j, item: 6 });
          }
          if (i - 1 >= 0 && j + 1 < board.length && board[i - 1][j + 1] === 0) {
            movablePieces.push({ row: i, col: j, item: 6 });
          }
          if (
            i + 2 < board.length &&
            j - 2 >= 0 &&
            board[i + 2][j - 2] === 0 &&
            board[i + 1][j - 1] === 1
          ) {
            movablePieces.push({ row: i, col: j, item: 6 });
          }
          if (
            i + 2 < board.length &&
            j + 2 < board.length &&
            board[i + 2][j + 2] === 0 &&
            board[i + 1][j + 1] === 1
          ) {
            movablePieces.push({ row: i, col: j, item: 6 });
          }
          if (
            i - 2 >= 0 &&
            j - 2 >= 0 &&
            board[i - 2][j - 2] === 0 &&
            board[i - 1][j - 1] === 1
          ) {
            movablePieces.push({ row: i, col: j, item: 6 });
          }
          if (
            i - 2 >= 0 &&
            j + 2 < board.length &&
            board[i - 2][j + 2] === 0 &&
            board[i - 1][j + 1] === 1
          ) {
            movablePieces.push({ row: i, col: j, item: 6 });
          }
        }
      }
    }
    return movablePieces;
  };

  let movablePieces = checkMovablePiece();

  const blackMove = (movablePieces) => {
    for(let i=0; i<board.length; i++) {
      for(let j=0; j<board.length; j++) {
        if(board[i][j]===3 || board[i][j]===4){
          board[i][j]=0;
        }
      }}


    let flag = 0;
    for (let i = 0; i < movablePieces.length; i++) {
      if (
        movablePieces[i].row - 2 >= 0 &&
        movablePieces[i].col - 2 >= 0 &&
        (board[movablePieces[i].row - 1][movablePieces[i].col - 1] === 1 ||
        board[movablePieces[i].row - 1][movablePieces[i].col - 1] === 5) &&
        board[movablePieces[i].row - 2][movablePieces[i].col - 2] === 0 &&
        (movablePieces[i].item === 2 || movablePieces[i].item === 6)
      ) {
        if (
          movablePieces[i].item === 2 &&
          ((movablePieces[i].row - 3 >= 0 &&
            movablePieces[i].col - 3 >= 0 &&
            board[movablePieces[i].row - 3][movablePieces[i].col - 3] === 0) ||
          (movablePieces[i].row - 2 === 0 || movablePieces[i].col - 2 === 0))
        ) {
          console.log("attacking up!");
          if (movablePieces[i].col - 2 !== 0) {
            board[movablePieces[i].row - 2][movablePieces[i].col - 2] = 2;
            board[movablePieces[i].row - 1][movablePieces[i].col - 1] = 0;
            board[movablePieces[i].row][movablePieces[i].col] = 0;
            setBoard([...board]);
            setMoved(true);
            // console.log(board);
            flag = 0;
            break;
          }
           else {
            board[movablePieces[i].row - 2][movablePieces[i].col - 2] = 6;
            board[movablePieces[i].row - 1][movablePieces[i].col - 1] = 0;
            board[movablePieces[i].row][movablePieces[i].col] = 0;
            setBoard([...board]);
            setMoved(true);
            // console.log(board);
            flag = 0;
            break;
          }
        } 
        else if (
          movablePieces[i].item === 6 &&
          ((movablePieces[i].row - 3 >= 0 &&
            movablePieces[i].col - 3 >= 0 &&
            board[movablePieces[i].row - 3][movablePieces[i].col - 3] === 0) ||
          (movablePieces[i].row - 2 === 0 || movablePieces[i].col - 2 === 0))
        ) {
          board[movablePieces[i].row - 2][movablePieces[i].col - 2] = 6;
            board[movablePieces[i].row - 1][movablePieces[i].col - 1] = 0;
            board[movablePieces[i].row][movablePieces[i].col] = 0;
            setBoard([...board]);
            setMoved(true);
            // console.log(board);
            flag = 0;
            break;
        }
        else {
          console.log("removing possibility.... ", movablePieces[i]);
          movablePieces.splice(i, 1);
        }
      } else if (
        movablePieces[i].row + 2 < board.length &&
        movablePieces[i].col - 2 >= 0 &&
        (board[movablePieces[i].row + 1][movablePieces[i].col - 1] === 1 ||
        board[movablePieces[i].row + 1][movablePieces[i].col - 1] === 5) &&
        board[movablePieces[i].row + 2][movablePieces[i].col - 2] === 0 &&
        (movablePieces[i].item === 2 || movablePieces[i].item === 6)
      ) {

        if (
          movablePieces[i].item === 2 &&
          ((movablePieces[i].row + 3 < board.length &&
            movablePieces[i].col - 3 >= 0 &&
            board[movablePieces[i].row + 3][movablePieces[i].col - 3] === 0) ||
          (movablePieces[i].row + 2 === board.length - 1 ||
            movablePieces[i].col - 2 === 0))
        ) {
          console.log("attacking down!");
          if (movablePieces[i].col - 2 !== 0) {
            board[movablePieces[i].row + 2][movablePieces[i].col - 2] = 2;
            board[movablePieces[i].row + 1][movablePieces[i].col - 1] = 0;
            board[movablePieces[i].row][movablePieces[i].col] = 0;
            setBoard([...board]);
            setMoved(true);
            // console.log(board);
            flag = 0;
            break;
          } else {
            board[movablePieces[i].row + 2][movablePieces[i].col - 2] = 6;
            board[movablePieces[i].row + 1][movablePieces[i].col - 1] = 0;
            board[movablePieces[i].row][movablePieces[i].col] = 0;
            setBoard([...board]);
            setMoved(true);
            // console.log(board);
            flag = 0;
            break;
          }
        } 
        else if (movablePieces[i].item === 6 &&
          ((movablePieces[i].row + 3 < board.length &&
            movablePieces[i].col - 3 >= 0 &&
            board[movablePieces[i].row + 3][movablePieces[i].col - 3] === 0) ||
          (movablePieces[i].row + 2 === board.length - 1 ||
            movablePieces[i].col - 2 === 0))) {
              board[movablePieces[i].row + 2][movablePieces[i].col - 2] = 6;
            board[movablePieces[i].row + 1][movablePieces[i].col - 1] = 0;
            board[movablePieces[i].row][movablePieces[i].col] = 0;
            setBoard([...board]);
            setMoved(true);
            // console.log(board);
            flag = 0;
            break;
        }
        else {
          console.log("removing possibility.... ", movablePieces[i]);
          movablePieces.splice(i, 1);
        }
      } else if (
        movablePieces[i].item === 6 &&
        movablePieces[i].row + 2 < board.length &&
        movablePieces[i].col + 2 < board.length &&
        board[movablePieces[i].row + 1][movablePieces[i].col + 1] === 1 &&
        board[movablePieces[i].row + 2][movablePieces[i].col + 2] === 0
      ) {
        if (
          (movablePieces[i].row + 3 < board.length &&
          movablePieces[i].col + 3 < board.length &&
          board[movablePieces[i].row + 3][movablePieces[i].col + 3] === 0) ||
          (movablePieces[i].row + 2 === board.length - 1 ||
          movablePieces[i].col + 2 === board.length - 1)
        ) {
          console.log("attacking down!");
          board[movablePieces[i].row + 2][movablePieces[i].col + 2] = 6;
          board[movablePieces[i].row + 1][movablePieces[i].col + 1] = 0;
          board[movablePieces[i].row][movablePieces[i].col] = 0;
          setBoard([...board]);
          setMoved(true);
          // console.log(board);
          flag = 0;
          break;
        } else {
          console.log("removing possibility.... ", movablePieces[i]);
          movablePieces.splice(i, 1);
        }
      } else if (
        movablePieces[i].item === 6 &&
        movablePieces[i].row - 2 >= 0 &&
        movablePieces[i].col + 2 < board.length &&
        board[movablePieces[i].row - 1][movablePieces[i].col + 1] === 1 &&
        board[movablePieces[i].row - 2][movablePieces[i].col + 2] === 0
      ) {
        if (
          (movablePieces[i].row - 3 >= 0 &&
            movablePieces[i].col + 3 < board.length - 1 &&
            board[movablePieces[i].row - 3][movablePieces[i].col + 3] === 0) ||
          (movablePieces[i].row - 2 === 0 ||
            movablePieces[i].col + 2 === board.length - 1)
        ) {
          console.log("attacking up!");
          board[movablePieces[i].row - 2][movablePieces[i].col + 2] = 6;
          board[movablePieces[i].row - 1][movablePieces[i].col + 1] = 0;
          board[movablePieces[i].row][movablePieces[i].col] = 0;
          setBoard([...board]);
          setMoved(true);
          // console.log(board);
          flag = 0;
          break;
        } else {
          console.log("removing possibility.... ", movablePieces[i]);
          movablePieces.splice(i, 1);
        }
      }
      flag = 1;
    }
    if (flag) {
      const randomIndex = Math.floor(Math.random() * movablePieces.length);
      console.log("piece chosen for move :", movablePieces[randomIndex]);
      
      if (movablePieces[randomIndex].item === 6) {
        if (
          movablePieces[randomIndex].row - 2 >= 0 &&
          movablePieces[randomIndex].col - 2 >= 0 &&
          board[movablePieces[randomIndex].row - 2][
            movablePieces[randomIndex].col - 2
          ] === 0 &&
          board[movablePieces[randomIndex].row - 1][
            movablePieces[randomIndex].col - 1
          ] === 0
        ) {
          board[movablePieces[randomIndex].row - 1][
            movablePieces[randomIndex].col - 1
          ] = 6;
          board[movablePieces[randomIndex].row][
            movablePieces[randomIndex].col
          ] = 0;
          setBoard([...board]);
          setMoved(true);
          // console.log(board);
          return;
        } else if (
          movablePieces[randomIndex].row - 2 >= 0 &&
          movablePieces[randomIndex].col + 2 < board.length &&
          board[movablePieces[randomIndex].row - 2][
            movablePieces[randomIndex].col + 2
          ] === 0 &&
          board[movablePieces[randomIndex].row - 1][
            movablePieces[randomIndex].col + 1
          ] === 0
        ) {
          board[movablePieces[randomIndex].row - 1][
            movablePieces[randomIndex].col + 1
          ] = 6;
          board[movablePieces[randomIndex].row][
            movablePieces[randomIndex].col
          ] = 0;
          setBoard([...board]);
          setMoved(true);
          // console.log(board);
          return;
        } else if (
          movablePieces[randomIndex].row + 2 < board.length &&
          movablePieces[randomIndex].col - 2 >= 0 &&
          board[movablePieces[randomIndex].row + 2][
            movablePieces[randomIndex].col - 2
          ] === 0 &&
          board[movablePieces[randomIndex].row + 1][
            movablePieces[randomIndex].col - 1
          ] === 0
        ) {
          board[movablePieces[randomIndex].row + 1][
            movablePieces[randomIndex].col - 1
          ] = 6;
          board[movablePieces[randomIndex].row][
            movablePieces[randomIndex].col
          ] = 0;
          setBoard([...board]);
          setMoved(true);
          // console.log(board);
          return;
        } else if (
          movablePieces[randomIndex].row + 2 < board.length &&
          movablePieces[randomIndex].col + 2 < board.length &&
          board[movablePieces[randomIndex].row + 2][
            movablePieces[randomIndex].col + 2
          ] === 0 &&
          board[movablePieces[randomIndex].row + 1][
            movablePieces[randomIndex].col + 1
          ] === 0
        ) {
          board[movablePieces[randomIndex].row + 1][
            movablePieces[randomIndex].col + 1
          ] = 6;
          board[movablePieces[randomIndex].row][
            movablePieces[randomIndex].col
          ] = 0;
          setBoard([...board]);
          setMoved(true);
          // console.log(board);
          return;
        } else {
          if(movablePieces[randomIndex].row -1 >= 0 && movablePieces[randomIndex].col - 1 >= 0) {
            board[movablePieces[randomIndex].row - 1][
              movablePieces[randomIndex].col - 1
            ] = 6;
            board[movablePieces[randomIndex].row][
              movablePieces[randomIndex].col
            ] = 0;
            setBoard([...board]);
            setMoved(true);
            // console.log(board);
            return;
          } else {
            board[movablePieces[randomIndex].row + 1][
              movablePieces[randomIndex].col + 1
            ] = 6;
            board[movablePieces[randomIndex].row][
              movablePieces[randomIndex].col
            ] = 0;
            setBoard([...board]);
            setMoved(true);
            // console.log(board);
            return;
          }
          
        }
      }
      
      if (movablePieces[randomIndex].item === 2) {
        if (
          movablePieces[randomIndex].row - 2 >= 0 &&
          movablePieces[randomIndex].col - 2 >= 0 &&
          board[movablePieces[randomIndex].row - 2][
            movablePieces[randomIndex].col - 2
          ] === 0 &&
          board[movablePieces[randomIndex].row - 1][
            movablePieces[randomIndex].col - 1
          ] === 0
        ) {
          if (movablePieces[randomIndex].col - 1 !== 0) {
            console.log("item 2 move up");
            board[movablePieces[randomIndex].row - 1][
              movablePieces[randomIndex].col - 1
            ] = 2;
            board[movablePieces[randomIndex].row][
              movablePieces[randomIndex].col
            ] = 0;
            setBoard([...board]);
            setMoved(true);
            // console.log(board);
            return;
          } else {
            console.log("king achieved");
            board[movablePieces[randomIndex].row - 1][
              movablePieces[randomIndex].col - 1
            ] = 6;
            board[movablePieces[randomIndex].row][
              movablePieces[randomIndex].col
            ] = 0;
            setBoard([...board]);
            setMoved(true);
            // console.log(board);
            return;
          }
        } else if (
          movablePieces[randomIndex].row + 2 < board.length &&
          movablePieces[randomIndex].col - 2 >= 0 &&
          board[movablePieces[randomIndex].row + 2][
            movablePieces[randomIndex].col - 2
          ] === 0 &&
          board[movablePieces[randomIndex].row + 1][
            movablePieces[randomIndex].col - 1
          ] === 0
        ) {
          if (movablePieces[randomIndex].col - 1 !== 0) {
            console.log("item 2 move down");
            board[movablePieces[randomIndex].row + 1][
              movablePieces[randomIndex].col - 1
            ] = 2;
            board[movablePieces[randomIndex].row][
              movablePieces[randomIndex].col
            ] = 0;
            setBoard([...board]);
            setMoved(true);
            // console.log(board);
            return;
          } else {
            console.log("king achieved");
            board[movablePieces[randomIndex].row + 1][
              movablePieces[randomIndex].col - 1
            ] = 6;
            board[movablePieces[randomIndex].row][
              movablePieces[randomIndex].col
            ] = 0;
            setBoard([...board]);
            setMoved(true);
            // console.log(board);
            return;
          }
        } else {
          if (
            movablePieces[randomIndex].row + 1 < board.length &&
            movablePieces[randomIndex].col - 1 >= 0 &&
            board[movablePieces[randomIndex].row + 1][
              movablePieces[randomIndex].col - 1
            ] === 0
          ) {
            if (movablePieces[randomIndex].col - 1 !== 0) {
              console.log("item 2 move down");
              board[movablePieces[randomIndex].row + 1][
                movablePieces[randomIndex].col - 1
              ] = 2;
              board[movablePieces[randomIndex].row][
                movablePieces[randomIndex].col
              ] = 0;
              setBoard([...board]);
              setMoved(true);
              // console.log(board);
              return;
            } else {
              console.log("king achieved");
              board[movablePieces[randomIndex].row + 1][
                movablePieces[randomIndex].col - 1
              ] = 6;
              board[movablePieces[randomIndex].row][
                movablePieces[randomIndex].col
              ] = 0;
              setBoard([...board]);
              setMoved(true);
              // console.log(board);
              return;
            }
          } else {
            if (movablePieces[randomIndex].col - 1 !== 0) {
              console.log("item 2 move up");
              board[movablePieces[randomIndex].row - 1][
                movablePieces[randomIndex].col - 1
              ] = 2;
              board[movablePieces[randomIndex].row][
                movablePieces[randomIndex].col
              ] = 0;
              setBoard([...board]);
              setMoved(true);
              // console.log(board);
              return;
            } else {
              console.log("king achieved");
              board[movablePieces[randomIndex].row - 1][
                movablePieces[randomIndex].col - 1
              ] = 6;
              board[movablePieces[randomIndex].row][
                movablePieces[randomIndex].col
              ] = 0;
              setBoard([...board]);
              setMoved(true);
              // console.log(board);
              return;
            }
          }
        }
      }
    }
  };
  
  const exploreDoubleJumpcCells = (item, row, col, isDoubleJump) => {
      // if the selected piece is a normal piece
      if (item === 1) {
        if (
          row - 1 >= 0 &&
          col + 1 < tempArr.length &&
          board[row - 1][col + 1] === 0
        ) {
          board[row - 1][col + 1] = 3;
        }
        if (
          row + 1 < tempArr.length &&
          col + 1 < tempArr.length &&
          board[row + 1][col + 1] === 0 
        ) {
          board[row + 1][col + 1] = 3;
        }
  
        //for attack
        if (
          row + 1 < tempArr.length &&
          col + 1 < tempArr.length &&
          row + 2 < tempArr.length &&
          col + 2 < tempArr.length &&
          (board[row + 1][col + 1] === 2 || board[row + 1][col + 1] === 6) &&
          board[row + 2][col + 2] === 0
        ) {
          board[row + 2][col + 2] = 4;
        }
        if (
          row - 1 >= 0 &&
          col + 1 < tempArr.length &&
          row - 2 >= 0 &&
          col + 2 < tempArr.length &&
          (board[row - 1][col + 1] === 2 || board[row - 1][col + 1] === 6) &&
          board[row - 2][col + 2] === 0
        ) {
          board[row - 2][col + 2] = 4;
        }
        setBoard([...board]);
      }
  
      // if the selected piece is a king piece
      if (item === 5) {
        if (
          row - 1 >= 0 &&
          col + 1 < tempArr.length &&
          board[row - 1][col + 1] === 0
        ) {
          board[row - 1][col + 1] = 3;
        }
        if (
          row + 1 < tempArr.length &&
          col + 1 < tempArr.length &&
          board[row + 1][col + 1] === 0
        ) {
          board[row + 1][col + 1] = 3;
        }
        if (
          row + 1 < tempArr.length &&
          col - 1 >= 0 &&
          board[row + 1][col - 1] === 0
        ) {
          board[row + 1][col - 1] = 3;
        }
        if (row - 1 >= 0 && col - 1 >= 0 && board[row - 1][col - 1] === 0) {
          board[row - 1][col - 1] = 3;
        }
  
        //for attack
        if (
          row + 1 < tempArr.length &&
          col + 1 < tempArr.length &&
          row + 2 < tempArr.length &&
          col + 2 < tempArr.length &&
          (board[row + 1][col + 1] === 2 || board[row + 1][col + 1] === 6) &&
          board[row + 2][col + 2] === 0
        ) {
          board[row + 2][col + 2] = 4;
        }
        if (
          row - 1 >= 0 &&
          col + 1 < tempArr.length &&
          row - 2 >= 0 &&
          col + 2 < tempArr.length &&
          (board[row - 1][col + 1] === 2 || board[row - 1][col + 1] === 6) &&
          board[row - 2][col + 2] === 0
        ) {
          board[row - 2][col + 2] = 4;
        }
        if (
          row + 1 < tempArr.length &&
          col - 1 >= 0 &&
          row + 2 < tempArr.length &&
          col - 2 >= 0 &&
          (board[row + 1][col - 1] === 2 || board[row + 1][col - 1] === 6) &&
          tempArr[row + 2][col - 2] === 0
        ) { 
          board[row + 2][col - 2] = 4;
        }
        if (
          row - 1 >= 0 &&
          col - 1 >= 0 &&
          row - 2 >= 0 &&
          col - 2 >= 0 &&
          (board[row - 1][col - 1] === 2 || board[row - 1][col - 1] === 6) &&
          board[row - 2][col - 2] === 0
        ) {
          board[row - 2][col - 2] = 4;
        }
        setBoard([...board]);
      }
  };

  const exploreMovableCells = (item, row, col, isDoubleJump) => {
    if(!isDoubleJump) {
      for(let i=0; i<board.length; i++) {
        for(let j=0; j<board.length; j++) {
          if(tempArr[i][j]===3 || tempArr[i][j]===4 || board[i][j]===3 || board[i][j]===4){
            tempArr[i][j]=0;
            board[i][j]=0;
          }
        }}
  
      // if the selected piece is a normal piece
      if (item === 1) {
        if (
          row - 1 >= 0 &&
          col + 1 < tempArr.length &&
          board[row - 1][col + 1] === 0
        ) {
          board[row - 1][col + 1] = 3;
        }
        if (
          row + 1 < tempArr.length &&
          col + 1 < tempArr.length &&
          board[row + 1][col + 1] === 0 
        ) {
          board[row + 1][col + 1] = 3;
        }
  
        //for attack
        if (
          row + 1 < tempArr.length &&
          col + 1 < tempArr.length &&
          row + 2 < tempArr.length &&
          col + 2 < tempArr.length &&
          (board[row + 1][col + 1] === 2 || board[row + 1][col + 1] === 6) &&
          board[row + 2][col + 2] === 0
        ) {
          board[row + 2][col + 2] = 4;
        }
        if (
          row - 1 >= 0 &&
          col + 1 < tempArr.length &&
          row - 2 >= 0 &&
          col + 2 < tempArr.length &&
          (board[row - 1][col + 1] === 2 || board[row - 1][col + 1] === 6) &&
          board[row - 2][col + 2] === 0
        ) {
          board[row - 2][col + 2] = 4;
        }
        setBoard([...board]);
      }
  
      // if the selected piece is a king piece
      if (item === 5) {
        if (
          row - 1 >= 0 &&
          col + 1 < tempArr.length &&
          board[row - 1][col + 1] === 0
        ) {
          board[row - 1][col + 1] = 3;
        }
        if (
          row + 1 < tempArr.length &&
          col + 1 < tempArr.length &&
          board[row + 1][col + 1] === 0
        ) {
          board[row + 1][col + 1] = 3;
        }
        if (
          row + 1 < tempArr.length &&
          col - 1 >= 0 &&
          board[row + 1][col - 1] === 0
        ) {
          board[row + 1][col - 1] = 3;
        }
        if (row - 1 >= 0 && col - 1 >= 0 && board[row - 1][col - 1] === 0) {
          board[row - 1][col - 1] = 3;
        }
  
        //for attack
        if (
          row + 1 < tempArr.length &&
          col + 1 < tempArr.length &&
          row + 2 < tempArr.length &&
          col + 2 < tempArr.length &&
          (board[row + 1][col + 1] === 2 || board[row + 1][col + 1] === 6) &&
          board[row + 2][col + 2] === 0
        ) {
          board[row + 2][col + 2] = 4;
        }
        if (
          row - 1 >= 0 &&
          col + 1 < tempArr.length &&
          row - 2 >= 0 &&
          col + 2 < tempArr.length &&
          (board[row - 1][col + 1] === 2 || board[row - 1][col + 1] === 6) &&
          board[row - 2][col + 2] === 0
        ) {
          board[row - 2][col + 2] = 4;
        }
        if (
          row + 1 < tempArr.length &&
          col - 1 >= 0 &&
          row + 2 < tempArr.length &&
          col - 2 >= 0 &&
          (board[row + 1][col - 1] === 2 || board[row + 1][col - 1] === 6) &&
          tempArr[row + 2][col - 2] === 0
        ) { 
          board[row + 2][col - 2] = 4;
        }
        if (
          row - 1 >= 0 &&
          col - 1 >= 0 &&
          row - 2 >= 0 &&
          col - 2 >= 0 &&
          (board[row - 1][col - 1] === 2 || board[row - 1][col - 1] === 6) &&
          board[row - 2][col - 2] === 0
        ) {
          board[row - 2][col - 2] = 4;
        }
        setBoard([...board]);
      }
      setExploredCells(true);
    }
  };

  const movePiece = (row, col, item) => {
    // normal piece moved
    if (board[selectedCell.row][selectedCell.col] === 1) {
      if (item === 4) {
        console.log(selectedCell);
        // console.log("board state :", board);
        
        if (
          row - 1 >= 0 &&
          col - 1 >= 0 &&
          selectedCell.row + 1 < board.length &&
          selectedCell.col + 1 < board.length &&
          (board[row - 1][col - 1] === 2 || board[row - 1][col - 1] === 6)  &&
          (board[selectedCell.row + 1][selectedCell.col + 1] === 2 || board[selectedCell.row + 1][selectedCell.col + 1] === 6) &&
          (board[selectedCell.row][selectedCell.col] === board[row - 2][col - 2])
        ) {
          if (col !== board.length - 1) {
            board[row][col] = 1;
          } else {
            board[row][col] = 5;
          }
          board[row - 1][col - 1] = 0;
          console.log("captured :", row - 1, col - 1);
          board[selectedCell.row][selectedCell.col] = 0;
          setBoard([...board]);
          if(row - 2 >= 0 && col + 2 < board.length && board[row - 1][col + 1] === 2 && board[row - 2][col + 2] === 0) {
            console.log("checking for another attack");
            setDoubleJumpCell({item: 1, ri: row, ci: col});
            return;
          }
          if(row + 2 < board.length && col + 2 < board.length && board[row + 1][col + 1] === 2 && board[row + 2][col + 2] === 0) {
            console.log("checking for another attack");
            setDoubleJumpCell({item: 1, ri: row, ci: col});
            return;
          }
        } else if ( 
          row + 1 < board.length &&
          col - 1 >= 0 &&
          (board[row + 1][col - 1] === 2 || board[row + 1][col - 1] === 6) &&
          (board[selectedCell.row - 1][selectedCell.col + 1] === 2 || board[selectedCell.row - 1][selectedCell.col + 1] === 6) &&
          (board[selectedCell.row][selectedCell.col] === board[row + 2][col - 2])
        ) {
          if (col !== board.length - 1) {
            board[row][col] = 1;
          } else {
            board[row][col] = 5;
          }
          board[row + 1][col - 1] = 0;
          console.log("captured :", row + 1, col - 1);
          board[selectedCell.row][selectedCell.col] = 0;
          setBoard([...board]);
          if(row - 2 >= 0 && col + 2 < board.length && board[row - 1][col + 1] === 2 && board[row - 2][col + 2] === 0) {
            console.log("checking for another attack");
            setDoubleJumpCell({item: 1, ri: row, ci: col});
            return;
          }
          if(row + 2 < board.length && col + 2 < board.length && board[row + 1][col + 1] === 2 && board[row + 2][col + 2] === 0) {
            console.log("checking for another attack");
            setDoubleJumpCell({item: 1, ri: row, ci: col});
            return;
          }
        }
        // board[selectedCell.row][selectedCell.col] = 0;
      }

      if (item === 3) {
        if (col !== board.length - 1) {
          board[row][col] = 1;
        } else {
          board[row][col] = 5;
        }
        board[selectedCell.row][selectedCell.col] = 0;
        setBoard([...board]);
      }
    }

    // king piece moved
    if (board[selectedCell.row][selectedCell.col] === 5) {
      console.log("piece moved :",board[selectedCell.row][selectedCell.col]);
      
      if (item === 4) {
        if (
          row - 1 >= 0 &&
          col - 1 >= 0 &&
          selectedCell.row + 1 < board.length &&
          selectedCell.col + 1 < board.length &&
          (board[row - 1][col - 1] === 2 || board[row - 1][col - 1] === 6) &&
          (board[selectedCell.row + 1][selectedCell.col + 1] === 2 || board[selectedCell.row + 1][selectedCell.col + 1] === 6)
        ) {
          board[row][col] = 5;
          board[row - 1][col - 1] = 0;
          console.log("captured :", row - 1, col - 1);
          board[selectedCell.row][selectedCell.col] = 0;
          setBoard([...board]);
          if(row - 2 >= 0 && col + 2 < board.length && board[row - 1][col + 1] === 2 && board[row - 2][col + 2] === 0) {
            console.log("checking for another attack");
            setDoubleJumpCell({item: 5, ri: row, ci: col});
            return;
          }
          if(row + 2 < board.length && col + 2 < board.length && board[row + 1][col + 1] === 2 && board[row + 2][col + 2] === 0) {
            console.log("checking for another attack");
            setDoubleJumpCell({item: 5, ri: row, ci: col});
            return;
          }
          if(row - 2 >= 0 && col - 2 >= 0 && board[row - 1][col - 1] === 2 && board[row - 2][col - 2] === 0) {
            console.log("checking for another attack");
            setDoubleJumpCell({item: 5, ri: row, ci: col});
            return;
          }
          if(row + 2 < board.length && col - 2 >= 0 && board[row + 1][col - 1] === 2 && board[row + 2][col - 2] === 0) {
            console.log("checking for another attack");
            setDoubleJumpCell({item: 5, ri: row, ci: col});
            return;
          }
        } else if (
          row + 1 < board.length &&
          col - 1 >= 0 &&
          selectedCell.row - 1 >= 0 &&
          selectedCell.col + 1 < board.length &&
          (board[row + 1][col - 1] === 2 || board[row + 1][col - 1] === 6) &&
          (board[selectedCell.row - 1][selectedCell.col + 1] === 2 || board[selectedCell.row - 1][selectedCell.col + 1] === 6)
        ) {
          board[row][col] = 5;
          board[row + 1][col - 1] = 0;
          console.log("captured :", row + 1, col - 1);
          board[selectedCell.row][selectedCell.col] = 0;
          setBoard([...board]);
          if(row - 2 >= 0 && col + 2 < board.length && board[row - 1][col + 1] === 2 && board[row - 2][col + 2] === 0) {
            console.log("checking for another attack");
            setDoubleJumpCell({item: 5, ri: row, ci: col});
            return;
          }
          if(row + 2 < board.length && col + 2 < board.length && board[row + 1][col + 1] === 2 && board[row + 2][col + 2] === 0) {
            console.log("checking for another attack");
            setDoubleJumpCell({item: 5, ri: row, ci: col});
            return;
          }
          if(row - 2 >= 0 && col - 2 >= 0 && board[row - 1][col - 1] === 2 && board[row - 2][col - 2] === 0) {
            console.log("checking for another attack");
            setDoubleJumpCell({item: 5, ri: row, ci: col});
            return;
          }
          if(row + 2 < board.length && col - 2 >= 0 && board[row + 1][col - 1] === 2 && board[row + 2][col - 2] === 0) {
            console.log("checking for another attack");
            setDoubleJumpCell({item: 5, ri: row, ci: col});
            return;
          }
        } else if (
          row + 1 < board.length &&
          col + 1 < board.length &&
          selectedCell.row - 1 >= 0 &&
          selectedCell.col - 1 >= 0 &&
          (board[row + 1][col + 1] === 2 || board[row + 1][col + 1] === 6) &&
          (board[selectedCell.row - 1][selectedCell.col - 1] === 2 || board[selectedCell.row - 1][selectedCell.col - 1] === 6)
        ) {
          board[row][col] = 5;
          board[row + 1][col + 1] = 0;
          console.log("captured :", row + 1, col + 1);
          board[selectedCell.row][selectedCell.col] = 0;
          setBoard([...board]);
          if(row - 2 >= 0 && col + 2 < board.length && board[row - 1][col + 1] === 2 && board[row - 2][col + 2] === 0) {
            console.log("checking for another attack");
            setDoubleJumpCell({item: 5, ri: row, ci: col});
            return;
          }
          if(row + 2 < board.length && col + 2 < board.length && board[row + 1][col + 1] === 2 && board[row + 2][col + 2] === 0) {
            console.log("checking for another attack");
            setDoubleJumpCell({item: 5, ri: row, ci: col});
            return;
          }
          if(row - 2 >= 0 && col - 2 >= 0 && board[row - 1][col - 1] === 2 && board[row - 2][col - 2] === 0) {
            console.log("checking for another attack");
            setDoubleJumpCell({item: 5, ri: row, ci: col});
            return;
          }
          if(row + 2 < board.length && col - 2 >= 0 && board[row + 1][col - 1] === 2 && board[row + 2][col - 2] === 0) {
            console.log("checking for another attack");
            setDoubleJumpCell({item: 5, ri: row, ci: col});
            return;
          }
        } else if (
          row - 1 >= 0 &&
          col + 1 < board.length &&
          selectedCell.row + 1 < board.length &&
          selectedCell.col - 1 >= 0 &&
          (board[row - 1][col + 1] === 2 || board[row - 1][col + 1] === 6) &&
          (board[selectedCell.row + 1][selectedCell.col - 1] === 2 || board[selectedCell.row + 1][selectedCell.col - 1] === 6)
        ) {
          board[row][col] = 5;
          board[row - 1][col + 1] = 0;
          console.log("captured :", row - 1, col + 1);
          board[selectedCell.row][selectedCell.col] = 0;
          setBoard([...board]);
          if(row - 2 >= 0 && col + 2 < board.length && board[row - 1][col + 1] === 2 && board[row - 2][col + 2] === 0) {
            console.log("checking for another attack");
            setDoubleJumpCell({item: 5, ri: row, ci: col});
            return;
          }
          if(row + 2 < board.length && col + 2 < board.length && board[row + 1][col + 1] === 2 && board[row + 2][col + 2] === 0) {
            console.log("checking for another attack");
            setDoubleJumpCell({item: 5, ri: row, ci: col});
            return;
          }
          if(row - 2 >= 0 && col - 2 >= 0 && board[row - 1][col - 1] === 2 && board[row - 2][col - 2] === 0) {
            console.log("checking for another attack");
            setDoubleJumpCell({item: 5, ri: row, ci: col});
            return;
          }
          if(row + 2 < board.length && col - 2 >= 0 && board[row + 1][col - 1] === 2 && board[row + 2][col - 2] === 0) {
            console.log("checking for another attack");
            setDoubleJumpCell({item: 5, ri: row, ci: col});
            return;
          }
        }
        // board[selectedCell.row][selectedCell.col] = 0;
      }

      if (item === 3) {
        board[row][col] = 5;
        board[selectedCell.row][selectedCell.col] = 0;
        setBoard([...board]);
      }
    }

    // Clear highlighted moves
    for (let i = 0; i < tempArr.length; i++) {
      for (let j = 0; j < tempArr.length; j++) {
        if (board[i][j] === 3 || board[i][j] === 4) {
          board[i][j] = 0;
        }
      }
    }
    setBoard([...board]);
    movablePieces = checkMovablePiece();
    setIsThinking(true);
      setTimeout(() => {
        setMove(false);
      }, 1000);
  };

  const handleClick = () => {
    // If clicking on a highlighted move, execute the move
    if (item === 3 || item === 4) {
      movePiece(rowIndex, colIndex, item);
      setSelectedCell({});
      
      return;
    }

    // Select new piece to move
    if (item === 1 || item === 5) {
      setSelectedCell((prev) => ({ row: rowIndex, col: colIndex }));
      exploreMovableCells(item, rowIndex, colIndex, 0);
    }
  };

  useEffect(() => {
    let flag = 1;
    let whiteCount = 0;
    let blackCount = 0;
    for(let i=0; i<board.length; i++) {
      for(let j=0; j<board.length; j++) {
        if(board[i][j] === 1 || board[i][j] === 5){
          whiteCount = whiteCount + 1;
        }
        if(board[i][j] === 2 || board[i][j] === 6) {
          blackCount = blackCount + 1;
        }
      }
    }
    console.log(whiteCount, blackCount);
    
    if(blackCount === 0) {
      setWin(true);
    }
    if(whiteCount === 0) {
      setDefeat(true);
    }
  },[move, board])

  useEffect(() => {
    if (move) {
      currentPlayer.current = "Player 1";
    } else {
      currentPlayer.current = "Player 2";
    }
   
    if (currentPlayer.current === "Player 2") {
      setTimeout(() => {
        blackMove(movablePieces);
      }, 1000);
      setTimeout(() => {
        setIsThinking(false);
      }, 1000);
      setMove(true);
    }
  }, [move]);

  useEffect(()=>{
    if(doubleJumpCell){
      setSelectedCell({row: doubleJumpCell.ri, col: doubleJumpCell.ci});
      exploreDoubleJumpcCells(doubleJumpCell.item, doubleJumpCell.ri, doubleJumpCell.ci, 1);
      setBoard([...board]);
    }
  },[doubleJumpCell]);

  return (
    <>
      {(rowIndex + colIndex) % 2 === 0 ? (
        <div
          onClick={handleClick}
          className={`bg-slate-700 h-10 w-10 min-w-10 min-h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex justify-center items-center font-medium cursor-pointer border-2 ${
            selectedCell?.row === rowIndex && selectedCell?.col === colIndex
              ? "border-yellow-300"
              : "border-black"
          } rounded-md overflow-hidden`}
        >
          {item == 1 ? <White /> : null}
          {item == 2 ? <Black /> : null}
          {item == 5 ? <WhiteKing /> : null}
          {item == 6 ? <BlackKing /> : null}
          {item == 3 &&
          (selectedCell?.row === rowIndex - 1 ||
            selectedCell?.row === rowIndex + 1) &&
          (selectedCell?.col === colIndex - 1 ||
            selectedCell?.col === colIndex + 1) ? (
            <Highlight />
          ) : null}
          {item == 4 &&
          (selectedCell?.row === rowIndex - 2 ||
            selectedCell?.row === rowIndex + 2) &&
          (selectedCell?.col === colIndex - 2 ||
            selectedCell?.col === colIndex + 2) ? (
            <Conquer />
          ) : null}
        </div>
      ) : (
        <div
          onClick={handleClick}
          className={`bg-white h-10 w-10 min-w-10 min-h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex justify-center items-center font-medium cursor-pointer border-2 border-black rounded-md overflow-hidden`}
        >
          {item == 1 ? <White /> : null}
          {item == 2 ? <Black /> : null}
          {item == 3 &&
          (selectedCell?.row === rowIndex - 1 ||
            selectedCell?.row === rowIndex + 1) &&
          (selectedCell?.col === colIndex - 1 ||
            selectedCell?.col === colIndex + 1) ? (
            <Highlight />
          ) : null}
        </div>
      )}
    </>
  );
};

export default Cell;

// if (currentPlayer.current === "Player 2") {
//   const randomIndex = Math.floor(Math.random() * movablePieces.length);
//   if(movablePieces[randomIndex].row - 2>=0 && movablePieces[randomIndex].col - 2>=0 && board[movablePieces[randomIndex].row - 2][movablePieces[randomIndex].col - 2] === 0){
//     board[movablePieces[randomIndex].row - 2][movablePieces[randomIndex].col - 2] = 2;
//     board[movablePieces[randomIndex].row][movablePieces[randomIndex].col] = 0;
//   }
//  setBoard([...board]);
// currentPlayer.current = "Player 1";
// }

// if (item === 2 && currentPlayer.current === "Player 2") {
//   if (row - 1 >= 0 && col - 1 >= 0 && board[row-1][col-1] === 0) {
//     board[row - 1][col - 1] = 3;
//     // tempArr[row - 1][col + 1] = 3;
//   }
//   if (row + 1 < tempArr.length && col - 1 >= 0 && board[row+1][col-1] === 0) {
//     board[row + 1][col - 1] = 3;
//     // tempArr[row + 1][col + 1] = 3;
//   }
// }

// console.log("peice selected for move :", movablePieces[randomIndex]);

// if (movablePieces[randomIndex].row - 2 >= 0 &&
//   movablePieces[randomIndex].col - 2 >= 0 &&
//   board[movablePieces[randomIndex].row - 1][
//     movablePieces[randomIndex].col - 1
//   ] === 1 &&
//   board[movablePieces[randomIndex].row - 2][
//     movablePieces[randomIndex].col - 2
//   ] === 0){
//     board[movablePieces[randomIndex].row - 2][movablePieces[randomIndex].col - 2] = 2;
//     board[movablePieces[randomIndex].row - 1][movablePieces[randomIndex].col - 1] = 0;
//     board[movablePieces[randomIndex].row][movablePieces[randomIndex].col] = 0;
//     return;
//   }

//   else if (movablePieces[randomIndex].row + 2 < board.length &&
//     movablePieces[randomIndex].col - 2 >= 0 &&
//     board[movablePieces[randomIndex].row + 1][
//       movablePieces[randomIndex].col - 1
//     ] === 1 &&
//     board[movablePieces[randomIndex].row + 2][
//       movablePieces[randomIndex].col - 2
//     ] === 0) {
//       board[movablePieces[randomIndex].row + 2][movablePieces[randomIndex].col - 2] = 2;
//       board[movablePieces[randomIndex].row + 1][movablePieces[randomIndex].col - 1] = 0;
//       board[movablePieces[randomIndex].row][movablePieces[randomIndex].col] = 0;
//       return;
//     }

// if (
//   movablePieces[randomIndex].row - 2 >= 0 &&
//   movablePieces[randomIndex].col - 2 >= 0 &&
//   board[movablePieces[randomIndex].row - 2][
//     movablePieces[randomIndex].col - 2
//   ] === 0 &&
//   board[movablePieces[randomIndex].row - 1][
//     movablePieces[randomIndex].col - 1
//   ] === 0
// ) {
//   board[movablePieces[randomIndex].row - 1][
//     movablePieces[randomIndex].col - 1
//   ] = 2;
//   board[movablePieces[randomIndex].row][
//     movablePieces[randomIndex].col
//   ] = 0;
//   // return;
// } else if (
//   movablePieces[randomIndex].row + 2 < board.length &&
//   movablePieces[randomIndex].col - 2 >= 0 &&
//   board[movablePieces[randomIndex].row + 2][
//     movablePieces[randomIndex].col - 2
//   ] === 0 &&
//   board[movablePieces[randomIndex].row + 1][
//     movablePieces[randomIndex].col - 1
//   ] === 0
// ) {
//   board[movablePieces[randomIndex].row + 1][
//     movablePieces[randomIndex].col - 1
//   ] = 2;
//   board[movablePieces[randomIndex].row][
//     movablePieces[randomIndex].col
//   ] = 0;
//   // return;
// } else {
//   if (
//     movablePieces[randomIndex].row + 1 < board.length &&
//     movablePieces[randomIndex].col - 1 >= 0 &&
//     board[movablePieces[randomIndex].row + 1][
//       movablePieces[randomIndex].col - 1
//     ] === 0
//   ) {
//     board[movablePieces[randomIndex].row + 1][
//       movablePieces[randomIndex].col - 1
//     ] = 2;
//     board[movablePieces[randomIndex].row][
//       movablePieces[randomIndex].col
//     ] = 0;
//     // return;
//   }else {
//     board[movablePieces[randomIndex].row - 1][
//       movablePieces[randomIndex].col - 1
//     ] = 2;
//     board[movablePieces[randomIndex].row][
//       movablePieces[randomIndex].col
//     ] = 0;
//   }
// }


// if (selectedCell.row + 1 < board.length && selectedCell.col + 1 < board.length && row - 1 >= 0 && col - 1 >= 0)
//   {
//     console.log(board[selectedCell.row + 1][selectedCell.col + 1]);
    
//     console.log((board[row - 1][col - 1] === 2 || board[row - 1][col - 1] === 6)  &&
//   board[selectedCell.row + 1][selectedCell.col + 1] === 2);}

//   if (selectedCell.row - 1 >= 0 && selectedCell.col + 1 < board.length && row + 1 < board.length && col - 1 >= 0)
//   {
//     console.log(board[selectedCell.row - 1][selectedCell.col + 1]);
    
//     console.log((board[row + 1][col - 1] === 2 || board[row + 1][col - 1] === 6) &&
//   board[selectedCell.row - 1][selectedCell.col + 1] === 2);}

//   if (selectedCell.row - 1 >= 0 && selectedCell.col - 1 >= 0 && row + 1 < board.length && col + 1 < board.length)
//   {
//     console.log(board[selectedCell.row - 1][selectedCell.col - 1]);
    
//     console.log((board[row + 1][col + 1] === 2 || board[row + 1][col + 1] === 6) &&
//   board[selectedCell.row - 1][selectedCell.col - 1] === 2);}

//   if (selectedCell.row + 1 < board.length && selectedCell.col - 1 >= 0 && row - 1 >= 0 && col + 1 < board.length)
//   {
//     console.log(board[selectedCell.row + 1][selectedCell.col - 1]);
    
//     console.log((board[row - 1][col + 1] === 2 || board[row - 1][col + 1] === 6) && 
//   board[selectedCell.row + 1][selectedCell.col - 1] === 2);}



// deadlock situation to be handled
 // for(let i=0; i<board.length; i++) {
    //   for(let j=0; j<board.length; j++) {
    //     if(board[i][j] === 2 && newBoard[i][j] === 2){
    //       flag = 1;
    //     } else {
    //       flag = 0;
    //       break;
    //     }
    //   }
    // }
    // console.log(flag);
    

    // if(flag) {
    //   console.log("Deadlock");
    //   setTie(true);
    // }