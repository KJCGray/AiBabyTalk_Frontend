export default {
  key: "farm",
  preload: function () {
    // .setAngle(45)
    // 加載新場景的資源
    this.load.image("grassTexture", "/background/Grass_Texture.png");
    this.load.image("sky", "/background/Bg.png");
    this.load.image("btnTemplate", "/UI/ButtonTemplate.png");
    this.load.image("circleFrame", "/UI/UI_CircledFrame.png");
    this.load.image("blankGarden", "/Objects/GardenBed_Blank.png");
    this.load.image("arrowDown", "/Terrain_Common/Arrow_Down.png");
    this.load.image("arrowUp", "/Terrain_Common/Arrow_Up.png");
  },
  create: function () {
    // 取得當前螢幕的寬高
    const screenWidth = this.cameras.main.width;
    const screenHeight = this.cameras.main.height;

    // 動態設置背景
    const tileSprite = this.add.tileSprite(
      0,
      screenHeight * 0.3,
      screenWidth,
      screenHeight * 0.7,
      "grassTexture"
    );
    tileSprite.setOrigin(0, 0).setDepth(-1);

    const sky = this.add.tileSprite(0, 0, screenWidth, screenHeight * 0.3, "sky");
    sky.setOrigin(0, 0).setDepth(-2);

    // 關卡進度
    this.add.sprite(screenWidth * 0.28, screenHeight * 0.42, "circleFrame").setScale(0.3);
    this.add.sprite(screenWidth * 0.2, screenHeight * 0.48, "blankGarden").setScale(1.25);
    this.add.sprite(screenWidth * 0.3, screenHeight * 0.67, "arrowDown").setAngle(-15);
    this.add.sprite(screenWidth * 0.45, screenHeight * 0.80, "circleFrame").setScale(0.3);
    this.add.sprite(screenWidth * 0.37, screenHeight * 0.85, "blankGarden").setScale(1.25);
    this.add.sprite(screenWidth * 0.48, screenHeight * 0.67, "arrowUp").setAngle(15);
    this.add.sprite(screenWidth * 0.6, screenHeight * 0.42, "circleFrame").setScale(0.3);
    this.add.sprite(screenWidth * 0.53, screenHeight * 0.48, "blankGarden").setScale(1.25);

    // 動態設置按鈕與文字
    this.startBtn = this.add.sprite(screenWidth * 0.9, screenHeight * 0.2, "btnTemplate").setScale(0.3).setInteractive();
    this.startText = this.add
      .text(screenWidth * 0.9, screenHeight * 0.2, "去冒險", {
        fontSize: `${Math.min(screenWidth, screenHeight) * 0.05}px`,
        color: "#ff3333",
        fontStyle: "bold",
        fontFamily: "Arial",
        padding: { top: 10, bottom: 10 },
      })
      .setOrigin(0.5)
      .setDepth(1) // 確保文字在按鈕上方
      .setStroke("#ffffff", 5);

    // 點擊按鈕進行場景切換
    this.startBtn.on("pointerdown", () => {
      this.scene.start("rabbitForCarrot"); // 加載的場景
    });
  },
  update: function () {},
};
