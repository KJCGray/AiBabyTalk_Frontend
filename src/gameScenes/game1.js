// 測試場景
export default {
  key: "rabbitForCarrot", // 設置場景的鍵值，方便引用
  preload: function () {
    // 加載新場景的資源
    this.load.image("grassTexture", "/background/Grass_Texture.png");
    this.load.image("sky", "/background/Bg.png");
    this.load.image("rabbitRight", "/Characters/Rabbit_Right.png");
    this.load.image("rabbitDown", "/Characters/Rabbit_Down.png");
    this.load.image("rabbitLeft", "/Characters/Rabbit_Left.png");
    this.load.image("fenceLeft", "/Fences/Fence_Left.png");
    this.load.image("fenceHorizontal", "/Fences/Fence_Horizontal.png");
    this.load.image("fenceRight", "/Fences/Fence_Right.png");
  },
  create: function () {
    // 創建新場景的元素並設置 tileSprite 和 sky 為場景內的變數
    const tileSprite = this.add.tileSprite(0, 150, 1000, 350, "grassTexture");
    tileSprite.setOrigin(0, 0);
    tileSprite.setDepth(-1);

    const sky = this.add.tileSprite(0, 0, 1000, 150, "sky");
    sky.setOrigin(0, 0);
    sky.setDepth(-2);

    const rabbit = this.add.sprite(80, 420, "rabbitDown");
    rabbit.setDepth(10);
    this.add.sprite(23, 350, "fenceLeft");
    this.add.sprite(150, 350, "fenceHorizontal");
    this.add.sprite(277, 350, "fenceRight");

    // 在這裡加入新的遊戲邏輯
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
  },
};
