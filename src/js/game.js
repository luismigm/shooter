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
    this.timeBoss = 0;
    this.boss = false;
    this.bossBullets = null;
    this.difficulty= null;
     this.bossFire = null;
     this.bossBulletTime = 0;
  }

  Game.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = 500;

      this.map = this.add.tileSprite(0, 0, 600, 2835, 'map_background');  

      this.player = this.add.sprite(x, 700, 'nave');
      this.player.frame = 0;
      this.player.health = 2;
      this.difficulty = window.shooter.myGlobal.difficulty;

      
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

    this.bossBullets = this.add.group();
    this.bossBullets.createMultiple(7* this.difficulty, 'bossBullets');
    /*this.bossBullets.setAll('anchor.x', 0.1);
    this.bossBullets.setAll('anchor.y', 1);*/
    this.bossBullets.setAll('outOfBoundsKill', true);

    this.aliens = this.add.group();
    this.aliens.createMultiple(7 * this.difficulty, 'asteroids');
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

      this.timeBoss = this.game.time.now;

    },

    update: function () {

//Background 
      this.map.tilePosition.y += 5;

     if (this.upKey.isDown)
      {
        this.player.frame = 1;
          if(this.player.y > 70)
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
          if(this.player.y < 770)
          {
             this.player.y += 4;
          }
      }
      if (this.leftKey.isDown)
      {
        this.player.frame = 2;
          if(this.player.x > 30)
          {
             this.player.x -= 4;
          }
      }
      if (this.rightKey.isDown)
      {
        this.player.frame = 3;
          if(this.player.x < 570)
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
      if (this.enemigos && this.timeBoss + 10000 > this.game.time.now)
      {
                this.enemigos.reset(Math.random()*600, -30);
                this.physics.moveToObject(this.enemigos,this.player,200 * this.difficulty);

      }
      if((this.timeBoss + 10000 < this.game.time.now) && this.boss == false)
      {
          this.boss = this.add.sprite((this.game.width / 2)-50, -300, 'nodriza');
          this.boss.health = 50;
          this.boss.body.velocity.y=100;
          //alert(this.boss.health);

      }
      if(this.boss.y > 150)
      {
        this.boss.body.velocity.y=0;
      }


      this.physics.overlap(this.bullets, this.aliens, function (bullet, enemigos) {  bullet.kill(); enemigos.kill(); this.score += 10; this.scoreText.content = 'SCORE: ' + this.score;}, null, this);
      this.physics.overlap(this.boss, this.bullets, function (boss, bullet) {  bullet.kill(); this.boss.health--;   if (this.boss.health < 0)  {    this.game.state.start('endGame');  } }, null, this);
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
if (this.boss != false)
{
  //alert ("hola");
      //fire boss
      if (this.game.time.now > this.bossBulletTime)
      {  
      this.bossFire = this.bossBullets.getFirstExists(false);

          if (this.bossFire)
          {
              //  And fire it
              //alert ("hola");
              this.bossFire.reset(this.boss.x+15, this.boss.y+30);
              this.physics.moveToObject(this.bossFire,this.player,200 * this.difficulty);
              //this.bossFire.body.velocity.y = 400;
              this.bossBulletTime = this.game.time.now + 400;
          }
      }
}
this.physics.overlap(this.player, this.bossBullets, function (player, enemy) {  
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
              this.bullet.reset(this.player.x+15, this.player.y);
              this.bullet.body.velocity.y = -400;
              this.bulletTime = this.game.time.now + 200;
          }
      } 
    }



  };

  window['shooter'] = window['shooter'] || {};
  window['shooter'].Game = Game;

}());
