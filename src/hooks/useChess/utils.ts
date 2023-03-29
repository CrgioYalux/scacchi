import moves from './moves';

type Point = {
    x: number,
    y: number,
};

const FirstRowPieces = ['Rook', 'Knight', 'Bishop', 'Queen', 'King', 'Bishop', 'Knight', 'Rook'] as const;

const ChessBoardSquareValues = ['Pawn', 'Rook', 'Knight', 'Bishop', 'Queen', 'King', null] as const;
type ChessBoardSquareValue = typeof ChessBoardSquareValues[number];

type ChessBoardSquare = {
    ID: number,
    position: Point,
    value: ChessBoardSquareValue,
    moves: number[],
    from: 0 | 1 | null,
};

type ChessBoard = ChessBoardSquare[][];

function evaluateChessBoard(chessBoard: ChessBoard, inCheck: ChessBoardSquare | null): ChessBoard {
    const movesFrom0: number[] = [];
    const movesFrom1: number[] = [];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (chessBoard[i][j].value === 'Rook') {
                chessBoard[i][j].moves = moves.rook(chessBoard, chessBoard[i][j].ID);
            }
            else if (chessBoard[i][j].value === 'Knight') {
                chessBoard[i][j].moves = moves.knight(chessBoard, chessBoard[i][j].ID);
            }
            else if (chessBoard[i][j].value === 'Bishop') {
                chessBoard[i][j].moves = moves.bishop(chessBoard, chessBoard[i][j].ID);
            }
            else if (chessBoard[i][j].value === 'Queen') {
                chessBoard[i][j].moves = moves.queen(chessBoard, chessBoard[i][j].ID);
            }
            else if (chessBoard[i][j].value === 'King') {
                chessBoard[i][j].moves = moves.king(chessBoard, chessBoard[i][j].ID);
            }
            else {
                chessBoard[i][j].moves = moves.pawn(chessBoard, chessBoard[i][j].ID);
            }

            if (chessBoard[i][j].from === 0) movesFrom0.push(...chessBoard[i][j].moves)
            else movesFrom1.push(...chessBoard[i][j].moves)
        }
    }


    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
        }
    }
    return chessBoard;
}

function createChessBoard(): ChessBoard {
    const out: ChessBoard = [];

    for (let i = 0; i < 8; i++) {
        const row: ChessBoardSquare[] = [];

        for (let j = 0; j < 8; j++) {
            if (i === 0 || i === 7) {
                row.push({
                    ID: i * 8 + j,
                    position: { x: i, y: j },
                    value: FirstRowPieces[j],
                    moves: [],
                    from: i === 0 ? 0 : 1,
                });
            }
            else if (i === 1 || i === 6) {
                row.push({
                    ID: i * 8 + j,
                    position: { x: i, y: j },
                    value: 'Pawn',
                    moves: [],
                    from: i === 1 ? 0 : 1,
                });
            }
            else {
                row.push({
                    ID: i * 8 + j,
                    position: { x: i, y: j },
                    value: null,
                    moves: [],
                    from: null,
                });
            }
        }

        out.push(row);
    }

    return evaluateChessBoard(out, null);
};

export type { Point, ChessBoardSquareValue, ChessBoardSquare, ChessBoard };
export { evaluateChessBoard, createChessBoard };
