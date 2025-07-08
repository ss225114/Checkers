/* eslint-disable no-unused-vars */

import { useEffect, useRef, useState } from "react";
import RowBox from "./RowBox";
import WinDialog from "./WinDialog";
import GameOverDialog from "./GameOverDialog";
import TieDialog from "./TieDialog";

const setup = [
  [1, 0, 1, 0, 0, 0, 2, 0],
  [0, 1, 0, 0, 0, 2, 0, 2],
  [1, 0, 1, 0, 0, 0, 2, 0],
  [0, 1, 0, 0, 0, 2, 0, 2],
  [1, 0, 1, 0, 0, 0, 2, 0],
  [0, 1, 0, 0, 0, 2, 0, 2],
  [1, 0, 1, 0, 0, 0, 2, 0],
  [0, 1, 0, 0, 0, 2, 0, 2],
  ];


  // const setup = [
  //   [1, 0, 1, 0, 0, 0, 2, 0],
  //   [0, 1, 0, 0, 0, 2, 0, 2],
  //   [1, 0, 1, 0, 0, 0, 2, 0],
  //   [0, 1, 0, 0, 0, 2, 0, 2],
  //   [1, 0, 1, 0, 0, 0, 0, 0],
  //   [0, 1, 0, 2, 0, 2, 0, 2],
  //   [1, 0, 1, 0, 0, 0, 0, 0],
  //   [0, 1, 0, 0, 0, 2, 0, 2],
  //   ];

const Board = () => {

  const [board, setBoard] = useState([...setup]);
  const [selectedCell, setSelectedCell] = useState({});
  const [isThinking, setIsThinking] = useState(false);
  const [win, setWin] = useState(false);
  const [defeat, setDefeat] = useState(false);
  const [tie, setTie] = useState(false);
  const [doubleJump, setDoubleJump] = useState(false);

  const tempArr = JSON.parse(JSON.stringify(board));

  const handleRestart = () => {
    setWin(false);
    setDefeat(false);
    setBoard([...setup]);
  };
  
  return (
    <>
        <div className="flex flex-col justify-center items-center gap-4">
          <button  onClick={() => window.location.reload()} className="rounded-md bg-yellow-200 p-4">RESTART</button>
          <div>{isThinking ? "THINKING !" : "Your Turn" }</div>
        </div>
        <div className="flex justify-center items-center mt-5">
        <div className="w-fit transform rotate-[270deg]">
        {board.map((cell, rowIndex)=>(
          <RowBox
            cells={cell}
            rowIndex={rowIndex}
            board={board}
            setBoard={setBoard}
            tempArr={tempArr}
            selectedCell={selectedCell}
            setSelectedCell={setSelectedCell}
            key={rowIndex}
            setIsThinking={setIsThinking}
            setWin={setWin}
            setDefeat={setDefeat}
            setTie={setTie}
            setDoubleJump={setDoubleJump}
            doubleJump={doubleJump}
          />
        ))}
        </div>
        </div>
        
        {win ? <WinDialog /> : null}
        {defeat ? <GameOverDialog /> : null}
        {tie ? <TieDialog /> : null}
    </>
  )
}

export default Board

// transform rotate-[270deg]