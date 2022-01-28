import "./index.css"
import { fetchAssets } from "./assets"
import { startApplication } from "./main"

const ASSETS = {
    // musicSound: "assets/snd/music.mp3",
    // diamSound: "assets/snd/diam.mp3",
    // exitSound: "assets/snd/exit.mp3",
    // explSound: "assets/snd/expl.mp3",
    // rockSound: "assets/snd/rock.mp3",
    // hueVert: "assets/gls/hue.vert",
    // hueFrag: "assets/gls/hue.frag",
    // coordsVert: "assets/gls/coords.vert",
    // coordsMoveVert: "assets/gls/coords-move.vert",
    // transitionVert: "assets/gls/transition.vert",
    // transitionFrag: "assets/gls/transition.frag",
    // backgroundVert: "assets/gls/background.vert",
    // backgroundFrag: "assets/gls/background.frag",
    // backgroundTexture: "assets/img/background.jpg",
    // wallVert: "assets/gls/wall.vert",
    // wallFrag: "assets/gls/wall.frag",
    // wallTexture: "assets/img/wall.jpg",
    // levelVert: "assets/gls/level.vert",
    // levelFrag: "assets/gls/level.frag",
    // rainVert: "assets/gls/rain.vert",
    // rainFrag: "assets/gls/rain.frag",
    // boulderTexture: "assets/img/row-boulder.png",
    // monsterTexture: "assets/img/row-monster.png",
    // exitTexture: "assets/img/exit.png",
    diamTexture: "assets/img/row-diam.png",
    // heroTexture: "assets/img/row-walk.png",
    // exploTexture: "assets/img/row-explo.png",
    // groundTexture: "assets/img/ground.png",
}

async function start() {
    console.log("Loading assets...")
    const progress = createProgress()
    const assets = await fetchAssets(ASSETS, (value: number) => {
        progress.setAttribute("value", `${100 * value}`)
    })
    console.log("Assets loaded.")
    const canvas = document.getElementById("canvas")
    if (!canvas) throw Error("Unable to find main Canvas!")

    startApplication(canvas as HTMLCanvasElement, assets)
    removeSplashScreen()
}

function createProgress() {
    const progress = document.createElement("progress")
    progress.setAttribute("id", "tgd-progress")
    progress.setAttribute("min", "0")
    progress.setAttribute("max", "100")
    document.getElementById("tgd-logo")?.appendChild(progress)
    return progress
}

function removeSplashScreen() {
    const div = document.getElementById("tgd-logo")
    if (!div) throw Error("There is no splash screen!")

    const DURATION = 900
    div.style.setProperty("--duration", `${DURATION}ms`)
    div.classList.add("vanish")
    window.setTimeout(() => {
        document.body.removeChild(div)
    }, DURATION)
}

void start()
