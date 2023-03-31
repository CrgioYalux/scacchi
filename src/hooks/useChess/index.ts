import { useState, useEffect } from 'react';
import { evaluateChessBoard, createChessBoard } from './utils';
import { findSquare, findPiece } from './moves/utils';
import { FENToChessState } from './parseFEN';

import type { ChessBoardSquare, ChessBoard } from './utils';

type ChessState = {
    chessBoard: ChessBoard,
    turn: 0 | 1,
    inCheck: number | null,
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
    const [inCheck, setInCheck] = useState<number | null>(null);
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        // Class chess
        // have a 64 size array with all updated pieces which allow to O(1) access pieces from ID,
        // but also the matrix which helps me with ops and displaying
        try {
            const chess = FENToChessState("8/8/8/3Qk3/3Kq3/8/8/8 b KQkq - 1 2");
            // const chess = FENToChessState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
            if (chess) {
                setChessBoard(chess.chessBoardState.chessBoard);
                setTurn(chess.chessBoardState.turn);
                setInCheck(chess.chessBoardState.inCheck);
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

        const prevChess = evaluateChessBoard({ chessBoard, inCheck, turn });
        const currChess = evaluateChessBoard({ chessBoard, inCheck, turn });

        if (prevChess.inCheck === currChess.inCheck) return;

        setChessBoard(currChess.chessBoard);
        setTurn(currChess.turn);
        setInCheck(currChess.inCheck);
    };

    const actions: ChessActions = {
        move,
    };

    return [
        { chessBoard, turn, inCheck },
        actions
    ];
};

export default useChess;
