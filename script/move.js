const MoveState = cc.Enum({
    NONE  : -1,
    IDLE  : -1,
    UP    : -1,
    RIGHT : -1,
    LEFT  : -1,
    DOWN  : -1
});

cc.Class({
    extends : cc.Component,
    
    properties: {
        moveSpeed : 0,   
    },
    
    statics : {
        MoveState : MoveState
    },
    
    //use node on to react with event
    onLoad : function () {
        this.moveState = MoveState.IDLE;
        this.node.on("stand", this.idle, this);
        this.node.on("freeze", this.stop, this);
        this.node.on("update-dir", this.updateDir, this);
    },
    
    updateDir : function (event) {
        this.moveDir = event.detail.dir;  
    },
    
    // move state change functions
    idle : function () {
        if(this.moveState !== MoveState.IDLE){
            this.moveState = MoveState.IDLE;
            cc.log("MoveStateChange :: IDLE");
        }
    },    
    stop : function () {
        this.moveState = MoveState.NONE;
        this.moveDir   = null;
        cc.log("MoveStateChange :: STOP");
    },    
    moveUp : function () {
        if(this.moveState !== MoveState.UP){
            this.moveState = MoveState.UP;
            cc.log("MoveStateChange :: UP");
        }
    },
    moveDown : function () {
        if(this.moveState !== MoveState.DOWN){
            this.moveState = MoveState.DOWN;
            cc.log("MoveStateChange :: DOWN");
        }
    },
    moveLeft : function () {
        if(this.moveState !== MoveState.LEFT){
            this.moveState = MoveState.LEFT;
            // this.node.scaleX = -1;
            cc.log("MoveStateChange :: LEFT");
        }
    },
    moveRight : function () {
        if(this.moveState !== MoveState.RIGHT){
            this.moveState = MoveState.RIGHT;
            // this.node.scaleX = 1;
            cc.log("MoveStateChange :: RIGHT");
        }
    },
    
    update : function (dt) {
        if (this.moveDir) {
            this.node.x += this.moveSpeed * this.moveDir.x * dt;
            this.node.y += this.moveSpeed * this.moveDir.y * dt;
            let deg = cc.radiansToDegrees(cc.pToAngle(this.moveDir));
            // pay attention radiansToDegrees will provide a degree between (-180,180)
            if (deg >= 45 &&  deg < 135){
                this.moveUp();
            }else if (deg >= 135 || deg < -135){
                this.moveLeft();
            }else if (deg >= -135 && deg < -45){
                this.moveDown();
            }else {
                this.moveRight();
            }
        } else if (this.moveState !== MoveState.NONE) {
            this.idle();
        }
    },
});