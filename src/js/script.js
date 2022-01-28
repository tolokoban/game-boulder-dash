"use strict"

WebGL.fetchAssets({
    musicSound: "../snd/music.mp3",
    diamSound: "../snd/diam.mp3",
    exitSound: "../snd/exit.mp3",
    explSound: "../snd/expl.mp3",
    rockSound: "../snd/rock.mp3",
    hueVert: "hue.vert",
    hueFrag: "hue.frag",
    coordsVert: "../coords.vert",
    coordsMoveVert: "../coords-move.vert",
    transitionVert: "transition.vert",
    transitionFrag: "transition.frag",
    backgroundVert: "background.vert",
    backgroundFrag: "background.frag",
    backgroundTexture: "../img/background.jpg",
    wallVert: "wall.vert",
    wallFrag: "wall.frag",
    wallTexture: "../img/wall.jpg",
    levelVert: "level.vert",
    levelFrag: "level.frag",
    rainVert: "rain.vert",
    rainFrag: "rain.frag",
    boulderTexture: "../img/row-boulder.png",
    monsterTexture: "../img/row-monster.png",
    exitTexture: "../img/exit.png",
    diamTexture: "../img/row-diam.png",
    heroTexture: "../img/row-walk.png",
    exploTexture: "../img/row-explo.png",
    groundTexture: "../img/ground.png",
}).then(function (assets) {
    var canvas = document.getElementById("canvas")
    var gl = canvas.getContext("webgl")

    var env = LevelLogic.createEnv(gl, assets)

    initLevel(env, parseInt(location.search.substr(1)))

    gl.clearColor(0, 0, 0, 1)
    gl.enable(gl.DEPTH_TEST)
    gl.clearDepth(0)
    gl.depthFunc(gl.GREATER)

    var rainPainter = new RainPainter(env)
    var transition = new Transition(gl, assets)
    var highscore = new HighScore()

    env.demoMode = true
    refreshHighScores(highscore)
    var onStart = function () {
        hideHighScores()
        transition.start(function () {
            env.demoMode = false
            initLevel(env, parseInt(location.search.substr(1)))
        }, 1000)
    }
    document.getElementById("btnStart").addEventListener("click", onStart)

    document.getElementById("btnOk").addEventListener("click", function () {
        var name = document.getElementById("name").value.trim()
        if (name.length === 0) {
            document.getElementById("name").focus()
            return
        }
        var newScore = parseInt(
            document.getElementById("new-score").textContent
        )
        highscore.addScore(name, newScore)
        document.getElementById("congrat").className = "hide"
        refreshHighScores(highscore)
        env.demoMode = true
    })

    function anim(time) {
        window.requestAnimationFrame(anim)

        var action = GameInputs.action
        if (env.demoMode) {
            if (action === GameInputs.START) {
                if (document.getElementById("congrat").className != "hide") {
                    onStart()
                } else if (
                    document.getElementById("welcome").className != "hide"
                ) {
                    onStart()
                }
            }
            action = GameInputs.STILL
        }

        env.time = time
        var width = canvas.clientWidth
        var height = canvas.clientHeight
        canvas.setAttribute("width", width)
        canvas.setAttribute("height", height)
        env.width = width
        env.height = height
        env.w = Math.min(width, height) < 481 ? 2 : 1
        gl.viewport(0, 0, width, height)

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

        transition.draw(time, width, height)

        if (env.demoMode) {
            // Animation d'attente pendant l'affichage des HighScores.
            rainPainter.draw(env)
        } else {
            //#(synchro)
            // A la synchro, on fait les calculs de mouvements.
            if (env.nextSynchro < 0) {
                env.nextSynchro = Math.ceil(time / env.cellTime) * env.cellTime
            } else if (time >= env.nextSynchro) {
                env.nextSynchro = Math.ceil(time / env.cellTime) * env.cellTime

                LevelLogic.apply(env)
                LevelLogic.process(env, action)
                env.levelPainter.update()

                env.bonus--
                if (env.bonus === 0) env.killHero()
                document.getElementById("bonus").textContent = env.bonus

                if (env.wait > -1) {
                    env.wait--
                    if (env.wait <= 0) {
                        if (env.isLevelDone) {
                            transition.start(function () {
                                env.score += env.bonus
                                initLevel(env, env.levelNumber + 1)
                            }, 1200)
                        } else {
                            env.life--
                            if (env.life <= 0) {
                                addNewScore(highscore, env.score)
                                env.levelNumber = 0
                                env.demoMode = true
                            } else {
                                initLevel(env, env.levelNumber)
                            }
                        }
                        env.wait = -1
                    }
                }
            }
            //#(synchro)

            //#(camera)
            // Positionner la caméra sur le héro.
            // Sauf si le cadrage arrive hors tableau.
            var t = (time % env.cellTime) / env.cellTime
            if ((env.level.cols * 64) / env.w < width) {
                env.x = env.level.cols / 2
            } else {
                env.x = Math.min(
                    Math.max(
                        env.camX + t * env.camVX,
                        (width * env.w * 0.5) / 64
                    ),
                    env.level.cols - 1 - (width * env.w * 0.5) / 64
                )
            }
            if ((env.level.rows * 64) / env.w < height) {
                env.y = env.level.rows / 2
            } else {
                env.y = Math.min(
                    Math.max(
                        env.camY + t * env.camVY,
                        (height * env.w * 0.5) / 64
                    ),
                    env.level.rows - 1 - (height * env.w * 0.5) / 64
                )
            }
            //#(camera)

            // On affiche tout.
            env.levelPainter.draw(env)
            env.z = 0.2
            env.wallPainter.draw(env)
            env.z = 0
            env.backgroundPainter.draw(env)
        }
    }
    window.requestAnimationFrame(anim)
})

function initLevel(env, levelNumber) {
    if (typeof levelNumber !== "number" || isNaN(levelNumber)) levelNumber = 0
    if (levelNumber === 0) {
        env.life = 3
        env.score = 0
    }
    levelNumber %= Levels.length
    if (env.backgroundPainter) env.backgroundPainter.destroy()
    if (env.wallPainter) env.wallPainter.destroy()
    if (env.levelPainter) env.levelPainter.destroy()

    var level = new Level(Levels[levelNumber])
    console.info("[script] level.tint=", level.tint)
    env.assets.levelTexture = TextureAggregator(env.assets, level.tint)

    env.level = level
    env.camX = level.cols / 2
    env.camY = level.rows / 2
    env.camVX = 0
    env.camVY = 0
    env.eatenDiams = 0
    env.nextSynchro = -1
    env.isHeroAlive = true
    env.isLevelDone = false
    env.bonus = level.cols * level.rows * 4
    env.wait = -1
    env.levelNumber = levelNumber

    env.assets.musicSound.pause()
    env.assets.musicSound.currentTime = 0
    env.assets.musicSound.play()

    var tinter = new TextureAggregator.Tinter(
        env.assets.hueVert,
        env.assets.hueFrag
    )
    var backgroundTexture = env.assets.backgroundTexture
    env.backgroundPainter = new BackgroundPainter(
        env,
        tinter.shiftHue(backgroundTexture, level.tint.void)
    )
    var wallTexture = env.assets.wallTexture
    env.wallPainter = new WallPainter(
        env,
        tinter.shiftHue(wallTexture, level.tint.wall)
    )
    env.levelPainter = new LevelPainter(env)

    document.getElementById("diam").textContent = level.need
    document.getElementById("life").textContent = env.life
    document.getElementById("score").textContent = env.score
    document.getElementById("bonus").textContent = env.bonus

    return level
}

function addNewScore(highscore, score) {
    if (highscore.isAnHighScore(score)) {
        var divCongrat = document.getElementById("congrat")
        divCongrat.className = ""
        document.getElementById("new-score").textContent = "" + score
        document.getElementById("name").focus()
    } else {
        refreshHighScores(highscore)
    }
}

function refreshHighScores(highscore) {
    var div = document.getElementById("highscores")
    div.innerHTML = ""
    var scores = highscore.getScores()
    scores.forEach(function (item, pos) {
        var name = item[0]
        var score = item[1]
        var row = document.createElement("div")
        div.appendChild(row)
        if (pos == highscore.getLastHighScoreIndex()) {
            row.className = "highlighted"
        }
        var cell1 = document.createElement("div")
        cell1.textContent = name
        var cell2 = document.createElement("div")
        cell2.textContent = score
        row.appendChild(cell1)
        row.appendChild(cell2)
    })
    showHighScores()
}

function showHighScores() {
    document.getElementById("welcome").className = ""
}

function hideHighScores() {
    document.getElementById("welcome").className = "hide"
}
