export default {
    key: "shapeMemory",
    preload: function () {
      this.load.image("sky", "/background/Bg.png");
      this.load.image("redX", "/Objects/RedX.png");
      this.load.image("endSquare", "/UI/UI_SquareFrame.png");
      this.load.image("circle", "/GameObj/circle.png");
      this.load.image("triangle", "/GameObj/triangle.png");
      this.load.image("square", "/GameObj/square.png");
      this.load.audio("correct", "/audio/correct.mp3");
      this.load.audio("wrong", "/audio/wrong.mp3");
    },
    create: function () {
      const screenWidth = this.cameras.main.width;
      const screenHeight = this.cameras.main.height;
  
      const sky = this.add.tileSprite(0, 0, screenWidth, screenHeight, "sky");
      sky.setOrigin(0, 0).setDepth(-2);
  
      // 設定互動的形狀圖案
      this.circle = this.add
        .sprite(screenWidth * 0.2, screenHeight * 0.6, "circle")
        .setScale(0.6)
        .setInteractive();
      this.triangle = this.add
        .sprite(screenWidth * 0.5, screenHeight * 0.6, "triangle")
        .setScale(0.5)
        .setInteractive();
      this.square = this.add
        .sprite(screenWidth * 0.8, screenHeight * 0.6, "square")
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
  
      this.circle.on("pointerdown", () => {
        text = "答對了！這是圓形";
        this.endText.setText(text);
        this.endSquare.setVisible(true);
        this.endText.setVisible(true);
        this.redX.setVisible(true);
        this.correctSound.play();
      });
  
      this.triangle.on("pointerdown", () => {
        text = "不對喔，這個是三角形";
        this.endText.setText(text);
        this.endSquare.setVisible(true);
        this.endText.setVisible(true);
        this.redX.setVisible(true);
        this.wrongSound.play();
      });
  
      this.square.on("pointerdown", () => {
        text = "不對喔，這個是正方形";
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
        .text(screenWidth * 0.8, screenHeight * 0.2, "回第一關", {
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
  