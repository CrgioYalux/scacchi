import { useState } from 'react';
import { evaluateChessBoard, createChessBoard } from './utils';
import { findSquare, findPiece } from './moves/utils';

import type { ChessBoard } from './utils';

type ChessState = {
    chessBoard: ChessBoard,
};

type ChessActions = {
    move: (fromID: number, toID: number) => boolean;
};

type UseChessState = [
    state: ChessState,
    actions: ChessActions,
];

function useChess(): UseChessState {
    const [chessBoard, setChessBoard] = useState<ChessBoard>(() => createChessBoard());

    const move = (fromID: number, toID: number): boolean => {
        const fromPiece = findPiece(chessBoard, fromID);
        const toSquare = findSquare(chessBoard, toID);

        if (!fromPiece || !toSquare) return false;
        if (fromPiece.value === null) return false;
        if (fromPiece.from === toSquare.from) return false;
        if (!fromPiece.moves.find((m) => m.ID === toSquare.ID)) return false;

        chessBoard[toSquare.position.x][toSquare.position.y] = {
            ID: toSquare.ID,
            position: toSquare.position,
            moves: [],
            from: fromPiece.from,
            value: fromPiece.value,
        };

        chessBoard[fromPiece.position.x][fromPiece.position.y] = {
            ID: fromPiece.ID,
            position: fromPiece.position,
            moves: [],
            from: null,
            value: null,
        };

        setChessBoard(evaluateChessBoard(chessBoard));
        return true;
    }

    const actions: ChessActions = {
        move,
    };

    return [
        { chessBoard },
        actions
    ];
};

export default useChess;
