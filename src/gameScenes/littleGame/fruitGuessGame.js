export default {
    key: "fruitGuessGame",
    preload: function () {
      this.load.image("sky", "/background/Bg.png");
      this.load.image("redX", "/Objects/RedX.png");
      this.load.image("endSquare", "/UI/UI_SquareFrame.png");
      this.load.image("apple", "/GameObj/apple.png");
      this.load.image("banana", "/GameObj/banana.png");
      this.load.image("grape", "/GameObj/grape.png");    
      this.load.audio("correct", "/audio/correct.mp3");
      this.load.audio("wrong", "/audio/wrong.mp3");
    },
    create: function () {
      const screenWidth = this.cameras.main.width;
      const screenHeight = this.cameras.main.height;
  
      const sky = this.add.tileSprite(0, 0, screenWidth, screenHeight, "sky");
      sky.setOrigin(0, 0).setDepth(-2);
  
      // 設定互動的水果圖案
      this.apple = this.add
        .sprite(screenWidth * 0.2, screenHeight * 0.6, "apple")
        .setScale(0.5)
        .setInteractive();
      this.banana = this.add
        .sprite(screenWidth * 0.5, screenHeight * 0.6, "banana")
        .setScale(0.5)
        .setInteractive();
      this.grape = this.add
        .sprite(screenWidth * 0.8, screenHeight * 0.6, "grape")
        .setScale(0.5)
        .setInteractive();
  
      // 結果框和文字
      this.endSquare = this.add
        .sprite(screenWidth * 0.5, screenHeight * 0.5, "endSquare")
        .setScale(1, 1.5)
        .setDepth(15);
      this.endSquare.setVisible(false);
  
      this.endText = this.add
        .text(screenWidth * 0.5, screenHeight * 0.5, "", {
          fontSize: `${Math.min(screenWidth, screenHeight) * 0.04}px`,
          color: "#fff",
          fontStyle: "bold",
          padding: {
            top: 10,
            bottom: 10,
            left: 20,
            right: 20,
          },
        })
        .setOrigin(0.5)
        .setDepth(16);
      this.endText.setVisible(false);
  
      // 載入音效
      this.correctSound = this.sound.add("correct");
      this.wrongSound = this.sound.add("wrong");
  
      // 點擊事件設定
      let text = ""; // 儲存要顯示的文字
  
      this.apple.on("pointerdown", () => {
        text = "答對了！這是蘋果";
        this.endText.setText(text);
        this.endSquare.setVisible(true);
        this.endText.setVisible(true);
        this.redX.setVisible(true);
        this.correctSound.play();
      });
  
      this.banana.on("pointerdown", () => {
        text = "不對喔，這個是香蕉";
        this.endText.setText(text);
        this.endSquare.setVisible(true);
        this.endText.setVisible(true);
        this.redX.setVisible(true);
        this.wrongSound.play();
      });
  
      this.grape.on("pointerdown", () => {
        text = "不對喔，這個是葡萄";
        this.endText.setText(text);
        this.endSquare.setVisible(true);
        this.endText.setVisible(true);
        this.redX.setVisible(true);
        this.wrongSound.play();
      });
  
      // 顯示redX，並放置在endSquare的右上方
      this.redX = this.add
        .sprite(
          this.endSquare.x + this.endSquare.displayWidth / 2 - 25, // 右邊位置
          this.endSquare.y - this.endSquare.displayHeight / 2 + 25, // 上方位置
          "redX"
        )
        .setScale(0.05)
        .setDepth(16)
        .setVisible(false)
        .setInteractive();
  
      // 點擊redX後隱藏endSquare和redX
      this.redX.on("pointerdown", () => {
        this.endSquare.setVisible(false);
        this.endText.setVisible(false);
        this.redX.setVisible(false);
      });
  
      // 顯示主頁按鈕
      const startGameButton = this.add
        .text(screenWidth * 0.84, screenHeight * 0.2, "回第一關", {
          fontSize: `${Math.min(screenWidth, screenHeight) * 0.05}px`,
          backgroundColor: "#000",
          color: "#fff",
          padding: { top: 10, bottom: 10, left: 20, right: 20 },
          borderRadius: 5,
        })
        .setOrigin(0.5)
        .setInteractive();
  
      startGameButton.on("pointerdown", () => {
        this.scene.start("rabbitForCarrot"); // 開始遊戲
      });
    },
  };
  