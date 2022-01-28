import { LevelDefinition, LevelTint } from "./levels"

const NB_ATTRIBS = 6

export default class Level {
    public static readonly VOID = 0
    public static readonly WALL = 1
    public static readonly HERO = 2
    public static readonly DUST = 3
    public static readonly ROCK = 4
    public static readonly DIAM = 5
    public static readonly EXIT = 6
    public static readonly EXP1 = 7
    public static readonly EXP2 = 8
    public static readonly MONS = 9
    public static readonly BOOM = 99

    public readonly data: Float32Array
    public readonly exitX: number
    public readonly exitY: number
    public readonly need: number
    public readonly tint: LevelTint
    public readonly rows: number
    public readonly cols: number

    private readonly flags: number[] = []
    private _heroX = 0
    private _heroY = 0

    constructor(private readonly levelDef: LevelDefinition) {
        const { flags } = this
        const { rows } = levelDef
        const data: number[] = []
        let diamCount = 0
        let heroCol = 0
        let heroRow = 0
        let exitCol = 0
        let exitRow = 0
        rows.forEach((row, y) => {
            for (let x = 0; x < row.length; x++) {
                flags.push(0)
                const char = row.charAt(x)
                let type = Level.VOID
                let index = 0
                switch (char) {
                    case " ":
                        type = Level.VOID
                        break
                    case "w":
                        type = Level.WALL
                        break
                    case ".":
                        type = Level.DUST
                        break
                    case "r":
                        type = Level.ROCK
                        index = Math.floor(16 * Math.random())
                        break
                    case "d":
                        diamCount++
                        type = Level.DIAM
                        index = Math.floor(16 * Math.random())
                        break
                    case "E":
                        type = Level.HERO
                        heroCol = x
                        heroRow = y
                        break
                    case "X":
                        type = Level.WALL
                        exitCol = x
                        exitRow = y
                        break
                    case "*":
                        type = Level.EXP1
                        break
                    case "@":
                        type = Level.MONS
                        break
                }
                data.push(type, x, y, 0, 0, index)
            }
        })
        this.data = new Float32Array(data)
        this.heroX = heroCol
        this.heroY = heroRow
        this.exitX = exitCol
        this.exitY = exitRow
        // Never need more diamonds that the ones present in this level.
        this.need = Math.min(levelDef.need, diamCount)
        this.tint = levelDef.tint
        this.rows = rows.length
        this.cols = rows[0].length

        //#(heroVXY)
        Object.defineProperty(this, "heroVX", {
            get: function () {
                return this.data[this.index(this.heroX, this.heroY) + 3]
            },
            set: function (v) {
                this.data[this.index(this.heroX, this.heroY) + 3] = v
            },
        })
        Object.defineProperty(this, "heroVY", {
            get: function () {
                return this.data[this.index(this.heroX, this.heroY) + 4]
            },
            set: function (v) {
                this.data[this.index(this.heroX, this.heroY) + 4] = v
            },
        })
        Object.defineProperty(this, "heroIndex", {
            get: function () {
                return this.data[this.index(this.heroX, this.heroY) + 5]
            },
            set: function (v) {
                this.data[this.index(this.heroX, this.heroY) + 5] = v
            },
        })
        //#(heroVXY)

        console.info("[level] cols, rows, data=", this.cols, this.rows, data)
    }

    public get heroX() {
        return this._heroX
    }
    private set heroX(value: number) {
        this._heroX = value
    }

    public get heroY() {
        return this._heroY
    }
    private set heroY(value: number) {
        this._heroY = value
    }

    public clone() {
        return new Level(this.levelDef)
    }

    public index(col: number, row: number): number {
        return NB_ATTRIBS * (row * this.cols + col)
    }

    public move(col1: number, row1: number, col2: number, row2: number) {
        const idx1 = this.index(col1, row1)
        const idx2 = this.index(col2, row2)
        const d = this.data
        const cell = d[idx1]
        if (cell === Level.VOID) return
        d[idx2 + 0] = cell // Type
        d[idx2 + 5] = d[idx1 + 5] // Index
        d[idx1 + 0] = Level.VOID
        if (cell === Level.ROCK || cell === Level.DIAM) {
            d[idx2 + 3] = d[idx1 + 3] // VX
            d[idx2 + 4] = d[idx1 + 4] // VY
        } else {
            d[idx2 + 3] = 0 // VX
            d[idx2 + 4] = 0 // VY
        }
        d[idx1 + 3] = 0 // VX
        d[idx1 + 4] = 0 // VY
    }

    public getType(col: number, row: number) {
        return this.data[this.index(col, row) + 0]
    }

    public setType(col: number, row: number, value: number) {
        this.data[this.index(col, row) + 0] = value
    }

    public getX(col: number, row: number) {
        return this.data[this.index(col, row) + 1]
    }

    public setX(col: number, row: number, x: number) {
        this.data[this.index(col, row) + 1] = x
    }

    public getY(col: number, row: number) {
        return this.data[this.index(col, row) + 2]
    }

    public setY(col: number, row: number, y: number) {
        this.data[this.index(col, row) + 2] = y
    }

    public getVX(col: number, row: number) {
        return this.data[this.index(col, row) + 3]
    }

    public setVX(col: number, row: number, vx: number) {
        this.data[this.index(col, row) + 3] = vx
    }

    public getVY(col: number, row: number) {
        return this.data[this.index(col, row) + 4]
    }

    public setVY(col: number, row: number, vy: number) {
        this.data[this.index(col, row) + 4] = vy
    }

    public setMove(col: number, row: number, vx: number, vy: number) {
        const idx = this.index(col, row)
        this.data[idx + 3] = vx
        this.data[idx + 4] = vy
    }

    public getIndex(col: number, row: number) {
        return this.data[this.index(col, row) + 5]
    }

    public setIndex(col: number, row: number, value: number) {
        this.data[this.index(col, row) + 5] = value
    }

    /**
     * Les flags sont des drapeaux que l'on met sur des cellules du tableau pour indiquer
     */
    public hasFlag(col: number, row: number) {
        const idx = this.cols * row + col
        return this.flags[idx]
    }

    public flag(col: number, row: number) {
        const idx = this.cols * row + col
        this.flags[idx] = 1
    }

    public unflag(col: number, row: number) {
        const idx = this.cols * row + col
        this.flags[idx] = 0
    }
}
