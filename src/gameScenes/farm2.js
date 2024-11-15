let gameProgress = 0;
export default {
  key: "farm2",
  preload: function () {
    // .setAngle(45)
    // 加載新場景的資源
    this.load.image("grassTexture", "/background/Grass_Texture.png");
    this.load.image("sky", "/background/Bg.png");
    this.load.image("btnTemplate", "/UI/ButtonTemplate.png");
    this.load.image("circleFrame", "/UI/UI_CircledFrame.png");
    this.load.image("squareFrame", "/UI/UI_SquareFrame.png");
    this.load.image("toolbar", "/UI/UI_Toolbar_Top_Corner.png");
    this.load.image("blankGarden", "/Objects/GardenBed_Blank.png");
    this.load.image("carrotChild", "/Objects/GardenBed_Carrots_01.png");
    this.load.image("carrotAdult", "/Objects/GardenBed_Carrots_02.png");
    this.load.image("cucumberChild", "/Objects/GardenBed_Cucumbers_01.png");
    this.load.image("cucumberAdult", "/Objects/GardenBed_Cucumbers_02.png");
    this.load.image("tomatoAdult", "/Objects/GardenBed_Tomatoes_02.png");
    this.load.image("onionAdult", "/Objects/GardenBed_Onions_02.png");
    this.load.image("arrowDown", "/Terrain_Common/Arrow_Down.png");
    this.load.image("arrowUp", "/Terrain_Common/Arrow_Up.png");
    this.load.image("rabbitDown", "/Characters/Rabbit_Down.png");
    this.load.image("avatar", "/Characters/Rabbit_Avatar_Rounded.png");
    this.load.audio("farmIntro", "/audio/gameVoice/3.wav");
    this.load.audio("clickIntro", "/audio/gameVoice/4.wav");
    this.load.audio("seedAudio", "/audio/gameVoice/胡蘿蔔的種子發芽了呢.wav");
    this.load.audio("peirong", "/audio/gameVoice/晚上好.wav");
    this.load.audio("lookSeed", "/audio/gameVoice/哇，小黃瓜種子成功發芽了呢！你做得真好。.wav");
    this.load.audio("openMusic", "/audio/openingMusic.mp3");
  },
  create: function () {
    // 取得當前螢幕的寬高
    const screenWidth = this.cameras.main.width;
    const screenHeight = this.cameras.main.height;

    // 背景音樂
    this.openMusic = this.sound.add("openMusic", { loop: true, volume: 0.2 });
    this.seed = this.sound.add("seedAudio", { loop: false, volume: 0.2 });
    this.openMusic.play();

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

    this.rabbit = this.add.sprite(screenWidth * 0.45, screenHeight * 0.48, "rabbitDown");
    this.rabbit.setDepth(11);


    // 設定語音
    this.farmIntro = this.sound.add("farmIntro", { loop: false, volume: 0.5 });
    this.clickIntro = this.sound.add("clickIntro", { loop: false, volume: 0.5 });
    this.peirong = this.sound.add("peirong", { loop: false, volume: 0.5 });
    this.lookSeed = this.sound.add("lookSeed", { loop: false, volume: 0.5 });

    // 姓名及avatar
    this.add.sprite(screenWidth * 0.12, screenHeight * 0.1, "toolbar").setScale(0.6);
    this.add.sprite(screenWidth * 0.05, screenHeight * 0.1, "squareFrame").setScale(0.4);
    this.add.sprite(screenWidth * 0.05, screenHeight * 0.1, "avatar").setScale(0.4);
    this.add.level2 = this.add
      .text(screenWidth * 0.085, screenHeight * 0.06, "金照曦", {
        fontSize: `${Math.min(screenWidth, screenHeight) * 0.04}px`,
        color: "#fffff",
        fontStyle: "bold",
        fontFamily: "Arial",
        padding: { top: 10, bottom: 10 },
      })
      .setDepth(1)
      .setStroke("#ffffff", 5);

    // 關卡進度
    this.add.sprite(screenWidth * 0.28, screenHeight * 0.42, "circleFrame").setScale(0.3);
    this.garden1 = this.add.sprite(screenWidth * 0.2, screenHeight * 0.48, "carrotAdult").setScale(1.25);
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


    // 替換第一個 garden 圖片
    this.add.sprite(screenWidth * 0.3, screenHeight * 0.67, "arrowDown").setAngle(-15);
    this.add.sprite(screenWidth * 0.45, screenHeight * 0.80, "circleFrame").setScale(0.3);
    this.add.sprite(screenWidth * 0.37, screenHeight * 0.85, "onionAdult").setScale(1.25);
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
    this.garden3 = this.add.sprite(screenWidth * 0.58, screenHeight * 0.48, "blankGarden").setScale(1.25);
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
      gameProgress += 1;
      this.openMusic.stop();
      this.scene.start("rabbitCucumber"); // 加載的場景
    });


    const welcomeMessage = " 照曦，晚上好，今天過得愉快嗎?一起展開新的冒險吧！ ";
    let displayedText = ''; // Starts empty

    const welcomeText = this.add.text(screenWidth / 2+100, screenHeight * 0.1, displayedText, {
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
        delay: 160,
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

    console.log(gameProgress);

    const delayDisplay = (delayMsg, displayMsg, callback) => {
      this.time.delayedCall(delayMsg.length * 160 + 1000, () => {
        displayedText = '';
        welcomeText.setText(displayedText);
        showMsg(displayMsg);
        if (callback) callback(); // 如果有回調函數，就執行
      });
    };



    // 使用回調來確保順序
    if (gameProgress === 0) {
      this.peirong.play();
      showMsg(welcomeMessage)
    }


    if (gameProgress === 1) {
      this.garden3.setTexture("cucumberChild");
      //this.seed.play();
      displayedText = '';
      welcomeText.setText(displayedText);
      this.lookSeed.play();
      showMsg('哇，小黃瓜種子成功發芽了呢！你做得真好。');
      // this.time.delayedCall(2500, () => {
      //   displayedText = '';
      //   welcomeText.setText(displayedText);
      //   showMsg('那接下來，讓我們陪著小兔子再次去冒險，找到水壺給胡蘿蔔澆水吧！');
      // })
    }
    if (gameProgress === 2) this.garden1.setTexture("carrotAdult");

    // this.time.delayedCall(welcomeMessage.length * 160 + 1000 + " 然後回到農場，跟著小兔子一起種下蔬菜種子，幫助蔬菜們長大! ".length * 160 + 1500, () => {
    //   this.clickIntro.play();
    //   // 創建半透明灰色覆蓋層
    //   const overlay = this.add.graphics();
    //   overlay.fillStyle(0x000000, 0.5); // 半透明灰色
    //   overlay.fillRect(0, 0, screenWidth, screenHeight); // 覆蓋整個畫面
    //   overlay.setDepth(18);
    // });
  },
  update: function () {},
};
