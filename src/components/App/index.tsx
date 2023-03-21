import ProvidersWrapper from '../ProvidersWrapper';
import ChessBoard from '../ChessBoard';

import './App.css'

function App() {
    return (
        <ProvidersWrapper>
            <div className="App">
                <ChessBoard />
            </div>
        </ProvidersWrapper>
    );
};

export default App;
