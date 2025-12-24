import Phaser from 'phaser';

export type ObstacleType = 'pothole' | 'cone' | 'puddle';

/**
 * Obstacle - Things on the road that slow you down
 * ELI5: Watch out for these! Hit them and you'll slow down, letting the cop catch up!
 */
export class Obstacle extends Phaser.GameObjects.Container {
  declare body: Phaser.Physics.Arcade.Body;
  public obstacleType: ObstacleType;
  public slowdownAmount: number; // How much to slow player (0-1)
  public slowdownDuration: number; // How long the slowdown lasts (ms)

  constructor(scene: Phaser.Scene, x: number, y: number, type: ObstacleType) {
    super(scene, x, y);
    this.obstacleType = type;

    let visual: Phaser.GameObjects.Shape;

    switch (type) {
      case 'pothole':
        // Dark gray circle
        visual = scene.add.ellipse(0, 0, 40, 25, 0x222222);
        visual.setStrokeStyle(2, 0x111111);
        this.slowdownAmount = 0.3;
        this.slowdownDuration = 500;
        break;

      case 'cone':
        // Orange traffic cone (triangle)
        visual = scene.add.triangle(0, 0, 0, 15, 15, -15, -15, -15, 0xff6600);
        visual.setStrokeStyle(2, 0xffffff);
        // Add white stripes
        const stripe = scene.add.rectangle(0, -5, 20, 4, 0xffffff);
        this.add(stripe);
        this.slowdownAmount = 0.2;
        this.slowdownDuration = 300;
        break;

      case 'puddle':
        // Blue puddle (water)
        visual = scene.add.ellipse(0, 0, 50, 30, 0x4444ff, 0.6);
        visual.setStrokeStyle(1, 0x2222aa);
        this.slowdownAmount = 0.5;
        this.slowdownDuration = 800;
        break;
    }

    this.add(visual);

    // Add to scene and enable physics
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Configure physics body
    this.body.setSize(40, 30);
    this.body.setAllowGravity(false);
  }

  /**
   * Called when player hits obstacle - plays effect
   */
  onHit(): void {
    // Flash effect
    this.scene.tweens.add({
      targets: this,
      alpha: 0.3,
      duration: 100,
      yoyo: true,
      repeat: 2,
    });
  }
}
