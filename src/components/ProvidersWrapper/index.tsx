import ChessProvider from "../../providers/Chess";

interface ProvidersWrapperProps {
    children: React.ReactNode;
};

const ProvidersWrapper: React.FC<ProvidersWrapperProps> = ({ children }) => {
    return (
        <ChessProvider>
            {children}
        </ChessProvider>
    );
};

export default ProvidersWrapper;
