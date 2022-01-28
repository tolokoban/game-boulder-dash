function getShader(
    type: number,
    gl: WebGL2RenderingContext,
    code: string
): WebGLShader {
    const shader = gl.createShader(type)
    if (!shader) {
        throw Error(`Unable to create a WebGL shader of type ${type}!`)
    }
    gl.shaderSource(shader, code)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log(code)
        console.error(
            "An error occurred compiling the shader: ",
            gl.getShaderInfoLog(shader)
        )
        throw Error(
            gl.getShaderInfoLog(shader) ??
                "Unknow error while compiling the shader!"
        )
    }

    return shader
}

export function getFragmentShader(gl: WebGL2RenderingContext, code: string) {
    return getShader(gl.FRAGMENT_SHADER, gl, code)
}

export function getVertexShader(gl: WebGL2RenderingContext, code: string) {
    return getShader(gl.VERTEX_SHADER, gl, code)
}
