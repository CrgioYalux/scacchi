import { findPiece } from "./utils";

import type { ChessBoard, ChessBoardSquare } from "../utils";

function knightMoves(chessBoard: ChessBoard, squareID: number): ChessBoardSquare[] {
    const foundPiece = findPiece(chessBoard, squareID);
    
    if (!foundPiece) {
        return [];
    }

    if (foundPiece.value !== 'Knight') {
        return [];
    }

    const out: ChessBoardSquare[] = [];

    if (chessBoard[foundPiece.position.x + 2] &&
    chessBoard[foundPiece.position.x + 2][foundPiece.position.y + 1] 
    && foundPiece.from !== chessBoard[foundPiece.position.x + 2][foundPiece.position.y + 1].from
    ) {
        out.push(chessBoard[foundPiece.position.x + 2][foundPiece.position.y + 1]);
    }

    if (chessBoard[foundPiece.position.x + 2] &&
    chessBoard[foundPiece.position.x + 2][foundPiece.position.y - 1] 
    && foundPiece.from !== chessBoard[foundPiece.position.x + 2][foundPiece.position.y - 1].from
    ) {
        out.push(chessBoard[foundPiece.position.x + 2][foundPiece.position.y - 1]);
    }

    if (chessBoard[foundPiece.position.x + 1] &&
    chessBoard[foundPiece.position.x + 1][foundPiece.position.y + 2] 
    && foundPiece.from !== chessBoard[foundPiece.position.x + 1][foundPiece.position.y + 2].from
    ) {
        out.push(chessBoard[foundPiece.position.x + 1][foundPiece.position.y + 2]);
    }

    if (chessBoard[foundPiece.position.x + 1] &&
    chessBoard[foundPiece.position.x + 1][foundPiece.position.y - 2] 
    && foundPiece.from !== chessBoard[foundPiece.position.x + 1][foundPiece.position.y - 2].from
    ) {
        out.push(chessBoard[foundPiece.position.x + 1][foundPiece.position.y - 2]);
    }

    if (chessBoard[foundPiece.position.x - 2] &&
    chessBoard[foundPiece.position.x - 2][foundPiece.position.y + 1] 
    && foundPiece.from !== chessBoard[foundPiece.position.x - 2][foundPiece.position.y + 1].from
    ) {
        out.push(chessBoard[foundPiece.position.x - 2][foundPiece.position.y + 1]);
    }

    if (chessBoard[foundPiece.position.x - 2] &&
    chessBoard[foundPiece.position.x - 2][foundPiece.position.y - 1] 
    && foundPiece.from !== chessBoard[foundPiece.position.x - 2][foundPiece.position.y - 1].from
    ) {
        out.push(chessBoard[foundPiece.position.x - 2][foundPiece.position.y - 1]);
    }

    if (chessBoard[foundPiece.position.x - 1] &&
    chessBoard[foundPiece.position.x - 1][foundPiece.position.y + 2] 
    && foundPiece.from !== chessBoard[foundPiece.position.x - 1][foundPiece.position.y + 2].from
    ) {
        out.push(chessBoard[foundPiece.position.x - 1][foundPiece.position.y + 2]);
    }

    if (chessBoard[foundPiece.position.x - 1] &&
    chessBoard[foundPiece.position.x - 1][foundPiece.position.y - 2] 
    && foundPiece.from !== chessBoard[foundPiece.position.x - 1][foundPiece.position.y - 2].from
    ) {
        out.push(chessBoard[foundPiece.position.x - 1][foundPiece.position.y - 2]);
    }
    
    return out;
}

export default knightMoves;
