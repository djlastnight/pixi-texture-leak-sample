import { Application, Assets, BitmapText, Container, Sprite } from "pixi.js";

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window, hello: true });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  // Load the bunny texture
  const texture = await Assets.load("/assets/bunny.png");

  // Create a bunny Sprite
  const bunny = new Sprite(texture);

  // Center the sprite's anchor point
  bunny.anchor.set(0.5);

  // Move the sprite to the center of the screen
  bunny.position.set(app.screen.width / 2, app.screen.height / 2);

  // Add the bunny to the stage
  app.stage.addChild(bunny);
  bunny.eventMode = "static";

  const container = new Container();
  container.eventMode = "static";
  app.stage.addChild(container);

  bunny.once("pointerdown", async () => {
    await Assets.load("https://pixijs.com/assets/bitmap-font/desyrel.xml");

    for (let i = 0; i < 100; i++) {
      const bitmapFontText = new BitmapText({
        text: "bitmap fonts are supported!\nWoo yay!",
        style: {
          fontFamily: "Desyrel",
          fontSize: i * 4,
          align: "left",
          fill: "#" + Math.random().toString(16).substr(-6),
          stroke: "white",
        },
      });

      container.addChild(bitmapFontText);
    }

    container.once("pointerdown", () => {
      container.destroy(true);
    });
  });
})();
