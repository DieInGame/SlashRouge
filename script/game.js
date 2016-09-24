// game manager: control the game
cc.Class({
    extends: cc.Component,
    
    properties: {
        player     : cc.Node,
        // cameraRoot : cc.Animation,
        // playerFx   : cc.Node,
        // poolMgr    : cc.Node,
    },
    
    // Initialization
    onLoad () {
        // get the script obj from instance       
        this.player = this.player.getComponent('player');
        this.player.init(this);
        // this.player.node.active = false;
        this.playerReady();
        
    },
    
    
    // if all resources is prepared ,active player 
    playerReady: function () {
        this.player.node.active = true;
        this.player.ready();
    },
    
    death () {
        console.debug('player dead')
    }
    
})