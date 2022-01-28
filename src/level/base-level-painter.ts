export default abstract class BasePainter {
    protected readonly prg: WebGLProgram
    protected readonly vertBuff: WebGLBuffer

    protected constructor(
        protected readonly gl: WebGLRenderingContext
    ) {
        const vertBuff = gl.createBuffer()
        if (!vertBuff) throw Error("Unable to create WebGL Buffer!")
    
        const prg = gl.createProgram()
        if (!prg) throw Error("Unable to create a WebGL Program!")
    
        const vertShader = createShader(gl, gl.VERTEX_SHADER, VERT)
        const fragShader = createShader(gl, gl.FRAGMENT_SHADER, FRAG)
        gl.attachShader(prg, vertShader)
        gl.attachShader(prg, fragShader)
        gl.linkProgram(prg)    
        this.prg = prg
    }

    public destroy() {
        const { gl, prg, vertBuff } = this
        gl.deleteBuffer( vertBuff )
        gl.deleteProgram( prg )
        this.actualDestroy()
    }

    public static createDataArray(vertexCount: number): Float32Array {
        return new Float32Array(vertexCount * 6)
    }

    public static pokeData(
        data: Float32Array,
        vertexIndex: number,
        attType: number,
        attX: number,
        attY: number,
        attVX: number,
        attVY: number,
        attIndex: number
    ) {
        let index = vertexIndex * 6
        data[index++] = attType,
        data[index++] = attX,
        data[index++] = attY,
        data[index++] = attVX,
        data[index++] = attVY,
        data[index++] = attIndex
    }

    public pushData(data: Float32Array) {
        const { gl, vertBuff } = this
        gl.bindBuffer(gl.ARRAY_BUFFER, vertBuff)
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
    }

    public set $uniHeight(value: number) {
        const { gl, prg } = this
        const location = gl.getUniformLocation(prg, "uniHeight")
        gl.uniform1f(location, value)
    }
    
    public set $uniX(value: number) {
        const { gl, prg } = this
        const location = gl.getUniformLocation(prg, "uniX")
        gl.uniform1f(location, value)
    }
    
    public set $texture(value: WebGLTexture) {
        const { gl, prg } = this
        const location = gl.getUniformLocation(prg, "texture")
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, value)
        gl.uniform1i(location, 0)
    }
    
    public set $uniW(value: number) {
        const { gl, prg } = this
        const location = gl.getUniformLocation(prg, "uniW")
        gl.uniform1f(location, value)
    }
    
    public set $uniZ(value: number) {
        const { gl, prg } = this
        const location = gl.getUniformLocation(prg, "uniZ")
        gl.uniform1f(location, value)
    }
    
    public set $uniY(value: number) {
        const { gl, prg } = this
        const location = gl.getUniformLocation(prg, "uniY")
        gl.uniform1f(location, value)
    }
    
    public set $uniCellTime(value: number) {
        const { gl, prg } = this
        const location = gl.getUniformLocation(prg, "uniCellTime")
        gl.uniform1f(location, value)
    }
    
    public set $uniTime(value: number) {
        const { gl, prg } = this
        const location = gl.getUniformLocation(prg, "uniTime")
        gl.uniform1f(location, value)
    }
    
    public set $uniWidth(value: number) {
        const { gl, prg } = this
        const location = gl.getUniformLocation(prg, "uniWidth")
        gl.uniform1f(location, value)
    }

    paint(time: number) {
        const { gl, prg } = this
        gl.useProgram(prg)
        const BPE = Float32Array.BYTES_PER_ELEMENT
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuff)
        // attType
        gl.enableVertexAttribArray(0)
        gl.vertexAttribPointer(0, 1, gl.FLOAT, false, 0, 0 * BPE)
        // attX
        gl.enableVertexAttribArray(1)
        gl.vertexAttribPointer(1, 1, gl.FLOAT, false, 0, 1 * BPE)
        // attY
        gl.enableVertexAttribArray(2)
        gl.vertexAttribPointer(2, 1, gl.FLOAT, false, 0, 2 * BPE)
        // attVX
        gl.enableVertexAttribArray(3)
        gl.vertexAttribPointer(3, 1, gl.FLOAT, false, 0, 3 * BPE)
        // attVY
        gl.enableVertexAttribArray(4)
        gl.vertexAttribPointer(4, 1, gl.FLOAT, false, 0, 4 * BPE)
        // attIndex
        gl.enableVertexAttribArray(5)
        gl.vertexAttribPointer(5, 1, gl.FLOAT, false, 0, 5 * BPE)
        this.actualPaint(time)
    }

    protected abstract actualPaint(time: number): void
    
    protected abstract actualDestroy(): void
}

function createShader(gl: WebGLRenderingContext, type: number, code: string) {
    const shader = gl.createShader(type)
    if (!shader) throw Error("Unable to create WebGL Shader!")

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

const VERT = `const float cstW=1024.0;
const float cstH=384.0;
const vec2 cstDim64x64=vec2(64.0/cstW,64.0/cstH);
const vec2 cstDim80x80=vec2(80.0/cstW,80.0/cstH);
const vec2 cstHeroUV=vec2(0.0,0.0);
const vec2 cstRockUV=vec2(0.0,64.0/cstH);
const vec2 cstDiamUV=vec2(0.0,128.0/cstH);
const vec2 cstDustUV=vec2(0.0,192.0/cstH);
const vec2 cstMonsUV=vec2(0.0,320.0/cstH);
const vec2 cstExitUV=vec2(80.0/cstW,192.0/cstH);
const vec2 cstExplUV=vec2(512.0/cstW,192.0/cstH);
attribute float attType;
attribute float attX;
attribute float attY;
attribute float attVX;
attribute float attVY;
attribute float attIndex;
uniform float uniTime;
uniform float uniWidth;
uniform float uniHeight;
uniform float uniX;
uniform float uniY;
uniform float uniZ;
uniform float uniW;
uniform float uniCellTime;
varying vec2 varUV;
varying vec2 varDimension;
void drawRock(){gl_Position.z=0.5;
gl_PointSize=64.0/uniW;
varDimension=cstDim64x64;
float shift=floor(mod(attIndex,16.0))/16.0;
varUV=cstRockUV+vec2(shift,0.0);}void drawHero(){gl_Position.z=0.8;
gl_PointSize=64.0/uniW;
varDimension=cstDim64x64;
float index=floor(mod(uniTime*0.02,8.0));
float shift=0.5*attIndex+index/16.0;
varUV=cstHeroUV+vec2(shift,0.0);}void drawMons(){gl_Position.z=0.4;
gl_PointSize=64.0/uniW;
varDimension=cstDim64x64;
float index=floor(mod(uniTime*0.01,8.0));
float shift=index/16.0;
if(attIndex > 1.0){shift+=0.5;}varUV=cstMonsUV+vec2(shift,0.0);}void drawDiam(){gl_Position.z=0.6;
gl_PointSize=64.0/uniW;
varDimension=cstDim64x64;
float index=floor(mod(attIndex+uniTime*0.02,16.0));
float shift=index/16.0;
varUV=cstDiamUV+vec2(shift,0.0);}void drawExpl(){gl_Position.z=0.91;
gl_PointSize=64.0/uniW;
varDimension=cstDim64x64;
float index=floor(4.0*mod(uniTime,2.0*uniCellTime)/uniCellTime);
float shift=index/16.0;
varUV=cstExplUV+vec2(shift,0.0);}void drawDust(){gl_Position.z=0.7;
gl_PointSize=80.0/uniW;
varDimension=cstDim80x80;
varUV=cstDustUV;}void drawExit(){gl_Position.z=0.9;
gl_PointSize=80.0/uniW;
varDimension=cstDim80x80;
varUV=cstExitUV;}void main(){if(attType < 2.0){gl_PointSize=0.0;
return;}float t=mod(uniTime,uniCellTime)/uniCellTime;
float xx=(attX+t*attVX-uniX)*128.0/uniWidth;
float yy=(attY+t*attVY-uniY)*128.0/uniHeight;
gl_Position=vec4(xx,-yy,uniZ,uniW);
if(attType < 2.1)drawHero();
else if(attType < 3.1)drawDust();
else if(attType < 4.1)drawRock();
else if(attType < 5.1)drawDiam();
else if(attType < 6.1)drawExit();
else if(attType < 7.1)drawExpl();
else if(attType < 8.1)drawExpl();
else if(attType < 9.1)drawMons();}`

const FRAG = `const float cstW=1024.0;
const float cstH=384.0;
const vec2 cstDim64x64=vec2(64.0/cstW,64.0/cstH);
const vec2 cstDim80x80=vec2(80.0/cstW,80.0/cstH);
const vec2 cstHeroUV=vec2(0.0,0.0);
const vec2 cstRockUV=vec2(0.0,64.0/cstH);
const vec2 cstDiamUV=vec2(0.0,128.0/cstH);
const vec2 cstDustUV=vec2(0.0,192.0/cstH);
const vec2 cstMonsUV=vec2(0.0,320.0/cstH);
const vec2 cstExitUV=vec2(80.0/cstW,192.0/cstH);
const vec2 cstExplUV=vec2(512.0/cstW,192.0/cstH);
attribute float attType;
attribute float attX;
attribute float attY;
attribute float attVX;
attribute float attVY;
attribute float attIndex;
uniform float uniTime;
uniform float uniWidth;
uniform float uniHeight;
uniform float uniX;
uniform float uniY;
uniform float uniZ;
uniform float uniW;
uniform float uniCellTime;
varying vec2 varUV;
varying vec2 varDimension;
void drawRock(){gl_Position.z=0.5;
gl_PointSize=64.0/uniW;
varDimension=cstDim64x64;
float shift=floor(mod(attIndex,16.0))/16.0;
varUV=cstRockUV+vec2(shift,0.0);}void drawHero(){gl_Position.z=0.8;
gl_PointSize=64.0/uniW;
varDimension=cstDim64x64;
float index=floor(mod(uniTime*0.02,8.0));
float shift=0.5*attIndex+index/16.0;
varUV=cstHeroUV+vec2(shift,0.0);}void drawMons(){gl_Position.z=0.4;
gl_PointSize=64.0/uniW;
varDimension=cstDim64x64;
float index=floor(mod(uniTime*0.01,8.0));
float shift=index/16.0;
if(attIndex > 1.0){shift+=0.5;}varUV=cstMonsUV+vec2(shift,0.0);}void drawDiam(){gl_Position.z=0.6;
gl_PointSize=64.0/uniW;
varDimension=cstDim64x64;
float index=floor(mod(attIndex+uniTime*0.02,16.0));
float shift=index/16.0;
varUV=cstDiamUV+vec2(shift,0.0);}void drawExpl(){gl_Position.z=0.91;
gl_PointSize=64.0/uniW;
varDimension=cstDim64x64;
float index=floor(4.0*mod(uniTime,2.0*uniCellTime)/uniCellTime);
float shift=index/16.0;
varUV=cstExplUV+vec2(shift,0.0);}void drawDust(){gl_Position.z=0.7;
gl_PointSize=80.0/uniW;
varDimension=cstDim80x80;
varUV=cstDustUV;}void drawExit(){gl_Position.z=0.9;
gl_PointSize=80.0/uniW;
varDimension=cstDim80x80;
varUV=cstExitUV;}void main(){if(attType < 2.0){gl_PointSize=0.0;
return;}float t=mod(uniTime,uniCellTime)/uniCellTime;
float xx=(attX+t*attVX-uniX)*128.0/uniWidth;
float yy=(attY+t*attVY-uniY)*128.0/uniHeight;
gl_Position=vec4(xx,-yy,uniZ,uniW);
if(attType < 2.1)drawHero();
else if(attType < 3.1)drawDust();
else if(attType < 4.1)drawRock();
else if(attType < 5.1)drawDiam();
else if(attType < 6.1)drawExit();
else if(attType < 7.1)drawExpl();
else if(attType < 8.1)drawExpl();
else if(attType < 9.1)drawMons();}`
