import { useState } from 'react';
import { createChessBoard } from './utils';

import type { Point, ChessBoard } from './utils';

type ChessState = {
    chessBoard: ChessBoard,
};

type ChessActions = {
    move: (fromPosition: Point, toPosition: Point) => boolean;
};

type UseChessState = [
    state: ChessState,
    actions: ChessActions,
];

function useChess(): UseChessState {
    const [chessBoard, setChessBoard] = useState<ChessBoard>(() => createChessBoard());

    const actions: ChessActions = {
        move: (fromPosition: Point, toPosition: Point) => false,
    };

    return [
        { chessBoard },
        actions
    ];
};

export default useChess;
