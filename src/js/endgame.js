(function() {
  'use strict';

  function EndGame() {
    this.titleTxt = null;
    this.startTxt = null;
    this.endgame_background = null;
  }

  EndGame.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;


      this.endgame_background = this.add.sprite(0, 0, 'endgame_background');

      this.titleTxt = this.add.bitmapText(x, y, 'EndGame', {font: '16px minecraftia', align: 'center'});
      this.titleTxt.anchor.setTo(0.5, 0.5);

      this.myButton = this.add.button(200, 575, 'return_button', function() { this.game.state.start('menu') }, this, 1, 0, 0);
    },

    update: function () {

    },

    onDown: function () {
      this.game.state.start('game');
    }
  };

  window['shooter'] = window['shooter'] || {};
  window['shooter'].EndGame = EndGame;

}());
