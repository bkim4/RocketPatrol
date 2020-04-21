class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);

        
        scene.add.existing(this); //add object to existing scene
        this.isFiring = false;

        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update(){
        // L/R movement
        if(!this.isFiring){
            if(keyLEFT.isDown && this.x >= 47)
                this.x -= 2.5;
            else if (keyRIGHT.isDown && this.x <= 578)
                this.x += 2.5;
        }
        //fire
        if(Phaser.Input.Keyboard.JustDown(keyF)){
            if (!this.isFiring) this.sfxRocket.play();
            this.isFiring = true;
        }
        //if fired, move up
        if(this.isFiring && this.y >= 100)
            this.y -= 2.5;
        //reset on miss
        if(this.y <= 108){
            this.reset();
        }
    }

    reset(){
        this.isFiring = false;
        this.y = 431;
    }
}