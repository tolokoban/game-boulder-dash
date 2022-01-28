export function createBuffer(gl: WebGLRenderingContext): WebGLBuffer {
    const buff = gl.createBuffer()
    if (!buff) throw Error("Unable to create a new WebGL buffer!")

    return buff
}

/**
 * The contents are intended to be specified once by the application,
 * and used many times as the source for WebGL drawing and image
 * specification commands. 
 */
export function createArrayBufferStatic(
    gl: WebGLRenderingContext,
    data: Float32Array
): WebGLBuffer {
    const buff = createBuffer(gl)
    if (!buff) throw Error("Unable to create a new WebGL buffer!")

    gl.bindBuffer(gl.ARRAY_BUFFER, buff)
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
    return buff
}

/**
 * The contents are intended to be respecified repeatedly by the application,
 * and used many times as the source for WebGL drawing and image
 * specification commands. 
 */
export function createArrayBufferDynamic(
    gl: WebGLRenderingContext,
    data: Float32Array
): WebGLBuffer {
    const buff = createBuffer(gl)
    if (!buff) throw Error("Unable to create a new WebGL buffer!")

    gl.bindBuffer(gl.ARRAY_BUFFER, buff)
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW)
    return buff
}
