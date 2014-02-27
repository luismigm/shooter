(function() {
  'use strict';

  function Credits() {
    this.titleTxt = null;
    this.startTxt = null;
    this.highScoreTxt = null;
    this.myButton=null;
    this.credits = null;

  }

  Credits.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.credits = this.add.sprite(0, 0, 'credits_background');

      this.titleTxt = this.add.bitmapText(x, y, 'Credits', {font: '16px minecraftia', align: 'center'});
      this.titleTxt.anchor.setTo(0.5, 0.5);

      y = y + this.titleTxt.height + 5;
      this.startTxt = this.add.bitmapText(x, y, 'START', {font: '12px minecraftia', align: 'center'});
      this.startTxt.anchor.setTo(0.5, 0.5);

      y = y + this.titleTxt.height + 30;

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
  window['shooter'].Credits = Credits;

}());
