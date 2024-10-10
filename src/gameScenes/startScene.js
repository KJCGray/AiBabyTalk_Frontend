// startScene.js
let cloud01, cloud02, cloud03;
export default {
    key: 'startScene',
    preload: function() {
      // 預載入資源
      this.load.image("grassTexture", "/background/Grass_Texture.png");
      this.load.image("rabbitDown", "/Characters/Rabbit_Down.png");
      this.load.image("catDown", "/Characters/Cat_Down.png");
      this.load.image("chickDown", "/Characters/Chick_Down.png");
      this.load.image("foxDown", "/Characters/Fox_Down.png");
      this.load.image("pigDown", "/Characters/Pig_Down.png");
      this.load.image("sky", "/background/Bg.png");
      this.load.image("cloud01", "/background/Cloud_01.png");
      this.load.image("cloud02", "/background/Cloud_02.png");
      this.load.image("cloud03", "/background/Cloud_03.png");
      this.load.image("btnTemplate", "/UI/ButtonTemplate.png");
    },
    
    create: function() {
      // 創建場景
      const tileSprite = this.add.tileSprite(0, 150, 1000, 350, "grassTexture");
      tileSprite.setOrigin(0, 0).setDepth(-1);
  
      const sky = this.add.tileSprite(0, 0, 1000, 150, "sky");
      sky.setOrigin(0, 0).setDepth(-2);
  
      cloud01 = this.add.sprite(1000, 70, "cloud01").setScale(0.3);
      cloud02 = this.add.sprite(600, 100, "cloud02").setScale(0.3);
      cloud03 = this.add.sprite(350, 100, "cloud03").setScale(0.3);
  
      const startBtn = this.add.sprite(500, 250, "btnTemplate").setScale(0.5);
      const startText = this.add.text(500, 250, '開始遊戲', {
        fontSize: '36px',
        color: '#ff3333',
        fontStyle: 'bold',
        fontFamily: 'Arial', // 確保字體支持中文
        padding: {
          top: 10, // 增加上方的間距
          bottom: 10,
        },
      }).setOrigin(0.5).setStroke('#ffffff', 5);
  
      // 設定按鈕互動效果
      startBtn.setInteractive();
      startBtn.on('pointerover', () => {
        startBtn.setScale(0.6);
        startText.setScale(1.05);
      });
      startBtn.on('pointerout', () => {
        startBtn.setScale(0.5);
        startText.setScale(1);
      });
  
      // 點擊按鈕進入下一個場景
      startBtn.on('pointerdown', () => {
        this.scene.start('rabbitForCarrot');
      });
  
      // 其他角色
      this.add.sprite(300, 350, "catDown");
      this.add.sprite(400, 350, "rabbitDown");
      this.add.sprite(500, 350, "chickDown");
      this.add.sprite(600, 350, "foxDown");
      this.add.sprite(700, 350, "pigDown");
    },
  
    update: function(time, delta) {
      // 背景移動
      cloud01.x -= 0.5 * (delta / 16.67);
      if (cloud01.x < -cloud01.width) cloud01.x = 1000;
  
      cloud02.x -= 0.5 * (delta / 16.67);
      if (cloud02.x < -cloud02.width) cloud02.x = 1000;
  
      cloud03.x -= 0.5 * (delta / 16.67);
      if (cloud03.x < -cloud03.width) cloud03.x = 1000;
    }
  };
  