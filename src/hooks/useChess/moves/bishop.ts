import { findPiece } from "./utils";

import type { ChessBoard, ChessBoardSquare } from "../utils";

function bishopMoves(chessBoard: ChessBoard, squareID: number): ChessBoardSquare[] {
    const foundPiece = findPiece(chessBoard, squareID);
    
    if (!foundPiece) {
        return [];
    }

    if (foundPiece.value !== 'Bishop') {
        return [];
    }

    const out: ChessBoardSquare[] = [];

    for (let i = 1; i < 8; i++) {
        if (!chessBoard[foundPiece.position.x + i] ||
            !chessBoard[foundPiece.position.x + i][foundPiece.position.y + i] ||
            chessBoard[foundPiece.position.x + i][foundPiece.position.y + i].from === foundPiece.from) break;

        out.push(chessBoard[foundPiece.position.x + i][foundPiece.position.y + i]);

        if (chessBoard[foundPiece.position.x + i][foundPiece.position.y + i].from !== null &&
            chessBoard[foundPiece.position.x + i][foundPiece.position.y + i].from !== foundPiece.from) break;
    }

    for (let i = 1; i < 8; i++) {
        if (!chessBoard[foundPiece.position.x - i] ||
            !chessBoard[foundPiece.position.x - i][foundPiece.position.y - i] || 
            chessBoard[foundPiece.position.x - i][foundPiece.position.y - i].from === foundPiece.from) break;

        out.push(chessBoard[foundPiece.position.x - i][foundPiece.position.y - i]);

        if (chessBoard[foundPiece.position.x - i][foundPiece.position.y - i].from !== null &&
            chessBoard[foundPiece.position.x - i][foundPiece.position.y - i].from !== foundPiece.from) break;
    }

    for (let i = 1; i < 8; i++) {
        if (!chessBoard[foundPiece.position.x + i] ||
            !chessBoard[foundPiece.position.x + i][foundPiece.position.y - i] ||
            chessBoard[foundPiece.position.x + i][foundPiece.position.y - i].from === foundPiece.from) break;

        out.push(chessBoard[foundPiece.position.x + i][foundPiece.position.y - i]);

        if (chessBoard[foundPiece.position.x + i][foundPiece.position.y - i].from !== null &&
            chessBoard[foundPiece.position.x + i][foundPiece.position.y - i].from !== foundPiece.from) break;
    }

    for (let i = 1; i < 8; i++) {
        if (!chessBoard[foundPiece.position.x - i] || 
            !chessBoard[foundPiece.position.x - i][foundPiece.position.y + i] ||
            chessBoard[foundPiece.position.x - i][foundPiece.position.y + i].from === foundPiece.from) break;

        out.push(chessBoard[foundPiece.position.x - i][foundPiece.position.y + i]);

        if (chessBoard[foundPiece.position.x - i][foundPiece.position.y + i].from !== null &&
            chessBoard[foundPiece.position.x - i][foundPiece.position.y + i].from !== foundPiece.from) break;
    }

    
    return out;
}

export default bishopMoves;
