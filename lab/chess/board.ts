import { idx2pos, idx2xy, pos2idx, xy2idx, xy2pos } from './position'

type IPiece =
    | "q"
    | "k"
    | "r"
    | "n"
    | "b"
    | "p"
    | "Q"
    | "K"
    | "R"
    | "N"
    | "B"
    | "P"
    | " "

type ICol = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h"
type IRow = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"
type IPosition = `${ICol}${IRow}`
interface IMove {
    from: string
    to: string
    piece: IPiece
    kill?: IPiece
    promotion?: IPiece
}

export default class Board {
    private grid = fenToGrid("rnbqkbnrpppppppp8888PPPPPPPPRNBQKBNR")
    private whiteToMove = true

    public get(position: string): IPiece {
        return this.grid[pos2idx(position)]
    }

    public importFen(fen: string) {
        this.grid = fenToGrid(fen)
    }

    public findMovesFrom(position: string): IMove[] {
        const index = pos2idx(position)
        const piece = this.grid[index]
        if (piece === " ") return []

        const moves: IMove[] = []
        switch (piece) {
            case "P":
                return this.findWhitePawnMovesFrom(index)
        }
        return moves
    }

    private findWhitePawnMovesFrom(index: number): IMove[] {
        const [col, row] = idx2xy(index)
        if (row === 7) return []
        const moves: IMove[] = []
        const front = this.grid[xy2idx(col, row+1)]
        if (isEmpty(front)) {
            moves.push({
                piece: "P",
                from: idx2pos(index),
                to: xy2pos(col, row+1),
            
            })
        }
    }
}

function isEmpty(piece: string): boolean {
    return !isWhite(piece) && !isBlack(piece)
}

function isWhite(piece: string): boolean {
    return "PBNRQK".includes(piece)
}

function isBlack(piece: string): boolean {
    return "pbnrqk".includes(piece)
}

/**
 * Fillup a grid of 64 (8x8) with `fen` string starting from a8, b8, ... to h1.
 * Chars in "qkrnbpQKRNBP" represents chess pieces.
 * Chars in "12345678" represent consecutive empty cells.
 */
function fenToGrid(fen: string): IPiece[] {
    const grid: IPiece[] = []
    for (const c of fen) {
        if ("qkrnbpQKRNBP".includes(c)) grid.push(c as IPiece)
        else if ("12345678".includes(c)) {
            for (let i = 0; i < parseInt(c, 10); i++) {
                grid.push(" ")
            }
        }
    }
    while (grid.length < 64) grid.push(" ")
    return grid
}
