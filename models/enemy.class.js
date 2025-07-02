class Enemy extends MovableObject {
  constructor() {
    super().loadImage("img/enemies/golem_1/walking/0_Golem_Walking_000.png"); // von der Überklasse MovableObject wird die loadImage Funktion aufgerufen und ausgeführt
  }
}
