(function() {
  'use strict';

  function Start() {
    this.titleTxt = null;
    this.startTxt = null;
    this.highScoreTxt = null;
    this.myButton=null;
    this.principal_background = null;
  }

  Start.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;


      this.principal_background = this.add.sprite(0, 0, 'principal_background');

      this.myButton = this.add.button(200, 275, 'newGame_button', function() { this.game.state.start('game') }, this);
      this.myButton = this.add.button(200, 375, 'options_button', function() { this.game.state.start('options') }, this);
      this.myButton = this.add.button(200, 475, 'return_button', function() { this.game.state.start('menu') }, this);

      //this.input.onDown.add(this.onDown, this);
    },

    update: function () {

    },

   /* startButton: function () {
      this.game.state.start('highScore');
    }*/
  };

  window['shooter'] = window['shooter'] || {};
  window['shooter'].Start = Start;

}());
