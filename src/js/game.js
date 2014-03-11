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
    this.enemys = null;
    this.moveEnemys = null;
    this.numberLives = 3;
    this.score = null;
    this.scoreText = null;
    this.lives = null;
    this.ship = null;
    this.timeBoss = null;
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
    this.timeBoss = 0;
    this.score = 0;
    this.timeBoss = 0;
    this.boss = false;
    this.player = this.add.sprite(x, 700, 'nave');
    this.player.frame = 0;
    this.player.health = 2;
    this.difficulty = window.shooter.myGlobal.difficulty;

    //asignación de teclas      
    this.upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.spaceBar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //grupo de disparos de la nave
     this.bullets = this.add.group();
    this.bullets.createMultiple(5, 'bullet');
    this.bullets.setAll('anchor.x', 0.1);
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('outOfBoundsKill', true);
    //grupo de disparos del jefe
    this.bossBullets = this.add.group();
    this.bossBullets.createMultiple(7* this.difficulty, 'bossBullets');
    this.bossBullets.setAll('outOfBoundsKill', true);
    //grupo de enemigos
    this.aliens = this.add.group();
    this.aliens.createMultiple(7 * this.difficulty, 'asteroids');
    this.aliens.setAll('outOfBoundsKill', true);
    //texto para el score
    this.scoreText = this.add.text(32, 32, 'SCORE: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
    this.livesText = this.add.text(400, 32, 'lives: ', { font: "20px Arial", fill: "#ffffff", align: "left" });
    this.lives = this.add.group();
    //creamos los sprites de las vidas
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
      

//fondo 
      this.map.tilePosition.y += 5;
//movimiento nave
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
      //disparo
      if (this.spaceBar.isDown)
      {
         this.fireBullet();
      }

      //creamos los enemigos
      this.enemys = this.aliens.getFirstExists(false);
      if (this.enemys && this.timeBoss + 18000 > this.game.time.now)
      {
        this.enemys.reset(Math.random()*600, -30);
        this.physics.moveToObject(this.enemys,this.player,200 * this.difficulty);

      }
      //creamos el jefe final 
      if((this.timeBoss + 22000 < this.game.time.now) && this.boss == false)
      {
          this.boss = this.add.sprite((this.game.width / 2)-50, -300, 'nodriza');
          this.boss.health = 20 * this.difficulty;
          this.boss.body.velocity.y = 100;
      }
      if(this.boss.y > 150)
      {
        this.boss.body.velocity.y = 0;
      }

      //choque entre enemigos y disparos
      this.physics.overlap(this.bullets, this.aliens, function (bullet, enemys) {  bullet.kill(); enemys.kill(); this.score += 10; this.scoreText.content = 'SCORE: ' + this.score;}, null, this);
      //choque entre jefe y disparos
      this.physics.overlap(this.boss, this.bullets, function (boss, bullet) {  
        bullet.kill(); this.boss.health--;   
        if (this.boss.health < 0)  
        {    
          this.boss = false; this.score += 1000; 
          window.shooter.myGlobal.score = this.score; 
          this.game.state.start('endGame');
        } }, null, this);
      //choque entre nave y enemigos
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
          window.shooter.myGlobal.score = this.score;
            this.game.state.start('endGame');
        }
      }, null, this);
      //disparos del jefe si ya se ha creado
      if (this.boss != false)
      {
        if (this.game.time.now > this.bossBulletTime)
        {  
        this.bossFire = this.bossBullets.getFirstExists(false);

            if (this.bossFire)
            {
                //  And fire it
                this.bossFire.reset(this.boss.x+15, this.boss.y+30);
                this.physics.moveToObject(this.bossFire,this.player,200 * this.difficulty);
                this.bossBulletTime = this.game.time.now + 400;
            }
        }
      }
      //choque entre disparos del jefe y nave
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
        window.shooter.myGlobal.score = this.score;
        this.game.state.start('endGame');
      }
      }, null, this);
    },
    //funcion para crear disparos de la nave
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
              var sound = this.game.add.audio('sound_blast');
              sound.play();
          }

      } 
    }



  };

  window['shooter'] = window['shooter'] || {};
  window['shooter'].Game = Game;

}());
