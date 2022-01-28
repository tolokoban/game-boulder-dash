import Program from "./program"
import "./webgl.css"

function fillArrayBuffer(
    gl: WebGLRenderingContext,
    vertices: Float32Array
): WebGLBuffer {
    const buff = gl.createBuffer()
    if (!buff) throw Error("Unable to create a new WebGL buffer!")

    gl.bindBuffer(gl.ARRAY_BUFFER, buff)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    return buff
}

function fillElementBuffer(
    gl: WebGLRenderingContext,
    elements: Uint16Array
): WebGLBuffer {
    const buff = gl.createBuffer()
    if (!buff) throw Error("Unable to create a new WebGL buffer!")

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buff)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, elements, gl.STATIC_DRAW)
    return buff
}

function createTexture(
    gl: WebGLRenderingContext,
    img: HTMLImageElement | HTMLCanvasElement
): WebGLTexture {
    const texture = gl.createTexture()
    if (!texture) throw Error("Unable to create a new WebGL texture!")

    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
    // On charge l'image dans la texture de la carte graphique.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
    return texture
}

const defaultExport = {
    Program,
    createTexture,
    fillArrayBuffer,
    fillElementBuffer,
}

export default defaultExport
