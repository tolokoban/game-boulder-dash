import { ReferenceCounter } from "../ref-counter"
import { Shaders, ShaderIncludes } from "../types"
import { parseIncludes } from "./parse-includes"
import { getFragmentShader, getVertexShader } from "./shader"

const programsRefCounter = new ReferenceCounter<string>()
const programsMap = new Map<
    string,
    {
        shaderProgram: WebGLProgram
        shaderVert: WebGLShader
        shaderFrag: WebGLShader
    }
>()
const programsKeys = new Map<WebGLProgram, string>()

export function createProgram(
    gl: WebGL2RenderingContext,
    shaders: Shaders,
    includes: ShaderIncludes = {}
): WebGLProgram {
    const { vert, frag } = parseIncludes(shaders, includes)
    const key = JSON.stringify({ vert, frag })
    programsRefCounter.add(gl, key)
    const cache = programsMap.get(key)
    if (cache) {
        return cache.shaderProgram
    }

    const shaderProgram = gl.createProgram()
    if (!shaderProgram) {
        throw Error("Unable to create a WebGL Program!")
    }
    const shaderVert = getVertexShader(gl, vert)
    const shaderFrag = getFragmentShader(gl, frag)
    gl.attachShader(shaderProgram, shaderVert)
    gl.attachShader(shaderProgram, shaderFrag)
    gl.linkProgram(shaderProgram)
    programsMap.set(key, {
        shaderProgram,
        shaderVert,
        shaderFrag,
    })
    programsKeys.set(shaderProgram, key)
    return shaderProgram
}

export function deleteProgram(
    gl: WebGL2RenderingContext,
    prg: WebGLProgram
) {
    const key = programsKeys.get(prg)
    if(!key) return

    const cache = programsMap.get(key)
    if (!cache) return

    const count = programsRefCounter.remove(gl, key)
    if (count > 0) return

    const { shaderProgram, shaderVert, shaderFrag } = cache
    gl.detachShader(shaderProgram, shaderVert)
    gl.deleteShader(shaderVert)
    gl.detachShader(shaderProgram, shaderFrag)
    gl.deleteShader(shaderFrag)
    gl.deleteProgram(shaderProgram)
}
