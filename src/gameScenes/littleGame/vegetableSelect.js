export default {
  key: "vegetableSelect",
  preload: function () {
    this.load.image("sky", "/background/Bg.png");
    this.load.image("hcarrot", "/GameObj/hCarrot.png");
    this.load.image("hcucumber", "/GameObj/hCucumber.png");
    this.load.image("htomato", "/GameObj/hTomato.png");
    this.load.image("endSquare", "/UI/ButtonTemplate.png");
    this.load.audio("audioGuitar", "/audio/happyJazzGuitar.mp3");
    this.load.audio("findAudio", "/audio/gameVoice/請你幫助小貓咪找出，哪一個是小黃瓜呢.wav");
    this.load.audio("discoverAudio", "/audio/gameVoice/小貓咪發現，牠需要選擇正確的水果，才能打開門拿到小黃瓜種子.wav");
    this.load.audio("carrotAudio", "/audio/gameVoice/不對喔，這是胡蘿蔔，再試一次看看。.wav");
    this.load.audio("tomatoAudio", "/audio/gameVoice/不對喔，這是番茄，再試一次看看。.wav");
    this.load.audio("cucumberAudio", "/audio/gameVoice/答對了，這是小黃瓜！你做得非常好。.wav");
    this.load.audio("correct", "/audio/correct.mp3");
    this.load.audio("wrong", "/audio/wrong.mp3");
    // 喇叭
    this.load.image("play", "/play-alt-1.png");
    this.load.image("pause", "/pause.png");
  },
  create: function () {
    const screenWidth = this.cameras.main.width;
    const screenHeight = this.cameras.main.height;

    const sky = this.add.tileSprite(0, 0, screenWidth, screenHeight, "sky");
    sky.setOrigin(0, 0).setDepth(-2);

    // 設定互動的蔬菜圖案
    this.hcarrot = this.add
      .sprite(screenWidth * 0.2, screenHeight * 0.6, "hcarrot")
      .setScale(0.7)
      .setInteractive();
    this.hcucumber = this.add
      .sprite(screenWidth * 0.5, screenHeight * 0.6, "hcucumber")
      .setScale(0.7)
      .setInteractive();
    this.htomato = this.add
      .sprite(screenWidth * 0.8, screenHeight * 0.6, "htomato")
      .setScale(0.5)
      .setInteractive();

    this.audioGuitar = this.sound.add("audioGuitar", { loop: true, volume: 0.2 });
    this.findAudio = this.sound.add("findAudio", { loop: false, volume: 0.5 });
    this.discoverAudio = this.sound.add("discoverAudio", { loop: false, volume: 0.5 });
    this.carrotAudio = this.sound.add("carrotAudio", { loop: false, volume: 0.5 });
    this.tomatoAudio = this.sound.add("tomatoAudio", { loop: false, volume: 0.5 });
    this.cucumberAudio = this.sound.add("cucumberAudio", { loop: false, volume: 0.5 });
    this.correct = this.sound.add("correct", { loop: false, volume: 0.2 });
    this.wrong = this.sound.add("wrong", { loop: false, volume: 0.2 });
    this.audioGuitar.play();


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
      // displayedText = '';
      // guideText.setText(displayedText);
      // this.selectAudio.play();
      // showMsg('現在，請點擊你覺得是圓形的圖案吧!');
      // this.time.delayedCall(6400, () => {
      //   playImage.setTexture("play");
      // })
    });

    // 字幕

    const guideMsg = " 小貓咪發現，牠需要選擇正確的水果，才能打開門拿到小黃瓜種子。 ";
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

    showMsg(guideMsg)
    this.discoverAudio.play();
    this.time.delayedCall(guideMsg.length *170+250, () => {
      displayedText = '';
      guideText.setText(displayedText);
      showMsg('請你幫助小貓咪找出，哪一個是小黃瓜呢?');
      this.findAudio.play();

    })

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

    // 點擊事件設定
    let text = ""; // 儲存要顯示的文字

    this.hcarrot.on("pointerdown", () => {
      text = "不對喔，這是胡蘿蔔，\n再試一次看看。";
      this.endText.setText(text);
      this.endSquare.setVisible(true);
      this.endText.setVisible(true);
      this.wrong.play();
      this.carrotAudio.play();
      this.time.delayedCall(2700, () => {
        this.endSquare.setVisible(false);
        this.endText.setVisible(false);
      })
    });

    this.hcucumber.on("pointerdown", () => {
      text = "答對了，這是小黃瓜！\n你做得非常好。";
      this.endText.setText(text);
      this.endSquare.setVisible(true);
      this.endText.setVisible(true);
      this.correct.play();
      this.cucumberAudio.play();
      this.time.delayedCall(3000, () => {
        this.endSquare.setVisible(false);
        this.endText.setVisible(false);
        this.audioGuitar.stop();
        this.scene.start("rabbitCucumber")
      })
    });

    this.htomato.on("pointerdown", () => {
      text = "不對喔，這是番茄，\n再試一次看看。";
      this.endText.setText(text);
      this.endSquare.setVisible(true);
      this.endText.setVisible(true);
      this.wrong.play();
      this.tomatoAudio.play();
      this.time.delayedCall(2700, () => {
        this.endSquare.setVisible(false);
        this.endText.setVisible(false);
      })
    });

    // 顯示主頁按鈕
    // const startGameButton = this.add
    //   .text(screenWidth * 0.8, screenHeight * 0.2, "回第一關", {
    //     fontSize: `${Math.min(screenWidth, screenHeight) * 0.05}px`,
    //     backgroundColor: "#000",
    //     color: "#fff",
    //     padding: { top: 10, bottom: 10, left: 20, right: 20 },
    //     borderRadius: 5,
    //   })
    //   .setOrigin(0.5)
    //   .setInteractive();

    // startGameButton.on("pointerdown", () => {
    //   this.audioGuitar.stop();
    //   this.scene.start("rabbitForCarrot"); // 開始遊戲
    // });
  },
};
