precision mediump float;

uniform float uniTime;
uniform float uniSize;

attribute float attX;
attribute float attY;
attribute float attZ;
attribute float attW;
/** Speed */
attribute float attSpeed;
attribute float attIndex;
/** The texture is an atlas with 16 frames. */
varying float varU;
varying float varZ;
/** HUE shift */
varying float varHueShift;

// Main
void main() {
  varZ = attZ;
  varU = floor( mod( 16.0 * attIndex + uniTime * 0.02, 16.0 ) ) * 0.0625;
  varHueShift = attIndex * 360.0;
  float z = varZ;
  float speed = attSpeed;
  float y = sin(uniTime * speed + attY);
  gl_Position = vec4( attX, y, attZ, attW );
  gl_PointSize = uniSize / attW;
}
