function generateObjects(ClassRef, count) {
  return Array.from({ length: count }, () => new ClassRef());
}

function generateRepeatingLayer(count, imagePath, spacingX, y, width, height) {
  const layers = [];
  for (let i = 0; i < count; i++) {
    const x = i * spacingX;
    layers.push(new Layer(imagePath, x, y, width, height));
  }
  return layers;
}
