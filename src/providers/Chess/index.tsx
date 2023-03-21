import { createContext, useContext } from "react";
import useChess from "../../hooks/useChess";

type ChessContext = ReturnType<typeof useChess>;

const Chess = createContext<ChessContext>([
    {
        chessBoard: []
    },
    {}
]);

export const useChessProvider = () => useContext<ChessContext>(Chess);

interface ChessProviderProps {
    children: React.ReactNode;
};

const ChessProvider: React.FC<ChessProviderProps> = ({ children }) => {
    const chess = useChess();

    return (
        <Chess.Provider value={chess}>
            {children}
        </Chess.Provider>
    );
};

export default ChessProvider;
