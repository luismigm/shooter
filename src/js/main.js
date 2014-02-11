window.onload = function () {
  'use strict';

  var game
    , ns = window['shooter'];

  game = new Phaser.Game(600, 800, Phaser.AUTO, 'shooter-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('highScore', ns.HighScore);
  game.state.add('credits', ns.Credits);
  game.state.add('options', ns.Options);
  game.state.add('start', ns.Start);
  game.state.add('game', ns.Game);
  game.state.start('boot');
};
