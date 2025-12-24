import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { PlayScene } from './scenes/PlayScene';
import { GAME_WIDTH, GAME_HEIGHT } from './config/gameConfig';

/**
 * Main entry point
 * ELI5: This is where we tell Phaser "here's how big the game is, here's what scenes to use, GO!"
 */

// Phaser game configuration
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO, // Automatically choose WebGL or Canvas
  parent: 'game-container',
  backgroundColor: '#1a1a2e',

  // Scale manager for responsive sizing (mobile-first!)
  scale: {
    mode: Phaser.Scale.FIT, // Scale to fit container
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
  },

  // No physics needed for Phase 0, will add in Phase 1
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 }, // Top-down, no gravity
      debug: false, // Set to true to see hitboxes
    },
  },

  // Our game scenes
  scene: [BootScene, PlayScene],
};

// Create the game!
const game = new Phaser.Game(config);

// Log for debugging
console.log('Wheelchair Getaway - Game Starting...');
console.log('Phaser version:', Phaser.VERSION);

// Export for potential use elsewhere
export default game;
