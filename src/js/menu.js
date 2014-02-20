(function() {
  'use strict';

  function Menu() {
    this.titleTxt = null;
    this.lineTxt = null;
    this.startButton=null;

  }

  Menu.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.titleTxt = this.add.bitmapText(x, 100, 'Alien Invasion', {font: '30px minecraftia', align: 'center'});
      this.titleTxt.anchor.setTo(0.5, 0.5);

     this.startButton = this.add.button(200, 200, 'start_button', function() { this.game.state.start('start') }, this, 0, 1, 0);
      this.titleTxt.anchor.setTo(0.5, 0.5);
      this.startButton = this.add.button(200, 300, 'highScore_button', function() { this.game.state.start('highScore') }, this, 0, 1, 0);
       this.titleTxt.anchor.setTo(0.5, 0.5);
      //this.input.onDown.add(this.onDown, this);
      this.startButton = this.add.button(200, 400, 'credits_button', function() { this.game.state.start('credits') }, this, 0, 1, 0);
       this.titleTxt.anchor.setTo(0.5, 0.5);
    },

    update: function () {

    },

   /* startButton: function () {
      this.game.state.start('highScore');
    }*/
  };

  window['shooter'] = window['shooter'] || {};
  window['shooter'].Menu = Menu;

}());
