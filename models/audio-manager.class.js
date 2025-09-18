class AudioManager {
  constructor() {
    this.sounds = {};
    this.muted = false;
  }

  /**
   * Loads an audio file and stores it under the given name.
   *
   * @param {string} name - The key to identify the sound
   * @param {string} src - Path to the audio file
   * @param {boolean} loop - "True" or "false" depending on if the sound should play in a loop
   * @param {number} volume - Initial volume level
   */
  load(name, src, loop = false, volume = 0.5) {
    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = volume;
    this.sounds[name] = audio;
  }

  /**
   * Plays a loaded sound.
   *
   * @param {string} name - The key to identify the sound
   * @param {boolean} restart - If "true" the sound restarts from the beginning
   * @returns - If there is no sound it immediately returns
   */
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

  /**
   * Stops a loaded sound and resets its playback time.
   *
   * @param {string} name - The key to identify the sound
   * @returns - If there is no sound it immediately returns
   */
  stop(name) {
    const sound = this.sounds[name];
    if (!sound) return;

    sound.pause();
    sound.currentTime = 0;
  }

  /**
   * Stops all loaded sounds.
   *
   */
  stopAllSounds() {
    for (const name in this.sounds) {
      this.stop(name);
    }
  }

  /**
   * Pauses a loaded sound.
   *
   * @param {string} name - The key to identify the sound
   * @returns - If there is no sound it immediately returns
   */
  pause(name) {
    const sound = this.sounds[name];
    if (!sound) return;

    sound.pause();
  }

  /**
   * Checks if a loaded sound is currently playing.
   *
   * @param {string} name - The key to identify the sound
   * @returns {boolean} - "True" if the sound exists and is playing, otherwise "false"
   */
  isPlaying(name) {
    const sound = this.sounds[name];
    return sound && !sound.paused;
  }

  /**
   * Mutes all loaded sounds.
   *
   */
  muteAll() {
    for (const key in this.sounds) {
      this.sounds[key].muted = true;
    }
  }

  /**
   * Unmutes all loaded sounds.
   *
   */
  unmuteAll() {
    for (const key in this.sounds) {
      this.sounds[key].muted = false;
    }
  }
}
