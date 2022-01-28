document.addEventListener("DOMContentLoaded", function () {
    var testCases = []
    TestCases.forEach(function (testCase) {
        if (!Array.isArray(testCase.to[0])) {
            testCases.push(testCase)
        } else {
            testCase.to.forEach(function (to, index) {
                var tc = JSON.parse(JSON.stringify(testCase))
                tc.to = to
                tc.steps = index + 1
                testCases.push(tc)
            })
        }
    })

    testCases.forEach(function (testCase) {
        test(testCase)
    })
})

function test(testCase) {
    var level = makeLevelFromTestCase(testCase)
    var env = makeEnv(level)
    var steps = testCase.steps || 1
    var actions = makeActions(testCase, steps)
    var loops = steps
    while (loops-- > 0) {
        LevelLogic.apply(env)
        LevelLogic.process(env, actions.shift())
    }
    LevelLogic.apply(env)

    printResult(testCase, level, steps)
}

function makeLevelFromTestCase(testCase) {
    var def = {
        rows: testCase.from,
    }
    return new Level(def)
}

function makeEnv(level) {
    var env = LevelLogic.createEnv(null, {
        diamSound: makePseudoSound(),
        rockSound: makePseudoSound(),
        explSound: makePseudoSound(),
        exitSound: makePseudoSound(),
    })
    env.level = level
    return env
}

function makePseudoSound() {
    return {
        currentTime: 0,
        play: function () {},
        pause: function () {},
    }
}

function printResult(testCase, level, steps) {
    var result = makeDefFromLevel(level)
    var div = document.createElement("div")
    div.textContent = testCase.name + "  [" + steps + "]"
    document.body.appendChild(div)
    if (areEqual(result, testCase.to)) {
        div.className = "ok"
    } else {
        div.className = "ko"
        var tbl = makeTable(
            ["Départ", "Attendu", "Obtenu"],
            [
                makePreFromLevelDef(testCase.from),
                makePreFromLevelDef(testCase.to),
                makePreFromLevelDef(result),
            ]
        )
        div.appendChild(tbl)
    }
}

function makePreFromLevelDef(levelDef) {
    var pre = document.createElement("pre")
    pre.textContent = levelDef.join("\n")
    return pre
}

function makeTable() {
    var tbl = document.createElement("div")
    tbl.className = "tbl"
    Array.prototype.slice.call(arguments).forEach(function (arg) {
        var row = document.createElement("div")
        tbl.appendChild(row)
        arg.forEach(function (itm) {
            var cell = document.createElement("div")
            row.appendChild(cell)
            if (typeof itm === "string") {
                cell.textContent = itm
            } else {
                cell.appendChild(itm)
            }
        })
    })
    return tbl
}

function makeDefFromLevel(level) {
    var def = []
    var col, row
    var line
    for (row = 0; row < level.rows; row++) {
        line = ""
        for (col = 0; col < level.cols; col++) {
            switch (level.getType(col, row)) {
                case Level.VOID:
                    line += " "
                    break
                case Level.WALL:
                    line += "w"
                    break
                case Level.HERO:
                    line += "E"
                    break
                case Level.DUST:
                    line += "."
                    break
                case Level.ROCK:
                    line += "r"
                    break
                case Level.DIAM:
                    line += "d"
                    break
                case Level.EXIT:
                    line += "X"
                    break
                case Level.EXP1:
                    line += "1"
                    break
                case Level.EXP2:
                    line += "2"
                    break
                case Level.MONS:
                    line += "@"
                    break
                case Level.BOOM:
                    line += "+"
                    break
                default:
                    line += "?"
            }
        }
        def.push(line)
    }
    return def
}

function areEqual(a, b) {
    return JSON.stringify(a) == JSON.stringify(b)
}

function makeActions(testCase, steps) {
    var actions = testCase.actions
    if (!Array.isArray(actions)) actions = []
    while (actions.length < steps) actions.push(GameInputs.STILL)
    return actions
}
