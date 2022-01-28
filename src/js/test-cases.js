var S = 0
var U = 1
var R = 2
var D = 3
var L = 4
var X = 5 // Suicide

window.TestCases = [
    {
        name: "Manger des diamants",
        from: ["Ed  d"],
        to: [[" E  d"], ["  E d"], ["   Ed"], ["    E"]],
        actions: [R, R, R, R],
    },
    {
        name: "Pousser une pierre à droite",
        from: ["Er  r"],
        to: [["E r r"], [" Er r"], [" E rr"], ["  Err"]],
        actions: [R, R, R, R],
    },
    {
        name: "La pierre tue le monstre",
        from: ["www", "wrw", "w w", "w w", "w@w", "www"],
        to: [
            ["www", "w w", "wrw", "w@w", "w w", "www"],
            ["www", "w w", "w2w", "w2w", "w2w", "www"],
            ["www", "w w", "wdw", "wdw", "wdw", "www"],
        ],
    },
    {
        name: "La pierre tue le monstre avec écartement impair",
        from: ["www", "wrw", "w w", "w@w", "www"],
        to: [
            ["www", "w w", "wrw", "w@w", "www"],
            ["www", "w w", "w2w", "w2w", "www"],
            ["www", "w w", "wdw", "wdw", "www"],
        ],
    },
    {
        name: "Les monstres ne s'écrasent pas",
        from: ["wwwwwww", "w@  @ w", "wwwwwww"],
        to: [
            ["wwwwwww", "w @  @w", "wwwwwww"],
            ["wwwwwww", "w  @@ w", "wwwwwww"],
            ["wwwwwww", "w @  @w", "wwwwwww"],
            ["wwwwwww", "w@  @ w", "wwwwwww"],
        ],
    },
    {
        name: "Les monstres ne s'écrasent pas avec un écartement impair",
        from: ["wwwwwwww", "w@   @ w", "wwwwwwww"],
        to: [
            ["wwwwwwww", "w @   @w", "wwwwwwww"],
            ["wwwwwwww", "w  @ @ w", "wwwwwwww"],
            ["wwwwwwww", "w   @ @w", "wwwwwwww"],
            ["wwwwwwww", "w    @@w", "wwwwwwww"],
            ["wwwwwwww", "w   @ @w", "wwwwwwww"],
            ["wwwwwwww", "w  @ @ w", "wwwwwwww"],
        ],
    },
    {
        name: "Pierre écrasant un diamant",
        from: [".r.", " d ", "   "],
        to: [
            [".r.", "   ", " d "],
            [". .", " r ", " d "],
            [". .", "111", "111"],
            [". .", "111", "111"],
            [". .", "   ", "   "],
        ],
    },
    {
        name: "Chute simple de pierre",
        steps: 1,
        from: ["r", " "],
        to: [" ", "r"],
    },
    {
        name: "Chute simple de diamant",
        steps: 1,
        from: ["d", " "],
        to: [" ", "d"],
    },
    {
        name: "Chute de pierre (droite) posée sur une pierre",
        from: ["  ", "r ", "r "],
        to: [
            ["  ", " r", "r "],
            ["  ", "  ", "rr"],
        ],
    },
    {
        name: "Chute de pierre (droite en priorité) posée sur une pierre",
        steps: 1,
        from: ["   ", " r ", " r "],
        to: ["   ", "  r", " r "],
    },
    {
        name: "Chute de pierre (droite en priorité) posée sur une pierre",
        steps: 2,
        from: ["   ", " r ", " r "],
        to: ["   ", "   ", " rr"],
    },
    {
        name: "Chute de pierre (gauche) posée sur une pierre",
        steps: 1,
        from: ["  ", " r", " r"],
        to: ["  ", "r ", " r"],
    },
    {
        name: "Chute de pierre (gauche) posée sur une pierre",
        steps: 2,
        from: ["  ", " r", " r"],
        to: ["  ", "  ", "rr"],
    },

    {
        name: "Chute de diamant (droite) posée sur une diamant",
        steps: 1,
        from: ["  ", "d ", "d "],
        to: ["  ", " d", "d "],
    },
    {
        name: "Chute de diamant (droite) posée sur une diamant",
        steps: 2,
        from: ["  ", "d ", "d "],
        to: ["  ", "  ", "dd"],
    },
    {
        name: "Chute de diamant (droite en priorité) posée sur une diamant",
        steps: 1,
        from: ["   ", " d ", " d "],
        to: ["   ", "  d", " d "],
    },
    {
        name: "Chute de diamant (droite en priorité) posée sur une diamant",
        steps: 2,
        from: ["   ", " d ", " d "],
        to: ["   ", "   ", " dd"],
    },
    {
        name: "Chute de diamant (gauche) posée sur une diamant",
        steps: 1,
        from: ["  ", " d", " d"],
        to: ["  ", "d ", " d"],
    },
    {
        name: "Chute de diamant (gauche) posée sur une diamant",
        steps: 2,
        from: ["  ", " d", " d"],
        to: ["  ", "  ", "dd"],
    },
]
