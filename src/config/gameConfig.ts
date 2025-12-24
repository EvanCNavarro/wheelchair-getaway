/**
 * Game configuration constants
 * ELI5: These are the "rules" of our game world - how big it is, how gravity works, etc.
 */

// Game dimensions - we'll scale to fit screen
export const GAME_WIDTH = 480;
export const GAME_HEIGHT = 800;

// Physics constants
export const PLAYER_SPEED = 200;
export const COP_SPEED = 180; // Slightly slower so player can escape
export const COP_ACCELERATION = 0.5; // Cop gets faster over time

// Gameplay
export const STARTING_DISTANCE = 300; // Pixels between player and cop at start
export const CATCH_DISTANCE = 30; // How close cop needs to be to catch player

// Colors (for placeholder graphics)
export const COLORS = {
  ROAD: 0x333333,
  ROAD_LINES: 0xffffff,
  GRASS: 0x228b22,
  PLAYER: 0x4a90d9,
  COP: 0xff0000,
  COIN: 0xffd700,
  BOOST: 0x00ff00,
  OIL: 0x1a1a1a,
  SHIELD: 0x00ffff,
};
