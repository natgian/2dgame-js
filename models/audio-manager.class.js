/**
 * Manages the audio by loading, playing, stopping and muting or unmuting sounds.
 *
 */
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

  /**
   * Loads all game sounds (character, enemies, background).
   *
   */
  loadAllSounds() {
    this.load("char_walking", "audio/running_in_grass.mp3", true);
    this.load("char_collect_branch", "audio/collect_branch.mp3", false, 0.6);
    this.load("char_collect_feather", "audio/collect_feather.mp3", false);
    this.load("char_crafting", "audio/craft_item.mp3", false);
    this.load("char_shooting", "audio/wind_swoosh.mp3", false);
    this.load("char_jumping", "audio/whoosh_jump.mp3", false, 0.1);
    this.load("char_hurt", "audio/hurt.mp3", false);
    this.load("enemy_hit", "audio/hit_enemy.mp3", false, 0.2);
    this.load("endboss_growl", "audio/endboss_growl.mp3", false, 0.2);
    this.load("endboss_hurt", "audio/endboss_hurt.mp3", false);
    this.load("endboss_hit", "audio/endboss_hit.mp3", false);
    this.load("bg_music", "audio/fairy_background_music.mp3", true, 0.1);
    this.load("game_over", "audio/game_over.mp3", false, 0.2);
    this.load("victory", "audio/victory.mp3", false, 0.2);
  }
}
