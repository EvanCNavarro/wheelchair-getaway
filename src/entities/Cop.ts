import Phaser from 'phaser';
import { COP_SPEED, COP_ACCELERATION, COLORS } from '../config/gameConfig';

/**
 * Cop - The police car chasing the player
 * ELI5: This is the bad guy! He's mad about grandma punching him and wants revenge.
 * He follows where you went and gets faster over time!
 */
export class Cop extends Phaser.GameObjects.Container {
  declare body: Phaser.Physics.Arcade.Body;
  private carBody: Phaser.GameObjects.Rectangle;
  private leftLight: Phaser.GameObjects.Rectangle;
  private rightLight: Phaser.GameObjects.Rectangle;

  // Speed increases over time
  private currentSpeed: number = COP_SPEED;
  private baseSpeed: number = COP_SPEED;

  // Stunned state (from oil slicks)
  public isStunned: boolean = false;

  // Siren light flash timer
  private lightTimer: number = 0;
  private lightState: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    // Create cop car visual
    this.carBody = scene.add.rectangle(0, 0, 50, 70, COLORS.COP);
    this.carBody.setStrokeStyle(2, 0xffffff);
    this.add(this.carBody);

    // Siren lights on top
    this.leftLight = scene.add.rectangle(-12, -20, 10, 8, 0x0000ff);
    this.rightLight = scene.add.rectangle(12, -20, 10, 8, 0xff0000);
    this.add(this.leftLight);
    this.add(this.rightLight);

    // Windshield
    const windshield = scene.add.rectangle(0, -15, 30, 12, 0x87ceeb);
    this.add(windshield);

    // Add to scene and enable physics
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Configure physics body
    this.body.setSize(50, 70);
  }

  update(delta: number, playerX: number, playerY: number, gameTime: number): void {
    // Flash siren lights
    this.lightTimer += delta;
    if (this.lightTimer > 150) {
      this.lightTimer = 0;
      this.lightState = !this.lightState;
      this.leftLight.setFillStyle(this.lightState ? 0xff0000 : 0x0000ff);
      this.rightLight.setFillStyle(this.lightState ? 0x0000ff : 0xff0000);
    }

    // If stunned, don't move
    if (this.isStunned) {
      this.body.setVelocity(0);
      return;
    }

    // Gradually increase speed over time
    this.currentSpeed = this.baseSpeed + (gameTime * COP_ACCELERATION / 1000);

    // Move toward player's position
    // The cop follows where the player IS, not where they were (simpler AI for now)
    const angle = Phaser.Math.Angle.Between(this.x, this.y, playerX, playerY);

    this.body.setVelocity(
      Math.cos(angle) * this.currentSpeed,
      Math.sin(angle) * this.currentSpeed
    );
  }

  /**
   * Stun the cop (from oil slick)
   */
  stun(duration: number): void {
    this.isStunned = true;
    this.body.setVelocity(0);

    // Visual feedback - darken the car
    this.carBody.setFillStyle(0x660000);

    // Reset after duration
    this.scene.time.delayedCall(duration, () => {
      this.isStunned = false;
      this.carBody.setFillStyle(COLORS.COP);
    });
  }

  /**
   * Get distance to a point
   */
  distanceTo(x: number, y: number): number {
    return Phaser.Math.Distance.Between(this.x, this.y, x, y);
  }

  /**
   * Get the physics body for collision detection
   */
  getBody(): Phaser.Physics.Arcade.Body {
    return this.body;
  }

  /**
   * Get current speed (for UI display)
   */
  getCurrentSpeed(): number {
    return this.currentSpeed;
  }
}
