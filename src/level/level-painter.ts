import WebGL from "../webgl/_old_"
import BaseLevelPainter from './base-level-painter'
import Level from "./level"
import { Assets } from "../assets"
import {assertImage, assertObject, assertString} from '../validator'

export default class LevelPainter extends BaseLevelPainter {
    private readonly count: Number
    private readonly texture: WebGLTexture

    constructor(
        gl: WebGLRenderingContext,
        private readonly level: Level,
        assets: Assets
    ) {
        super(gl)
        this.count = level.data.length / 6
        assertLevelAssets(assets)
        this.texture = WebGL.createTexture(gl, assets.levelTexture)
    }

    protected actualDestroy() {
        const { prg, gl } = this
        gl.deleteTexture(this.texture)
    }

    protected actualPaint(time: number): void {
        throw new Error("Method not implemented.")
    }
}

interface LevelAssets {
    levelTexture: HTMLImageElement
}

function assertLevelAssets(data: unknown): asserts data is LevelAssets {
    assertObject(data)
    const { levelVert, levelFrag, levelTexture } = data
    assertImage(levelTexture, "data.levelTexture")
}
