function AlienFactory(ctx, canvasWidth, canvasHeight, posX, posY) {
  const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  switch (randomInt(1, 4)) {
    case 1:
      return new WhiteAlien(ctx, canvasWidth, canvasHeight, posX, posY);
    case 2:
      return new RedAlien(ctx, canvasWidth, canvasHeight, posX, posY);
    case 3:
      return new GreenAlien(ctx, canvasWidth, canvasHeight, posX, posY);
    case 4:
      return new YellowAlien(ctx, canvasWidth, canvasHeight, posX, posY);
  }
}
