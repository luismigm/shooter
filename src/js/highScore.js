(function() {
  'use strict';

  function HighScore() {
    this.titleTxt = null;
    this.startTxt = null;
  }

  HighScore.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;


      this.titleTxt = this.add.bitmapText(x, y, 'High Score', {font: '16px minecraftia', align: 'center'});
      this.titleTxt.anchor.setTo(0.5, 0.5);

      y = y + this.titleTxt.height + 5;
      this.startTxt = this.add.bitmapText(x, y, 'Score1', {font: '12px minecraftia', align: 'center'});
      this.startTxt.anchor.setTo(0.5, 0.5);

      this.myButton = this.add.button(this.world.centerX - 95, 400, 'return_button', function() { this.game.state.start('menu') }, this);
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
