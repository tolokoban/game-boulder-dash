import { idx2pos, idx2xy, pos2idx, pos2xy, xy2idx, xy2pos } from "./position"

describe("position.ts", () => {
    describe("pos2xy()", () => {
        const cases: Array<
            [pos: string, expected: [col: number, row: number]]
        > = [
            ["a8", [0, 7]],
            ["h1", [7, 0]],
            ["a1", [0, 0]],
        ]
        cases.forEach(([pos, expected]) => {
            it(`should convert ${pos} into [${expected}]`, () => {
                expect(pos2xy(pos)).toEqual(expected)
            })
        })
    })
    describe("idx2xy()", () => {
        const cases: Array<
            [index: number, expected: [col: number, row: number]]
        > = [
            [0, [0, 7]],
            [63, [7, 0]],
            [56, [0, 0]],
        ]
        cases.forEach(([index, expected]) => {
            it(`should convert ${index} into [${expected}]`, () => {
                expect(idx2xy(index)).toEqual(expected)
            })
        })
    })
    describe("xy2idx()", () => {
        const cases: Array<
            [expected: number, input: [col: number, row: number]]
        > = [
            [0, [0, 7]],
            [63, [7, 0]],
            [56, [0, 0]],
        ]
        cases.forEach(([expected, input]) => {
            it(`should convert [${input}] into ${expected}`, () => {
                expect(xy2idx(...input)).toEqual(expected)
            })
        })
    })
    describe("xy2pos()", () => {
        const cases: Array<
            [expected: string, input: [col: number, row: number]]
        > = [
            ["a8", [0, 7]],
            ["h1", [7, 0]],
            ["a1", [0, 0]],
        ]
        cases.forEach(([expected, input]) => {
            it(`should convert [${input}] into ${expected}`, () => {
                expect(xy2pos(...input)).toEqual(expected)
            })
        })
    })
    describe("idx2pos()", () => {
        const cases: Array<[idx: number, pos: string]> = [
            [0, "a8"],
            [7, "h8"],
            [63, "h1"],
            [56, "a1"],
        ]
        cases.forEach(([input, expected]) => {
            it(`should convert ${input} into ${expected}`, () => {
                expect(idx2pos(input)).toEqual(expected)
            })
        })
    })
    describe("pos2idx()", () => {
        const cases: Array<[pos: string, idx: number]> = [
            ["a8", 0],
            ["h1", 63],
            ["a1", 56],
        ]
        cases.forEach(([input, expected]) => {
            it(`should convert ${input} into ${expected}`, () => {
                expect(pos2idx(input)).toEqual(expected)
            })
        })
    })
})
