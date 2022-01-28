import { UP, RIGHT, DOWN, LEFT, SUICIDE, START } from "./constants"

type Bindings = Map<string, number>

export default class KeyboardInputs {
    private readonly bindings: Bindings = makeInitialBindings()

    constructor(state: number[]) {
        document.addEventListener(
            "keydown",
            (evt) => {
                const action = this.bindings.get(evt.key.toLowerCase())
                if (!action) return

                evt.preventDefault()
                state[action] = 1
            },
            true
        )
        document.addEventListener(
            "keyup",
            (evt) => {
                const action = this.bindings.get(evt.key.toLowerCase())
                if (!action) return

                evt.preventDefault()
                state[action] = 0
            },
            true
        )
    }
}

function makeInitialBindings(): Bindings {
    const bindings: Bindings = new Map<string, number>()
    bindings.set("arrowup", UP)
    bindings.set("arrowright", RIGHT)
    bindings.set("arrowleft", LEFT)
    bindings.set("arrowdown", DOWN)
    bindings.set("escape", SUICIDE)
    bindings.set("space", START)
    return bindings
}
