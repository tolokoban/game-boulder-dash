import { Assets } from "./assets"
import Scene from './webgl/scene'
import RainPainter from "./painters/rain/rain-painter"

export function startApplication(canvas: HTMLCanvasElement, assets: Assets) {
    const scene = new Scene(canvas)
    scene.setPainters([
        new RainPainter(scene.gl, assets)
    ])
    scene.play()
}