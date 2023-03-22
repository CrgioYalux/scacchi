import { useState } from 'react';
import { evaluateChessBoard, createChessBoard } from './utils';
import { findSquare, findPiece } from './moves/utils';

import type { ChessBoard } from './utils';

type ChessState = {
    chessBoard: ChessBoard,
    turn: 0 | 1,
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
    const [turn, setTurn] = useState<0 | 1>(0);

    const move = (fromID: number, toID: number): boolean => {
        const fromPiece = findPiece(chessBoard, fromID);
        const toSquare = findSquare(chessBoard, toID);

        if (!fromPiece || !toSquare) return false;
        if (fromPiece.from !== turn) return false;
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
        setTurn((prev) => prev === 0 ? 1 : 0);
        return true;
    }

    const actions: ChessActions = {
        move,
    };

    return [
        { chessBoard, turn },
        actions
    ];
};

export default useChess;
