import Phaser from 'phaser';
import { COLORS } from '../config/gameConfig';

export type CollectibleType = 'boost' | 'coin' | 'shield';

/**
 * Collectible - Items the player can pick up on the road
 * ELI5: These are goodies on the road! Grab them to get coins, speed boosts, or shields.
 */
export class Collectible extends Phaser.GameObjects.Container {
  declare body: Phaser.Physics.Arcade.Body;
  public collectibleType: CollectibleType;
  private visual: Phaser.GameObjects.Shape;
  private glowEffect?: Phaser.GameObjects.Shape;

  constructor(scene: Phaser.Scene, x: number, y: number, type: CollectibleType) {
    super(scene, x, y);
    this.collectibleType = type;

    // Create visual based on type
    switch (type) {
      case 'boost':
        // Green arrow pointing up
        this.visual = scene.add.rectangle(0, 0, 30, 30, COLORS.BOOST);
        this.visual.setStrokeStyle(2, 0xffffff);
        // Add arrow indicator
        const arrow = scene.add.triangle(0, 0, 0, 10, 15, -10, -15, -10, 0x00aa00);
        this.add(arrow);
        break;

      case 'coin':
        // Gold circle
        this.visual = scene.add.circle(0, 0, 15, COLORS.COIN);
        this.visual.setStrokeStyle(2, 0xffa500);
        break;

      case 'shield':
        // Cyan hexagon-ish shape (using circle for now)
        this.visual = scene.add.circle(0, 0, 18, COLORS.SHIELD, 0.7);
        this.visual.setStrokeStyle(3, 0x00ffff);
        // Add glow effect
        this.glowEffect = scene.add.circle(0, 0, 22, 0x00ffff, 0.3);
        this.add(this.glowEffect);
        break;
    }

    this.add(this.visual);

    // Add floating animation
    scene.tweens.add({
      targets: this,
      y: y - 5,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Add rotation for coins
    if (type === 'coin') {
      scene.tweens.add({
        targets: this.visual,
        scaleX: { from: 1, to: 0.3 },
        duration: 400,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    }

    // Add to scene and enable physics
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Configure physics body
    this.body.setSize(30, 30);
    this.body.setAllowGravity(false);
  }

  /**
   * Called when collected - plays effect and destroys
   */
  collect(): void {
    // Quick scale-up effect
    this.scene.tweens.add({
      targets: this,
      scale: 1.5,
      alpha: 0,
      duration: 150,
      onComplete: () => {
        this.destroy();
      },
    });
  }
}
