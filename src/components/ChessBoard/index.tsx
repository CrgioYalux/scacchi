import { useChessProvider } from "../../providers/Chess";

import './ChessBoard.css';

interface ChessBoardProps {};

const ChessBoard: React.FC<ChessBoardProps> = () => {
    const [state] = useChessProvider();

    return (
        <div className='ChessBoard'>
            {state.chessBoard.map((row, i) => (
                <div key={i} className='ChessBoard__Row'>
                {row.map((square) => (
                    <div key={square.id} className='ChessBoard__Square'>
                        {square.value}
                    </div>
                ))}
                </div>
            ))}
        </div>
    );
};


export default ChessBoard;
