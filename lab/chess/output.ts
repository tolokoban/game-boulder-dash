import Board from "./board"
const C = require("chalk")

const WHITE_CELL = C.bgGray("     ")
const BLACK_CELL = C.bgBlack("     ")
const WHITE_ROW = `${WHITE_CELL}${BLACK_CELL}${WHITE_CELL}${BLACK_CELL}${WHITE_CELL}${BLACK_CELL}${WHITE_CELL}${BLACK_CELL}`
const BLACK_ROW = `${BLACK_CELL}${WHITE_CELL}${BLACK_CELL}${WHITE_CELL}${BLACK_CELL}${WHITE_CELL}${BLACK_CELL}${WHITE_CELL}`

// const PIECES: { [key: string]: string } = {
//     p: "♟︎",
//     P: "♙",
//     b: "♝",
//     B: "♗",
//     n: "♞",
//     N: "♘",
//     r: "♜",
//     R: "♖",
//     q: "♛",
//     Q: "♕",
//     k: "♚",
//     K: "♔",
// }

const PIECES: { [key: string]: string } = {
    p: "o",
    P: "o",
    b: "B",
    B: "B",
    n: "N",
    N: "N",
    r: "R",
    R: "R",
    q: "Q",
    Q: "Q",
    k: "#",
    K: "#",
}

export function printBoard(board: Board) {
    let out = `     A    B    C    D    E    F    G    H   \n`
    let evenRank = true
    for (const rank of "87654321") {
        let evenFile = true
        if (evenRank) {
            out += `   ${WHITE_ROW}   \n`
        } else {
            out += `   ${BLACK_ROW}   \n`
        }
        out += ` ${rank} `
        for (const file of "abcdefgh") {
            const piece = board.get(`${file}${rank}`)
            let cell = C.bold(`  ${PIECES[piece] ?? ' '}  `)
            if (piece === piece.toLocaleLowerCase()) {
                cell = C.cyanBright(cell)
            } else {
                cell = C.yellowBright(cell)
            }
            if (evenFile === evenRank) cell = C.bgGray(cell)
            out += cell
            evenFile = !evenFile
        }
        out += ` ${rank} \n`
        if (evenRank) {
            out += `   ${WHITE_ROW}   \n`
        } else {
            out += `   ${BLACK_ROW}   \n`
        }
        evenRank = !evenRank
    }
    out += `     A    B    C    D    E    F    G    H   \n`
    console.log(out)
}

export function fill(text: string, count: number): string {
    let output = ""
    for (let i = 0; i < count; i++) output += text
    return output
}
