(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {

    preload: function () {
      this.asset = this.add.sprite(320, 240, 'preloader');
      this.asset.anchor.setTo(0.5, 0.5);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);
      this.load.image('principal_background', 'assets/principal_background.png');
      this.load.image('map_background', 'assets/map_background.png');
      this.load.image('options_background', 'assets/options_background.png');
      this.load.image('endgame_background', 'assets/endgame_background.png');
      this.load.image('high_score_background', 'assets/high_score_background.png');
      this.load.image('credits_background', 'assets/credits_background.png');
      this.load.image('bullet', 'assets/bullet.png');
      this.load.image('bullet_power', 'assets/bullet_power.png');
      this.load.image('bossBullets', 'assets/nodriza_bullet_small.png');
      this.load.image('live', 'assets/live.png');
      this.load.image('powerUp', 'assets/power_up.png');
      this.load.image('alien', 'assets/alien.png');
      this.load.image('alien2', 'assets/alien2.png');
      this.load.spritesheet('level_icon', 'assets/easy_hard_icon.png', 93, 71);
      this.load.spritesheet('sound_icon', 'assets/sound_on_off.png', 88, 91);
      this.load.spritesheet('nave', 'assets/nave.png', 45, 64);
      this.load.spritesheet('nodriza', 'assets/nodriza.png', 118, 138);
      this.load.spritesheet('asteroids', 'assets/asteroids.png', 80, 80);
      this.load.spritesheet('explosions', 'assets/explosions.png', 60, 60);
      this.load.spritesheet('highScore_button', 'assets/high_score_sprite.png', 193, 71);
      this.load.spritesheet('start_button', 'assets/start_sprite.png', 193, 71);
      this.load.spritesheet('restart_button', 'assets/restart_sprite.png', 193, 71);
      this.load.spritesheet('menu_button', 'assets/menu_button_sprite.png', 193, 71);
      this.load.spritesheet('credits_button', 'assets/credits_sprite.png', 193, 71);
      this.load.spritesheet('options_button', 'assets/options_sprite.png', 193, 71);
      this.load.spritesheet('return_button', 'assets/back_arrow.png', 193, 71);
      this.load.spritesheet('newGame_button', 'assets/new_game_sprite.png', 193, 71);
      this.load.spritesheet('yes_button', 'assets/yes_sprite.png', 193, 71);
      this.load.spritesheet('hard_button', 'assets/hard_sprite.png', 193, 71);
      this.load.spritesheet('no_button', 'assets/no_sprite.png', 193, 71);
      this.load.spritesheet('easy_button', 'assets/easy_sprite.png', 193, 71);
      
      this.game.load.audio('audio', ['assets/sound.mp3', 'assets/sound.ogg']); //Audio files
      
      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
    },

    create: function () {
      this.asset.cropEnabled = false;
    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('menu');
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['shooter'] = window['shooter'] || {};
  window['shooter'].Preloader = Preloader;

}());
