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
    this.load.image("rabbitDown", "/Characters/Rabbit_Down.png");
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

    this.rabbit = this.add.sprite(screenWidth * 0.1, screenHeight * 0.45, "rabbitDown");
    this.rabbit.setDepth(11);

    // 關卡進度
    this.add.sprite(screenWidth * 0.28, screenHeight * 0.42, "circleFrame").setScale(0.3);
    this.add.sprite(screenWidth * 0.2, screenHeight * 0.48, "blankGarden").setScale(1.25);
    this.add.level1 = this.add
      .text(screenWidth * 0.269, screenHeight * 0.374, "1", {
        fontSize: `${Math.min(screenWidth, screenHeight) * 0.05}px`,
        color: "#fffff",
        fontStyle: "bold",
        fontFamily: "Arial",
        padding: { top: 10, bottom: 10 },
      })
      .setDepth(1)
      .setStroke("#ffffff", 5);
    this.add.sprite(screenWidth * 0.3, screenHeight * 0.67, "arrowDown").setAngle(-15);
    this.add.sprite(screenWidth * 0.45, screenHeight * 0.80, "circleFrame").setScale(0.3);
    this.add.sprite(screenWidth * 0.37, screenHeight * 0.85, "blankGarden").setScale(1.25);
    this.add.level2 = this.add
      .text(screenWidth * 0.439, screenHeight * 0.754, "2", {
        fontSize: `${Math.min(screenWidth, screenHeight) * 0.05}px`,
        color: "#fffff",
        fontStyle: "bold",
        fontFamily: "Arial",
        padding: { top: 10, bottom: 10 },
      })
      .setDepth(1)
      .setStroke("#ffffff", 5);
    this.add.sprite(screenWidth * 0.48, screenHeight * 0.67, "arrowUp").setAngle(15);
    this.add.sprite(screenWidth * 0.65, screenHeight * 0.42, "circleFrame").setScale(0.3);
    this.add.sprite(screenWidth * 0.58, screenHeight * 0.48, "blankGarden").setScale(1.25);
    this.add.level3 = this.add
      .text(screenWidth * 0.639, screenHeight * 0.374, "3", {
        fontSize: `${Math.min(screenWidth, screenHeight) * 0.05}px`,
        color: "#fffff",
        fontStyle: "bold",
        fontFamily: "Arial",
        padding: { top: 10, bottom: 10 },
      })
      .setDepth(1)
      .setStroke("#ffffff", 5);
      this.add.sprite(screenWidth * 0.65, screenHeight * 0.67, "arrowDown").setAngle(-15);
      this.add.sprite(screenWidth * 0.8, screenHeight * 0.80, "circleFrame").setScale(0.3);
      this.add.sprite(screenWidth * 0.72, screenHeight * 0.85, "blankGarden").setScale(1.25);
      this.add.level2 = this.add
        .text(screenWidth * 0.784, screenHeight * 0.754, "4 ", {
          fontSize: `${Math.min(screenWidth, screenHeight) * 0.05}px`,
          color: "#fffff",
          fontStyle: "bold",
          fontFamily: "Arial",
          padding: { top: 10, bottom: 10 },
        })
        .setDepth(1)
        .setStroke("#ffffff", 5);

    // 動態設置按鈕與文字
    this.startBtn = this.add.sprite(screenWidth * 0.9, screenHeight * 0.2, "btnTemplate").setScale(0.3, 0.4).setInteractive().setDepth(21);
    this.startText = this.add
      .text(screenWidth * 0.9, screenHeight * 0.2, "去冒險", {
        fontSize: `${Math.min(screenWidth, screenHeight) * 0.05}px`,
        color: "#ff3333",
        fontStyle: "bold",
        fontFamily: "Arial",
        padding: { top: 10, bottom: 10 },
      })
      .setOrigin(0.5)
      .setDepth(22) // 確保文字在按鈕上方
      .setStroke("#ffffff", 5);

    // 點擊按鈕進行場景切換
    this.startBtn.on("pointerdown", () => {
      this.scene.start("rabbitForCarrot"); // 加載的場景
    });


    const welcomeMessage = " 歡迎來到小兔子的開心農場!在這裡，你需要陪著小兔子出去冒險，解決各種問題 ";
    let displayedText = ''; // Starts empty

    const welcomeText = this.add.text(screenWidth / 2, screenHeight * 0.1, displayedText, {
      fontSize: `${Math.min(screenWidth, screenHeight) * 0.04}px`,
      color: "#fff",
      fontFamily: "Arial",
      fontStyle: "bold",
      backgroundColor: "#000",
      borderRadius: 20,
    }).setOrigin(0.5).setDepth(21);

    const showMsg = (msg) => {
      let index = 0;
      this.time.addEvent({
        delay: 100,
        callback: () => {
          if (index < msg.length) {
            displayedText += msg[index];
            welcomeText.setText(displayedText);
            index++;
          }
        },
        repeat: msg.length - 1
      });
    };

    showMsg(welcomeMessage);

    const delayDisplay = (delayMsg, displayMsg, callback) => {
      this.time.delayedCall(delayMsg.length * 100 + 1000, () => {
        displayedText = '';
        welcomeText.setText(displayedText);
        showMsg(displayMsg);
        if (callback) callback(); // 如果有回調函數，就執行
      });
    };

    // 使用回調來確保順序
    delayDisplay(welcomeMessage, " 然後回到農場，跟著小兔子一起種下蔬菜種子，幫助蔬菜們長大! ", () => {
      delayDisplay(" 然後回到農場，跟著小兔子一起種下蔬菜種子，幫助蔬菜們長大!", "接下來，我們先來幫小兔子一起找第一個蔬菜種子，請點擊，去冒險 ");
    });

    this.time.delayedCall(welcomeMessage.length * 100 + 1000 + " 然後回到農場，跟著小兔子一起種下蔬菜種子，幫助蔬菜們長大! ".length * 100 + 1000, () => {
      // 創建半透明灰色覆蓋層
      const overlay = this.add.graphics();
      overlay.fillStyle(0x000000, 0.5); // 半透明灰色
      overlay.fillRect(0, 0, screenWidth, screenHeight); // 覆蓋整個畫面
      overlay.setDepth(18);
    });

  },
  update: function () {},
};
