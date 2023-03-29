import { findPiece } from "./utils";

import type { ChessBoard } from "../utils";

function kingMoves(chessBoard: ChessBoard, squareID: number): number[] {
    const foundPiece = findPiece(chessBoard, squareID);
    
    if (!foundPiece) {
        return [];
    }

    if (foundPiece.value !== 'King') {
        return [];
    }

    const out: number[] = [];
    
    if (chessBoard[foundPiece.position.x + 1] &&
    chessBoard[foundPiece.position.x + 1][foundPiece.position.y] &&
    chessBoard[foundPiece.position.x + 1][foundPiece.position.y].from !== foundPiece.from) {
        out.push(chessBoard[foundPiece.position.x + 1][foundPiece.position.y].ID);
    }

    if (chessBoard[foundPiece.position.x + 1] &&
    chessBoard[foundPiece.position.x + 1][foundPiece.position.y + 1] &&
    chessBoard[foundPiece.position.x + 1][foundPiece.position.y + 1].from !== foundPiece.from) {
        out.push(chessBoard[foundPiece.position.x + 1][foundPiece.position.y + 1].ID);
    }

    if (chessBoard[foundPiece.position.x] &&
    chessBoard[foundPiece.position.x][foundPiece.position.y + 1] &&
    chessBoard[foundPiece.position.x][foundPiece.position.y + 1].from !== foundPiece.from) {
        out.push(chessBoard[foundPiece.position.x][foundPiece.position.y + 1].ID);
    }

    if (chessBoard[foundPiece.position.x - 1] &&
    chessBoard[foundPiece.position.x - 1][foundPiece.position.y + 1] &&
    chessBoard[foundPiece.position.x - 1][foundPiece.position.y + 1].from !== foundPiece.from) {
        out.push(chessBoard[foundPiece.position.x - 1][foundPiece.position.y + 1].ID);
    }

    if (chessBoard[foundPiece.position.x - 1] &&
    chessBoard[foundPiece.position.x - 1][foundPiece.position.y] &&
    chessBoard[foundPiece.position.x - 1][foundPiece.position.y].from !== foundPiece.from) {
        out.push(chessBoard[foundPiece.position.x - 1][foundPiece.position.y].ID);
    }

    if (chessBoard[foundPiece.position.x - 1] &&
    chessBoard[foundPiece.position.x - 1][foundPiece.position.y - 1] &&
    chessBoard[foundPiece.position.x - 1][foundPiece.position.y - 1].from !== foundPiece.from) {
        out.push(chessBoard[foundPiece.position.x - 1][foundPiece.position.y - 1].ID);
    }

    if (chessBoard[foundPiece.position.x] &&
    chessBoard[foundPiece.position.x][foundPiece.position.y - 1] &&
    chessBoard[foundPiece.position.x][foundPiece.position.y - 1].from !== foundPiece.from) {
        out.push(chessBoard[foundPiece.position.x][foundPiece.position.y - 1].ID);
    }

    if (chessBoard[foundPiece.position.x + 1] &&
    chessBoard[foundPiece.position.x + 1][foundPiece.position.y - 1] &&
    chessBoard[foundPiece.position.x + 1][foundPiece.position.y - 1].from !== foundPiece.from) {
        out.push(chessBoard[foundPiece.position.x + 1][foundPiece.position.y - 1].ID);
    }

    return out;
}

export default kingMoves;
