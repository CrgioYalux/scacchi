import { findPiece } from "./utils";

import type { ChessBoard, ChessBoardSquare } from "../utils";

function pawnMoves(chessBoard: ChessBoard, squareID: number): ChessBoardSquare[] {
    const foundPiece = findPiece(chessBoard, squareID);
    
    if (!foundPiece) {
        return [];
    }

    if (foundPiece.value !== 'Pawn') {
        return [];
    }

    const out: ChessBoardSquare[] = [];

    if (foundPiece.from === 0) {
        if (chessBoard[foundPiece.position.x + 1] &&
            chessBoard[foundPiece.position.x + 1][foundPiece.position.y] &&
            chessBoard[foundPiece.position.x + 1][foundPiece.position.y].value === null) {
            out.push(chessBoard[foundPiece.position.x + 1][foundPiece.position.y]);
        }
        if (out.length !== 0 &&
            foundPiece.position.x === 1 &&
            chessBoard[foundPiece.position.x + 2] &&
            chessBoard[foundPiece.position.x + 2][foundPiece.position.y] &&
            chessBoard[foundPiece.position.x + 2][foundPiece.position.y].value === null) {
            out.push(chessBoard[foundPiece.position.x + 2][foundPiece.position.y]);
        }
        if (chessBoard[foundPiece.position.x + 1] &&
            chessBoard[foundPiece.position.x + 1][foundPiece.position.y + 1] &&
            chessBoard[foundPiece.position.x + 1][foundPiece.position.y + 1].value !== null &&
            chessBoard[foundPiece.position.x + 1][foundPiece.position.y + 1].from !== foundPiece.from) {
            out.push(chessBoard[foundPiece.position.x + 1][foundPiece.position.y + 1]);
        }
    }
    else {
        if (chessBoard[foundPiece.position.x - 1] &&
            chessBoard[foundPiece.position.x - 1][foundPiece.position.y] &&
            chessBoard[foundPiece.position.x - 1][foundPiece.position.y].value === null) {
            out.push(chessBoard[foundPiece.position.x - 1][foundPiece.position.y]);
        }
        if (out.length !== 0 &&
            foundPiece.position.x === 6 &&
            chessBoard[foundPiece.position.x - 2][foundPiece.position.y] &&
            chessBoard[foundPiece.position.x - 2][foundPiece.position.y].value === null) {
            out.push(chessBoard[foundPiece.position.x - 2][foundPiece.position.y]);
        }
        if (chessBoard[foundPiece.position.x - 1] &&
            chessBoard[foundPiece.position.x - 1][foundPiece.position.y - 1] &&
            chessBoard[foundPiece.position.x - 1][foundPiece.position.y - 1].value !== null &&
            chessBoard[foundPiece.position.x - 1][foundPiece.position.y - 1].from !== foundPiece.from) {
            out.push(chessBoard[foundPiece.position.x - 1][foundPiece.position.y - 1]);
        }
    }
    
    return out;
}

export default pawnMoves;
