import { findPiece } from "./utils";

import type { ChessBoard } from "../utils";

function knightMoves(chessBoard: ChessBoard, squareID: number): number[] {
    const foundPiece = findPiece(chessBoard, squareID);
    
    if (!foundPiece) {
        return [];
    }

    if (foundPiece.value !== 'Knight') {
        return [];
    }

    const out: number[] = [];

    if (chessBoard[foundPiece.position.x + 2] &&
    chessBoard[foundPiece.position.x + 2][foundPiece.position.y + 1] 
    && foundPiece.from !== chessBoard[foundPiece.position.x + 2][foundPiece.position.y + 1].from
    ) {
        out.push(chessBoard[foundPiece.position.x + 2][foundPiece.position.y + 1].ID);
    }

    if (chessBoard[foundPiece.position.x + 2] &&
    chessBoard[foundPiece.position.x + 2][foundPiece.position.y - 1] 
    && foundPiece.from !== chessBoard[foundPiece.position.x + 2][foundPiece.position.y - 1].from
    ) {
        out.push(chessBoard[foundPiece.position.x + 2][foundPiece.position.y - 1].ID);
    }

    if (chessBoard[foundPiece.position.x + 1] &&
    chessBoard[foundPiece.position.x + 1][foundPiece.position.y + 2] 
    && foundPiece.from !== chessBoard[foundPiece.position.x + 1][foundPiece.position.y + 2].from
    ) {
        out.push(chessBoard[foundPiece.position.x + 1][foundPiece.position.y + 2].ID);
    }

    if (chessBoard[foundPiece.position.x + 1] &&
    chessBoard[foundPiece.position.x + 1][foundPiece.position.y - 2] 
    && foundPiece.from !== chessBoard[foundPiece.position.x + 1][foundPiece.position.y - 2].from
    ) {
        out.push(chessBoard[foundPiece.position.x + 1][foundPiece.position.y - 2].ID);
    }

    if (chessBoard[foundPiece.position.x - 2] &&
    chessBoard[foundPiece.position.x - 2][foundPiece.position.y + 1] 
    && foundPiece.from !== chessBoard[foundPiece.position.x - 2][foundPiece.position.y + 1].from
    ) {
        out.push(chessBoard[foundPiece.position.x - 2][foundPiece.position.y + 1].ID);
    }

    if (chessBoard[foundPiece.position.x - 2] &&
    chessBoard[foundPiece.position.x - 2][foundPiece.position.y - 1] 
    && foundPiece.from !== chessBoard[foundPiece.position.x - 2][foundPiece.position.y - 1].from
    ) {
        out.push(chessBoard[foundPiece.position.x - 2][foundPiece.position.y - 1].ID);
    }

    if (chessBoard[foundPiece.position.x - 1] &&
    chessBoard[foundPiece.position.x - 1][foundPiece.position.y + 2] 
    && foundPiece.from !== chessBoard[foundPiece.position.x - 1][foundPiece.position.y + 2].from
    ) {
        out.push(chessBoard[foundPiece.position.x - 1][foundPiece.position.y + 2].ID);
    }

    if (chessBoard[foundPiece.position.x - 1] &&
    chessBoard[foundPiece.position.x - 1][foundPiece.position.y - 2] 
    && foundPiece.from !== chessBoard[foundPiece.position.x - 1][foundPiece.position.y - 2].from
    ) {
        out.push(chessBoard[foundPiece.position.x - 1][foundPiece.position.y - 2].ID);
    }
    
    return out;
}

export default knightMoves;
