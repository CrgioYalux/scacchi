import type { ChessBoardSquare, ChessBoard } from "../utils";

function findPiece(chessBoard: ChessBoard, squareID: number): ChessBoardSquare | null {
    let out: ChessBoardSquare | null = null;

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (chessBoard[i][j].ID === squareID && chessBoard[i][j].value !== null) {
                out = chessBoard[i][j];
            }
        }
    }
    
    return out;
}

export { findPiece };
