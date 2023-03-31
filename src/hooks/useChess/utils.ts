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

type ChessBoardState = {
    chessBoard: ChessBoard,
    inCheck: number | null,
    turn: 0 | 1,
};

function evaluateChessBoard(prev: ChessBoardState): ChessBoardState {
    const movesFrom0: number[] = [];
    const movesFrom1: number[] = [];
    let inCheck: number | null = null;

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (prev.chessBoard[i][j].value === 'Rook') {
                prev.chessBoard[i][j].moves = moves.rook(prev.chessBoard, prev.chessBoard[i][j].ID);
            }
            else if (prev.chessBoard[i][j].value === 'Knight') {
                prev.chessBoard[i][j].moves = moves.knight(prev.chessBoard, prev.chessBoard[i][j].ID);
            }
            else if (prev.chessBoard[i][j].value === 'Bishop') {
                prev.chessBoard[i][j].moves = moves.bishop(prev.chessBoard, prev.chessBoard[i][j].ID);
            }
            else if (prev.chessBoard[i][j].value === 'Queen') {
                prev.chessBoard[i][j].moves = moves.queen(prev.chessBoard, prev.chessBoard[i][j].ID);
            }
            else if (prev.chessBoard[i][j].value === 'King') {
                prev.chessBoard[i][j].moves = moves.king(prev.chessBoard, prev.chessBoard[i][j].ID);
            }
            else {
                prev.chessBoard[i][j].moves = moves.pawn(prev.chessBoard, prev.chessBoard[i][j].ID);
            }

            if (prev.chessBoard[i][j].from === 0) movesFrom0.push(...prev.chessBoard[i][j].moves)
            else movesFrom1.push(...prev.chessBoard[i][j].moves)
        }
    }

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (prev.chessBoard[i][j].value !== 'King') continue;
            for (let k = 0; k < (prev.turn === 0 ? movesFrom0.length : movesFrom1.length); k++) {
                const move = prev.turn === 0 ? movesFrom0[k] : movesFrom1[k];
                if (prev.chessBoard[i][j].ID === move) {
                    inCheck = prev.chessBoard[i][j].ID;
                }
            }
        }
    }

    return {
        chessBoard: prev.chessBoard,
        inCheck,
        turn: prev.turn === 0 ? 1 : 0,
    };
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

    return evaluateChessBoard({ chessBoard: out, turn: 0, inCheck: null }).chessBoard;
};

export type { Point, ChessBoardSquareValue, ChessBoardSquare, ChessBoard, ChessBoardState };
export { evaluateChessBoard, createChessBoard };
