import { UP, RIGHT, DOWN, LEFT, SUICIDE, START } from "./constants"

export default class GamepadInputs {
    private gamepad: null | Gamepad = null

    constructor(private readonly state: number[]) {
        window.addEventListener("gamepadconnected", (e) => {
            console.log(
                "Gamepad connected at index %d: %s. %d buttons, %d axes.",
                e.gamepad.index,
                e.gamepad.id,
                e.gamepad.buttons.length,
                e.gamepad.axes.length
            )
            this.gamepad = e.gamepad
        })
        window.addEventListener("gamepaddisconnected", (e) => {
            if (e.gamepad === this.gamepad) this.gamepad = null
        })
    }

    public updateState() {
        const { gamepad, state } = this
        if (!gamepad) return

        const { axes } = gamepad
        if (axes[6] > 0 || axes[3] > 0 || axes[0] > 0) {
            state[RIGHT] = 1
        }
        if (axes[6] < 0 || axes[3] < 0 || axes[0] < 0) {
            state[LEFT] = 1
        }
        if (axes[7] > 0 || axes[4] > 0 || axes[1] > 0) {
            state[DOWN] = 1
        }
        if (axes[7] < 0 || axes[4] < 0 || axes[1] < 0) {
            state[UP] = 1
        }
        state[SUICIDE] = 0
        state[START] = 0
        gamepad.buttons.forEach((button, index) => {
            if (button.pressed) {
                if (index < 4) state[SUICIDE] = 1
                else state[START] = 1
            }
        })
    }
}
