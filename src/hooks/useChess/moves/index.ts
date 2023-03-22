import pawnMoves from "./pawn";
import knightMoves from "./knight";
import rookMoves from "./rook";
import bishopMoves from "./bishop";
import queenMoves from "./queen";
import kingMoves from "./king";

const moves = {
    pawn: pawnMoves,
    knight: knightMoves,
    rook: rookMoves,
    bishop: bishopMoves,
    queen: queenMoves,
    king: kingMoves,
};

export default moves;
