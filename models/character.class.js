class Character extends MovableObject {
  world;
  y = 295;
  speed = 5;
  animationTimers = {
    walking: 0,
    jumping: 0,
    idle: 0,
  };
  IMAGES_IDLE_BLINKING = [
    "img/character/idle_blinking/00_Idle_Blinking.png",
    "img/character/idle_blinking/01_Idle_Blinking.png",
    "img/character/idle_blinking/02_Idle_Blinking.png",
    "img/character/idle_blinking/03_Idle_Blinking.png",
    "img/character/idle_blinking/04_Idle_Blinking.png",
    "img/character/idle_blinking/05_Idle_Blinking.png",
    "img/character/idle_blinking/06_Idle_Blinking.png",
    "img/character/idle_blinking/07_Idle_Blinking.png",
    "img/character/idle_blinking/08_Idle_Blinking.png",
    "img/character/idle_blinking/09_Idle_Blinking.png",
    "img/character/idle_blinking/10_Idle_Blinking.png",
    "img/character/idle_blinking/11_Idle_Blinking.png",
  ];
  IMAGES_IDLE = [
    "img/character/idle/00_Idle.png",
    "img/character/idle/01_Idle.png",
    "img/character/idle/02_Idle.png",
    "img/character/idle/03_Idle.png",
    "img/character/idle/04_Idle.png",
    "img/character/idle/05_Idle.png",
    "img/character/idle/06_Idle.png",
    "img/character/idle/07_Idle.png",
    "img/character/idle/08_Idle.png",
    "img/character/idle/09_Idle.png",
    "img/character/idle/10_Idle.png",
    "img/character/idle/11_Idle.png",
  ];
  IMAGES_WALKING = [
    "img/character/walking/00_Walking.png",
    "img/character/walking/01_Walking.png",
    "img/character/walking/02_Walking.png",
    "img/character/walking/03_Walking.png",
    "img/character/walking/04_Walking.png",
    "img/character/walking/05_Walking.png",
    "img/character/walking/06_Walking.png",
    "img/character/walking/07_Walking.png",
    "img/character/walking/08_Walking.png",
    "img/character/walking/09_Walking.png",
    "img/character/walking/10_Walking.png",
    "img/character/walking/11_Walking.png",
    "img/character/walking/12_Walking.png",
    "img/character/walking/13_Walking.png",
    "img/character/walking/14_Walking.png",
    "img/character/walking/15_Walking.png",
    "img/character/walking/16_Walking.png",
    "img/character/walking/17_Walking.png",
    "img/character/walking/18_Walking.png",
    "img/character/walking/19_Walking.png",
    "img/character/walking/20_Walking.png",
    "img/character/walking/21_Walking.png",
    "img/character/walking/22_Walking.png",
    "img/character/walking/23_Walking.png",
  ];
  IMAGES_JUMPING = [
    "img/character/jump_start/00_Jump_Start.png",
    "img/character/jump_start/01_Jump_Start.png",
    "img/character/jump_start/02_Jump_Start.png",
    "img/character/jump_start/03_Jump_Start.png",
    "img/character/jump_start/04_Jump_Start.png",
    "img/character/jump_start/05_Jump_Start.png",
    "img/character/jump_loop/00_Jump_Loop.png",
    "img/character/jump_loop/01_Jump_Loop.png",
    "img/character/jump_loop/02_Jump_Loop.png",
    "img/character/jump_loop/03_Jump_Loop.png",
    "img/character/jump_loop/04_Jump_Loop.png",
    "img/character/jump_loop/05_Jump_Loop.png",
    "img/character/falling_down/00_Falling_Down.png",
    "img/character/falling_down/01_Falling_Down.png",
    "img/character/falling_down/02_Falling_Down.png",
    "img/character/falling_down/03_Falling_Down.png",
    "img/character/falling_down/04_Falling_Down.png",
    "img/character/falling_down/05_Falling_Down.png",
  ];

  constructor() {
    super().loadImage("img/character/idle/00_Idle.png"); // the loadImage function is called and executed from the MovableObject superclass
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      // Moving right
      if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
        this.moveRight();
        this.otherDirection = false;
      }
      // Moving left
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
      }

      // Jumping
      if (this.world.keyboard.SPACE && !this.isInTheAir()) {
        this.jump();
      }

      // Camera movement
      this.world.cameraX = -this.x + 80;

      // Animations
      if (this.isInTheAir()) {
        this.animationTimers.jumping++;
        this.animationTimers.walking = 0;
        this.animationTimers.idle = 0;

        if (this.animationTimers.jumping >= 6) {
          // when the jumping timer has reached 6 ticks (at 60FPS = 6 x 16.66ms = 100ms)
          this.playAnimation(this.IMAGES_JUMPING);
          this.animationTimers.jumping = 0;
        }
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.animationTimers.walking++;
        this.animationTimers.jumping = 0;
        this.animationTimers.idle = 0;

        if (this.animationTimers.walking >= 2) {
          // when the walking timer has reached 2 ticks (at 60FPS = 2 x 16.66ms = ca. 33ms)
          this.playAnimation(this.IMAGES_WALKING);
          this.animationTimers.walking = 0;
        }
      } else {
        this.animationTimers.idle++;
        this.animationTimers.jumping = 0;
        this.animationTimers.walking = 0;
        if (this.animationTimers.idle >= 6) {
          // when the idle timer has reached 6 ticks (at 60FPS = 6 x 16.66ms = 100ms)
          this.playAnimation(this.IMAGES_IDLE);
          this.animationTimers.idle = 0;
        }
      }
    }, 1000 / 60);
  }
}
