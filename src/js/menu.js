(function() {
  'use strict';

  function Menu() {
    this.titleTxt = null;
    this.lineTxt = null;
    this.startButton=null;
    this.principal_background = null;

  }

  Menu.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;
      //Background
      
      this.principal_background = this.add.sprite(0, 0, 'principal_background');

      //Tittle with text
      /*
      this.titleTxt = this.add.bitmapText(x, 100, 'Alien Invasion', {font: '30px minecraftia', align: 'center'});
      this.titleTxt.anchor.setTo(0.5, 0.5);*/
/*
      this.startButton = this.add.button(200, 275, 'start_button', function() { this.game.state.start('start') }, this, 0, 1, 0);*/

      this.myButton = this.add.button(200, 275, 'newGame_button', function() { this.game.state.start('game') }, this, 1, 0, 0);

      this.startButton = this.add.button(200, 375, 'options_button', function() { this.game.state.start('options') }, this, 1, 0, 0);
      
      this.startButton = this.add.button(200, 475, 'highScore_button', function() { this.game.state.start('highScore') }, this, 1, 0, 0);
       
      //this.input.onDown.add(this.onDown, this);
      this.startButton = this.add.button(200, 575, 'credits_button', function() { this.game.state.start('credits') }, this, 1, 0, 0);
      
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
