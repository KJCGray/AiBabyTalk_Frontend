export default {
    key: "whosSound",
    preload: function () {
      this.load.image("sky", "/background/Bg.png");
      this.load.image("realDog", "/GameObj/realDog.png");
      this.load.image("realCat", "/GameObj/realCat.png");
      this.load.image("realHourse", "/GameObj/realHourse.png");
      this.load.image("endSquare", "/UI/ButtonTemplate.png");
      this.load.audio("catSound", "/audio/catSound.mp3");
      this.load.audio("correct", "/audio/correct.mp3");
      this.load.audio("wrong", "/audio/wrong.mp3");
      this.load.audio("audioGuitar", "/audio/happyJazzGuitar.mp3");
      this.load.audio("findAudio", "/audio/gameVoice/為了打開門找到小黃瓜種子，小兔子需要找出這個叫聲是哪個動物的聲音。.wav");
      this.load.audio("selectAudio", "/audio/gameVoice/請你幫助小兔子選擇正確的動物吧!.wav");
      this.load.audio("selectCat", "/audio/gameVoice/答對了！是貓咪的叫聲!你真棒呢!.wav");
      this.load.audio("selectDog", "/audio/gameVoice/答錯了!  這不是狗狗的叫聲!再試一次吧！.wav");
      this.load.audio("selectHorse", "/audio/gameVoice/答錯了!  這不是馬兒的叫聲!再試一次吧！.wav");

      this.load.image("play", "/play-alt-1.png");
      this.load.image("pause", "/pause.png");
    },
    create: function () {
      const screenWidth = this.cameras.main.width;
      const screenHeight = this.cameras.main.height;

      const sky = this.add.tileSprite(0, 0, screenWidth, screenHeight, "sky");
      sky.setOrigin(0, 0).setDepth(-2);


      this.realDog = this.add
        .sprite(screenWidth * 0.2, screenHeight * 0.6, "realDog")
        .setScale(0.7)
        .setInteractive();
      this.realCat = this.add
        .sprite(screenWidth * 0.5, screenHeight * 0.6, "realCat")
        .setScale(0.7)
        .setInteractive();
      this.realHourse = this.add
        .sprite(screenWidth * 0.8, screenHeight * 0.6, "realHourse")
        .setScale(0.5)
        .setInteractive();

      this.catSound = this.sound.add("catSound", { loop: false, volume: 0.7 });
      this.correct = this.sound.add("correct", { loop: false, volume: 0.2 });
      this.wrong = this.sound.add("wrong", { loop: false, volume: 0.2 });
      this.findAudio = this.sound.add("findAudio", { loop: false, volume: 0.5 });
      this.selectAudio = this.sound.add("selectAudio", { loop: false, volume: 0.5 });
      this.selectCat = this.sound.add("selectCat", { loop: false, volume: 0.5 });
      this.selectDog = this.sound.add("selectDog", { loop: false, volume: 0.5 });
      this.selectHorse = this.sound.add("selectHorse", { loop: false, volume: 0.5 });
      this.audioGuitar = this.sound.add("audioGuitar", { loop: true, volume: 0.2 });
      this.catSound.play();

      // 字幕

    const guideMsg = " 為了打開門找到小黃瓜種子，小兔子需要找出這個叫聲是哪個動物的聲音。 ";
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

    this.time.delayedCall(4000, () => {
      showMsg(guideMsg)
      this.findAudio.play();
    })
    this.time.delayedCall(10000, () => {
      displayedText = '';
      guideText.setText(displayedText);
      showMsg('請你幫助小兔子選擇正確的動物吧!')
      this.selectAudio.play();
    })


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

      this.realDog.on("pointerdown", () => {
        text = "答錯了，這不是狗狗的叫聲，\n再試一次吧！";
        this.endText.setText(text);
        this.endSquare.setVisible(true);
        this.endText.setVisible(true);
        this.wrong.play();
        this.selectDog.play();
        this.time.delayedCall(2700, () => {
          this.endSquare.setVisible(false);
          this.endText.setVisible(false);
        })
      });

      this.realCat.on("pointerdown", () => {
        text = "答對了！是貓咪的叫聲，\n你真棒呢。";
        this.endText.setText(text);
        this.endSquare.setVisible(true);
        this.endText.setVisible(true);
        this.correct.play();
        this.selectCat.play();
        this.time.delayedCall(2700, () => {
          this.endSquare.setVisible(false);
          this.endText.setVisible(false);
          this.audioGuitar.stop();
          this.scene.start("rabbitCucumber")
        })
      });

      this.realHourse.on("pointerdown", () => {
        text = "答錯了，這不是馬兒的叫聲，\n再試一次吧！";
        this.endText.setText(text);
        this.endSquare.setVisible(true);
        this.endText.setVisible(true);
        this.wrong.play();
        this.selectHorse.play();
        this.time.delayedCall(2700, () => {
          this.endSquare.setVisible(false);
          this.endText.setVisible(false);
        })
      });


    },
  };
