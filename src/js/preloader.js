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
      this.load.image('mapbackground', 'assets/map_background.png');
      this.load.image('options_background', 'assets/options_background.png');
      this.load.image('high_score_background', 'assets/high_score_background.png');
      this.load.image('credits_background', 'assets/credits_background.png');
      this.load.image('bullet', 'assets/bullet.png');
      this.load.image('nave', 'assets/nave.png');
      this.load.image('nave2', 'assets/nave.png');
      this.load.image('alien', 'assets/alien.png');
      this.load.image('alien2', 'assets/alien2.png');
      this.load.spritesheet('highScore_button', 'assets/high_score_sprite.png', 193, 71);
      this.load.spritesheet('start_button', 'assets/start_sprite.png', 193, 71);
      this.load.spritesheet('credits_button', 'assets/credits_sprite.png', 193, 71);
      this.load.spritesheet('options_button', 'assets/options_sprite.png', 193, 71);
      this.load.image('return_button', 'assets/back_arrow.png', 193, 71);
      this.load.spritesheet('newGame_button', 'assets/new_game_sprite.png', 193, 71);
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
