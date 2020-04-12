class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture,frame,pointValue){
        super(scene,x,y,texture,frame);

        scene.add.existing(this); //add object to existing scene
        this.points = pointValue;
    }

    update(){
        //move spaceship left
        this.x -= 3;
        //wraparound from left to right edge
        if (this.x <= 0-this.width){
            this.x = game.config.width;
        }
    }
}