let localProgress = 0;
let rabbitPosition = { x: null, y: null };
let walkProgress = 0;

export default {
  key: "rabbitCucumber",
  preload: function () {
    // 加載新場景的資源
    this.load.image("grassTexture", "/background/Grass_Texture.png");
    this.load.image("sky", "/background/Bg.png");
    this.load.image("rabbitRight", "/Characters/Rabbit_Right.png");
    this.load.image("rabbitDown", "/Characters/Rabbit_Down.png");
    this.load.image("rabbitLeft", "/Characters/Rabbit_Left.png");
    this.load.image("rabbitUp", "/Characters/Rabbit_Up.png");
    this.load.image("Hedge_Roses", "/Objects/Hedge_Roses.png");
    this.load.image("love", "/UI/Status_Love.png");
    this.load.image("endSquare", "/UI/ButtonTemplate.png");
    this.load.image("fenceLeft", "/Fences/Fence_Left.png");
    this.load.image("fenceTop", "/Fences/Fence_Top.png");
    this.load.image("fenceBottom", "/Fences/Fence_Bottom.png");
    this.load.image("fenceRight", "/Fences/Fence_Right.png");
    this.load.image("fenceHorizontal", "/Fences/Fence_Horizontal.png");
    this.load.image("fenceTopLeft", "/Fences/Fence_Corner_Top_Left.png");
    this.load.image("fenceBottomRight", "/Fences/Fence_Corner_Bottom_Right.png");
    this.load.image("fenceVertical", "/Fences/Fence_Vertical.png");
    this.load.image("arrowRight", "/Terrain_Common/Arrow_Right.png");
    this.load.image("arrowUp", "/Terrain_Common/Arrow_Up.png");
    this.load.image("door", "/Objects/Door_Golden.png");
    this.load.image("carrot", "/Objects/Carrot.png");
    this.load.image("cucumber", "/Objects/Cucumber.png");
    // 麥克風
    this.load.image("record", "/record.png");
    this.load.image("play", "/play-alt-1.png");
    this.load.image("pause", "/pause.png");
    // 載入音樂
    this.load.audio("audio", "/audio/happyTiming.mp3");
    this.load.audio("story", "/audio/gameVoice/5.wav");
    this.load.audio("firstGuide", "/audio/gameVoice/6.wav");
    this.load.audio("secondGuide", "/audio/gameVoice/7.wav");
    this.load.audio("thirdGuide", "/audio/gameVoice/8.wav");
    this.load.audio("forthGuide", "/audio/gameVoice/9.wav");
    this.load.audio("secondTalk", "/audio/gameVoice/10.wav");
    this.load.audio("littleGameBack", "/audio/gameVoice/12-哇!太棒了！.wav");
    this.load.audio("yourTurn", "/audio/gameVoice/現在交給你試一次吧！.wav");
    this.load.audio("goBack", "/audio/gameVoice/你真厲害，小兔子成功打開了鎖住的門，找到了小黃瓜種子.wav");
    this.load.audio("catIntro", "/audio/gameVoice/小兔子決定在花園裡種植新鮮的小黃瓜.wav");
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

    // 創建兔子角色並設置深度，並保存到場景變數中
    if (rabbitPosition.x !== null && rabbitPosition.y !== null) {
      this.rabbit = this.add.sprite(screenWidth * 0.65, screenHeight * 0.45, "rabbitDown");
    } else {
      this.rabbit = this.add.sprite(screenWidth * 0.08, screenHeight * 0.85, "rabbitDown");
    }
    this.rabbit.setDepth(11);

    // 設定語音
    this.story = this.sound.add("story", { loop: false, volume: 0.5 });
    this.firstGuide = this.sound.add("firstGuide", { loop: false, volume: 0.5 });
    this.secondGuide = this.sound.add("secondGuide", { loop: false, volume: 0.5 });
    this.thirdGuide = this.sound.add("thirdGuide", { loop: false, volume: 0.5 });
    this.forthGuide = this.sound.add("forthGuide", { loop: false, volume: 0.5 });
    this.secondTalk = this.sound.add("secondTalk", { loop: false, volume: 0.5 });
    this.yourTurn = this.sound.add("yourTurn", { loop: false, volume: 0.5 });
    this.goBack = this.sound.add("goBack", { loop: false, volume: 0.5 });

    // 根據畫面動態設置柵欄及其他物件
    this.add.sprite(screenWidth * 0.05, screenHeight * 0.74, "Hedge_Roses").setDepth(10);
    this.add.sprite(screenWidth * 0.18, screenHeight * 0.74, "Hedge_Roses").setDepth(10);
    this.add.sprite(screenWidth * 0.31, screenHeight * 0.74, "Hedge_Roses").setDepth(10);
    this.add.sprite(screenWidth * 0.44, screenHeight * 0.74, "Hedge_Roses").setDepth(10);
    this.add.sprite(screenWidth * 0.57, screenHeight * 0.74, "Hedge_Roses").setDepth(5);
    //this.add.sprite(screenWidth * 0.57, screenHeight * 0.74, "Hedge_Roses").setDepth(1);
    this.add.sprite(screenWidth * 0.57, screenHeight * 0.59, "Hedge_Roses").setDepth(4);
    this.add.sprite(screenWidth * 0.57, screenHeight * 0.44, "Hedge_Roses").setDepth(3);
    this.add.sprite(screenWidth * 0.57, screenHeight * 0.29, "Hedge_Roses").setDepth(2);
    // this.add.sprite(screenWidth * 0.43, screenHeight * 0.6, "Hedge_Roses").setDepth(12);

    this.add.sprite(screenWidth * 0.9 , screenHeight * 0.89, "Hedge_Roses").setDepth(6);
    this.add.sprite(screenWidth * 0.9 , screenHeight * 0.74, "Hedge_Roses").setDepth(5);
    //this.add.sprite(screenWidth * 0.57, screenHeight * 0.74, "Hedge_Roses").setDepth(1);
    this.add.sprite(screenWidth * 0.9, screenHeight * 0.59, "Hedge_Roses").setDepth(4);
    this.add.sprite(screenWidth * 0.9, screenHeight * 0.44, "Hedge_Roses").setDepth(3);
    this.add.sprite(screenWidth * 0.9, screenHeight * 0.29, "Hedge_Roses").setDepth(2);

    // 動態設置蘿蔔和其他物件
    this.arrowRight = this.add.sprite(screenWidth * 0.25, screenHeight * 0.9, "arrowRight");
    this.arrowUp = this.add.sprite(screenWidth * 0.75, screenHeight * 0.7, "arrowUp");
    // this.arrowUp = this.add.sprite(screenWidth * 0.5, screenHeight * 0.45, "arrowRight");

    // 設定背景音樂，並讓它們循環播放
    this.audio = this.sound.add("audio", { loop: true, volume: 0.2   });
    this.catIntro = this.sound.add("catIntro", { loop: false, volume: 0.5 });

    // 播放第一首音樂
    this.audio.play();

    // 隱藏的 love 圖片，開始時不顯示
    this.love = this.add.sprite(
      this.rabbit.x + screenWidth * 0.07,
      this.rabbit.y - screenHeight * 0.07,
      "love"
    );
    this.love.setVisible(false);

    // 結尾框UI_SquareFrame
    this.endSquare = this.add
      .sprite(screenWidth * 0.5, screenHeight * 0.5, "endSquare")
      .setScale(1.7, 1.5)
      .setDepth(15);
    this.endSquare.setVisible(false);
    this.endText = this.add
      .text(screenWidth * 0.5, screenHeight * 0.5, "做得好！\n進入下一關", {
        fontSize: `${Math.min(screenWidth, screenHeight) * 0.04}px`, // 根據螢幕大小動態設置文字
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


    const guideMsg = " 小兔子聽說農場裡藏著胡蘿蔔的種子，只有找到正確的方向才能找到他們，幫助小兔子選擇正確的路徑，找到這些種子，回農場種下新鮮的胡蘿蔔吧! ";
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

    if(localProgress === 0) {
      this.catIntro.play();
      displayedText = '';
      guideText.setText(displayedText);
      showMsg(' 今天，小兔子決定在花園裡種植新鮮的小黃瓜。 ');
      this.time.delayedCall(displayedText.length*170 + 5000, () => {
        displayedText = '';
        guideText.setText(displayedText);
        showMsg(' 趕快跟隨小兔子展開冒險，一起尋找小黃瓜的種子吧！ ');
      })
      // this.story.play();

      // showMsg(guideMsg);
      // this.time.delayedCall(guideMsg.length * 180, () => {
      //   overlay.setVisible(true);
      //   this.firstGuide.play()
      //   displayedText = '';
      //   guideText.setText(displayedText);
      //   showMsg('為了讓小兔子找到胡蘿蔔，需要點擊這個喇叭按鈕。')
      // });
    }


    // 動態設置蘿蔔和其他物件
    this.littleGameBack = this.sound.add("littleGameBack", { loop: false, volume: 0.5 });
    this.goBack = this.sound.add("goBack", { loop: false, volume: 0.5 });
    if (localProgress === 0) {
      this.door = this.add.sprite(screenWidth * 0.75, screenHeight * 0.45, "door").setDepth(10);
      this.carrot = this.add.sprite(screenWidth * 0.65, screenHeight * 0.65, "carrot").setDepth(10);
      this.carrot.setVisible(false); // 在 localProgress === 0 時隱藏蘿蔔
    } else if (localProgress === 1) {
      this.door = this.add.sprite(screenWidth * 0.65, screenHeight * 0.45, "door").setDepth(10);
      this.door.setVisible(false); // 在 localProgress === 1 時隱藏門
      this.carrot = this.add.sprite(screenWidth * 0.75, screenHeight * 0.45, "cucumber").setDepth(10);
      displayedText = '';
      guideText.setText(displayedText);
      showMsg('你真厲害，小兔子成功打開了鎖住的門，找到了小黃瓜種子');
      this.goBack.play();
      this.time.delayedCall(6000, () => {
        this.audio.stop();
        this.scene.start("farm2");
      })
    }

    // 初始化 move 變數，1=上、2=下、3=左、4=右
    this.move = 0;

    // 按鍵事件綁定
    this.input.keyboard.on("keydown-ONE", () => {
      this.move = 1;
    });

    this.input.keyboard.on("keydown-TWO", () => {
      this.move = 2;
    });

    this.input.keyboard.on("keydown-THREE", () => {
      this.move = 3;
    });

    this.input.keyboard.on("keydown-FOUR", () => {
      this.move = 4;
    });

    let isRecording = false;
    const circle = this.add.graphics();
    const circleX = screenWidth * 0.95;
    const circleY = screenHeight * 0.1;
    const circleRadius = 30;

    circle.fillStyle(0xfbf9f9, 1);
    circle.fillCircle(circleX, circleY, circleRadius);
    circle.setDepth(20); // 設置在覆蓋層之上，但低於 recordImage

    // 添加 record 圖片，設置深度高於灰色覆蓋層
  const recordImage = this.add.sprite(circleX, circleY, "record")
    .setDepth(21) // 設置最高深度
    .setInteractive()
    .setScale(0.035); // 調整圖片大小

  const overlay = this.add.graphics();
  overlay.fillStyle(0x000000, 0.5);
  overlay.fillRect(0, 0, screenWidth, screenHeight);
  overlay.setDepth(18);
  overlay.setVisible(false);

  // 設置點擊事件，點擊時改變底色為紅色
  recordImage.on("pointerdown", () => {
    if (!isRecording) {
        // Switch to red background and show overlay
        circle.clear();
        circle.fillStyle(0xf86c4e, 1);
        circle.fillCircle(circleX, circleY, circleRadius);
        overlay.setVisible(true);
        // displayedText = '';
        // guideText.setText(displayedText);
        // if (walkProgress === 0) {
        //   showMsg('請跟我一起說，小兔子往前走')
        //   this.secondGuide.play();
        // }
        // if (walkProgress === 1) {
        //   showMsg('請跟我一起說，小兔子往上走')
        //   this.secondTalk.play();
        // }
        walkProgress += 1;
    } else {
        // Switch back to white background and hide overlay
        circle.clear();
        circle.fillStyle(0xfbf9f9, 1);
        circle.fillCircle(circleX, circleY, circleRadius);
        overlay.setVisible(false);
        // displayedText = '';
        // guideText.setText(displayedText);
        // if (walkProgress === 1) {
        //   this.time.delayedCall(4000, () => {
        //     showMsg('做得很棒喔')
        //     this.thirdGuide.play();
        //   })
        //   this.time.delayedCall(5000, () => {
        //     displayedText = '';
        //     guideText.setText(displayedText);
        //     showMsg('請再次點擊這個喇叭按鈕')
        //     this.forthGuide.play();
        //   })
        // }
        // if (walkProgress === 2) {
        //   this.time.delayedCall(3000, () => {
        //     displayedText = '';
        //     guideText.setText(displayedText);
        //     showMsg('現在，交給你試一次吧!')
        //     this.yourTurn.play();
        //   })
        // }
        // this.time.delayedCall(1000, () => (this.move = 4))
    }
    isRecording = !isRecording; // Toggle the state
  });

  const circle2 = this.add.graphics();
  const circle2X = screenWidth * 0.05;
  const circle2Y = screenHeight * 0.1;
  const circle2Radius = 30;

  circle2.fillStyle(0xfbf9f9, 1);
  circle2.fillCircle(circle2X, circle2Y, circle2Radius);
  circle2.setDepth(20); // 設置在覆蓋層之上，但低於 audio
  // 添加 audio 圖片，設置深度高於灰色覆蓋層
  const playImage = this.add.sprite(circle2X, circle2Y, "play")
  .setDepth(21) // 設置最高深度
  .setInteractive()
  .setScale(0.05); // 調整圖片大小

  playImage.on("pointerdown", () => {
    // Switch back to white background and hide overlay
    playImage.setTexture("pause");
    this.firstGuide.play()
    displayedText = '';
    guideText.setText(displayedText);
    showMsg('為了讓小兔子找到胡蘿蔔，需要點擊這個喇叭按鈕。')
    this.time.delayedCall(2300, () => {
      playImage.setTexture("play");
    })
  });



    // 添加返回主頁的按鈕
    // const backButton = this.add
    //   .text(screenWidth * 0.85, screenHeight * 0.2, "返回主頁", {
    //     fontSize: `${Math.min(screenWidth, screenHeight) * 0.05}px`,
    //     backgroundColor: "#000",
    //     color: "#fff",
    //     padding: { top: 10, bottom: 10, left: 20, right: 20 },
    //     borderRadius: 5,
    //   })
    //   .setInteractive();

    // backButton.on("pointerdown", () => {
    //   this.scene.start("farm"); // 返回主頁場景
    // });


  },
  update: function () {
    if (this.move === 1) {
      if (this.rabbit) {
        this.rabbit.setTexture("rabbitUp");
        this.tweens.add({
          targets: this.rabbit,
          y: this.rabbit.y - 70, // 向上移動
          duration: 1000,
          ease: "Power2",
          onComplete: () => {
          rabbitPosition.x = this.rabbit.x;
          rabbitPosition.y = this.rabbit.y;
            this.rabbit.setTexture("rabbitDown");
            this.move = 0;
          },
        });
      }
    }
    if (this.move === 2) {
      if (this.rabbit) {
        this.tweens.add({
          targets: this.rabbit,
          y: this.rabbit.y + 40, // 向下移動
          duration: 1000,
          ease: "Power2",
          onComplete: () => {
            rabbitPosition.x = this.rabbit.x;
            rabbitPosition.y = this.rabbit.y;
            this.move = 0;
          },
        });
      }
    }
    if (this.move === 3) {
      if (this.rabbit) {
        this.rabbit.setTexture("rabbitLeft");
        this.tweens.add({
          targets: this.rabbit,
          x: this.rabbit.x - 105, // 向左移動
          duration: 1500,
          ease: "Power2",
          onComplete: () => {
            rabbitPosition.x = this.rabbit.x;
            rabbitPosition.y = this.rabbit.y;
            this.rabbit.setTexture("rabbitDown");
            this.move = 0;
          },
        });
      }
    }
    if (this.move === 4) {
      if (this.rabbit) {
        this.rabbit.setTexture("rabbitRight");
        this.tweens.add({
          targets: this.rabbit,
          x: this.rabbit.x + 105, // 向右移動
          duration: 1500,
          ease: "Power2",
          onComplete: () => {
            rabbitPosition.x = this.rabbit.x;
            rabbitPosition.y = this.rabbit.y;
            this.rabbit.setTexture("rabbitDown");
            this.move = 0;
          },
        });
      }
    }

    // 檢查兔子和蘿蔔之間的距離
    const distance = Phaser.Math.Distance.Between(
      this.rabbit.x,
      this.rabbit.y,
      this.door.x,
      this.door.y
    );

    // 當兔子靠近蘿蔔時顯示 love
    if (localProgress === 0) {
      if (distance < 80) {
        this.audio.stop();
        localProgress += 1;
        this.scene.start("whosSound");
      } else {
        this.love.setVisible(false); // 隱藏 love
      }
    }
  },
};