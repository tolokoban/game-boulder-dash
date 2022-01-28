const BPE = Float32Array.BYTES_PER_ELEMENT

interface Shaders {
    vert: string
    frag: string
}

interface TypesNamesLookup {
    [key: number]: string
}

interface Attribute extends WebGLActiveInfo {
    length: number
    location: number
    typeName: string
}

export default class Program {
    public readonly program: WebGLProgram
    public readonly uniforms: { [key: string]: WebGLUniformLocation }
    public readonly attributes: { [name: string]: Attribute }
    private readonly vertexShaderCode: string
    private readonly fragmentShaderCode: string
    private readonly typesNamesLookup: TypesNamesLookup
    public $ = 666

    constructor(
        public readonly gl: WebGLRenderingContext,
        codes: Shaders,
        includes: { [key: string]: string } = {}
    ) {
        const { vert, frag } = parseIncludes(codes, includes)
        this.vertexShaderCode = vert
        this.fragmentShaderCode = frag
        this.typesNamesLookup = getTypesNamesLookup(gl)
        const shaderProgram = gl.createProgram()
        if (!shaderProgram) {
            throw Error("Unable to create a GL Program!")
        }
        const shaderVert = getVertexShader(gl, vert)
        const shaderFrag = getFragmentShader(gl, frag)
        gl.attachShader(shaderProgram, shaderVert)
        gl.attachShader(shaderProgram, shaderFrag)
        gl.linkProgram(shaderProgram)
        /*
      gl.detachShader( shaderProgram, shaderVert );
      gl.deleteShader( shaderVert );
      gl.detachShader( shaderProgram, shaderFrag );
      gl.deleteShader( shaderFrag );
    */
        if (!shaderProgram) {
            throw Error("Unable to create a WebGL Program!")
        }
        this.program = shaderProgram

        this.use()
        this.attributes = this.createAttributes(gl, shaderProgram)
        this.uniforms = this.createUniforms(gl, shaderProgram)
    }

    public destroy() {
        this.gl.deleteProgram(this.program)
    }

    public use() {
        this.gl.useProgram(this.program)
    }

    public uniform1f(name: string, value: number) {
        const location = this.uniforms[name]
        if (!location) throw Error(`There is no uniform with name "${name} in this program!`)

        this.gl.uniform1f(location, value)
    }

    /**
     * Given a number, return the GL constant name, or "Unknown".
     */
    public getTypeName(typeId: number) {
        return this.typesNamesLookup[typeId] ?? "Unknown"
    }

    public bindAttribs(buffer: WebGLBuffer, ...names: string[]) {
        this.use()
        const { gl } = this
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        let totalSize = 0
        names.forEach((name: string) => {
            const attrib: Attribute | undefined = this.attributes[name]
            if (!attrib) {
                console.log(this.vertexShaderCode) // @FIXME: Remove this line written on 2022-01-21 at 16:12
                throw Error(
                    `Cannot find attribute "${name}"!
It may be not active because unused in the shader.
Available attributes are: ${Object.keys(this.attributes)
                        .map(function (name) {
                            return '"' + name + '"'
                        })
                        .join(", ")}`
                )
            }
            totalSize += attrib.size * attrib.length * BPE
        })
        let offset = 0
        names.forEach((name: string) => {
            const attrib = this.attributes[name]
            gl.enableVertexAttribArray(attrib.location)
            gl.vertexAttribPointer(
                attrib.location,
                attrib.size * attrib.length,
                gl.FLOAT,
                false, // No normalisation.
                totalSize,
                offset
            )
            offset += attrib.size * attrib.length * BPE
        })
    }

    private createUniforms(
        gl: WebGLRenderingContext,
        shaderProgram: WebGLProgram
    ): { [key: string]: WebGLUniformLocation } {
        const uniforms: { [key: string]: WebGLUniformLocation } = {}
        const uniformsCount = gl.getProgramParameter(
            shaderProgram,
            gl.ACTIVE_UNIFORMS
        ) as number
        for (let index = 0; index < uniformsCount; index++) {
            const item = gl.getActiveUniform(shaderProgram, index)
            if (!item) continue

            const location = gl.getUniformLocation(shaderProgram, item.name)
            if (!location) continue

            uniforms[item.name] = location
        }
        return uniforms
    }

    private createAttributes(
        gl: WebGLRenderingContext,
        shaderProgram: WebGLProgram
    ): { [name: string]: Attribute } {
        const attributes: { [name: string]: Attribute } = {}
        const attribsCount = gl.getProgramParameter(
            shaderProgram,
            gl.ACTIVE_ATTRIBUTES
        ) as number
        for (let index = 0; index < attribsCount; index++) {
            const item = gl.getActiveAttrib(shaderProgram, index)
            if (!item) continue

            const att: Attribute = {
                type: item.type,
                name: item.name,
                size: item.size,
                typeName: this.getTypeName(item.type),
                length: this.getSize(gl, item),
                location: gl.getAttribLocation(shaderProgram, item.name),
            }
            attributes[att.name] = att
        }
        return attributes
    }

    private getSize(gl: WebGLRenderingContext, item: WebGLActiveInfo) {
        switch (item.type) {
            case gl.FLOAT_VEC4:
                return 4
            case gl.FLOAT_VEC3:
                return 3
            case gl.FLOAT_VEC2:
                return 2
            case gl.FLOAT:
                return 1
            default:
                throw Error(
                    `[webgl.program:getSize] I don't know the size of the attribute "${
                        item.name
                    }" because I don't know the type "${this.getTypeName(
                        item.type
                    )}"!`
                )
        }
    }
}

/**
 * This is a preprocessor for shaders.
 * Directives  `#include`  will be  replaced  by  the content  of  the
 * correspondent attribute in `includes`.
 */
function parseIncludes(
    codes: Shaders,
    includes: { [key: string]: string }
): Shaders {
    return {
        vert: parseIncludesForCode(codes.vert, includes),
        frag: parseIncludesForCode(codes.frag, includes),
    }
}

function parseIncludesForCode(
    code: string,
    includes: { [key: string]: string }
): string {
    return code
        .split("\n")
        .map(function (line) {
            if (line.trim().substr(0, 8) != "#include") return line
            const pos = line.indexOf("#include") + 8
            let includeName = line.substring(pos).trim()
            // We accept all this systaxes:
            // #include foo
            // #include 'foo'
            // #include <foo>
            // #include "foo"
            if ("'<\"".indexOf(includeName.charAt(0)) > -1) {
                includeName = includeName.substring(1, includeName.length - 1)
            }
            const snippet = includes[includeName]
            if (typeof snippet !== "string") {
                console.error(
                    "Include <" + includeName + "> not found in ",
                    includes
                )
                throw Error("Include not found in shader: " + includeName)
            }
            return snippet
        })
        .join("\n")
}

/**
 * Help finding the name of a GL constant when we just have its number value.
 */
function getTypesNamesLookup(gl: WebGLRenderingContext): {
    [key: number]: string
} {
    const lookup: TypesNamesLookup = {}
    for (const k in gl) {
        const v = gl[k] as unknown
        if (typeof v === "number") {
            lookup[v] = k
        }
    }
    return lookup
}

function getShader(
    type: number,
    gl: WebGLRenderingContext,
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

function getFragmentShader(gl: WebGLRenderingContext, code: string) {
    return getShader(gl.FRAGMENT_SHADER, gl, code)
}

function getVertexShader(gl: WebGLRenderingContext, code: string) {
    return getShader(gl.VERTEX_SHADER, gl, code)
}
