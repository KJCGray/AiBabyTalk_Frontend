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
    this.load.image("stone", "/Objects/Boulders.png");
    this.load.image("tree", "/Objects/Tree.png");
    this.load.image("fountain", "/Objects/Fountain.png");
  },

  create: function() {
    // 使用 cameras.main 來取得當前畫布大小
    const screenWidth = this.cameras.main.width;
    const screenHeight = this.cameras.main.height;

    // 動態設置背景
    const tileSprite = this.add.tileSprite(0, screenHeight * 0.3, screenWidth, screenHeight * 0.7, "grassTexture");
    tileSprite.setOrigin(0, 0).setDepth(-1);

    const sky = this.add.tileSprite(0, 0, screenWidth, screenHeight * 0.3, "sky");
    sky.setOrigin(0, 0).setDepth(-2);

    // 雲的設置
    cloud01 = this.add.sprite(screenWidth, screenHeight * 0.15, "cloud01").setScale(0.3);
    cloud02 = this.add.sprite(screenWidth * 0.6, screenHeight * 0.2, "cloud02").setScale(0.3);
    cloud03 = this.add.sprite(screenWidth * 0.35, screenHeight * 0.2, "cloud03").setScale(0.3);
    
    // 其他物件的位置根據畫布動態設置
    this.add.sprite(screenWidth * 0.85, screenHeight * 0.8, "stone");
    this.add.sprite(screenWidth * 0.1, screenHeight * 0.4, "tree");
    this.add.sprite(screenWidth * 0.2, screenHeight * 0.4, "tree");
    this.add.sprite(screenWidth * 0.3, screenHeight * 0.4, "tree");
    this.add.sprite(screenWidth * 0.85, screenHeight * 0.4, "fountain");

    // 動態設置按鈕與文字
    const startBtn = this.add.sprite(screenWidth * 0.5, screenHeight * 0.5, "btnTemplate").setScale(0.5);
    const startText = this.add.text(screenWidth * 0.5, screenHeight * 0.5, '開始遊戲', {
      fontSize: `${Math.min(screenWidth, screenHeight) * 0.05}px`,  // 字體大小根據螢幕動態調整
      color: '#ff3333',
      fontStyle: 'bold',
      fontFamily: 'Arial',
      padding: { top: 10, bottom: 10 },
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
    this.add.sprite(screenWidth * 0.3, screenHeight * 0.7, "catDown");
    this.add.sprite(screenWidth * 0.4, screenHeight * 0.7, "rabbitDown");
    this.add.sprite(screenWidth * 0.5, screenHeight * 0.7, "chickDown");
    this.add.sprite(screenWidth * 0.6, screenHeight * 0.7, "foxDown");
    this.add.sprite(screenWidth * 0.7, screenHeight * 0.7, "pigDown");
  },

  update: function(time, delta) {
    // 背景雲的移動
    cloud01.x -= 0.5 * (delta / 16.67);
    if (cloud01.x < -cloud01.width) cloud01.x = this.cameras.main.width;

    cloud02.x -= 0.5 * (delta / 16.67);
    if (cloud02.x < -cloud02.width) cloud02.x = this.cameras.main.width;

    cloud03.x -= 0.5 * (delta / 16.67);
    if (cloud03.x < -cloud03.width) cloud03.x = this.cameras.main.width;
  }
};
