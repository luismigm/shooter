(function() {
  'use strict';

  function Start() {
    this.titleTxt = null;
    this.startTxt = null;
    this.highScoreTxt = null;
    this.myButton=null;

  }

  Start.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.myButton = this.add.button(this.world.centerX - 95, 200, 'newGame_button', function() { this.game.state.start('game') }, this);
      this.myButton = this.add.button(this.world.centerX - 95, 300, 'options_button', function() { this.game.state.start('options') }, this);
      this.myButton = this.add.button(this.world.centerX - 95, 400, 'return_button', function() { this.game.state.start('menu') }, this);

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
