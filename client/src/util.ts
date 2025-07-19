import { XorO } from "./types"




const checkForCompleteLine = (line: (XorO | undefined)[], currentPlayer) => {
    return line.every(tile => tile === currentPlayer)
}


export const checkForWinner = (
    board: (XorO | undefined)[][],
    currentPlayer: XorO,
    lastColumnIndex: number
): boolean => {

    // Check columns
    const column = board.map(row => row[lastColumnIndex]);
    if (checkForCompleteLine(column, currentPlayer)) {
        return true;
    }
    // Check diagonals
    const leftToRight = board.map((row, i) => row[i]);
    if (checkForCompleteLine(leftToRight, currentPlayer)) {
        return true;
    }
    const rightToLeft = board.map((row, i) => row[board.length - 1 - i]);
    if (checkForCompleteLine(rightToLeft, currentPlayer)) {
        return true;
    }
    // Check rows
    for (const row of board) {
        if (checkForCompleteLine(row, currentPlayer)) {
            return true;
        }
    }
    return false;
};


