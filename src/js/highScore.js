(function() {
  'use strict';

  function HighScore() {
    this.titleTxt = null;
    this.startTxt = null;
  }

  HighScore.prototype = {

    create: function () {
      var x = this.game.width / 4
        , y = this.game.height / 4+100;


      this.high_score_background = this.add.sprite(0, 0, 'high_score_background');

      this.titleTxt = this.add.bitmapText(x, y, 'High Score', {font: '16px minecraftia', align: 'center'});
      this.titleTxt.anchor.setTo(0.5, 0.5);

      //mostramos el array de los high score
      for (var i=0; i < window.shooter.myGlobal.highScore.length; i++)
      {
          y+=30;
          this.titleTxt = this.add.bitmapText(x, y, window.shooter.myGlobal.highScore[i].toString(), {font: '14px minecraftia', align: 'center'});
          this.titleTxt.anchor.setTo(0.5, 0.5);
      }

      this.myButton = this.add.button(200, 575, 'return_button', function() { this.game.state.start('menu') }, this, 1, 0, 0);
    },

    update: function () {

    },

    onDown: function () {
      this.game.state.start('game');
    }
  };

  window['shooter'] = window['shooter'] || {};
  window['shooter'].HighScore = HighScore;

}());
