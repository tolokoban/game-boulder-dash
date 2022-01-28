import { STILL, UP, RIGHT, DOWN, LEFT, SUICIDE, START } from "./constants"
import KeyboardInputs from "./keyboard"
import GamepadInputs from "./gamepad"

export interface Actions {
    up: boolean
    right: boolean
    down: boolean
    left: boolean
    suicide: boolean
    start: boolean
}

class GameInputs {
    public readonly state = [0, 0, 0, 0, 0, 0, 0]
    private readonly keyboardInputs: KeyboardInputs
    private readonly gamepadInputs: GamepadInputs

    constructor() {
        this.keyboardInputs = new KeyboardInputs(this.state)
        this.gamepadInputs = new GamepadInputs(this.state)
    }

    public clear() {
        this.state[STILL] = 0
        this.state[UP] = 0
        this.state[RIGHT] = 0
        this.state[DOWN] = 0
        this.state[LEFT] = 0
        this.state[SUICIDE] = 0
        this.state[START] = 0
    }

    public get actions(): Actions {
        const { state, gamepadInputs } = this
        gamepadInputs.updateState()
        return {
            up: state[UP] === 1,
            right: state[RIGHT] === 1,
            down: state[DOWN] === 1,
            left: state[LEFT] === 1,
            suicide: state[SUICIDE] === 1,
            start: state[START] === 1,
        }
    }
}

const instance = new GameInputs()

export default instance
