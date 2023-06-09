import { useChessProvider } from "../../providers/Chess";

import './ChessBoard.css';

interface ChessBoardProps {};

const ChessBoard: React.FC<ChessBoardProps> = () => {
    const { chess, context } = useChessProvider();

    return (
        <div className='ChessBoard'>
            {chess.state.chessBoard.map((row, i) => (
                <div key={i} className='ChessBoard__Row'>
                {row.map((square) => {
                    const isHighlighted = context.state.highlightedSquares.filter((id) => id === square.ID).length === 1;
                    const isInCheck = square.ID === chess.state.inCheck;
                    return (
                        <div 
                            data-id={square.ID}
                            data-position={`${square.position.x}${square.position.y}`}
                            key={square.ID}
                            className='ChessBoard__Square'
                            onClick={() => {
                                if (isHighlighted) context.actions.move(square.ID);
                                else context.actions.selectPiece(square.ID)
                            }}
                            style={{
                                ...isHighlighted ? { outline: '2.5px dashed green', outlineOffset: '-5px' } : undefined, 
                                ...isInCheck ? { color: 'white', backgroundColor: 'rgba(240, 0, 0, .7)' } : undefined,
                                }}
                        >
                            {square.value && `${square.value}${square.from}`}
                        </div>
                    )
                })}
                </div>
            ))}
        </div>
    );
};

export default ChessBoard;
