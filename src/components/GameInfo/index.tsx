import { useChessProvider } from '../../providers/Chess';

interface GameInfoProps {};

const Players = ['White', 'Black'] as const;

const GameInfo: React.FC<GameInfoProps> = () => {
    const { chess } = useChessProvider();

    return (
        <div>
            <strong>{Players[chess.state.turn]}'s Turn</strong>
        </div>
    );
};

export default GameInfo;
