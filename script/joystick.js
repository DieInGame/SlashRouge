cc.Class({
    extends: cc.Component,

    properties: {
        radius  : 0,
        player  : cc.Node,
        
        touchThreshold: 0,
        touchMoveThreshold: 0,
    },

    // use this for initialization
    onLoad () {
        
        this.inputEnabled = true;
        this.registerInput();
      
    },

    registerInput () {
      var self = this;
      // listen to input
      cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          onTouchBegan: function (touch, event) {
              if (self.inputEnabled === false) {
                  return true;
              }
              var touchLoc = touch.getLocation();
              self.touchBeganLoc = touchLoc;
              self.moveToPos     = self.node.parent.convertToNodeSpaceAR(touchLoc);
              self.touchStartTime= Date.now();
              return true; 
          },
          onTouchMoved: function (touch, event) {
              if (self.inputEnabled === false) {
                  return;
              }
              var touchLoc = touch.getLocation();
              
              self.moveToPos = self.node.parent.convertToNodeSpaceAR(touchLoc);
              if ( cc.pDistance(self.touchBeganLoc, touchLoc) > self.touchMoveThreshold ) {
                  self.hasMoved = true;
              }
          },
          onTouchEnded: function (touch, event) {
              if (self.inputEnabled === false) {
                  return;
              }
              self.moveToPos = null;
              // emit?   this object will dispatch event directly, this func will not attach this event to any other obj
              self.player.emit('update-dir' , {
                  dir: null
              });
              let isHold = self.isTouchHold();
              if (!self.hasMoved && !self.isHold) {
                  var touchLoc = touch.getLocation();
                  
                  self.player.emit('freeze');
                 
              }
              self.hasMoved = false;
              cc.log("TOUCH STOP");
          }
      }, self.node);  
    },

    isTouchHold () {
        let timeDiff = Date.now() - this.touchStartTime;
        return ( timeDiff >= this.touchThreshold );
    },
    
    attackOnTarget (atkDir, targetPos) {
        // handle battle
    },
    
    update (dt) {
        if (this.inputEnabled && this.moveToPos && this.isTouchHold()) {
            let dir = cc.pSub(this.moveToPos, this.node.position);
            let rad = cc.pToAngle(dir);
            let deg = cc.radiansToDegrees(rad);
            
            if(Math.abs(dir.x)<130 && Math.abs(dir.y)<130){
                this.player.emit('update-dir', {
                    dir: cc.pNormalize(dir)
                });
                cc.log("JOYSTICK WORK")
            }          
        }
    },
   
 
});
