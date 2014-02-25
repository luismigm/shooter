(function() {
  'use strict';

  function Game() {
    this.player = null;
    this.bullet = null;
    this.upKey = null;
    this.downKey = null;
    this.leftKey = null;
    this.rightKey = null;
    this.bullets = null;
    this.aliens = null;
    this.bulletTime = 0;
    this.aliens = null;
    this.enemigos = null;
    this.moveEnemys = null;
  }

  Game.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.player = this.add.sprite(x, y, 'nave');

      //this.input.onDown.add(this.onInputDown, this);
      
      //  In this example we'll create 4 specific keys (up, down, left, right) and monitor them in our update function

    this.upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.spaceBar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //balas
    //  Our bullet group
     this.bullets = this.add.group();
    this.bullets.createMultiple(5, 'bullet');
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('outOfBoundsKill', true);

    this.aliens = this.add.group();
    this.aliens.createMultiple(5, 'alien2');
    this.aliens.setAll('outOfBoundsKill', true);

    },

    update: function () {
     if (this.upKey.isDown)
      {
          if(this.player.y>30)
          {
             this.player.y -= 4;
          }
         
      }
      if (this.downKey.isDown)
      {
          if(this.player.y<770)
          {
             this.player.y += 4;
          }
      }
      if (this.leftKey.isDown)
      {
          if(this.player.x>30)
          {
             this.player.x -= 4;
          }
      }
      if (this.rightKey.isDown)
      {
          if(this.player.x<570)
          {
             this.player.x += 4;
          }
      }
      if (this.spaceBar.isDown)
      {
         this.fireBullet();
      }
      this.physics.overlap(this.bullets, this.alien, function (bullet, alien) {  bullet.kill(); alien.kill(); }, null, this);
      this.physics.overlap(this.bullets, this.alien2, function (bullet, alien) {  bullet.kill(); alien.kill(); }, null, this);
      this.enemigos = this.aliens.getFirstExists(false);
      if (this.enemigos)
          {
              //  And fire it
              this.enemigos.reset(Math.random()*560, 0);
              this.enemigos.body.velocity.y = 400;
              this.enemigos.body.velocity.x = 100;

        }
        this.physics.overlap(this.bullets, this.aliens, function (bullet, enemigos) {  bullet.kill(); enemigos.kill(); }, null, this);

    },

   fireBullet: function () 
   {
        //  To avoid them being allowed to fire too fast we set a time limit
      if (this.game.time.now > this.bulletTime)
      {  
          //  Grab the first bullet we can from the pool
          this.bullet = this.bullets.getFirstExists(false);

          if (this.bullet)
          {
              //  And fire it
              this.bullet.reset(this.player.x, this.player.y + 8);
              this.bullet.body.velocity.y = -400;
              this.bulletTime = this.game.time.now + 200;
          }
      } 
    }



  };

  window['shooter'] = window['shooter'] || {};
  window['shooter'].Game = Game;

}());
