class Character extends MovableObject {
  constructor() {
    super().loadImage("img/character/walking/00_Walking.png"); // von der Überklasse MovableObject wird die loadImage Funktion aufgerufen und ausgeführt
  }

  jump() {}
}
