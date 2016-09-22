require=function t(e,i,s){function o(a,c){if(!i[a]){if(!e[a]){var r="function"==typeof require&&require;if(!c&&r)return r(a,!0);if(n)return n(a,!0);var h=new Error("Cannot find module '"+a+"'");throw h.code="MODULE_NOT_FOUND",h}var p=i[a]={exports:{}};e[a][0].call(p.exports,function(t){var i=e[a][1][t];return o(i?i:t)},p,p.exports,t,e,i,s)}return i[a].exports}for(var n="function"==typeof require&&require,a=0;a<s.length;a++)o(s[a]);return o}({AnimHelper:[function(t,e,i){"use strict";cc._RFpush(e,"d6ff4kVMSdOh7u6WwhErR6E","AnimHelper"),cc.Class({"extends":cc.Component,properties:{particleToPlay:cc.ParticleSystem,finishHandler:cc.Component.EventHandler,fireHandler:cc.Component.EventHandler},playParticle:function(){this.particleToPlay&&this.particleToPlay.resetSystem()},fire:function(){cc.Component.EventHandler.emitEvents([this.fireHandler])},finish:function(){cc.Component.EventHandler.emitEvents([this.finishHandler])}}),cc._RFpop()},{}],BossMng:[function(t,e,i){"use strict";cc._RFpush(e,"af14cbY2OJFKb7mH92ncVxo","BossMng");var s=t("Types").BossType,o=t("Spawn");cc.Class({"extends":cc.Component,properties:{demonSpawn:o},init:function(t){this.game=t,this.waveMng=t.waveMng,this.bossIdx=0},startBoss:function(){this.bossIdx===s.Demon&&this.waveMng.startBossSpawn(this.demonSpawn)},endBoss:function(){this.bossIdx++}}),cc._RFpop()},{Spawn:"Spawn",Types:"Types"}],BossProgress:[function(t,e,i){"use strict";cc._RFpush(e,"178aaufFWBMjKEMUnBNqyHl","BossProgress"),cc.Class({"extends":cc.Component,properties:{fxParticle:cc.ParticleSystem,anim:cc.Animation},init:function(t){this.waveMng=t},show:function(){this.node.active=!0,this.anim.play("turn-red")},hide:function(){this.node.active=!1},showParticle:function(){this.fxParticle.resetSystem()}}),cc._RFpop()},{}],ButtonScaler:[function(t,e,i){"use strict";cc._RFpush(e,"d7564Cn9+NOM6YfHHX7zsyO","ButtonScaler"),cc.Class({"extends":cc.Component,properties:{pressedScale:1,transDuration:0},onLoad:function(){function t(t){this.stopAllActions(),this.runAction(i.scaleDownAction)}function e(t){this.stopAllActions(),this.runAction(i.scaleUpAction)}var i=this;i.initScale=this.node.scale,i.button=i.getComponent(cc.Button),i.scaleDownAction=cc.scaleTo(i.transDuration,i.pressedScale),i.scaleUpAction=cc.scaleTo(i.transDuration,i.initScale),this.node.on("touchstart",t,this.node),this.node.on("touchend",e,this.node),this.node.on("touchcancel",e,this.node)}}),cc._RFpop()},{}],ComboDisplay:[function(t,e,i){"use strict";cc._RFpush(e,"8eb3c3ywppFI6IWH3Np7yc9","ComboDisplay"),cc.Class({"extends":cc.Component,properties:{labelCombo:cc.Label,spFlare:cc.Sprite,anim:cc.Animation,comboColors:[cc.Color],showDuration:0},init:function(){this.comboCount=0,this.node.active=!1,this.showTimer=0},playCombo:function(){this.comboCount++,this.node.active=!0;var t=Math.min(Math.floor(this.comboCount/10),this.comboColors.length-1);this.spFlare.node.color=this.comboColors[t],this.labelCombo.node.color=this.comboColors[t],this.labelCombo.string=this.comboCount,this.anim.play("combo-pop"),this.showTimer=0},hide:function(){this.comboCount=0,this.node.active=!1},update:function(t){this.node.active&&(this.showTimer+=t,this.showTimer>=this.showDuration&&this.hide())}}),cc._RFpop()},{}],DeathUI:[function(t,e,i){"use strict";cc._RFpush(e,"0966f3/svtKzIRd+HwG3Kyd","DeathUI"),cc.Class({"extends":cc.Component,properties:{},init:function(t){this.game=t,this.hide()},show:function(){this.node.setPosition(0,0)},hide:function(){this.node.x=3e3},revive:function(){this.game.revive()},gameover:function(){this.game.gameOver()}}),cc._RFpop()},{}],Foe:[function(t,e,i){"use strict";cc._RFpush(e,"d887bx46FZAa4lxVyJ37BSp","Foe");var s=(t("Move").MoveState,t("Types").FoeType),o=t("Types").ProjectileType,n=cc.Enum({Melee:-1,Range:-1});cc.Class({"extends":cc.Component,properties:{foeType:{"default":s.Foe0,type:s},atkType:{"default":n.Melee,type:n},projectileType:{"default":o.Arrow,type:o},hitPoint:0,hurtRadius:0,atkRange:0,atkDist:0,atkDuration:0,atkStun:0,atkPrepTime:0,corpseDuration:0,sfAtkDirs:[cc.SpriteFrame],fxSmoke:cc.ParticleSystem,fxBlood:cc.Animation,fxBlade:cc.Animation},init:function(t){this.waveMng=t,this.player=t.player,this.isAttacking=!1,this.isAlive=!1,this.isInvincible=!1,this.isMoving=!1,this.hp=this.hitPoint,this.move=this.getComponent("Move"),this.anim=this.move.anim,this.spFoe=this.anim.getComponent(cc.Sprite),this.bloodDuration=this.fxBlood.getAnimationState("blood").clip.duration,this.fxBlood.node.active=!1,this.fxBlade.node.active=!1,this.anim.getAnimationState("born")?this.anim.play("born"):this.readyToMove()},update:function(t){if(this.isAlive!==!1){var e=cc.pDistance(this.player.node.position,this.node.position);if(this.player.isAttacking&&this.isInvincible===!1&&e<this.hurtRadius)return void this.dead();if(this.isAttacking&&this.player.isAlive&&e<this.player.hurtRadius)return void this.player.dead();if(this.player&&this.isMoving){var i=cc.pSub(this.player.node.position,this.node.position),s=cc.pToAngle(i);cc.radiansToDegrees(s);if(e<this.atkRange)return void this.prepAttack(i);this.node.emit("update-dir",{dir:cc.pNormalize(i)})}}},readyToMove:function(){this.isAlive=!0,this.isMoving=!0,this.fxSmoke.resetSystem()},prepAttack:function(t){var e="";e=Math.abs(t.x)>=Math.abs(t.y)?"pre_atk_right":t.y>0?"pre_atk_up":"pre_atk_down",this.node.emit("freeze"),this.anim.play(e),this.isMoving=!1,this.scheduleOnce(this.attack,this.atkPrepTime)},attack:function(){if(this.isAlive!==!1){this.anim.stop();var t=cc.pSub(this.player.node.position,this.node.position),e=null;this.atkType===n.Melee&&(e=cc.pAdd(this.node.position,cc.pMult(cc.pNormalize(t),this.atkDist))),this.attackOnTarget(t,e)}},attackOnTarget:function(t,e){function i(t,e){for(var i=null,s=1;s<a.length;++s){var o=a[s-1],n=a[s];if(t<=n&&t>o)return i=e[s-1]}if(null===i)return cc.error("cannot find correct attack pose sprite frame! mag: "+t),null}var s=cc.radiansToDegrees(cc.pAngleSigned(cc.p(0,1),t)),a=[0,45,135,180],c=Math.abs(s);s<=0?(this.anim.node.scaleX=1,this.spFoe.spriteFrame=i(c,this.sfAtkDirs)):(this.anim.node.scaleX=-1,this.spFoe.spriteFrame=i(c,this.sfAtkDirs));var r=cc.delayTime(this.atkStun),h=cc.callFunc(this.onAtkFinished,this);if(this.atkType===n.Melee){var p=cc.moveTo(this.atkDuration,e).easing(cc.easeQuinticActionOut());this.node.runAction(cc.sequence(p,r,h)),this.isAttacking=!0}else{if(this.projectileType===o.None)return;this.waveMng.spawnProjectile(this.projectileType,this.node.position,t),this.node.runAction(cc.sequence(r,h))}},onAtkFinished:function(){this.isAttacking=!1,this.isAlive&&(this.isMoving=!0)},dead:function(){this.move.stop(),this.isMoving=!1,this.isAttacking=!1,this.anim.play("dead"),this.fxBlood.node.active=!0,this.fxBlood.node.scaleX=this.anim.node.scaleX,this.fxBlood.play("blood"),this.fxBlade.node.active=!0,this.fxBlade.node.rotation=40*cc.randomMinus1To1(),this.fxBlade.play("blade"),this.unscheduleAllCallbacks(),this.node.stopAllActions(),this.waveMng.hitFoe(),this.player.addKills(),--this.hp>0?(this.isInvincible=!0,this.scheduleOnce(this.invincible,this.bloodDuration)):(this.isAlive=!1,this.scheduleOnce(this.corpse,this.bloodDuration),this.waveMng.killFoe())},invincible:function(){this.fxBlood.node.active=!1,this.isMoving=!0;var t=cc.blink(1,6),e=cc.callFunc(this.onInvincibleEnd,this);this.anim.node.runAction(cc.sequence(t,e))},onInvincibleEnd:function(){this.isInvincible=!1},corpse:function(){this.anim.play("corpse"),this.fxBlood.node.active=!1,this.scheduleOnce(this.recycle,this.corpseDuration)},recycle:function(){this.waveMng.despawnFoe(this)}}),cc._RFpop()},{Move:"Move",Types:"Types"}],GameOverUI:[function(t,e,i){"use strict";cc._RFpush(e,"c3ee4ElVWtB2Lzir0h5v/ow","GameOverUI"),cc.Class({"extends":cc.Component,properties:{},init:function(t){this.game=t,this.hide()},show:function(){this.node.setPosition(0,0)},hide:function(){this.node.x=3e3},restart:function(){this.game.restart()}}),cc._RFpop()},{}],Game:[function(t,e,i){"use strict";cc._RFpush(e,"f8d83fBpLZCEqij5BvvBhRZ","Game"),cc.Class({"extends":cc.Component,properties:{player:cc.Node,inGameUI:cc.Node,playerFX:cc.Node,waveMng:cc.Node,bossMng:cc.Node,poolMng:cc.Node,foeGroup:cc.Node,deathUI:cc.Node,gameOverUI:cc.Node,cameraRoot:cc.Animation},onLoad:function(){this.playerFX=this.playerFX.getComponent("PlayerFX"),this.playerFX.init(this),this.player=this.player.getComponent("Player"),this.player.init(this),this.player.node.active=!1,this.poolMng=this.poolMng.getComponent("PoolMng"),this.poolMng.init(),this.waveMng=this.waveMng.getComponent("WaveMng"),this.waveMng.init(this),this.bossMng=this.bossMng.getComponent("BossMng"),this.bossMng.init(this),this.sortMng=this.foeGroup.getComponent("SortMng"),this.sortMng.init()},start:function(){this.playerFX.playIntro(),this.inGameUI=this.inGameUI.getComponent("InGameUI"),this.inGameUI.init(this),this.deathUI=this.deathUI.getComponent("DeathUI"),this.deathUI.init(this),this.gameOverUI=this.gameOverUI.getComponent("GameOverUI"),this.gameOverUI.init(this)},pause:function(){var t=cc.director.getScheduler();t.pauseTarget(this.waveMng),this.sortMng.enabled=!1},resume:function(){var t=cc.director.getScheduler();t.resumeTarget(this.waveMng),this.sortMng.enabled=!0},cameraShake:function(){this.cameraRoot.play("camera-shake")},death:function(){this.deathUI.show(),this.pause()},revive:function(){this.deathUI.hide(),this.playerFX.playRevive(),this.player.revive()},clearAllFoes:function(){for(var t=this.foeGroup.children,e=0;e<t.length;++e){var i=t[e].getComponent("Foe");if(i)i.dead();else{var s=t[e].getComponent("Projectile");s&&s.broke()}}},playerReady:function(){this.resume(),this.waveMng.startWave(),this.player.node.active=!0,this.player.ready()},gameOver:function(){this.deathUI.hide(),this.gameOverUI.show()},restart:function(){cc.director.loadScene("PlayGame")}}),cc._RFpop()},{}],HomeUI:[function(t,e,i){"use strict";cc._RFpush(e,"aa77bcy1MlA3bRL8zpupFoD","HomeUI"),cc.Class({"extends":cc.Component,properties:{menuAnim:{"default":null,type:cc.Animation},menuParticle:{"default":null,type:cc.ParticleSystem},btnGroup:{"default":null,type:cc.Node}},onLoad:function(){},start:function(){cc.eventManager.pauseTarget(this.btnGroup,!0),this.scheduleOnce(function(){this.menuAnim.play(),this.menuParticle.enabled=!1}.bind(this),2)},showParticle:function(){this.menuParticle.enabled=!0},enableButtons:function(){cc.eventManager.resumeTarget(this.btnGroup,!0)},playGame:function(){cc.eventManager.pauseTarget(this.btnGroup,!0),cc.director.loadScene("PlayGame")}}),cc._RFpop()},{}],InGameUI:[function(t,e,i){"use strict";cc._RFpush(e,"8df10iIWI5JgrcFs/5AlGtD","InGameUI"),cc.Class({"extends":cc.Component,properties:{waveUI:cc.Node,killDisplay:cc.Node,comboDisplay:cc.Node},init:function(t){this.waveUI=this.waveUI.getComponent("WaveUI"),this.waveUI.node.active=!1,this.killDisplay=this.killDisplay.getComponent("KillDisplay"),this.killDisplay.node.active=!1,this.comboDisplay=this.comboDisplay.getComponent("ComboDisplay"),this.comboDisplay.init()},showWave:function(t){this.waveUI.node.active=!0,this.waveUI.show(t)},showKills:function(t){this.killDisplay.playKill(t)},addCombo:function(){this.comboDisplay.playCombo()}}),cc._RFpop()},{}],KillDisplay:[function(t,e,i){"use strict";cc._RFpush(e,"592dd/u1/tEOJgCdwAZWLVG","KillDisplay"),cc.Class({"extends":cc.Component,properties:{labelKills:cc.Label,anim:cc.Animation},playKill:function(t){this.node.active=!0,this.labelKills.string=t,this.anim.play("kill-pop")},hide:function(){this.node.active=!1}}),cc._RFpop()},{}],Move:[function(t,e,i){"use strict";cc._RFpush(e,"03fecYvs+9L07SPviQLuLj3","Move");var s=cc.Enum({None:-1,Stand:-1,Up:-1,Right:-1,Down:-1,Left:-1});cc.Class({"extends":cc.Component,properties:{moveSpeed:0,anim:{"default":null,type:cc.Animation}},statics:{MoveState:s},onLoad:function(){this.moveState=s.Stand,this.node.on("stand",this.stand,this),this.node.on("freeze",this.stop,this),this.node.on("update-dir",this.updateDir,this)},stand:function(){this.moveState!==s.Stand&&(this.anim.play("stand"),this.moveState=s.Stand)},stop:function(){this.anim.stop(),this.moveState=s.None,this.moveDir=null},moveUp:function(){this.moveState!==s.Up&&(this.anim.play("run_up"),this.anim.node.scaleX=1,this.moveState=s.Up)},moveDown:function(){this.moveState!==s.Down&&(this.anim.play("run_down"),this.anim.node.scaleX=1,this.moveState=s.Down)},moveRight:function(){this.moveState!==s.Right&&(this.anim.play("run_right"),this.anim.node.scaleX=1,this.moveState=s.Right)},moveLeft:function(){this.moveState!==s.Left&&(this.anim.play("run_right"),this.anim.node.scaleX=-1,this.moveState=s.Left)},updateDir:function(t){this.moveDir=t.detail.dir},update:function(t){if(this.moveDir){this.node.x+=this.moveSpeed*this.moveDir.x*t,this.node.y+=this.moveSpeed*this.moveDir.y*t;var e=cc.radiansToDegrees(cc.pToAngle(this.moveDir));e>=45&&e<135?this.moveUp():e>=135||e<-135?this.moveLeft():e>=-45&&e<45?this.moveRight():this.moveDown()}else this.moveState!==s.None&&this.stand()}}),cc._RFpop()},{}],NodePool:[function(t,e,i){"use strict";cc._RFpush(e,"4762cqE38NHn451+NhWnQ5U","NodePool");var s=cc.Class({name:"NodePool",properties:{prefab:cc.Prefab,size:0},ctor:function(){this.idx=0,this.initList=[],this.list=[]},init:function(){for(var t=0;t<this.size;++t){var e=cc.instantiate(this.prefab);this.initList[t]=e,this.list[t]=e}this.idx=this.size-1},reset:function(){for(var t=0;t<this.size;++t){var e=this.initList[t];this.list[t]=e,e.active&&(e.active=!1),e.parent&&e.removeFromParent()}this.idx=this.size-1},request:function(){if(this.idx<0)return cc.log("Error: the pool do not have enough free item."),null;var t=this.list[this.idx];return t&&(t.active=!0),--this.idx,t},"return":function(t){++this.idx,t.active=!1,t.parent&&t.removeFromParent(),this.list[this.idx]=t}});e.exports=s,cc._RFpop()},{}],PlayerFX:[function(t,e,i){"use strict";cc._RFpush(e,"473ddOy0BlLraG4rFvYcoyb","PlayerFX"),cc.Class({"extends":cc.Component,properties:{introAnim:cc.Animation,reviveAnim:cc.Animation},init:function(t){this.game=t,this.introAnim.node.active=!1,this.reviveAnim.node.active=!1},playIntro:function(){this.introAnim.node.active=!0,this.introAnim.play("start")},playRevive:function(){this.reviveAnim.node.active=!0,this.reviveAnim.node.setPosition(this.game.player.node.position),this.reviveAnim.play("revive")},introFinish:function(){this.game.playerReady(),this.introAnim.node.active=!1},reviveFinish:function(){this.game.playerReady(),this.reviveAnim.node.active=!1},reviveKill:function(){this.game.clearAllFoes()}}),cc._RFpop()},{}],Player:[function(t,e,i){"use strict";cc._RFpush(e,"b7fe1Feo8hKMoqKLY3I4z0F","Player"),cc.Class({"extends":cc.Component,properties:{fxTrail:cc.ParticleSystem,spArrow:cc.Node,sfAtkDirs:[cc.SpriteFrame],attachPoints:[cc.Vec2],sfPostAtks:[cc.SpriteFrame],spPlayer:cc.Sprite,spSlash:cc.Sprite,hurtRadius:0,touchThreshold:0,touchMoveThreshold:0,atkDist:0,atkDuration:0,atkStun:0,invincible:!1},init:function(t){this.game=t,this.anim=this.getComponent("Move").anim,this.inputEnabled=!1,this.isAttacking=!1,this.isAlive=!0,this.nextPoseSF=null,this.registerInput(),this.spArrow.active=!1,this.atkTargetPos=cc.p(0,0),this.isAtkGoingOut=!1,this.validAtkRect=cc.rect(25,25,this.node.parent.width-50,this.node.parent.height-50),this.oneSlashKills=0},registerInput:function(){var t=this;cc.eventManager.addListener({event:cc.EventListener.TOUCH_ONE_BY_ONE,onTouchBegan:function(e,i){if(t.inputEnabled===!1)return!0;var s=e.getLocation();return t.touchBeganLoc=s,t.moveToPos=t.node.parent.convertToNodeSpaceAR(s),t.touchStartTime=Date.now(),!0},onTouchMoved:function(e,i){if(t.inputEnabled!==!1){var s=e.getLocation();t.spArrow.active=!0,t.moveToPos=t.node.parent.convertToNodeSpaceAR(s),cc.pDistance(t.touchBeganLoc,s)>t.touchMoveThreshold&&(t.hasMoved=!0)}},onTouchEnded:function(e,i){if(t.inputEnabled!==!1){t.spArrow.active=!1,t.moveToPos=null,t.node.emit("update-dir",{dir:null});var s=t.isTouchHold();if(!t.hasMoved&&!s){var o=e.getLocation(),n=t.node.parent.convertToNodeSpaceAR(o),a=cc.pSub(n,t.node.position);t.atkTargetPos=cc.pAdd(t.node.position,cc.pMult(cc.pNormalize(a),t.atkDist));var c=t.node.parent.convertToWorldSpaceAR(t.atkTargetPos);cc.rectContainsPoint(t.validAtkRect,c)?t.isAtkGoingOut=!1:t.isAtkGoingOut=!0,t.node.emit("freeze"),t.oneSlashKills=0,t.attackOnTarget(a,t.atkTargetPos)}t.hasMoved=!1}}},t.node)},ready:function(){this.fxTrail.resetSystem(),this.node.emit("stand"),this.inputEnabled=!0,this.isAlive=!0},isTouchHold:function(){var t=Date.now()-this.touchStartTime;return t>=this.touchThreshold},attackOnTarget:function(t,e){function i(t,e){for(var i=null,o=1;o<n.length;++o){var c=n[o-1],r=n[o];if(t<=r&&t>c)return i=e[o-1],s.nextPoseSF=s.sfPostAtks[Math.floor((o-1)/3)],a=s.attachPoints[o-1],i}if(null===i)return console.error("cannot find correct attack pose sprite frame! mag: "+t),null}var s=this,o=cc.radiansToDegrees(cc.pAngleSigned(cc.p(0,1),t)),n=[0,12,35,56,79,101,124,146,168,180],a=null,c=Math.abs(o);o<=0?(this.spPlayer.node.scaleX=1,this.spPlayer.spriteFrame=i(c,this.sfAtkDirs)):(this.spPlayer.node.scaleX=-1,this.spPlayer.spriteFrame=i(c,this.sfAtkDirs));var r=cc.moveTo(this.atkDuration,e).easing(cc.easeQuinticActionOut()),h=cc.delayTime(this.atkStun),p=cc.callFunc(this.onAtkFinished,this);this.node.runAction(cc.sequence(r,h,p)),this.spSlash.node.position=a,this.spSlash.node.rotation=c,this.spSlash.enabled=!0,this.spSlash.getComponent(cc.Animation).play("slash"),this.inputEnabled=!1,this.isAttacking=!0},onAtkFinished:function(){this.nextPoseSF&&(this.spPlayer.spriteFrame=this.nextPoseSF),this.spSlash.enabled=!1,this.inputEnabled=!0,this.isAttacking=!1,this.isAtkGoingOut=!1,this.oneSlashKills>=3&&this.game.inGameUI.showKills(this.oneSlashKills)},addKills:function(){this.oneSlashKills++,this.game.inGameUI.addCombo()},revive:function(){var t=cc.callFunc(function(){this.node.active=!1}.bind(this));cc.sequence(cc.delayTime(.6),t)},dead:function(){this.invincible||(this.node.emit("freeze"),this.isAlive=!1,this.isAttacking=!1,this.inputEnabled=!1,this.anim.play("dead"))},corpse:function(){this.anim.play("corpse"),this.scheduleOnce(this.death,.7)},death:function(){this.game.death()},shouldStopAttacking:function(){var t=this.node.parent.convertToWorldSpaceAR(this.node.position),e=this.node.parent.convertToWorldSpaceAR(this.atkTargetPos);return t.x<this.validAtkRect.xMin&&e.x<this.validAtkRect.xMin||t.x>this.validAtkRect.xMax&&e.x>this.validAtkRect.xMax||t.y<this.validAtkRect.yMin&&e.y<this.validAtkRect.yMin||t.y>this.validAtkRect.yMax&&e.y>this.validAtkRect.yMax},update:function(t){if(this.isAlive!==!1&&(this.isAttacking&&this.isAtkGoingOut&&this.shouldStopAttacking()&&(this.node.stopAllActions(),this.onAtkFinished()),this.inputEnabled&&this.moveToPos&&this.isTouchHold())){var e=cc.pSub(this.moveToPos,this.node.position),i=cc.pToAngle(e),s=cc.radiansToDegrees(i);this.spArrow.rotation=90-s,this.node.emit("update-dir",{dir:cc.pNormalize(e)})}}}),cc._RFpop()},{}],PoolMng:[function(t,e,i){"use strict";cc._RFpush(e,"15ae69NDTlDzprf2vQCDLLb","PoolMng");var s=t("NodePool");t("Types").FoeType,t("Types").ProjectileType;cc.Class({"extends":cc.Component,properties:{foePools:{"default":[],type:s},projectilePools:{"default":[],type:s}},init:function(){for(var t=0;t<this.foePools.length;++t)this.foePools[t].init();for(var t=0;t<this.projectilePools.length;++t)this.projectilePools[t].init()},requestFoe:function(t){var e=this.foePools[t];return e.idx>=0?e.request():null},returnFoe:function(t,e){var i=this.foePools[t];return i.idx<i.size?void i["return"](e):void cc.log("Return obj to a full pool, something has gone wrong")},requestProjectile:function(t){var e=this.projectilePools[t];return e.idx>=0?e.request():null},returnProjectile:function(t,e){var i=this.projectilePools[t];return i.idx<i.size?void i["return"](e):void cc.log("Return obj to a full pool, something has gone wrong")}}),cc._RFpop()},{NodePool:"NodePool",Types:"Types"}],Projectile:[function(t,e,i){"use strict";cc._RFpush(e,"bd907OrsYVGJpMAP56xffaF","Projectile");var s=t("Types").ProjectileType;cc.Class({"extends":cc.Component,properties:{projectileType:{"default":s.Arrow,type:s},sprite:cc.Sprite,fxBroken:cc.Animation,moveSpeed:0,canBreak:!0},init:function(t,e){this.waveMng=t,this.player=t.player;var i=cc.pToAngle(e),s=cc.radiansToDegrees(i),o=90-s;this.sprite.node.rotation=o,this.sprite.enabled=!0,this.direction=cc.pNormalize(e),this.isMoving=!0},broke:function(){this.isMoving=!1,this.sprite.enabled=!1,this.fxBroken.node.active=!0,this.fxBroken.play("arrow-break")},hit:function(){this.isMoving=!1,this.onBrokenFXFinished()},onBrokenFXFinished:function(){this.fxBroken.node.active=!1,this.waveMng.despawnProjectile(this)},update:function(t){if(this.isMoving!==!1){var e=cc.pDistance(this.player.node.position,this.node.position);return e<this.player.hurtRadius&&this.player.isAlive?this.canBreak&&this.player.isAttacking?void this.broke():(this.player.dead(),void this.hit()):void(this.isMoving&&(this.node.x+=this.moveSpeed*this.direction.x*t,this.node.y+=this.moveSpeed*this.direction.y*t,(Math.abs(this.node.x)>this.waveMng.foeGroup.width/2||Math.abs(this.node.y)>this.waveMng.foeGroup.height/2)&&this.onBrokenFXFinished()))}}}),cc._RFpop()},{Types:"Types"}],SortMng:[function(t,e,i){"use strict";cc._RFpush(e,"61165e1leJB+4dbkFmx1myT","SortMng"),cc.Class({"extends":cc.Component,properties:{},init:function(){this.frameCount=0},update:function(t){++this.frameCount%6===0&&this.sortChildrenByY()},sortChildrenByY:function(){var t=this.node.children.slice();t.sort(function(t,e){return e.y-t.y});for(var e=0;e<t.length;++e){var i=t[e];i.active&&i.setSiblingIndex(e)}}}),cc._RFpop()},{}],Spawn:[function(t,e,i){"use strict";cc._RFpush(e,"ff6d6lonApC6or/lKfhLG/z","Spawn");var s=t("Types").FoeType,o=cc.Class({name:"Spawn",properties:{foeType:{"default":s.Foe0,type:s},total:0,spawnInterval:0,isCompany:!1},ctor:function(){this.spawned=0,this.finished=!1},spawn:function(t){if(!(this.spawned>=this.total)){var e=t.requestFoe(this.foeType);return e?(this.spawned++,this.spawned===this.total&&(this.finished=!0),e):(cc.log("max foe count reached, will delay spawn"),null)}}});e.exports=o,cc._RFpop()},{Types:"Types"}],Types:[function(t,e,i){"use strict";cc._RFpush(e,"5693aA1l/JEiq6SPSIEPrEp","Types");var s=cc.Enum({Demon:-1,SkeletonKing:-1}),o=cc.Enum({Foe0:-1,Foe1:-1,Foe2:-1,Foe3:-1,Foe5:-1,Foe6:-1,Boss1:-1,Boss2:-1}),n=cc.Enum({Arrow:-1,Fireball:-1,None:999});e.exports={BossType:s,FoeType:o,ProjectileType:n},cc._RFpop()},{}],WaveMng:[function(t,e,i){"use strict";cc._RFpush(e,"2709b0GKQpMn4dRodMMty4Z","WaveMng");var s=(t("Foe"),t("Types").FoeType,t("Types").BossType),o=t("Spawn"),n=cc.Class({name:"Wave",properties:{spawns:{"default":[],type:o},bossType:{"default":s.Demon,type:s}},init:function(){this.totalFoes=0,this.spawnIdx=0;for(var t=0;t<this.spawns.length;++t)this.spawns[t].isCompany===!1&&(this.totalFoes+=this.spawns[t].total)},getNextSpawn:function(){return this.spawnIdx++,this.spawnIdx<this.spawns.length?this.spawns[this.spawnIdx]:null}});cc.Class({"extends":cc.Component,properties:{waves:{"default":[],type:n},startWaveIdx:0,spawnMargin:0,killedFoe:{visible:!1,"default":0,notify:function(){if(this.currentWave&&this.waveTotalFoes&&(this.waveTotalFoes&&this.killedFoe>=this.waveTotalFoes&&this.endWave(),this.waveProgress&&this.waveTotalFoes)){var t=Math.min(this.killedFoe/this.waveTotalFoes,1);this.waveProgress.updateProgress(t)}}},waveProgress:cc.Node,bossProgress:cc.Node},init:function(t){this.game=t,this.player=t.player,this.foeGroup=t.foeGroup,this.waveIdx=this.startWaveIdx,this.spawnIdx=0,this.currentWave=this.waves[this.waveIdx],this.waveProgress=this.waveProgress.getComponent("WaveProgress"),this.waveProgress.init(this),this.bossProgress=this.bossProgress.getComponent("BossProgress"),this.bossProgress.init(this)},startSpawn:function(){this.schedule(this.spawnFoe,this.currentSpawn.spawnInterval)},startBossSpawn:function(t){this.bossSpawn=t,this.waveTotalFoes=t.total,this.killedFoe=0,this.schedule(this.spawnBossFoe,t.spawnInterval)},endSpawn:function(){this.unschedule(this.spawnFoe);var t=this.currentWave.getNextSpawn();t&&(this.currentSpawn=t,this.startSpawn(),t.isCompany&&this.startBoss())},startWave:function(){this.unschedule(this.spawnFoe),this.currentWave.init(),this.waveTotalFoes=this.currentWave.totalFoes,this.killedFoe=0,this.currentSpawn=this.currentWave.spawns[this.currentWave.spawnIdx],this.startSpawn(),this.game.inGameUI.showWave(this.waveIdx+1)},startBoss:function(){this.bossProgress.show(),this.game.bossMng.startBoss()},endWave:function(){this.bossProgress.hide(),this.game.bossMng.endBoss(),this.waveIdx<this.waves.length-1?(this.waveIdx++,this.currentWave=this.waves[this.waveIdx],this.startWave()):cc.log("all waves spawned!")},spawnFoe:function(){if(this.currentSpawn.finished)return void this.endSpawn();var t=this.currentSpawn.spawn(this.game.poolMng);t&&(this.foeGroup.addChild(t),t.setPosition(this.getNewFoePosition()),t.getComponent("Foe").init(this))},spawnBossFoe:function(){this.bossSpawn.finished&&this.unschedule(this.spawnBossFoe);var t=this.bossSpawn.spawn(this.game.poolMng);t&&(this.foeGroup.addChild(t),t.setPosition(this.getNewFoePosition()),t.getComponent("Foe").init(this))},spawnProjectile:function(t,e,i,s){var o=this.game.poolMng.requestProjectile(t);o?(this.foeGroup.addChild(o),o.setPosition(e),o.getComponent("Projectile").init(this,i)):cc.log("requesting too many projectiles! please increase size")},killFoe:function(){this.killedFoe++},hitFoe:function(){this.game.cameraShake()},despawnFoe:function(t){var e=t.foeType;this.game.poolMng.returnFoe(e,t.node)},despawnProjectile:function(t){var e=t.projectileType;this.game.poolMng.returnProjectile(e,t.node)},getNewFoePosition:function(){var t=cc.randomMinus1To1()*(this.foeGroup.width-this.spawnMargin)/2,e=cc.randomMinus1To1()*(this.foeGroup.height-this.spawnMargin)/2;return cc.p(t,e)}}),cc._RFpop()},{Foe:"Foe",Spawn:"Spawn",Types:"Types"}],WaveProgress:[function(t,e,i){"use strict";cc._RFpush(e,"a90aa7G1q5ANJGKlnUcA6SL","WaveProgress"),cc.Class({"extends":cc.Component,properties:{bar:cc.ProgressBar,head:cc.Node,lerpDuration:0},onLoad:function(){},init:function(t){this.waveMng=t,this.bar.progress=0,this.curProgress=0,this.destProgress=0,this.timer=0,this.isLerping=!1},updateProgress:function(t){this.curProgress=this.bar.progress,this.destProgress=t,this.timer=0,this.isLerping=!0},update:function(t){if(this.isLerping!==!1){this.timer+=t,this.timer>=this.lerpDuration&&(this.timer=this.lerpDuration,this.isLerping=!1),this.bar.progress=cc.lerp(this.curProgress,this.destProgress,this.timer/this.lerpDuration);var e=this.bar.barSprite.node.width*this.bar.progress;this.head.x=e}}}),cc._RFpop()},{}],WaveUI:[function(t,e,i){"use strict";cc._RFpush(e,"389b4yNsLZD8oJXlec0Kfzr","WaveUI"),cc.Class({"extends":cc.Component,properties:{labelWave:cc.Label,anim:cc.Animation},onLoad:function(){},show:function(t){this.labelWave.string=t,this.anim.play("wave-pop")},hide:function(){this.node.active=!1}}),cc._RFpop()},{}],game:[function(t,e,i){"use strict";cc._RFpush(e,"378c60X3AVLRqZT1puqp7/Y","game"),cc.Class({"extends":cc.Component,properties:{player:cc.Node,cameraRoot:cc.Animation,playerFx:cc.Node,poolMgr:cc.Node},onLoad:function(){this.player=this.player.getComponent("player"),this.player.init(this),this.player.node.active=!1},cameraShake:function(){this.cameraRoot.play("camera-shake")},playerReady:function(){this.player.node.active=!0,this.player.ready()},death:function(){console.debug("player dead")}}),cc._RFpop()},{}],player:[function(t,e,i){"use strict";cc._RFpush(e,"8d5bayJ5hxFNqmu1soTB6Gp","player"),cc.Class({"extends":cc.Component,properties:{radius:0,atkDist:0,atkDuration:0,atkInterval:0,atkDamage:0,moveSpeed:0,atkMoveSpeed:0,hp:0,touchThreshold:0,touchMoveThreshold:0},init:function(t){this.game=t,this.inputEnabled=!1,this.isAttacking=!1,this.isAlive=!0,this.registerInput(),this.atkTargetPos=cc.p(0,0),this.isAtkGoingOut=!1,this.validAtkRect=cc.Rect(25,25,this.node.parent.width-50,this.node.parent.height-50)},registerInput:function(){var t=this;cc.eventManager.addListener({event:cc.EventListener.TOUCH_ONE_BY_ONE,onTouchBegan:function(e,i){if(t.inputEnabled===!1)return!0;var s=e.getLoocation();return t.touchBeganLoc=s,t.moveToPos=t.node.parent.convertToNodeSpaceAR(s),t.touchStartTime=Date.now(),!0},onTouchMoved:function(e,i){if(t.inputEnabled!==!1){var s=e.getLoocation();t.moveToPos=t.node.parent.convertToNodeSpaceAR(s),cc.pDistance(t.touchBeganLoc,s)>t.touchMoveThreshold&&(t.hasMoved=!0)}},onTouchEnded:function(e,i){if(t.inputEnabled!==!1){t.moveToPos=null,t.node.emit("update-dir",{dir:null});t.isTouchHold();if(!t.hasMoved&&!t.isHold){var s=(e.getLoocation(),t.node.parent.convertToNodeSpaceAR(s)),o=cc.pSub(s,t.node.position);t.atkTargetPos=cc.pSub(t.node.position,cc.pMult(cc.pNormalize(o),t.atkDist));var n=t.node.parent.convertToNodeSpaceAR(t.atkTargetPos);cc.rectContainsPoint(t.validAtkRect,n)?t.isAtkGoingOut=!1:t.isAtkGoingOut=!0,t.node.emit("freeze"),t.attackOnTarget(o,t.atkTargetPos)}t.hasMoved=!1}}},t.node)},ready:function(){this.node.emit("stand"),this.inputEnabled=!0,this.isActive=!0},isTouchHold:function(){var t=Data.now()-this.touchStartTime;return t>=this.touchThreshold},attackOnTarget:function(t,e){},onAtkFinished:function(){this.inputEnabled=!0,this.isAttacking=!1,this.isAtkGoingOut=!1},update:function(t){if(this.isAlive!==!1&&(this.isAttacking&&this.isAtkGoingOut&&(this.node.stopAllActions(),this.onAtkFinished()),this.inputEnabled&&this.moveToPos&&this.isTouchHold())){var e=cc.pSub(this.moveToPos,this.node.position),i=cc.pToAngle(e);cc.radiansToDegress(i);this.node.emit("update-dir",{dir:cc.pNormalize(e)})}}}),cc._RFpop()},{}],poolMgr:[function(t,e,i){"use strict";cc._RFpush(e,"272c3E80JlGS6N0lFsoq7rj","poolMgr"),cc.Class({"extends":cc.Component,properties:{},onLoad:function(){}}),cc._RFpop()},{}]},{},["Move","DeathUI","PoolMng","BossProgress","WaveMng","poolMgr","game","WaveUI","PlayerFX","NodePool","Types","KillDisplay","SortMng","player","InGameUI","ComboDisplay","WaveProgress","HomeUI","BossMng","Player","Projectile","GameOverUI","AnimHelper","ButtonScaler","Foe","Game","Spawn"]);