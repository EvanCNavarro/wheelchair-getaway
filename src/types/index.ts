/**
 * TypeScript type definitions
 * ELI5: These are "descriptions" of what our game objects look like,
 * so the computer can catch our mistakes before we even run the game.
 */

export interface Position {
  x: number;
  y: number;
}

export interface PlayerState {
  position: Position;
  speed: number;
  hasShield: boolean;
  oilSlicksRemaining: number;
  isBoosting: boolean;
}

export interface CopState {
  position: Position;
  speed: number;
  isStunned: boolean;
  stunEndTime: number;
}

export interface GameState {
  score: number;
  coins: number;
  isGameOver: boolean;
  startTime: number;
  distanceFromCop: number;
}

export type PowerUpType = 'boost' | 'shield' | 'turbo';

export interface PowerUp {
  type: PowerUpType;
  position: Position;
}

export type ObstacleType = 'pothole' | 'cone' | 'oil_puddle' | 'glue';

export interface Obstacle {
  type: ObstacleType;
  position: Position;
}
