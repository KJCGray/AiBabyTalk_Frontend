export default {
  key: "rabbitForCarrot", // 設置場景的鍵值，方便引用
  preload: function () {
    // 加載新場景的資源
    this.load.image("grassTexture", "/background/Grass_Texture.png");
    this.load.image("sky", "/background/Bg.png");
    this.load.image("rabbitRight", "/Characters/Rabbit_Right.png");
    this.load.image("rabbitDown", "/Characters/Rabbit_Down.png");
    this.load.image("rabbitLeft", "/Characters/Rabbit_Left.png");
    this.load.image("rabbitUp", "/Characters/Rabbit_Up.png");
    this.load.image("radish", "/Objects/Radish.png");
    this.load.image("love", "/UI/Status_Love.png");
    this.load.image("fenceLeft", "/Fences/Fence_Left.png");
    this.load.image("fenceTop", "/Fences/Fence_Top.png");
    this.load.image("fenceBottom", "/Fences/Fence_Bottom.png");
    this.load.image("fenceRight", "/Fences/Fence_Right.png");
    this.load.image("fenceHorizontal", "/Fences/Fence_Horizontal.png");
    this.load.image("fenceTopLeft", "/Fences/Fence_Corner_Top_Left.png");
    this.load.image("fenceBottomRight", "/Fences/Fence_Corner_Bottom_Right.png");
    this.load.image("fenceVertical", "/Fences/Fence_Vertical.png");
  },
  create: function () {
    // 創建新場景的元素並設置 tileSprite 和 sky 為場景內的變數
    const tileSprite = this.add.tileSprite(0, 150, 1000, 350, "grassTexture");
    tileSprite.setOrigin(0, 0);
    tileSprite.setDepth(-1);

    const sky = this.add.tileSprite(0, 0, 1000, 150, "sky");
    sky.setOrigin(0, 0);
    sky.setDepth(-2);

    // 創建兔子角色並設置深度，並保存到場景變數中
    this.rabbit = this.add.sprite(80, 420, "rabbitDown");
    this.rabbit.setDepth(11); // 設置 rabbit 的深度

    this.add.sprite(23, 350, "fenceLeft");
    this.add.sprite(150, 350, "fenceHorizontal");
    this.add.sprite(277, 350, "fenceTopLeft").setDepth(10);
    this.add.sprite(277, 286, "fenceVertical").setDepth(5);
    this.add.sprite(277, 222, "fenceBottomRight").setDepth(1);
    this.add.sprite(404, 222, "fenceHorizontal");
    this.add.sprite(531, 222, "fenceHorizontal");
    this.add.sprite(658, 222, "fenceHorizontal");
    this.add.sprite(785, 222, "fenceRight");
    // 右方柵欄
    this.add.sprite(524, 450, "fenceBottom").setDepth(10);
    this.add.sprite(524, 386, "fenceBottomRight").setDepth(5);
    this.add.sprite(652, 386, "fenceHorizontal").setDepth(1);
    this.add.sprite(780, 386, "fenceRight");

    // 創建蘿蔔
    this.radish = this.add.sprite(795, 280, "radish");

    // 新增說明文字
    const text = this.add
      .text(500, 100, "幫助小兔子找家", {
        fontSize: "32px",
        color: "#000",
        padding: {
          top: 10, // 增加上方的間距
          bottom: 10,
        },
      })
      .setOrigin(0.5);

    // 初始化 move 變數，1=上、2=下、3=左、4=右
    this.move = 0;

    // 當按下數字鍵1時，將 move 設為1來觸發移動
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

    // 隱藏的 love 圖片，開始時不顯示
    this.love = this.add.sprite(this.rabbit.x + 50, this.rabbit.y - 50, "love");
    this.love.setVisible(false);
  },
  update: function () {
    if (this.move === 1) {
      if (this.rabbit) {
        this.rabbit.setTexture("rabbitUp");
        this.tweens.add({
          targets: this.rabbit,
          y: this.rabbit.y - 40, // 向上移動
          duration: 1000,
          ease: "Power2",
          onComplete: () => {
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
          x: this.rabbit.x - 88, // 向左移動
          duration: 1500,
          ease: "Power2",
          onComplete: () => {
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
          x: this.rabbit.x + 88, // 向右移動
          duration: 1500,
          ease: "Power2",
          onComplete: () => {
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
      this.radish.x,
      this.radish.y
    );

    // 當兔子靠近蘿蔔時顯示 love
    if (distance < 100) {
      this.love.setPosition(this.rabbit.x + 70, this.rabbit.y - 50);
      this.love.setVisible(true); // 顯示 love
    } else {
      this.love.setVisible(false); // 隱藏 love
    }
  },
};
