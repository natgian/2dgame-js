class World {
  character = new Character();
  enemies = [new Enemy(), new Enemy(), new Enemy()];
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    // Die Methode getContext("2d") liefert ein sogenanntes Rendering-Kontext-Objekt. Dieses enthält alle Methoden und Eigenschaften, die man bracht, um auf das Canvas zu zeichnen: Linien, Formen, Bilder, Text, usw.
  }

  draw() {
    this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height); // Paramter: Bild, x-Koordinate, y-Koordinate, Breite, Höhe)
  }
}
