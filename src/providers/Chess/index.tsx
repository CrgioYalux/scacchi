import { createContext, useContext, useState, useMemo } from "react";
import useChess from "../../hooks/useChess";

type ChessContext = {
    chess: {
        state: ReturnType<typeof useChess>[0],
        actions: ReturnType<typeof useChess>[1],
    },
    context: {
        state: {
            highlightedSquares: number[],
        },
        actions: {
            selectPiece: (pieceID: number) => void,
            move: (toID: number) => void,
        },
    }
}

const Chess = createContext<ChessContext>({
    chess: {
        state: {
            chessBoard: [],
            turn: 0,
        },
        actions: {
            move: () => false,
        }
    },
    context: {
        state: {
            highlightedSquares: [],
        },
        actions: {
            selectPiece: () => {},
            move: () => {},
        },
    },
});

export const useChessProvider = () => useContext<ChessContext>(Chess);

interface ChessProviderProps {
    children: React.ReactNode;
};

const ChessProvider: React.FC<ChessProviderProps> = ({ children }) => {
    const [state, actions] = useChess();
    const [selectedPieceID, setSelectedPieceID] = useState<number | null>(null);
    const highlightedSquares = useMemo<number[]>(() => {
        let out: number[] = [];

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (state.chessBoard[i][j].ID === selectedPieceID &&
                    state.chessBoard[i][j].from === state.turn) {
                    out = state.chessBoard[i][j].moves.map((p) => p.ID);
                }
            }
        }

        return out;
    }, [selectedPieceID]);

    const selectPiece = (pieceID: number) => {
        setSelectedPieceID(pieceID);
    };

    const move = (toID: number) => {
        if (selectedPieceID === null) return;
        actions.move(selectedPieceID, toID);
        setSelectedPieceID(null);
    };

    const value: ChessContext = {
        chess: {
            state, actions,
        },
        context: {
            state: { highlightedSquares },
            actions: { 
                selectPiece,
                move,
            },
        },
    };

    return (
        <Chess.Provider value={value}>
            {children}
        </Chess.Provider>
    );
};

export default ChessProvider;
