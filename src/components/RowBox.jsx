/* eslint-disable react/prop-types */

import Cell from "./Cell";

const RowBox = (props) => {
  const { cells, rowIndex, setBoard, board, tempArr, selectedCell, setSelectedCell, setIsThinking, setWin, setDefeat, setTie, setDoubleJump, doubleJump } = props;

  return (
    <div className=" flex rounded-md duration-200 ">
      {cells.map((item, colIndex) => (
        <Cell
          item={item}
          rowIndex={rowIndex}
          colIndex={colIndex}
          setBoard={setBoard}
          board={board}
          tempArr={tempArr}
          selectedCell={selectedCell}
          setSelectedCell={setSelectedCell}
          key={colIndex}
          setIsThinking={setIsThinking}
          setWin={setWin}
          setDefeat={setDefeat}
          setTie={setTie}
          setDoubleJump={setDoubleJump}
          doubleJump={doubleJump}
        />
      ))}
    </div>
  );
};

export default RowBox;
