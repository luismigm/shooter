(function() {
  'use strict';

  function Options() {
    this.titleTxt = null;
    this.startTxt = null;
    this.highScoreTxt = null;
    this.myButton = null;
    this.options_background = null;

  }

  Options.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.options_background = this.add.sprite(0, 0, 'options_background');


      this.titleTxt = this.add.bitmapText(x, y, 'Options', {font: '16px minecraftia', align: 'center'});
      this.titleTxt.anchor.setTo(0.5, 0.5);

      alert(window.shooter.myGlobal.variable1);
      this.myButton = this.add.button(200, 575, 'return_button', function() { this.game.state.start('menu') }, this, 1, 0, 0);

      //this.input.onDown.add(this.onDown, this);
    },

    update: function () {

    },

   /* startButton: function () {
      this.game.state.start('highScore');
    }*/
  };

  window['shooter'] = window['shooter'] || {};
  window['shooter'].Options = Options;

}());
