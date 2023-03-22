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
    moves: ChessBoardSquare[],
    from: 0 | 1 | null,
};

type ChessBoard = ChessBoardSquare[][];

function evaluateChessBoard(chessBoard: ChessBoard): ChessBoard {
    return [];
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

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (i === 0 || i === 7) {
                if (out[i][j].value === 'Knight') {
                    out[i][j].moves = moves.knight(out, out[i][j].ID);
                }
                else if (out[i][j].value === 'Rook') {
                    out[i][j].moves = moves.rook(out, out[i][j].ID);
                }
                else if (out[i][j].value === 'Bishop') {
                    out[i][j].moves = moves.bishop(out, out[i][j].ID);
                }
                else if (out[i][j].value === 'Queen') {
                    out[i][j].moves = moves.queen(out, out[i][j].ID);
                }
                else if (out[i][j].value === 'King') {
                    out[i][j].moves = moves.king(out, out[i][j].ID);
                }
            }
            else if (i === 1 || i === 6) {
                out[i][j].moves = moves.pawn(out, out[i][j].ID);
            }
        }
    }

    return out;
};

export type { Point, ChessBoardSquareValue, ChessBoardSquare, ChessBoard };
export { createChessBoard };
