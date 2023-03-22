import ProvidersWrapper from '../ProvidersWrapper';
import ChessBoard from '../ChessBoard';
import GameInfo from '../GameInfo';

import './App.css'

function App() {
    return (
        <ProvidersWrapper>
        <div className="App">
                <GameInfo />
                <ChessBoard />
            </div>
        </ProvidersWrapper>
    );
};

export default App;
