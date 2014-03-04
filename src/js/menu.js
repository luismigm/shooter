(function() {
  'use strict';

  function Menu() {
    this.titleTxt = null;
    this.lineTxt = null;
    this.startButton=null;
    this.principal_background = null;
    this.musicSound = true;
  }

  Menu.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;
      //Background
      
      this.principal_background = this.add.sprite(0, 0, 'principal_background');



      this.myButton = this.add.button(200, 275, 'newGame_button', function() { this.game.state.start('game') }, this, 1, 0, 0);

      this.startButton = this.add.button(200, 375, 'options_button', function() { this.game.state.start('options') }, this, 1, 0, 0);
      
      this.startButton = this.add.button(200, 475, 'highScore_button', function() { this.game.state.start('highScore') }, this, 1, 0, 0);
       
      //this.input.onDown.add(this.onDown, this);
      this.startButton = this.add.button(200, 575, 'credits_button', function() { this.game.state.start('credits') }, this, 1, 0, 0);
      
      if(this.musicSound == true) 
      {
        this.music = this.game.add.audio('audio', 1, true);
        this.music.play('', 0, 1, true);
        this.musicSound = false;
      }
      


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
