import Phaser from 'phaser';
import { PLAYER_SPEED, COLORS } from '../config/gameConfig';

/**
 * Player - The wheelchair that the player controls
 * ELI5: This is YOU in the game! Use arrow keys or WASD to move around and escape the cop.
 */
export class Player extends Phaser.GameObjects.Container {
  declare body: Phaser.Physics.Arcade.Body;
  private wheelchair: Phaser.GameObjects.Rectangle;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd?: { W: Phaser.Input.Keyboard.Key; A: Phaser.Input.Keyboard.Key; S: Phaser.Input.Keyboard.Key; D: Phaser.Input.Keyboard.Key };

  // Speed can be modified by boosts
  private currentSpeed: number = PLAYER_SPEED;
  private baseSpeed: number = PLAYER_SPEED;

  // Track if player is boosting
  public isBoosting: boolean = false;
  public isSlowed: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    // Create wheelchair visual (rectangle for now, will be sprite later)
    this.wheelchair = scene.add.rectangle(0, 0, 40, 60, COLORS.PLAYER);
    this.wheelchair.setStrokeStyle(2, 0xffffff);
    this.add(this.wheelchair);

    // Add wheels (small rectangles on sides)
    const leftWheel = scene.add.rectangle(-18, 10, 8, 20, 0x333333);
    const rightWheel = scene.add.rectangle(18, 10, 8, 20, 0x333333);
    this.add(leftWheel);
    this.add(rightWheel);

    // Add to scene and enable physics
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Configure physics body
    this.body.setCollideWorldBounds(true);
    this.body.setSize(40, 60);

    // Setup keyboard input
    if (scene.input.keyboard) {
      this.cursors = scene.input.keyboard.createCursorKeys();
      this.wasd = {
        W: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        A: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        S: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
        D: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      };
    }
  }

  update(joystickForceX: number = 0, joystickForceY: number = 0): void {
    if (!this.body) return;

    // Reset velocity
    this.body.setVelocity(0);

    let vx = 0;
    let vy = 0;

    // Keyboard: Horizontal movement
    if (this.cursors?.left.isDown || this.wasd?.A.isDown) {
      vx = -1;
    } else if (this.cursors?.right.isDown || this.wasd?.D.isDown) {
      vx = 1;
    }

    // Keyboard: Vertical movement
    if (this.cursors?.up.isDown || this.wasd?.W.isDown) {
      vy = -0.5; // Slower forward
    } else if (this.cursors?.down.isDown || this.wasd?.S.isDown) {
      vy = 0.3; // Even slower backward
    }

    // Joystick input (overrides keyboard if active)
    if (joystickForceX !== 0 || joystickForceY !== 0) {
      vx = joystickForceX;
      vy = joystickForceY * 0.5; // Reduce vertical speed
    }

    // Apply velocity
    this.body.setVelocity(vx * this.currentSpeed, vy * this.currentSpeed);

    // Normalize diagonal movement
    if (this.body.velocity.x !== 0 && this.body.velocity.y !== 0) {
      this.body.velocity.normalize().scale(this.currentSpeed);
    }
  }

  /**
   * Apply a speed boost
   */
  applyBoost(multiplier: number, duration: number): void {
    this.isBoosting = true;
    this.currentSpeed = this.baseSpeed * multiplier;

    // Visual feedback - tint the wheelchair
    this.wheelchair.setFillStyle(0x00ff00);

    // Reset after duration
    this.scene.time.delayedCall(duration, () => {
      this.currentSpeed = this.baseSpeed;
      this.isBoosting = false;
      this.wheelchair.setFillStyle(COLORS.PLAYER);
    });
  }

  /**
   * Get the physics body for collision detection
   */
  getBody(): Phaser.Physics.Arcade.Body {
    return this.body;
  }

  /**
   * Check if currently boosting
   */
  getIsBoosting(): boolean {
    return this.isBoosting;
  }

  /**
   * Apply a slowdown effect (from obstacles)
   */
  applySlowdown(amount: number, duration: number): void {
    if (this.isBoosting) return; // Boosting overrides slowdown

    this.isSlowed = true;
    this.currentSpeed = this.baseSpeed * (1 - amount);

    // Visual feedback - tint the wheelchair red
    this.wheelchair.setFillStyle(0xff6666);

    // Reset after duration
    this.scene.time.delayedCall(duration, () => {
      if (!this.isBoosting) {
        this.currentSpeed = this.baseSpeed;
      }
      this.isSlowed = false;
      if (!this.isBoosting) {
        this.wheelchair.setFillStyle(COLORS.PLAYER);
      }
    });
  }
}
