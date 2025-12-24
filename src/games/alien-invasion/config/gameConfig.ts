/**
 * Alien Invasion Game Configuration
 * DOOM-style FPS settings
 */

// Display
export const SCREEN_WIDTH = 400;
export const SCREEN_HEIGHT = 600;

// Raycasting
export const FOV = Math.PI / 3; // 60 degrees field of view
export const NUM_RAYS = 120; // Number of rays to cast
export const MAX_DEPTH = 20; // Maximum view distance

// Map
export const TILE_SIZE = 64;

// Player
export const PLAYER_SPEED = 3;
export const PLAYER_ROT_SPEED = 0.05;
export const PLAYER_MAX_HEALTH = 100;

// Weapons
export const WEAPONS = {
  pistol: {
    name: 'Pistol',
    emoji: '🔫',
    damage: 15,
    fireRate: 400,
    ammo: Infinity,
  },
  shotgun: {
    name: 'Shotgun',
    emoji: '🔫',
    damage: 40,
    fireRate: 800,
    ammo: 20,
  },
  machineGun: {
    name: 'Machine Gun',
    emoji: '🔫',
    damage: 10,
    fireRate: 100,
    ammo: 100,
  },
} as const;

// Enemies - Made very easy to kill
export const ALIEN_HEALTH = 15;      // Very low health (was 25)
export const ALIEN_DAMAGE = 5;       // Low damage (was 8)
export const ALIEN_SPEED = 0.35;     // Very slow (was 0.6)

export const BOSS_HEALTH = 80;       // Easier boss (was 150)
export const BOSS_DAMAGE = 10;       // Less boss damage (was 15)

// Waves
export const ALIENS_PER_WAVE = 2;    // Start with just 2 aliens
export const WAVES_BEFORE_BOSS = 3;

// Colors
export const COLORS = {
  SKY: 0x1a0a2e,
  FLOOR: 0x2a1a1a,
  WALL_LIGHT: 0x4a4a6a,
  WALL_DARK: 0x3a3a5a,
  ALIEN: 0x22ff22,
  BOSS: 0xff2222,
  BLOOD: 0x880000,
};
