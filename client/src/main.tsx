import React, { useEffect, useState } from 'react'
import { XorO } from './types';
import { checkForWinner } from './util';
import SizeDropdown from './components/SizeDropdown';
import Tile from './components/Tile';
import clsx from 'clsx';


export const Main = () => {

  const [boardSize, setBoardSize] = useState(3)
  const emptyBoard = new Array(boardSize).fill(undefined).map(() => new Array(boardSize).fill(undefined))
  const [board, setBoard] = useState<(XorO | undefined)[][]>(emptyBoard)

  const [currentPlayer, setCurrentPlayer] = useState<XorO>('X')
  const [lastColumnIndex, setLastColumnIndex] = useState< number  | null >(null)
  const [isWinner, setIsWinner] = useState<boolean>(false)

  const resetBoard = () => {
    setBoard(emptyBoard)
    setCurrentPlayer('X') 
    setIsWinner(false)
    setLastColumnIndex(null)
  }

useEffect(() => {
  if (lastColumnIndex === null || isWinner) return;

  const winner = checkForWinner(board, currentPlayer, lastColumnIndex);
  if (winner) {
    setIsWinner(true);
  } else {
    setCurrentPlayer(prev => (prev === 'X' ? 'O' : 'X'));
  }
}, [board, lastColumnIndex, isWinner]);



useEffect(() =>{
  resetBoard()  
},[boardSize])

const gameOver =  board.flat().every(tile => tile !== undefined)
  return <div className='col mt-10 items-center gap-8'>
    <div className='h2'>Tic Tac Toe</div>
    <div className='flex space-x-2'>
    <div className={clsx(currentPlayer === 'X' ?'current-player' : 'heading')}> X </div>
    <div className={clsx(currentPlayer === 'O' ?'current-player' : 'heading')}> O </div>
    </div>
    <div className={isWinner ? 'winner' : 'h2'}>
      {isWinner ? `Player ${currentPlayer} wins!` : gameOver ? ( `Draw - Game Over!` ) : ( `Player ${currentPlayer}'s turn`)}
    </div>

      <div className='col gap-1'>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className='flex gap-1'>
          {row.map((column, columnIndex) => (
            <Tile key={`${rowIndex}-${columnIndex}`} column={column} rowIndex={rowIndex} columnIndex={columnIndex} setBoard={setBoard} setLastColumnIndex={setLastColumnIndex} currentPlayer={currentPlayer} disabled={isWinner}/>
          ))}
        </div>
      ))}
    </div>

    <button onClick={resetBoard} className='button'> Reset
    </button>

    <SizeDropdown setBoardSize={setBoardSize} />
  </div>
}
