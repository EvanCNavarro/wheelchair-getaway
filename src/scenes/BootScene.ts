import Phaser from 'phaser';

/**
 * BootScene - First scene that loads
 * ELI5: This is like the "loading screen" - it gets everything ready before the game starts.
 * For now, it just shows a simple message and moves to the play scene.
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    // Show loading text
    const { width, height } = this.scale;

    this.add.text(width / 2, height / 2, 'Loading...', {
      fontSize: '32px',
      color: '#ffffff',
    }).setOrigin(0.5);

    // TODO: Load actual game assets here in later phases
    // For now, we'll use generated graphics (rectangles/circles)
  }

  create(): void {
    // Move to the play scene after a brief moment
    this.time.delayedCall(500, () => {
      this.scene.start('PlayScene');
    });
  }
}
