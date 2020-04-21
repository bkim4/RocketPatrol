/*
___________________________________________________________

rocket patrol MOD update breakdown 
___________________________________________________________

in order of appearance, should be able to ctrl + F verbatim:
    main.js
        highscore vars
    Menu.js
        create:
            highscore display
    Play.js
        preload():
            fastship.png
        create():
            add fastships
            shiptype bool
            new highscore display
            fire display
            highscore display
            timer display
        update():
            timer display update
            speed up at 20 s
            fire display
        other:
            change ship type
            add time on hit
            randomize ship speed
    Spaceship.js
        panic()
            speed up at 20 s
        randomspeed()
            randomizes ship speed
*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000,
    difficulty: 0
}

//highscore vars
game.highscore = {
    easy: 0,
    hard: 0
}

//reserve keyboard vars
let keyF, keyLEFT, keyRIGHT