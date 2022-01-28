export function pos2idx(position: string): number {
    return xy2idx(...pos2xy(position))
}

export function idx2pos(index: number): string {
    return xy2pos(...idx2xy(index))
}

export function pos2xy(position: string): [col: number, row: number] {
    const [file, rank] = position
    const col = "abcdefgh".indexOf(file)
    const row = "12345678".indexOf(rank)
    return [col, row]
}

export function xy2pos(col: number, row: number): string {
    return `${"abcdefgh".charAt(col)}${"12345678".charAt(row)}`
}

export function idx2xy(index: number): [col: number, row: number] {
    const col = index & 7
    const row = 7 - ((index - col) >> 3)
    return [col, row]
}

export function xy2idx(col: number, row: number): number {
    return col + ((7 - row) << 3)
}
