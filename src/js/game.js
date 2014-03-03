(function() {
  'use strict';

  function Game() {
    this.map = null;
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
    this.numberLives = 3;
    this.score = 0;
    this.scoreText = null;
    this.lives = null;
    this.ship = null;
  }

  Game.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.map = this.add.tileSprite(0, 0, 600, 2835, 'map_background');  

      this.player = this.add.sprite(x, 700, 'nave');
      this.player.frame = 0;
      this.player.health = 2;

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
    this.bullets.setAll('anchor.x', 0.1);
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('outOfBoundsKill', true);

    this.aliens = this.add.group();
    this.aliens.createMultiple(5, 'alien2');
    this.aliens.setAll('outOfBoundsKill', true);

    this.scoreText = this.add.text(32, 32, 'SCORE: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
    this.livesText = this.add.text(400, 32, 'lives: ', { font: "20px Arial", fill: "#ffffff", align: "left" });
    this.lives = this.add.group();

     for (var i = 0; i < 3; i++) 
    {
        this.ship = this.lives.create(470 + (45 * i), 45, 'live');
        this.ship.anchor.setTo(0.5, 0.5);
        this.ship.angle = 90;
        this.ship.alpha = 0.7;
    }



    },

    update: function () {

//Background 
      this.map.tilePosition.y += 5;

     if (this.upKey.isDown)
      {
        this.player.frame = 1;
          if(this.player.y>70)
          {
             this.player.y -= 4;
          }
         
      }
      else{
        this.player.frame = 0;
      }
      if (this.downKey.isDown)
      {
        this.player.frame = 0;
          if(this.player.y<770)
          {
             this.player.y += 4;
          }
      }
      if (this.leftKey.isDown)
      {
        this.player.frame = 2;
          if(this.player.x>30)
          {
             this.player.x -= 4;
          }
      }
      if (this.rightKey.isDown)
      {
        this.player.frame = 3;
          if(this.player.x<570)
          {
             this.player.x += 4;
          }
      }
      if (this.rightKey.isDown && this.upKey.isDown){
        this.player.frame = 4;
      }
      if (this.leftKey.isDown && this.upKey.isDown){
        this.player.frame = 5;
      }
      if (this.spaceBar.isDown)
      {
         this.fireBullet();
      }

      this.enemigos = this.aliens.getFirstExists(false);
      if (this.enemigos)
      {
        
        var typeMov = Math.floor((Math.random()*10)+1);
        switch (typeMov)
        {
          case 1: this.enemigos.reset(Math.random()*300, 0);
                  this.enemigos.body.velocity.y = 400;
                  this.enemigos.body.velocity.x = 200;
                  break;
          case 2: this.enemigos.reset(300 + (Math.random()*300), 0);
                  this.enemigos.body.velocity.y = 400;
                  this.enemigos.body.velocity.x = -200;
                  break;
          case 3: this.enemigos.reset(0, 100);
                  this.enemigos.body.velocity.y = Math.floor(Math.random() * 201);
                  this.enemigos.body.velocity.x = 200;
                  break;
          case 4: this.enemigos.reset(600, 100);
                  this.enemigos.body.velocity.y = Math.floor(Math.random() * 201);
                  this.enemigos.body.velocity.x = -200;
                  break;
          case 5: this.enemigos.reset(Math.random()*560, 0);
                  this.enemigos.body.velocity.y = 400;
                  this.enemigos.body.velocity.x = 200;
                  break;
          case 6: this.enemigos.reset(Math.random()*560, 0);
                  this.enemigos.body.velocity.y = 400;
                  this.enemigos.body.velocity.x = -200;
                  break;
          case 7: this.enemigos.reset(0, 400);
                  this.enemigos.body.velocity.y = -400;
                  this.enemigos.body.velocity.x = 200;
                  break;
          case 8: this.enemigos.reset(600, 400);
                  this.enemigos.body.velocity.y = -400;
                  this.enemigos.body.velocity.x = -200;
                  break;
          case 9: this.enemigos.reset(0, 300);
                  this.enemigos.body.velocity.y = Math.floor(Math.random() * 201) - 100;
                  this.enemigos.body.velocity.x = 200;
                  break;
          case 10: this.enemigos.reset(600, 300);
                  this.enemigos.body.velocity.y = Math.floor(Math.random() * 201) - 100;
                  this.enemigos.body.velocity.x = -200;
                  break;

        }

        
      }
      this.physics.overlap(this.bullets, this.aliens, function (bullet, enemigos) {  bullet.kill(); enemigos.kill(); this.score += 10; this.scoreText.content = 'SCORE: ' + this.score;}, null, this);
      this.physics.overlap(this.player, this.aliens, function (player, enemy) {  
        enemy.kill(); 
        var live = this.lives.getFirstAlive();
        if (live)
        {
          live.kill();
          this.player.damage(1);
        }
        if (this.player.health < 0)
        {
            this.game.state.start('endGame');
        }
      }, null, this);

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
