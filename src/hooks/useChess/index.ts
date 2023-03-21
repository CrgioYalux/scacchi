import { useState } from 'react';

type Point = {
    x: number,
    y: number,
};

const FirstRowPieces = ['Rook', 'Knight', 'Bishop', 'Queen', 'King', 'Bishop', 'Knight', 'Rook'] as const;

const ChessBoardSquareValues = ['Pawn', 'Rook', 'Knight', 'Bishop', 'Queen', 'King', null] as const;
type ChessBoardSquareValue = typeof ChessBoardSquareValues[number];

type ChessBoardSquare = {
    id: number,
    position: Point,
    value: ChessBoardSquareValue,
    canMoveTo: ChessBoardSquare[],
    from: 0 | 1 | null,
};

type ChessBoard = ChessBoardSquare[][];

function createChessBoard(): ChessBoard {
    const out: ChessBoard = [];

    for (let i = 0; i < 8; i++) {
        const row: ChessBoardSquare[] = [];
        for (let j = 0; j < 8; j++) {
            if (i === 0 || i === 7) {
                row.push({
                    id: i * 8 + j,
                    position: { x: i, y: j },
                    value: FirstRowPieces[j],
                    canMoveTo: [],
                    from: i === 0 ? 0 : 1,
                });
            }
            else if (i === 1 || i === 6) {
                row.push({
                    id: i * 8 + j,
                    position: { x: i, y: j },
                    value: 'Pawn',
                    canMoveTo: [],
                    from: i === 1 ? 0 : 1,
                });
            }
            else {
                row.push({
                    id: i * 8 + j,
                    position: { x: i, y: j },
                    value: null,
                    canMoveTo: [],
                    from: null,
                });
            }
        }
        out.push(row);
    }

    return out;
};

type ChessState = {
    chessBoard: ChessBoard,
};

type ChessActions = {

};

type UseChessState = [
    state: ChessState,
    actions: ChessActions,
];

function useChess(): UseChessState {
    const [chessBoard, setChessBoard] = useState<ChessBoard>(() => createChessBoard());
    
    return [
        { chessBoard },
        {}
    ];
};

export default useChess;
