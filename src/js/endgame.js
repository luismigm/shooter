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

      this.titleTxt = this.add.bitmapText(x, y, window.shooter.myGlobal.score.toString(), {font: '16px minecraftia', align: 'center'});
      this.titleTxt.anchor.setTo(0.5, 0.5);
      //si el score es mayor que el último lo sustituimos y ordenamos el array
      if(window.shooter.myGlobal.score > window.shooter.myGlobal.highScore[2])
      {
          window.shooter.myGlobal.highScore[2] = window.shooter.myGlobal.score;
          window.shooter.myGlobal.highScore.sort();
          window.shooter.myGlobal.highScore.reverse();
      }

          window.shooter.myGlobal.score = 0;

      this.myButton = this.add.button(100, 575, 'restart_button', function() { this.game.state.start('game') }, this, 1, 0, 0);
      this.myButton = this.add.button(300, 575, 'menu_button', function() { this.game.state.start('menu') }, this, 1, 0, 0);
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
