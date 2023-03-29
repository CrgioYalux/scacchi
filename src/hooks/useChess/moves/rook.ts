import { findPiece } from "./utils";

import type { ChessBoard } from "../utils";

function rookMoves(chessBoard: ChessBoard, squareID: number): number[] {
    const foundPiece = findPiece(chessBoard, squareID);
    
    if (!foundPiece) {
        return [];
    }

    if (foundPiece.value !== 'Rook') {
        return [];
    }

    const out: number[] = [];

    for (let i = 1; i < 8; i++) {
        if (!chessBoard[foundPiece.position.x + i] ||
            !chessBoard[foundPiece.position.x + i][foundPiece.position.y] ||
            chessBoard[foundPiece.position.x + i][foundPiece.position.y].from === foundPiece.from) break;

        out.push(chessBoard[foundPiece.position.x + i][foundPiece.position.y].ID);

        if (chessBoard[foundPiece.position.x + i][foundPiece.position.y].from !== null &&
            chessBoard[foundPiece.position.x + i][foundPiece.position.y].from !== foundPiece.from) break;
    }

    for (let i = 1; i < 8; i++) {
        if (!chessBoard[foundPiece.position.x - i] ||
            !chessBoard[foundPiece.position.x - i][foundPiece.position.y] || 
            chessBoard[foundPiece.position.x - i][foundPiece.position.y].from === foundPiece.from) break;

        out.push(chessBoard[foundPiece.position.x - i][foundPiece.position.y].ID);

        if (chessBoard[foundPiece.position.x - i][foundPiece.position.y].from !== null &&
            chessBoard[foundPiece.position.x - i][foundPiece.position.y].from !== foundPiece.from) break;
    }

    for (let i = 1; i < 8; i++) {
        if (!chessBoard[foundPiece.position.x][foundPiece.position.y + i] ||
            chessBoard[foundPiece.position.x][foundPiece.position.y + i].from === foundPiece.from) break;

        out.push(chessBoard[foundPiece.position.x][foundPiece.position.y + i].ID);

        if (chessBoard[foundPiece.position.x][foundPiece.position.y + i].from !== null &&
            chessBoard[foundPiece.position.x][foundPiece.position.y + i].from !== foundPiece.from) break;
    }

    for (let i = 1; i < 8; i++) {
        if (!chessBoard[foundPiece.position.x][foundPiece.position.y - i] ||
            chessBoard[foundPiece.position.x][foundPiece.position.y - i].from === foundPiece.from) break;

        out.push(chessBoard[foundPiece.position.x][foundPiece.position.y - i].ID);

        if (chessBoard[foundPiece.position.x][foundPiece.position.y - i].from !== null &&
            chessBoard[foundPiece.position.x][foundPiece.position.y - i].from !== foundPiece.from) break;
    }
    
    return out;
}

export default rookMoves;
