cc.Class({
    extends: cc.Component,

    properties: {
        radius  : 0,
        atkDist : 0,
        atkDuration: 0,
        atkInterval: 0, 
        atkDamage: 0,
        moveSpeed: 0,
        atkMoveSpeed: 0,
        hp: 0,
        
        touchThreshold: 0,
        touchMoveThreshold: 0,
    },

    // use this for initialization
    init (game) {
        this.game = game;
        this.inputEnabled = false;
        this.isAttacking = false;
        this.isAlive = true;
        this.registerInput();
        this.atkTargetPos = cc.p(0,0);
        
        // set two values for dash
        this.isAtkGoingOut = false;
        this.validAtkRect  = cc.Rect(25,25,(this.node.parent.width - 50), (this.node.parent.height - 50)) ;
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
              self.node.emit('update-dir' , {
                  dir: null
              });
              let isHold = self.isTouchHold();
              if (!self.hasMoved && !self.isHold) {
                  var touchLoc = touch.getLocation();
                  let atkPos   = self.node.parent.convertToNodeSpaceAR(atkPos);
                  let atkDir   = cc.pSub( atkPos, self.node.position);
                  self.atkTargetPos = cc.pSub( self.node.position, cc.pMult(cc.pNormalize(atkDir), self.atkDist));
                  let atkPosWorld   = self.node.parent.convertToNodeSpaceAR(self.atkTargetPos);
                  if (!cc.rectContainsPoint(self.validAtkRect, atkPosWorld)) {
                      self.isAtkGoingOut = true;
                  }else{
                      self.isAtkGoingOut = false;
                  }
                  self.node.emit('freeze');
                  self.attackOnTarget(atkDir, self.atkTargetPos);
              }
              self.hasMoved = false;
          }
      }, self.node);  
    },
    
    ready () {
        this.node.emit('stand');
        this.inputEnabled = true;
        this.isActive     = true;
    },
    
    isTouchHold () {
        let timeDiff = Date.now() - this.touchStartTime;
        return ( timeDiff >= this.touchThreshold );
    },
    
    attackOnTarget (atkDir, targetPos) {
        // handle battle
    },
    
    onAtkFinished () {
        this.inputEnabled = true;
        this.isAttacking  = false;
        this.isAtkGoingOut= false;
        
        
    },
    
    update (dt) {
        if (this.isAlive === false) {
            return;
        }
        if (this.isAttacking) {
            if (this.isAtkGoingOut) {
                this.node.stopAllActions();
                this.onAtkFinished();
            }
        }
        
        if (this.inputEnabled && this.moveToPos && this.isTouchHold()) {
            let dir = cc.pSub(this.moveToPos, this.node.position);
            let rad = cc.pToAngle(dir);
            let deg = cc.radiansToDegrees(rad);
            
            this.node.emit('update-dir', {
                dir: cc.pNormalize(dir)
            });
        }
    },
   
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
