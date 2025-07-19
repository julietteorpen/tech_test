import React from "react"
import { set } from 'lodash';
import clsx from "clsx";

interface TileProps {
  column: string | undefined;
  rowIndex: number;
  columnIndex: number;
  setLastColumnIndex: (columnIndex: number | null) => void;
  setBoard: React.Dispatch<React.SetStateAction<(string | undefined)[][]>>;
  currentPlayer: string;
  disabled?: boolean;
}

const Tile = ({ column, rowIndex, columnIndex, setLastColumnIndex, setBoard, currentPlayer, disabled }: TileProps) => {
  const selectTile = (rowIndex: number, columnIndex: number) => {
      setBoard(prevBoard => {
          const newBoard = [...prevBoard]
          if (!newBoard[rowIndex][columnIndex]) {
            newBoard[rowIndex][columnIndex] = currentPlayer
          }
          return newBoard
        })
        setLastColumnIndex(columnIndex)
      }
    const isDisabled = disabled || !!column;  
    
    return (
      <button
        onClick={() => selectTile(rowIndex, columnIndex)}
        disabled={isDisabled}
        className={clsx(
          `tile`,
          !disabled && `hover:bg-violet-100`,
        )}
      >
        {column}
      </button>
    )
}

export default Tile