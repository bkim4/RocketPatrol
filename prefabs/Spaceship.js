class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture,frame,pointValue,fasttype){
        super(scene,x,y,texture,frame);

        scene.add.existing(this); //add object to existing scene
        this.panicspeed = 1; //handles speed up when 20 seconds are left
        this.speed = game.settings.spaceshipSpeed;
        this.speedmod = (Math.random()-0.5)*1.3;
        this.points = pointValue;
        if (fasttype)
            this.speed *= 1.5;
    }

    update(){
        //move spaceship left
        this.x -= (game.settings.spaceshipSpeed + this.speedmod) * this.panicspeed;
        //wraparound from left to right edge
        if (this.x <= 0 - this.width)
            this.reset();
    }

    panic(){
        if (this.panicspeed == 1){
            this.panicspeed = 2.0;
        }
    }

    randomspeed(){
        this.speedmod = (Math.random()-0.5)*2;
    }

    reset(){
        this.x = game.config.width;
    }
    
}