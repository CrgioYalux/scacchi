import { Point, ChessBoardSquare, ChessBoardSquareValue, ChessBoard, evaluateChessBoard } from './utils';

type CastingAvailability = {
    K: boolean,
    Q: boolean,
    k: boolean,
    q: boolean,
}

type Chess = {
    chessBoard: ChessBoard,
    activeColor: 'w' | 'b',
    castingAvailability: CastingAvailability,
    enPassantTargetSquare: string,
    halfMoveClock: number,
    fullMoveNumber: number,
};

function FENPieceToChessBoardSquareValue(FENPiece: string): ChessBoardSquareValue | undefined {
    if (FENPiece.toLowerCase() === 'r') return 'Rook'
    if (FENPiece.toLowerCase() === 'n') return 'Knight'
    if (FENPiece.toLowerCase() === 'b') return 'Bishop'
    if (FENPiece.toLowerCase() === 'q') return 'Queen'
    if (FENPiece.toLowerCase() === 'k') return 'King'
    if (FENPiece.toLowerCase() === 'p') return 'Pawn'
    return undefined;
}

function isCharInUpperCase(ch: string): boolean | undefined {
    const upperCaseChars: number[] = new Array(26).fill(65).map((c, i) => c + i);
    const lowerCaseChars: number[] = new Array(26).fill(97).map((c, i) => c + i);

    if (upperCaseChars.findIndex((c) => c === ch.charCodeAt(0)) !== -1) return true
    if (lowerCaseChars.findIndex((c) => c === ch.charCodeAt(0)) !== -1) return false
    else return undefined;
}

function piecePlacementDataToChessBoard(piecePlacementData: string): ChessBoard | undefined {
    const rows = piecePlacementData.split('/');
    if (rows.length !== 8) return undefined;

    const out: ChessBoard = [];

    for (let i = 0; i < 8; i++) {
        const boardRow: ChessBoardSquare[] = [];
        const pieces = rows[i].split('');
        let usingNewIndex = false;
        let newIndex = 0;

        for (let j = 0; j < 8; j++) {
            if (j === pieces.length) break;

            const ID: number = usingNewIndex ? (i * 8 + newIndex) : (i * 8 + j);
            const position: Point = usingNewIndex ? { x: i, y: newIndex } : { x: i, y: j };
            const moves: number[] = [];
            const from: 0 | 1 | null = isCharInUpperCase(pieces[j]) ? 0 : 1;
            const value: ChessBoardSquareValue = FENPieceToChessBoardSquareValue(pieces[j]) ?? null;

            const numPieces = Number(pieces[j]);

            if (pieces.length !== 8 && isNaN(numPieces) === false) {
                const emptySquares: ChessBoardSquare[] = new Array(numPieces).fill(null).map((v, k) => {
                    return {
                        ID: ID + k,
                        position: usingNewIndex ? { x: i, y: newIndex + k } : { x: i, y: k },
                        moves,
                        from: v,
                        value: v,
                    };
                });
                boardRow.push(...emptySquares);

                newIndex = numPieces + j;
                usingNewIndex = true;
                continue;
            }

            boardRow.push({
                ID,
                position,
                moves,
                from,
                value,
            });

            if (usingNewIndex) {
                newIndex++;
            }
        }
        
        out.push(boardRow);
    }

    return out;
}

function stringToCastingAvailability(str: string): CastingAvailability | undefined {
    const chars = str.split('');

    if (chars.length === 0 ||
       (chars.length === 1 && chars[0] !== '-') || 
        (!chars.find(ch => ch === 'K') &&
        !chars.find(ch => ch === 'Q') &&
        !chars.find(ch => ch === 'k') &&
        !chars.find(ch => ch === 'q'))) return undefined;

    if (chars[0] === '-') return { K: false, Q: false, k: false, q: false };
    
    let K: boolean = false;
    let Q: boolean = false;
    let k: boolean = false;
    let q: boolean = false;

    for (let i = 0; i < chars.length; i++) {
        if (chars[i] === 'K') {
            K = true;
        }
        else if (chars[i] === 'Q') {
            Q = true;
        }
        else if (chars[i] === 'k') {
            k = true;
        }
        else if (chars[i] === 'q') {
            q = true;
        }
    }

    return { K, Q, k, q };
}

function FENToChess(FEN: string): Chess | undefined {

    // FEN for a starting position 
    // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1

    const minimunFEN = "8/8/8/8/8/8/8/8 w - - 0 1";
    if (FEN.length < minimunFEN.length) return undefined;
    
    const fields = FEN.split(' ');

    const piecePlacementDataParsed = piecePlacementDataToChessBoard(fields[0]);
    if (!piecePlacementDataParsed) return undefined;
    const chessBoard = evaluateChessBoard(piecePlacementDataParsed, null);

    const activeColor = fields[1];
    if (!activeColor || (activeColor !== 'w' && activeColor !== 'b')) return undefined;

    const castingAvailability = stringToCastingAvailability(fields[2]);
    if (!castingAvailability) return undefined;

    // const enPassantTargetSquare = fields[3];
    const enPassantTargetSquare = fields[3];
    if (!enPassantTargetSquare) return undefined;

    const halfMoveClock = Number(fields[4]);
    if (isNaN(halfMoveClock)) return undefined;

    const fullMoveNumber = Number(fields[5]);
    if (isNaN(halfMoveClock)) return undefined;

    return {
        chessBoard,
        activeColor,
        castingAvailability,
        enPassantTargetSquare,
        halfMoveClock,
        fullMoveNumber,
    };
}

export type { CastingAvailability, Chess };
export { FENToChess };
