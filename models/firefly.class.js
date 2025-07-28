class Firefly extends MovableObject {
  width = 70;
  height = 80;

  constructor() {
    super().loadImage("img/misc/firefly.png");
    this.reset();
    this.animate();
    this.hasCollisionBox = false;
  }

  reset() {
    this.x = -Math.random() * 100 - 50; // results in a number between -50 and -150, so that they are spawned outside the canvas and fly in more naturally
    this.y = Math.random() * 480; // number between 0 and 480

    this.velocityX = 0.3 + Math.random() * 0.7; // minimum horizontal speed of 0.3, max 1.0
    this.velocityY = (Math.random() - 0.5) * 1; // rando value betweeen -0.5 and 0.5 for random movements in both directions
  }

  animate() {
    setInterval(() => {
      // moves the object frame by frame
      this.x += this.velocityX;
      this.y += this.velocityY;

      // slightly randomly so that the Firefly moves up/down in waves
      this.velocityY += (Math.random() - 0.5) * 0.1;
      // limiting the velocity so that it doesn't wriggle to much up and down
      this.velocityY = Math.max(Math.min(this.velocityY, 0.7), -0.7);

      // Respawns the fireflies on the left when they go over the visible image on the right
      if (this.x > 2500 + 50) {
        this.reset();
      }
    }, 1000 / 60);
  }

  setRandomPosition() {
    this.reset();
  }
}
