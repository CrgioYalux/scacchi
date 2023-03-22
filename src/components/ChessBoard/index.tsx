import { useChessProvider } from "../../providers/Chess";

import './ChessBoard.css';

interface ChessBoardProps {};

const ChessBoard: React.FC<ChessBoardProps> = () => {
    const { chess, context } = useChessProvider();

    return (
        <div className='ChessBoard'>
            {chess.state.chessBoard.map((row, i) => (
                <div key={i} className='ChessBoard__Row'>
                {row.map((square) => (
                    <div 
                        key={square.ID}
                        className='ChessBoard__Square'
                        onClick={() => context.actions.selectPiece(square.ID)}
                        style={context.state.highlightedSquares.filter((id) => id === square.ID).length
                        ? { outline: '2.5px dashed green', outlineOffset: '-5px' } : undefined}
                    >
                        {square.value}
                    </div>
                ))}
                </div>
            ))}
        </div>
    );
};

export default ChessBoard;
