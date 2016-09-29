cc.Class({
    extends : cc.Component,
    
    onLoad () {
        
        
        this.registerInput();
      
    },
    
    input () {
        this.inputEnabled = true;
    },
    
    registerInput () {
        var self = this;
        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          onTouchBegan: function (touch, event) {
              if (self.inputEnabled === false) {
                  return true;
              }
              self.node.opacity = 255;
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
              self.node.opacity = 15;
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
    
})