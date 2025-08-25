class AudioManager {
  constructor() {
    this.sounds = {};
    this.muted = false;
  }

  load(name, src, loop = false, volume = 0.5) {
    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = volume;
    this.sounds[name] = audio;
  }

  play(name, restart = true) {
    const sound = this.sounds[name];
    if (!sound) return;

    if (restart) {
      sound.currentTime = 0;
    }

    if (sound.paused) {
      sound.play();
    }
  }

  stop(name) {
    const sound = this.sounds[name];
    if (!sound) return;

    sound.pause();
    sound.currentTime = 0;
  }

  pause(name) {
    const sound = this.sounds[name];
    if (!sound) return;

    sound.pause();
  }

  isPlaying(name) {
    const sound = this.sounds[name];
    return sound && !sound.paused;
  }

  muteAll() {
    for (const key in this.sounds) {
      this.sounds[key].muted = true;
    }
  }

  unmuteAll() {
    for (const key in this.sounds) {
      this.sounds[key].muted = false;
    }
  }
}
