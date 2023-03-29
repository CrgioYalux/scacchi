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
    move: (fromID: number, toID: number) => void;
};

type UseChessState = [
    state: ChessState,
    actions: ChessActions,
];

function useChess(): UseChessState {
    const [chessBoard, setChessBoard] = useState<ChessBoard>(() => createChessBoard());
    const [turn, setTurn] = useState<0 | 1>(0);
    const [inCheck, setInCheck] = useState<ChessBoardSquare | null>(null);
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        // const chess = FENToChess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
        try {
            const chess = FENToChess("8/8/8/3Qk3/3Kq3/8/8/8 b KQkq - 1 2");
            if (chess) {
                setChessBoard(chess.chessBoard);
                setTurn(chess.activeColor === 'w' ? 0 : 1);
            }
        } catch (e) {
            setErrors(prev => [...prev, 'Error parsing FEN: invalid FEN']);
        }
    }, []);

    const move = (fromID: number, toID: number): void => {
        const fromPiece = findPiece(chessBoard, fromID);
        const toSquare = findSquare(chessBoard, toID);

        if (!fromPiece || !toSquare) return;
        if (fromPiece.from !== turn) return;
        if (fromPiece.value === null) return;
        if (fromPiece.from === toSquare.from) return;
        if (!fromPiece.moves.find((ID) => ID === toSquare.ID)) return;

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
