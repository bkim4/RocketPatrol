class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture,frame,pointValue,fasttype){
        super(scene,x,y,texture,frame);

        scene.add.existing(this); //add object to existing scene
        this.speed = 0;

        if (fasttype){
            this.speed = 5;
        }
        else {
            this.speed = 3;
        }
    }

    update(){
        //move spaceship left
        this.x -= this.speed;
        //wraparound from left to right edge
        if (this.x <= 0-this.width)
            this.reset();
    }

    reset(){
        this.x = game.config.width;
    }
    
}