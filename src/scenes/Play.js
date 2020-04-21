class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        //load images/tile sprites
        this.load.image('rocket','./assets/rocket.png');
        this.load.image('spaceship','./assets/spaceship.png');
        this.load.image('fastship','./assets/fastship.png');
        this.load.image('starfield','./assets/starfield.png');
        //load spritesheet (explosion animation)
        this.load.spritesheet('explosion','./assets/explosion.png',{frameWidth:64,frameHeight:32,startFrame:0,endFrame:9});
    }

    create(){
        //place tile sprite (background)
        this.starfield = this.add.tileSprite(0,0,640,480,'starfield').setOrigin(0,0);

        //rectangle(x,y,width,height,color)
        // white rectangle borders
        this.add.rectangle(5,5,630,32,0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(5,443,630,32,0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(5,5,32,455,0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(603,5,32,455,0xFFFFFF).setOrigin(0,0);
        // green UI bg
        this.add.rectangle(37,42,566,64,0x00FF00).setOrigin(0,0);

        //add rocket (p1)
        this.p1Rocket = new Rocket(this,game.config.width/2,431,'rocket').setScale(0.5,0.5).setOrigin(0,0);

        //add spaceships
        this.ship01 = new Spaceship(this,game.config.width+192,132,'spaceship',0,30,false).setOrigin(0,0);
        this.ship02 = new Spaceship(this,game.config.width+96,196,'spaceship',0,20,false).setOrigin(0,0);
        this.ship03 = new Spaceship(this,game.config.width,260,'spaceship',0,10,false).setOrigin(0,0);

        //add fastships
        this.fship01 = new Spaceship(this,game.config.width+192,132,'fastship',0,60,true).setOrigin(0,0);
        this.fship02 = new Spaceship(this,game.config.width+96,196,'fastship',0,40,true).setOrigin(0,0);
        this.fship03 = new Spaceship(this,game.config.width,260,'fastship',0,20,true).setOrigin(0,0);

        //shiptype bool - determines whether a given lane should have the normal ship or fast ship be active
        this.shiptype01 = false;
        this.shiptype02 = false;
        this.shiptype03 = false;

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion',{start:0,end:9,first:0}),
            frameRate: 30
        });

        //score
        this.p1Score = 0;
        //score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69,54,this.p1Score,scoreConfig);

        //game over flag
        this.gameOver = false;

        //timer
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.gameOver = true;
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or ⬅ for Menu', scoreConfig).setOrigin(0.5);
        }, null, this);

    }

    update(){
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)){
            this.scene.restart(this.p1Score);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;
        if (!this.gameOver){
            this.p1Rocket.update();
            if (this.shiptype01)
                this.fship01.update();
            else
                this.ship01.update();
            if (this.shiptype02)
                this.fship02.update();
            else
                this.ship02.update();
            if (this.shiptype03)
                this.fship03.update();
            else
                this.ship03.update();
        }

        if (this.processCollision(this.p1Rocket,this.ship03)) this.shiptype03 = !this.shiptype03;
        if (this.processCollision(this.p1Rocket,this.fship03)) this.shiptype03 = !this.shiptype03;
        if (this.processCollision(this.p1Rocket,this.ship02)) this.shiptype02 = !this.shiptype02;
        if (this.processCollision(this.p1Rocket,this.fship02)) this.shiptype02 = !this.shiptype02;
        if (this.processCollision(this.p1Rocket,this.ship01)) this.shiptype01 = !this.shiptype01;
        if (this.processCollision(this.p1Rocket,this.fship01)) this.shiptype01 = !this.shiptype01;
    }

    processCollision(rocket,ship){
        if(this.checkCollision(rocket,ship)){
            rocket.reset();
            this.shipExplode(ship);

            //75% chance to change ship type on explosion
            return (Math.random()<0.75);
        }
    }

    checkCollision(rocket,ship){
        //simple AABB checking (Axis-Aligned Bounding Boxes)
        return (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y)
    }

    shipExplode(ship){
        //hit spaceshipship (ship), add points etc.
        ship.alpha = 0;
        let boom = this.add.sprite(ship.x,ship.y,'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        })
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }
}