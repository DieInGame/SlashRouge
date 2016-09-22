// game manager: control the game
cc.Class({
    extends: cc.Component,
    
    properties: {
        player     : cc.Node,
        cameraRoot : cc.Animation,
        playerFx   : cc.Node,
        poolMgr    : cc.Node,
    },
    
    // Initialization
    onLoad () {
        // get the script obj from instance
        // this.playerFx = this.playerFx.getComponent('playerFx');
        // this.playerFx.init(this);
        
        this.player = this.player.getComponent('player');
        this.player.init(this);
        this.player.node.active = false;
        
        // this.poolMgr = this.poolMgr.getComponent('poolMgr');
        // this.poolMgr.init();
    },
    
    
    
    
    // camera 
    cameraShake () {
      this.cameraRoot.play('camera-shake');  
    },
    
    // player 
    playerReady: function () {
        this.player.node.active = true;
        this.player.ready();
    },
    
    death () {
        console.debug('player dead')
    }
    
})