(function() {
  'use strict';

  function Options() {
    this.titleTxt = null;
    this.startTxt = null;
    this.highScoreTxt = null;
    this.myButton = null;
    this.options_background = null;
    this.sound = null;
    this.level = null;

  }

  Options.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;
        this.music = this.game.add.audio('audio', 1, false);

      this.options_background = this.add.sprite(0, 0, 'options_background');
       this.sound = this.add.sprite(480, 520, 'sound_icon');
       this.sound.frame = 0;
       this.level = this.add.sprite(480, 310, 'level_icon');
       this.level.frame = 0; 

      this.myButton = this.add.button(60, 310, 'easy_button', function() { 
        if (this.level)
        {
         this.level.kill();
        }
        this.level = this.add.sprite(480, 310, 'level_icon');
        window.shooter.myGlobal.difficulty=1;
         //alert(window.shooter.myGlobal.difficulty);
        this.level.frame = 0; 
      }, this, 1, 0, 0);
      

      this.myButton = this.add.button(260, 310, 'hard_button', function() { 
        if (this.level)
        {
         this.level.kill();
        }
        this.level = this.add.sprite(480, 310, 'level_icon');
        window.shooter.myGlobal.difficulty=2;
         //alert(window.shooter.myGlobal.difficulty);
        this.level.frame = 1;
      }, this, 1, 0, 0);

      this.myButton = this.add.button(60, 520, 'yes_button', function() { 
        if (this.sound)
        {
         this.sound.kill();
        }
          this.sound = this.add.sprite(480, 520, 'sound_icon');
          window.shooter.myGlobal.sound=1;
             this.music.play('', 0, 1, true);
          //alert(window.shooter.myGlobal.sound);
          this.sound.frame = 1; 
      }, this, 1, 0, 0);

      this.myButton = this.add.button(260, 520, 'no_button', function() { 
        if (this.sound)
        {
         this.sound.kill();
        }
          this.sound = this.add.sprite(480, 520, 'sound_icon');
          window.shooter.myGlobal.sound=1;
          
        this.music.pause();
          this.sound.frame = 0;
          //alert(window.shooter.myGlobal.sound);
      }, this, 1, 0, 0);

      
      this.myButton = this.add.button(200, 650, 'return_button', function() { this.game.state.start('menu') }, this, 1, 0, 0);

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
