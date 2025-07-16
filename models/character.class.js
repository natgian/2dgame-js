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
  IMAGES_HURT = [
    "img/character/hurt/00_Hurt.png",
    "img/character/hurt/01_Hurt.png",
    "img/character/hurt/02_Hurt.png",
    "img/character/hurt/03_Hurt.png",
    "img/character/hurt/04_Hurt.png",
    "img/character/hurt/05_Hurt.png",
    "img/character/hurt/06_Hurt.png",
    "img/character/hurt/07_Hurt.png",
    "img/character/hurt/08_Hurt.png",
    "img/character/hurt/09_Hurt.png",
    "img/character/hurt/10_Hurt.png",
    "img/character/hurt/11_Hurt.png",
  ];
  IMAGES_DYING = [
    "img/character/dying/00_Dying.png",
    "img/character/dying/01_Dying.png",
    "img/character/dying/02_Dying.png",
    "img/character/dying/03_Dying.png",
    "img/character/dying/04_Dying.png",
    "img/character/dying/05_Dying.png",
    "img/character/dying/06_Dying.png",
    "img/character/dying/07_Dying.png",
    "img/character/dying/08_Dying.png",
    "img/character/dying/09_Dying.png",
    "img/character/dying/10_Dying.png",
    "img/character/dying/11_Dying.png",
    "img/character/dying/12_Dying.png",
    "img/character/dying/13_Dying.png",
    "img/character/dying/14_Dying.png",
  ];

  SOUND_JUMPING = new Audio("audio/whoosh_jump.mp3");
  SOUND_WALKING = new Audio("audio/running_in_grass.mp3");

  constructor() {
    super().loadImage("img/character/idle/00_Idle.png"); // the loadImage function is called and executed from the MovableObject superclass
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DYING);
    this.applyGravity();
    this.animate();
    this.collisionBoxOffsetX = 35;
    this.collisionBoxOffsetY = 0;
    this.collisionBoxWidth = -50;
    this.collisionBoxHeight = 0;
    this.deathAnimationPlayed = false;
  }

  animate() {
    setInterval(() => {
      // Moving right
      if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
        this.animateMoveRight();
      }
      // Moving left
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.animateMoveLeft();
      }
      // Jumping
      if (this.world.keyboard.SPACE && !this.isInTheAir()) {
        this.animateJump();
      }
      // Camera movement
      this.world.cameraX = -this.x + 80;
      // Animations
      if (this.isDead()) {
        this.animateIsDead();
      } else if (this.isHurt()) {
        this.animateIsHurt();
      } else if (this.isInTheAir()) {
        this.animateIsInTheAir();
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.animateWalking();
      } else {
        this.animateIdle();
      }
    }, 1000 / 60);
  }

  animateMoveLeft() {
    this.moveLeft();
    this.otherDirection = true;
    this.SOUND_WALKING.volume = 0.5;
    this.SOUND_WALKING.play();
    this.SOUND_WALKING.loop = true;
  }

  animateMoveRight() {
    this.moveRight();
    this.otherDirection = false;
    this.SOUND_WALKING.volume = 0.5;
    this.SOUND_WALKING.play();
    this.SOUND_WALKING.loop = true;
  }

  animateJump() {
    this.jump();
    this.SOUND_JUMPING.volume = 0.1;
    this.SOUND_JUMPING.play();
  }

  animateIsDead() {
    this.SOUND_WALKING.pause();
    this.playAnimation(this.IMAGES_DYING);
  }

  animateIsHurt() {
    this.SOUND_WALKING.pause();
    this.playAnimationOnce(this.IMAGES_HURT);
  }

  animateIsInTheAir() {
    this.SOUND_WALKING.pause();
    this.animationTimers.jumping++;
    this.animationTimers.walking = 0;
    this.animationTimers.idle = 0;

    if (this.animationTimers.jumping >= 6) {
      // when the jumping timer has reached 6 ticks (at 60FPS = 6 x 16.66ms = 100ms)
      this.playAnimation(this.IMAGES_JUMPING);
      this.animationTimers.jumping = 0;
    }
  }

  animateWalking() {
    this.animationTimers.walking++;
    this.animationTimers.jumping = 0;
    this.animationTimers.idle = 0;

    if (this.animationTimers.walking >= 1) {
      // when the walking timer has reached 2 ticks (at 60FPS = 2 x 16.66ms = ca. 33ms)
      this.playAnimation(this.IMAGES_WALKING);
      this.animationTimers.walking = 0;
    }
  }

  animateIdle() {
    this.SOUND_WALKING.pause();
    this.animationTimers.idle++;
    this.animationTimers.jumping = 0;
    this.animationTimers.walking = 0;
    if (this.animationTimers.idle >= 6) {
      // when the idle timer has reached 6 ticks (at 60FPS = 6 x 16.66ms = 100ms)
      this.playAnimation(this.IMAGES_IDLE);
      this.animationTimers.idle = 0;
    }
  }
}
