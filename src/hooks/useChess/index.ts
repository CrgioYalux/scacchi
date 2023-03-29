import { useState, useEffect } from 'react';
import { evaluateChessBoard, createChessBoard } from './utils';
import { findSquare, findPiece } from './moves/utils';
import { FENToChess } from './parseFEN';

import type { ChessBoardSquare, ChessBoard } from './utils';

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
    const [chessBoard, setChessBoard] = useState<ChessBoard>(() => {
        const chess = FENToChess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
        // const chess = FENToChess("rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2");
        if (!chess) return createChessBoard()
        else return chess.chessBoard;
    });
    const [turn, setTurn] = useState<0 | 1>(0);
    const [inCheck, setInCheck] = useState<ChessBoardSquare | null>(null);

    const move = (fromID: number, toID: number): boolean => {
        const fromPiece = findPiece(chessBoard, fromID);
        const toSquare = findSquare(chessBoard, toID);

        if (!fromPiece || !toSquare) return false;
        if (fromPiece.from !== turn) return false;
        if (fromPiece.value === null) return false;
        if (fromPiece.from === toSquare.from) return false;
        if (!fromPiece.moves.find((ID) => ID === toSquare.ID)) return false;

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

        setChessBoard(evaluateChessBoard(chessBoard, inCheck));
        setTurn((prev) => prev === 0 ? 1 : 0);
        return true;
    };

    const actions: ChessActions = {
        move,
    };

    return [
        { chessBoard, turn },
        actions
    ];
};

export default useChess;
