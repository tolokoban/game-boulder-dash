#!/usr/bin/env ts-node

import Board from "./board"
import { printBoard } from "./output"

const board = new Board()
board.importFen("2q3n1/6nK/3p1rP1/4P1p1/2pk3p/Q3R3/2PN1RBB/1brN4")
printBoard(board)
