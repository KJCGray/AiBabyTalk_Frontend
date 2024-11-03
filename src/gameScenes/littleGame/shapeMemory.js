export default {
    key: "shapeMemory",
    preload: function () {
      this.load.image("sky", "/background/Bg.png");
      this.load.image("endSquare", "/UI/UI_SquareFrame.png");
      this.load.image("circle", "/GameObj/circle.png");
      this.load.image("triangle", "/GameObj/triangle.png");
      this.load.image("square", "/GameObj/square.png");
      this.load.audio("correct", "/audio/correct.mp3");
      this.load.audio("wrong", "/audio/wrong.mp3");
      this.load.audio("audioGuitar", "/audio/happyJazzGuitar.mp3");
      this.load.audio("shapeMemoryAudio", "/audio/gameVoice/11-shapeMemory-圓形.wav");
      // 喇叭
      this.load.image("play", "/play-alt-1.png");
      this.load.image("pause", "/pause.png");
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
      this.audioGuitar = this.sound.add("audioGuitar", { loop: true, volume: 0.2 });
      this.shapeMemoryAudio = this.sound.add("shapeMemoryAudio", { loop: false, volume: 0.5 });
      this.audioGuitar.play();

      const guideMsg = " 小兔子需要你的幫忙，他需要找到圓形來打開秘密的門，這樣才能找到胡蘿蔔種子，幫助小兔子解決這個問題，讓他可以種下更多美味的胡蘿蔔吧! ";
      let displayedText = ''; // Starts empty

      const guideText = this.add.text(screenWidth / 2, screenHeight * 0.1, displayedText, {
        fontSize: `${Math.min(screenWidth, screenHeight) * 0.04}px`,
        color: "#fff",
        fontFamily: "Arial",
        fontStyle: "bold",
        backgroundColor: "#000",
        borderRadius: 20,
      }).setOrigin(0.5).setDepth(21);

      const showMsg = (msg) => {
        this.shapeMemoryAudio.play();
        let index = 0;
        const maxWidth = screenWidth - 300; // 設定最大寬度

        const updateDisplayedText = () => {
          // 檢查當前顯示的文字寬度
          guideText.setText(displayedText);
          if (guideText.width > maxWidth) {
            // 超過最大寬度時清除內容並重新開始
            displayedText = '';
            guideText.setText(displayedText);
          }
        };

        this.time.addEvent({
          delay: 160,
          callback: () => {
            if (index < msg.length) {
              displayedText += msg[index];
              updateDisplayedText(); // 更新顯示的文字
              index++;
            }
          },
          repeat: msg.length - 1
        });
      };

      showMsg(guideMsg);

      const circle = this.add.graphics();
      const circleX = screenWidth * 0.05;
      const circleY = screenHeight * 0.1;
      const circleRadius = 30;

      circle.fillStyle(0xfbf9f9, 1);
      circle.fillCircle(circleX, circleY, circleRadius);
      circle.setDepth(20); // 設置在覆蓋層之上，但低於 audio

        // 添加 audio 圖片，設置深度高於灰色覆蓋層
      const playImage = this.add.sprite(circleX, circleY, "play")
      .setDepth(21) // 設置最高深度
      .setInteractive()
      .setScale(0.05); // 調整圖片大小

      playImage.on("pointerdown", () => {
        // Switch back to white background and hide overlay
        playImage.setTexture("pause");
        displayedText = '';
        guideText.setText(displayedText);
        showMsg(guideMsg);
        this.time.delayedCall(6400, () => {
          playImage.setTexture("play");
        })
      });


      // 點擊事件設定
      let text = ""; // 儲存要顯示的文字

      this.circle.on("pointerdown", () => {
        text = "答對了！這是圓形!";
        this.endText.setText(text);
        this.endSquare.setVisible(true);
        this.endText.setVisible(true);
        this.correctSound.play();
        this.time.delayedCall(1000, () => {
          this.scene.start("rabbitForCarrot")
          this.audioGuitar.stop();
        })
      });

      this.triangle.on("pointerdown", () => {
        text = "不對喔，這個是三角形，\n再試一次吧!";
        this.endText.setText(text);
        this.endSquare.setVisible(true);
        this.endText.setVisible(true);
        this.wrongSound.play();
        this.time.delayedCall(2000, () => {
          this.endSquare.setVisible(false);
          this.endText.setVisible(false);
        })
      });

      this.square.on("pointerdown", () => {
        text = "不對喔，這個是正方形，\n再試一次吧!";
        this.endText.setText(text);
        this.endSquare.setVisible(true);
        this.endText.setVisible(true);
        this.wrongSound.play();
        this.time.delayedCall(2000, () => {
          this.endSquare.setVisible(false);
          this.endText.setVisible(false);
        })
      });

    },
  };
